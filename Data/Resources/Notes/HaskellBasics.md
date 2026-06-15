# Basics of Haskell

> This note covers lectures 2 - 6 (2026).

---

## Anatomy of a Haskell file

A `.hs` file is called a module, and starts with...

```hs
module MySuperCoolProgram where
...
```

Each module's name must be capitalised, and the name in the file must match the file name (so the above sample must be stored in `MySuperCoolProgram.hs`).

Modules can imported by other modules, to make the definitions available in a different file.

```hs
module MySuperCoolProgram where

import MySuperCoolHelperModule

...
```

Underneath the import statements, we'll be writing our functions. **The order of expressions in Haskell programs has no affect on the functioning of the program.**

---

## Anatomy of a Function

Unlike C-like languages, Haskell functions are invoked without parenthesise.

```haskell
-- Returns "Yes :)" if the given number is even, and "No :(" otherwise
isItEven x = if even x then "Yes :)" else "No :("
```

### Lambda Functions
Borrowed from lambda calculus, lambda functions is a sort of anonymous function (analogous to `() => {...}` is JavaScript)

```hs
-- This function is equivalent to the definition above
isItEven = \x -> if even x then "Yes :)" else "No :("
```
 
> An example from the lecture notes:
> ```hs
> foo = (\n -> n * n) 8
> ```
> This is saying "foo is the result of applying the function `(\n -> n * n)` to the value `8`". Thus, foo evaluates to 8 * 8 = 64.

### Partial Function Application

Partial function application is the idea that providing a function with only _some_ of its arguments yields a new function, that accepts only the arguments yet to be passed.

```hs
min = \x -> \y -> if x < y then x else y
g = min 5
-- The function g could be expressed as : g y = min 5 y

>>> g 3
>>> 3

>>> g 6
>>> 5
```

### Operators

Unlike standard functions, which are _prefix_ (identifier, then arguments), operators are _infix_ (one argument, then the identifier, and then a second argument).
```hs
-- Definition of a max operator 
x ^^^ y = max x y
-- Operators, like functions, can be partially applied
-- (^) is the power operator 
square = (^ 2)
-- We can even leave operators fully unapplied...
power = (^)
-- and use the names of binary functions as operators, using backticks 
-- (I can't show it properly here but trust)
z = 10 `mod` 3 -- z = 1 
```

### Pattern Matching & Guards

Pattern matching allows us to more easily to specify the result of functions depending on the nature of the input. Guards are a similar, but more powerful construct: like a piecewise function is mathematics, each guard has a boolean expression - with the first true expression being that which executes.

```hs
-- The following code snippets for the nth term of 
-- the fibonacci sequence are equivalent

-- 1. if ... then ... else ...
fib x = if x == 0 || x == 1 
    then 1 
    else fib (x - 1) + fib (x - 2)

-- 2. case .. of ...
fib x = case x of
    0 -> 1
    1 -> 1
    n -> fib (n - 1) + fib (n - 2)

-- 3. pattern matching
fib 0 = 1
fib 1 = 1
fib n = fib (n - 1) + fib (n - 2)

-- NB: The order here **does** matter 
-- (the first pattern to match the input is invoked)

-- 4. guards (note the lack of =)
fib x 
    | x < 2     = 1
    | otherwise = fib (x - 1) + fib (x - 2) 
    -- default branch, always evaluates to True
```

> ## Syntactic Sugar
> Haskell has a lot of features that allow the developer to express the same thing in many different ways. These features are known as syntactic sugar - and are converted by the compiler (de-sugared) into the version it best understands. For example...
> * Standard functions de-sugar to lambda functions: `f x = ...` --> `f = \x -> ...`
> * Pattern matching functions are converted to `case .. of ...` statements
> * Guards de-sugar to `if .. then ... else ...` statements

---

## Types

Like any language, Haskell features data types; however, _unlike_ many other languages, the developer doesn't always have to specify them - thanks to GHC's type inference system.

```hs
-- this has type Char
ex = 'x'
-- this has type String
greeting = "Hello, world!"
-- this has type Bool
someBoolean = True && False || True
-- this has type Integer
five = min 5 6
```

