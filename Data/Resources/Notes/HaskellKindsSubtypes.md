# Kinds and Subtypes
> This note covers lecture 16 (2026)

## Kinds

A type's kind basically describes its _shape_. Types that take no parameters (aren't polymorphic) are of kind `*` (pronounced _type_)

```hs
-- These below are just types
Bool :: *
String :: *

-- Maybe is a type constructor: it takes a type as argument, and returns a type
Maybe :: * -> *
Maybe Int :: *

-- Remember, Either describes types that could be one of two types
Either :: * -> * -> *
Either Int :: * -> *
Either Int Bool :: *

-- So `Maybe Either` would raise an error: 
-- the compiler is expecting a type of kind `*`, but gets a type with kind `* -> * -> *`
```

## Subtypes

A subtype is a type where every member of that type must also be a member of some other type. For instance

```hs
class Eq a => Ord a where
    ...
```

In this example from Prelude, all types of class `Ord` must also be of class `Eq`.