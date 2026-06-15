# Folding
> The note covers content from lectures 11, 13, and 14 (2026)

`foldr` is a function which allows us to collapse a list down to a single value.

```hs
foldr :: (a -> b -> b) -> b -> [a] -> b
foldr f s []     = s
foldr f s (x:xs) = f x (foldr f s xs)
```

Using the above function, with function $f$, a starting value $s$, and list $a_1, a_2, a_3, ..., a_n$, we'll obtain...

$$f(a_1, f(a_2, f(..., f(a_n, s))...))$$

```hs
-- Sum of all numbers in a list
sum :: Num a => [a] -> a
sum = foldr (+) 0

>>> sum [1,2,3]
>>> sum (1 : 2 : 3 : [])
>>> foldr (+) 0 (1 : 2 : 3 : [])
>>> 1 + (foldr (+) 0 (2 : 3 : []))
>>> 1 + (2 + (foldr (+) 0 (3 : [])))
>>> 1 + (2 + (3 + (foldr (+) 0 [])))
>>> 1 + (2 + (3 + 0))
>>> 1 + (2 + 3)
>>> 1 + 5
>>> 6
```


The `r` at the end of `foldr` is to indicate that it is **right associative**, meaning that expressions are evaluated from right to left. **Left associativity** does the opposite: evaluation from left to right.

```hs
a ~ b ~ c ~ d

-- left associativity
((a ~ b) ~ c) ~ d

-- right associativity
a ~ (b ~ (c ~ d))
```

```hs
foldl :: (b -> a -> b) -> b -> [a] -> b
foldl f z [] = z
foldl f z (x:xs) = foldl f (f z x) xs

-- Product of all numbers in a list
prod :: Num a => [a] -> a
prod = foldl (*) 1

>>> prod [1 .. 5]
>>> prod [1,2,3,4,5]
>>> prod (1 : 2 : 3 : 4 : 5 : [])
>>> foldl (*) 1 (1 : 2 : 3 : 4 : 5 : [])
>>> foldl (*) (1 * 1) (2 : 3 : 4 : 5 : [])
>>> foldl (*) ((1 * 1) * 2) (3 : 4 : 5 : [])
>>> foldl (*) (((1 * 1) * 2) * 3) (4 : 5 : [])
>>> foldl (*) ((((1 * 1) * 2) * 3) * 4) (5 : [])
>>> foldl (*) (((((1 * 1) * 2) * 3) * 4) * 5) []
>>> (((((1 * 1) * 2) * 3) * 4) * 5)
>>> ((((1 * 2) * 3) * 4) * 5)
>>> (((2 * 3) * 4) * 5)
>>> ((6 * 4) * 5)
>>> (24 * 5)
>>> 120
```

> In addition to associativity, operators in Haskell have the notion of precedence (from 0 to 9), with highest precedence evaluating first.
> * Function application has precedence 10, so it's always done first
> * Exponentiation has a higher precedence than Multiplication, which has a higher precedence than addition or subtraction (BIDMAS)
> 
> When we define a new operator, we can define its natural associativity and precedence as below:
> ```hs
> infix[l/r] [precedence] [operator]
> ```

There's very little difference between `foldr` and `foldl` that might make you choose one over the other; **however**, `Data.List` (in `base`) provides us with a function `foldl'` which, unlike the above example, _evaluates the function as we go along_. Fully evaluating the value we're passing onwards (the accumulator) means that we use O(1) memory to complete the fold!

```hs
-- Product of all numbers in a list
prod :: Num a => [a] -> a
prod = foldl' (*) 1

>>> prod [1 .. 5]
>>> prod [1,2,3,4,5]
>>> prod (1 : 2 : 3 : 4 : 5 : [])
>>> foldl' (*) 1 (1 : 2 : 3 : 4 : 5 : [])
>>> foldl' (*) 1 (2 : 3 : 4 : 5 : [])
>>> foldl' (*) 2 (3 : 4 : 5 : [])
>>> foldl' (*) 6 (4 : 5 : [])
>>> foldl' (*) 24 (5 : [])
>>> foldl' (*) 120 []
>>> 120
```

> ## Combinators
> A combinator is a sort of higher-order function which combines its arguments together. It is a function which can only refer to its own arguments, and **cannot use any other expressions at all**.
> 
> ```hs
> -- ($) : The function application combinator
> ($) :: (a -> b) -> a -> b
> f $ x = f x
> 
> -- ($) has precedence 0, and is right associative, so we can use it in place of brackets
> 
> times32 :: Num a => a -> a
> times32 x = double $ double $ double $ double $ double x
> -- is equivalent to:
> times32 x = double (double (double (double (double x))))
> 
> -- (.) : The function composition combinator
> (.) :: (b -> c) -> (a -> b) -> a -> c
> g . f = \x -> g (f x)
> 
> quadruple = double . double
> 
> -- infixr 9 .
> ```

## Foldable Types
The `Foldable` type class is used to implement folds over structures other than Haskell's simple lists.

```hs
class Foldable t where
    foldr :: (a -> b -> b) -> b -> t a -> b
    ...
```

Suppose we wanted to define a binary tree structure, and fold over it.
```hs
data BinTree a = Empty | Node a (BinTree a) (BinTree a)

instance Foldable BinTree where
    foldr f z Empty = z
    foldr f z Node (x l r) = 
        let
            -- Fold the right side (foldr --> "right-to-left")
            r1 = foldr f z r
            -- Fold in the value at this node
            r2 = f x r1
            -- Fold the left side
            r3 = foldr f r2 l
        in r3
    ...
```