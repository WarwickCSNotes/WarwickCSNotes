# Semigroups & Monoids
> This note covers content from lecture 17

## Semigroups

Very simply, a semigroup is a type wherein any two values of that type can be combined with a binary operator, `(<>)`.

```hs
class Semigroup a where
    (<>) :: a -> a -> a
```

There is only one rule that applies to `(<>)`: it must be **associative**; `a <> (b <> c)` must be equivalent to `(a <> b) <> c`. That's basically all there is to know...

```hs
-- The semigroup operation on lists is (++)
>>> [1,2,3] <> [4,5,6]
>>> [1,2,3] ++ [4,5,6]
>>> [1,2,3,4,5,6]

-- A definition of Semigroup on Maybe
instance Semigroup a => Semigroup (Maybe a) where
    Nothing <> Nothing = Nothing
    Just x <> Nothing = Just x
    Nothing <> Just y = Just y
    Just x <> Just y = Just (x <> y)
    -- Notice this last bit depends on `a` also being a semigroup 
```

## Monoids

`Monoid` is a subtype of `Semigroup`, which defines a value `mempty`.
```hs
class Semigroup a => Monoid a where
    mempty :: a
```
`mempty` is essentially an empty value, constrained by the laws:
```hs
x <> mempty === x
mempty <> x === x
```

For example, for lists the value of `mempty` would be `[]`, as `l ++ [] === l`.

```hs
-- From Data.Monoid
newtype Product a = Product { getProduct :: a }

instance Num a => Semigroup (Product a) where
    Product x <> Product y = Product (x * y)
instance Num a => Monoid (Product a) where
    mempty = Product 1

class Foldable t where
    -- foldl, foldr, foldl', ..., and:
    -- Function to map values in t, and combine them monoidally
    foldMap :: Monoid m => (a -> m) -> t a -> m
    foldMap f = foldr (\x acc -> f x <> acc) mempty
    -- So we end up with (f x1) <> (f x2) <> ... <> (f xn)
```