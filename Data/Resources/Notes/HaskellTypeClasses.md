# Type Classes

> This note covers lecture 7 (2026)

In Haskell, a type class describes operations that can be performed on certain types of data. When a given data type `t` is part of type class `C`, all of the operations that are available on `C` are naturally also defined and available on `t`. They are analogous to interfaces in Object-Oriented languages like Java.

Say we have a polymorphic type
```hs
a -> a
```
In the above, `a` could be any type. However, if we have
```hs
Num a => a -> a
```
Now `a` must be a type which is a part of the `Num` type class. This new type of polymorphism is called **ad-hoc polymorphism**.

## Defining Type Classes
Below we see some examples of common type classes, along with their implementations.
```hs
-- Eq defines the operator (==)
class Eq a where
    (==) :: a -> a -> Bool

-- The above implicitly creates the function
-- (==) :: (Eq a) => a -> a -> Bool

-- Ord defines a number of comparison functions and operators. 
-- A subset are shown below
class Ord a where
    (>)  :: a -> a -> Bool
    (>=) :: a -> a -> Bool
    ...
```

## Implementing Type Classes
`instance` is used to declare that a type is a member of a given class, and the behaviour of the functions in that class on said type.
```hs
instance Eq Bool where
    True    == True     = True
    False   == False    = True
    _       == _        = False
```

## Using Type Classes

Suppose we want to implement the function $r(x, y) = x^2 + y^2$, and we'd like to write it to be applicable as generally as possible. Suppose we write.
```hs
r :: a -> a -> a
r x y = x ^ 2 + y ^ 2
```
This makes no sense. Suppose we passed two strings to r: the type variable `a` can match `String`, but the operators `(^)` and `(+)` aren't defined on `String` - yielding an error. Now suppose we write...
```hs
r :: Int -> Int -> Int
r x y = x ^ 2 + y ^ 2
```
Better, this _will_ work for all possible inputs - but what's wrong with floating point numbers as arguments to $r$? The true most general solution is to restrict type variable `a` in the first example to a type class where operators `(^)` and `(+)` are both defined, namely `Num`.
```hs
r :: (Num a) => a -> a -> a
r x y = x ^ 2 + y ^ 2
```
Another example to demonstrate the use of _multiple type class constraints_.
```hs
bothSame :: (Eq a, Eq b) => (a, b) -> (a, b) -> Bool
bothSame (p, q) (r, s) = p == r && q == s
```

## Some Useful Type Classes

Class       | What is it? 
------------|------------
`Num`       | Numeric, defines `(+)`, `(-)`, `(*)`
`Eq`        | Comparable for equality, defines `(==)`
`Ord`       | Total order, defines `(>)`, `(<)`, `(>=)`, ...
`Show`      | Defines `show`, to convert a value to a string
`Read`      | Defines `read`, to convert a string to a value
`Integral`  | Integer-like values, defines `div` and `mod`
`Floating`  | Float-like values, defines `(/)`
`Enum`      | Enumerable

> ### Enums
> An enumerable type is one in which is values are sequentially ordered. Below is **part** of the definition:
> ```hs
> class Enum a where
>    succ :: a -> a -- The next value in sequence
>    pred :: a -> a -- The last value in sequence
>    -- These map each value from and to a number.
>    -- The details of this mapping differ by implementation
>    toEnum :: Int -> a
>    fromEnum :: a -> Int
>    -- Given the first, second, and last element, this 
>    -- generates the range of values, each going up by 
>    -- the implied step. Basically, generalised range syntax!
>    enumFromThenTo :: a -> a -> a -> [a]
> ```
> A useful note is that range syntax (`[a [, b] .. c]`) is syntactic sugar for `enumFromThenTo`

## Polymorphic Instances

```hs
class Show a where
    show :: a -> String

-- Let's define an instance of Show for pairs where the 
-- elements are also instances of Show (so we can invoke 
-- show on them)
instance (Show a, Show b) => Show (a,b) where
    show (x,y) = "(" ++ show x ++ "," ++ show y ++ ")"
```