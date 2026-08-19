A quick check that Haskell code blocks render with syntax highlighting. The example below uses `foldr` from the standard library.

```hs
foldr :: Foldable t => (a -> b -> b) -> b -> t a -> b
foldr f z [] = z
foldr f z (x:xs) = f x (foldr f z xs)
```