> Concrete types always start with an uppercase letter, to distinguish them from functions and expressions

### Type Declaration

We can declare the type of an expression above its definition.

```hs
-- This expression is of type Integer
five :: Integer
five = 5

-- This expression is a function, which takes two Bool values, 
-- and returns a Bool value
xor :: Bool -> Bool -> Bool
xor x y 
  | x == y    = False
  | otherwise = True
```

> Once GHC is satisfied that your program's types all fit together correctly, the data types are **erased**. That means it's no longer carrying around that information, however that also means that it's impossible to check types at run time.

### Polymorphism

Some functions can be used on many different data types. For instance...
```hs
id x = x
```
In these cases, we can refer to the unknown type of the arguments with type variables.
```hs
id :: a -> a
id x = x

ignoreSecondArgument :: a -> b -> a
ignoreSecondArgument = \x -> \y -> x
```
This pattern is known as **parametric polymorphism** (we will see further types of polymorphism in later notes).

---

## Tuples & Lists

### Tuples

A tuple, borrowed from set theory, is a sequence of known, finite length (its _dimension_).

```hs
(5, "Hello") :: (Int, String)

(True, -1, False, 'c') :: (Bool, Int, Bool, Char)

(5, (6, 7)) :: (Int, (Int, Int))

() :: ()
```

The unit tuple, `()`, of dimension 0, is not very interesting now, but _will be_ later in the module. _Patience..._

> Below are a few useful functions on tuples from `base`, the Haskell standard library.
> ```hs
> -- Swap the elements of a pair
> swap :: (a, b) -> (b, a)
> swap (x, y) = (y, x)
> 
> -- Select the first elements of a pair
> fst :: (a, b) -> a
> fst = \(x, y) -> x -- lambda syntax also works with tuples :)
> 
> -- Select the second elements of a pair
> -- This is NOT in Prelude, but is in base
> -- It can be imported from Data.Tuple
> snd :: (a, b) -> b
> snd (x, y) = y
> ```

### Lists

All lists in Haskell are built from two simple constructors:
```hs
-- The empty list
[] :: [a]
-- Cons, an operator to add an element to the FRONT of a list
(:) :: a -> [a] -> [a]
```

Note the polymorphic type `[a]`, representing a list of elements, all of type `a`. The main differentiator between lists and tuples in Haskell is:
* Tuples are of a _fixed length_, and a _separate type can apply to each element_
* Lists can be of _unlimited length_, but _all elements are of the same type_ (homogeneous)

Whilst the above constructors are the fundamental operators, a more natural way of writing lists exists, which is **syntactic sugar** on top of `(:)` and `[]`

```hs
[1, 2, 3] :: [Int]
--- This de-sugars to... ---
1 : (2 : (3 : [])) :: [Int]
```

When working with lists, we can pattern match using the **head** (the first element of the list), and the **tail** (the rest of the list).

```hs
head :: [a] -> a
head (x:xs) = x

tail :: [a] -> [a]
tail (x:xs) = xs
```

> The above functions are what we in the business call **partial functions** - in we were to invoke them on an empty list, we'd get an error. A partial function is one that are **only well-defined for a subset of possible arguments**.

Some additional Prelude functions on lists include...

```hs
-- take n l returns in first n elements of list l
-- An implementation is below
take :: Int -> [a] -> [a]
take 0 l = []
take n (x:xs) = x : take (n-1) xs

-- drop n l returns the list with the first n elements removed
drop :: Int -> [a] -> [a]
drop 0 l = l
drop n (x:xs) = drop (n-1) xs

-- splitAt n l returns a pair: the first element being 
-- the first n elements, and the second being the rest
splitAt :: Int -> [a] -> ([a], [a])
splitAt n l = (take n l, drop n l)

-- (++) is an operator to merge two lists
>>> [1, 2, 3] ++ [4, 5, 6]
>>> [1, 2, 3, 4, 5, 6]

(++) :: [a] -> [a] -> [a]
(++) []     l = l
(++) (x:xs) l = x : (xs ++ l)
```

