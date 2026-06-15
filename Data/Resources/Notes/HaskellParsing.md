# Parsing with Megaparsec

Parsing in CS141 is done with the `Megaparsec` package. We start by importing `Text.Megaparsec` and `Text.Megaparsec.Char`

```hs
module Main where

import Text.Megaparsec
import Text.Megaparsec.Char

...
```

A parser is a function that returns either an error, or a value.

```hs
type Parser e a = String -> Either e (a, String)
```

The String in the Right side of the Either represents the as-yet unconsumed input. In Megaparsec, the above data type is a `Parsec`, and is parameterised by three types:
* The error type
* The stream / input type
* The output type
It's common to give `Parsec` a type synonym.

```hs
type Parser = Parsec Void String
```

We can parse individual tokens of the input using the `satisfy` function, which uses a boolean function to compare the character to, or `char`, which simply matches the character.

```hs
parseFive :: Parser Int
parseFive = do
    x <- satisfy (== '5')
    pure (read [x])

parseFive' :: Parser Int
parseFive' = do
    _ <- char '5'
    pure 5
```

Some far more powerful parsers are `some` and `many`.
* `some` parses **one or more** of another parser
* `many` parses **zero or more** of another parser

```hs
some :: Parser a -> Parser [a]
many :: Parser a -> Parser [a]

parseManyFives :: Parser [Int]
parseManyFives = many parseFive'
```

`takeWhileP` applies a predicate repeatedly, consuming input until the predicate fails

```hs
-- The Maybe String is an optional *name* for the parser,
-- which is used in error messages
takeWhileP :: Maybe String
    -> (Char -> Bool) -- the predicate to satisfy
    -> Parser [Char] -- the list of parsed chars

parseInteger :: Parser Int
parseInteger = do
    -- takeWhile1P parses *one* or more copies;
    -- takeWhileP parses zero or more
    digits <- takeWhile1P (Just "integer") isDigit
    pure (read digits)
```

Say we want to match with one of multiple options. We can achieve this using `Alternative`, another subclass of `Applicative`, which gives us the operator `(<|>)` and function `choice` which take the first successful result they find.

```hs
(<|>) :: Alternative f => f a -> f a -> f a
choice :: Alternative f => [f a] -> f a

fiveOrSix :: Parser Char
fiveOrSix = char '5' <|> char '6'

fiveOrSixOrSeven :: Parser Char
fiveOrSixOrSeven = choice [char '5', char '6', char '7']
```

Lastly, we have `try`. This combinator allows us to backtrack, in order to try a number of parsers in order until one is successful.

To run a parser, we can use any one of the below:

```hs
parse :: Parser a -- Your parser to run
    -> String -- A filename (can be empty)
    -> String -- The string to parse
    -> Either ParseErrorBundle a

parseTest :: Show a -- [result must be printable!]
    => Parser a -- Your parser to run
    -> String -- The string to parse
    -> IO () -- Prints the error or result

parseMaybe :: Parser a -- Your parser to run
    -> String -- The string to parse
    -> Maybe a -- Discards all errors
```