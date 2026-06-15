# Evaluation
> This note covers lecture 8 (2026)

This is something you're often asked to do in CS141 exams: evaluate statements. Or, more precisely, show how the compiler will evaluate a statement.

Recall that previously we said that Haskell (and functional programs at large) are **referentially transparent**, meaning that we can substitute a function for it's result / implementation with no side-effects.

An example...

```hs
fac :: Int -> Int
fac 0 = 1
fac n = n * fac (n-1)

>>> fac 3
>>> 3 * (fac 2)
>>> 3 * (2 * fac 1)
>>> 3 * (2 * (1 * fac 0))
>>> 3 * (2 * (1 * 1))
>>> 3 * (2 * 1)
>>> 3 * 2
>>> 6
```

Each step, we apply the highest precedence operation we can (function application, then BIDMAS, leftmost first).

Another example...

```hs
-- The product of all elements of a list
product :: (Num a) => [a] -> a
product []      = 1
product (x:xs)  = x * product xs

>>> product [1..7]
>>> product [1,2,3,4,5,6,7]
>>> 1 * product [2,3,4,5,6,7]
>>> 1 * (2 * product [3,4,5,6,7])
>>> 1 * (2 * (3 * product [4,5,6,7]))
>>> 1 * (2 * (3 * (4 * product [5,6,7])))
>>> 1 * (2 * (3 * (4 * (5 * product [6,7]))))
>>> 1 * (2 * (3 * (4 * (5 * (6 * product [7])))))
>>> 1 * (2 * (3 * (4 * (5 * (6 * (7 * product []))))))
>>> 1 * (2 * (3 * (4 * (5 * (6 * (7 * 1))))))
>>> 1 * (2 * (3 * (4 * (5 * (6 * 7)))))
>>> 1 * (2 * (3 * (4 * (5 * 42))))
>>> 1 * (2 * (3 * (4 * 210)))
>>> 1 * (2 * (3 * 840))
>>> 1 * (2 * 2520)
>>> 1 * 5040
>>> 5040
```

# Let and Where
`let ... in` and `where` are both ways of defining subexpressions within haskell functions. Factoring out certain computations can make our functions both easier to read and understand, and more efficient (if it prevents us from computing the same thing multiple times).

```hs

-- Alternative implementations of splitAt

splitAt :: Int -> [a] -> ([a], [a])
splitAt n xs = (ys, zs)
    where
        ys = take n xs
        zs = drop n xs


splitAt :: Int -> [a] -> ([a], [a])
splitAt n xs = 
    let
        ys = take n xs
        zs = drop n xs
    in (ys, zs)
```

Both of these implementations are equivalent; in fact, `where` is syntactic sugar for `let ... in`