> The reason we always deal with elements at the start of the list first is that Haskell lists are implemented as **singly-linked lists** (see CS126). You should consider this when trying to write efficient list-handling code.

---

## Currying

This is more of an aside. When we have a function  taking multiple arguments

```hs
f :: a -> b -> c
```

Haskell considers it the arrows to be bracketed from the right.

```hs
f :: a -> (b -> c)
```

This makes sense if you think about partial application of functions: in the above case, when we pass the first argument, we obtain a new function / value of type `b -> c`; when we then pass another, we end up with just the value of type `c`.

Currying is the process of converting a function that **takes all its arguments at once**, into a function that **takes its arguments one at a time** - allowing for partial application. Haskell functions are, as we've seen, _curried by default_.

There are two functions in Prelude that convert a function that operates on two arguments into one that operates on a pair, and vice versa.

```hs
-- Convert a 2-argument function into one that take a pair
uncurry :: (a -> b -> c) -> ((a, b) -> c)
uncurry f = \(x, y) -> f x y
-- tl;dr return a function that takes the tuple, then feeds both elements into our original function

-- The opposite operation: A pair to 2 separate arguments
curry :: ((a, b) -> c) -> (a -> b -> c)
curry f = \x -> \y -> f (x, y)
-- tl;dr return a function that takes both arguments individually, then feeds them into our original function

-- An example
>>> (uncurry mod) (69, 7)
>>> 6
```

---

## List Comprehensions

List comprehension allows us to compute lists by iterating over other lists. For instance, to obtain all numbers $x^2$, where $x \in \{ 1, 2, 3 \}$...

```hs
>>> [ x^2 | x <- [1, 2, 3] ]
>>> [1, 4, 9]
```

To decompose:
* `x <- [1, 2, 3]` is called the _generator_, and gives us our elements
* `x^2` is the expressions we're computing for each element

We can have more than one generator, which gives us the cartesian product (the generators are evaluated left-to-right, see below)

```hs
>>> [ (x, y) | x <- [1, 2, 3], y <- ['a', 'b', 'c'] ] :: [(Int, Char)]
>>> [
        (1, 'a'), (1, 'b'), (1, 'c'),
        (2, 'a'), (2, 'b'), (2, 'c')
        (3, 'a'), (3, 'b'), (3, 'c')
    ]
```

We can filter out elements in the list that don't satisfy a given condition using a **guard** (unhelpfully named the same as another feature we covered earlier).

```hs
>>> [ x | x <- [0..], odd x ]
>>> [1, 3, 5, 7, 9, 11, ... ]

>>> [ (x,y) | x <- [1..5], y <- [1..5], x + y == 6 ]
>>> [ (1, 5), (2, 4), (3, 3), (4, 2), (5, 1) ]
```

## Map & Filter

```hs
-- map applies a function f to every element of a list l
map :: (a -> b) -> [a] -> [b]
map f []     = []
map f (x:xs) = f x : map f xs

-- filter removes all elements that don't meet a given condition 
-- (expressed as a function)
filter :: (a -> Bool) -> [a] -> [a]
filter f []     = []
filter f (x:xs) = if f x then x : filter f xs else filter f xs

-- Some examples

evenNumbers = filter even [1..] -- [2, 4, 6,  8, 10, ...]
squareNumbers = map (^ 2) [1..] -- [1, 4, 9, 16, 25, ...]
```

## Ranges & Infinite Lists

`[x [, y] .. z]` represents a list where
* The first element is `x`
* The second element is `y`, if present, which sets the _step size_
* The last element is _at most_ `z`

```hs
>>> [1 .. 10]
>>> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

>>> [1, 3 .. 10]
>>> [1, 3, 5, 7, 9]

>>> ['a', 'c' .. 'z']
>>> "acegikmoqsuwy"
```

As you've no doubt noticed, we can use this notation to define lists that go on **FOREVER!!!** This is a advantage provided by Haskell's natural laziness: if it attempted to evaluate an infinite structure as soon as it was defined, our program wouldn't make it very far...

```hs
evenNumbers = [2, 4, ..]
```