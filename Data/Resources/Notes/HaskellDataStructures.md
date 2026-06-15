# Data Structures in Haskell

> This note covers content from lectures 9, 12, 13, and 15 (2026)

## Making your own data types

We can use the `data` keyword to define a type. This definition has a name, followed by a series of _constructors_.

```hs
-- An example without arguments
data Bool = False | True

-- An example with arguments
data Shape 
    = Circle Float Float Float 
    | Rectangle Float Float Float Float

-- Let's define a function that uses our Shape type
-- We can use constructors for pattern matching
area :: Shape -> Float
area (Circle _ _ r     ) = 3.14 * r * r
area (Rectangle _ _ w h) = w * h

-- Let's define an instance of show for type Shape
instance Show Shape where
    show (Circle x y r) = "A circle, centred at (" 
        ++ show x ++ ", " ++ show y 
        ++ "), radius " ++ show r
    show (Rectangle x y w h) = "A rectangle, located at (" 
        ++ show x ++ ", " ++ show y 
        ++ "), dimensions " ++ show w ++ " x " ++ show h
```

Our definition of `Shape` above brings two new functions into scope: 

```hs
Circle      :: Float -> Float -> Float -> Shape
Rectangle   :: Float -> Float -> Float -> Float -> Shape
```

## Polymorphic Data Types

Polymorphic data types allow us to parameterise our constructors with any data type we like. An example from Prelude is `Maybe`

```hs
data Maybe a = Nothing | Just a

-- Brings into scope...
Nothing :: Maybe a
Just :: a -> Maybe a
```

### Maybe
Maybe is an important type in Haskell. It means either we have a value of type `a`, or we don't - representing the absence of a value.
As an example of how we can use this, suppose we wanted to create **complete** versions of the functions `head` and `tail` (so if the list is empty, we receive `Nothing` rather than an error).
```hs
safeHead :: [a] -> Maybe a
safeHead [] = Nothing
safeHead (x:xs) = Just x

safeTail :: [a] -> Maybe a
safeTail [] = Nothing
safeTail (x:xs) = Just xs
```
In Prelude, the function I've called `safeHead` is called `listToMaybe`. The whole point of this is that we can use `Maybe` to **wrap possibly unsafe functions** - writing code that's much less likely to suddenly fail.
 
Another useful function is `readMaybe` (from `Text.Read` in `base`). This is a version of `read` which attempts to parse the input to a value, returning `Nothing` if it fails
```hs
readMaybe :: Read a => String -> Maybe a

>>> readMaybe "NaN" :: Maybe Int
>>> Nothing

>>> readMaybe "6" :: Maybe Int
>>> Just 6
```

> ### Derived Instances
> In the interest of preventing bloated, formulaic instantiations for type classes like `Show`, `Read`, `Eq` etc, Haskell includes the `deriving` keyword, providing us with a simple stock implementation of these type classes
> ```hs
> data Shape 
>         = Circle Float Float Float 
>         | Rectangle Float Float Float Float 
>     deriving (Show, Read, Eq)
> ```

> ## Cardinality
> The cardinality of a data type is the number of values it can take (the size of the set containing all values of that type).
> ```hs
> data Unit = Unit                              -- cardinality 1
> data Bool = False | True                      -- cardinality 2
> data ThreeBools = ThreeBools Bool Bool Bool   -- cardinality 8
> ```
> We refer to the values of a type as inhabitants

## Either

`Either` is a type that can represent 2 different types, using two separate constructors: `Left` and `Right`.

```hs
data Either a b = Left a | Right b

>>> :t Left "Hello" -- :t in GHCi gives us the type of a value
>>> Either String b
```

## newtype

`newtype` is a keyword we can use in place of `data` when defining data types with **exactly 1 constructors**, with **exactly 1 parameter**. The difference between these two is entirely internal: once the constructor validates, the compiler will erase any metadata that using `data` would have include - there will be no difference at all between the wrapper typ ena the type that it wraps. This serves to make the resulting program that bit more _efficient_.

> A common usage of `newtype` is to re-define type class implementations. For instance...
> 
> ```hs
> newtype Backwards = Backwards String
>     deriving (Eq, Ord)
> 
> instance Show Backwards where
>     show (Backwards s) = show $ reverse s
> ```

## type

The `type` keyword simply gives an alias (a **type synonym**) to another type.
```hs
type String = [Char] -- The definition of String in Prelude
type MMMM a = Maybe (Maybe (Maybe (Maybe a))) -- Type synonyms can also be polymorphic
```

## Records

Record syntax is an alternative way to define your own compound data structures, and will seem vary familiar to those with a background in object-oriented programming.

```hs
data Student = Student
    { firstName :: String
    , lastName :: String
    , preferredName :: Maybe String
    , dateOfBirth :: Day
    , enrolledModules :: [Module]
    }
```

Like the aforementioned uses of `data`, the type has a name and one or more constructors. _Unlike_ the aforementioned uses of `data`, we are then able to specify the name of each field.

> Record syntax is **syntactic sugar** for standard `data` types.

The above definition also brings new functions into scope, to access each field.

```hs
firstName :: Student -> String
lastName :: Student -> String
preferredName :: Student -> Maybe String
dateOfBirth :: Student -> Day
enrolledModules :: Student -> [Module]
```

```hs
-- Defining a new student
alex :: Student
alex = Student
    { firstName = "Alexander"
    , lastName = "Dixon"
    , preferredName = Just "Alex"
    , dateOfBirth = read "1994-12-10"
    , enrolledModules = [cs141]
    }

-- Accessing the fields
instance Show Student where
    show (Student f l _ d _) = show f ++ " " ++ show l ++ ", born " ++ show d

-- Accessing the fields via functions
fullName :: Student -> String
fullName s = firstName s ++ " " ++ lastName s

-- Modifying records
updatePreferredName :: String -> Student -> Student
updatePreferredName pn s = s { preferredName = Just pn }
```