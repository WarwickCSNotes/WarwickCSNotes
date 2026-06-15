# Functors, Applicatives, and Monads
> The note covers content from lectures 13, 19, 20, 21, and 22 (2026)

---

## Functors

A `Functor` is a data type that allows us to apply a function across every value in its structure. It is essentially a generalising of `map`, to be used not just over lists but any data structure we like.

```hs
class Functor f where
    fmap :: (a -> b) -> f a -> f b
```

As an example, recall our definition of `BinTree` (Folding).

```hs
data BinTree a = Empty | Node a (BinTree a) (BinTree a)

instance Functor BinTree where
    fmap _ Empty = Empty
    fmap f (Node x l r) = Node (f x) (fmap f l) (fmap f r)
```

### Functor Laws

While there's _technically_ nothing stopping you from making your `Functor` implementations whatever you like, there are 3 'laws' that legal functors ought to follow:
1. Functors should be **structure-preserving**: essentially, what comes out should be the same shape as what went in.
2. The **identity law**: `forall x: fmap id x === x`
3. The **distributivity law**: `forall f,g,x: fmap (f.g) x === (fmap f . fmap g) x`
    * Applying `f.g` over all elements of `x` should be the same as applying `g` over all elements, and _then_ `f`

> `fmap` has it's own operator, `<$>`!
> ```hs
> (<$>) :: Functor f -> (a -> b) -> f a -> b
> 
> >>> (+1) <$> [2,3,4]
> >>> [3,4,5]
> ```

> ### Lifted Values
> A **lifted** value is one that **exists within a functor**. An **unlifted / plain** value is one that does not.

---

## Applicatives 

**Applicatives**, or Applicative Functors to be precise, are a subclass of Functors - providing us with two new functions.

```hs
class Functor f => Applicative f where
    pure :: a -> f a
    (<*>) :: f (a -> b) -> f a -> f b
```

`pure` allows us to lift a value into our functor, and `(<*>)` is an operator to apply a lifted _function_ to a lifted value - obtaining a (naturally) lifted result. `(<*>)` differs from `(<$>)` only in that, when using `(<*>)`, the function must have been lifted into the functor as well - not just the argument.

```hs
-- Maybe is an Applicative
>>> Just (\x -> x * x) <*> Just 6
>>> Just 36

>>> Just (\x -> x * x) <*> Nothing
>>> Nothing
```

### Applicative Laws
1. **Identity**: `pure id <*> v === v`
2. **Homomorphism**: `pure f <*> pure x === pure (f x)`
3. **Interchange**: `u <*> pure y === pure ($ y) <*> u`
4. **Composition**: `pure (.) <*> u <*> v <*> w === u <*> (v <*> w)`

```hs
instance Applicative Maybe where
    -- pure :: a -> Maybe a
    pure x = Just x
    -- (<*>) :: Maybe (a -> b) -> Maybe a -> Maybe b
    Nothing <*> _ = Nothing
    _ <*> Nothing = Nothing
    Just f <*> Just x = Just (f x)
```

---

## Monads

```hs
class Applicative m => Monad m where
    (>>=) :: m a -> (a -> m b) -> m b
    ...
```

`Monad` is a subclass of `Applicative`, which gives us one last operator, `(>>=)` (pronounced 'bind'), which defines what to do if we want to pass a lifted value into a function that returns a lifted value - allowing us to pass the value down a chain.

> There is also `(>>)`, which discards the previous value.

```hs
-- From Prelude...
instance Monad Maybe where
    
    -- If we try to pass Nothing into our Maybe function,
    -- then give up and return Nothing overall
    Nothing >>= f = Nothing
    
    -- Otherwise, take the value from the Just
    -- and pass it into f
    Just x >>= f = f x

(//) :: Float -> Float -> Maybe Float
x // 0 = Nothing
x // y = Just (x / y)

divdiv :: Float -> Float -> Float -> Maybe Float -- x/(y/z)
divdiv x y z = (y // z) >>= (x //)
```

> With the family of `Functor`, `Applicative`, and `Monad`, we can compose long computations from smaller ones that make use of _the same surrounding data type_.

### Monad Laws

1. **Left Identity**: `pure x >>= f === f x`
2. **Right Identity**: `m >>= pure === m`
3. **Associativity**: `(m >>= f) >>= g = m >>= (\x -> f x >>= g)`

---

## Common Monads

### Either

`Either` is used to encapsulate computations which have failure values (`Left`) and success values (`Right`)

```hs
-- Functor, Applicative, and Monad all expect king * -> *
-- Thus, we need to partially apply Either when creating our instances

instance Functor (Either e) where
    -- Only applies f to values on the right side
    -- fmap :: (a -> b) -> Either e a -> Either e b
    fmap _ (Left x)  = Left x
    fmap f (Right y) = Right (f y)

instance Applicative (Either e) where
    -- Computations are initially successful, 
    -- so values are lifted into Right
    -- pure :: a -> Either e a
    pure = Right
    -- Applies f to the right side
    -- <*> :: Either e (a -> b) -> Either e a -> Either e b
    Left x <*> _ = Left x
    _ <*> Left y = Left y
    Right f <*> Right x = Right (f x)

instance Monad (Either e) where
    -- (>>=) :: Either e a -> (a -> Either e b) -> Either e b
    Left x  >>= f = Left x
    Right x >>= f = f x
```

### State

`State` is a wrapper around functions of the shape `s -> (a, s)`, computing a value as well as an additional value (the state) along the way. We'd like this state to be threaded through our composed computations.

```hs
newtype State s a = St { runState :: s -> (a, s) }

instance Functor (State s) where
    -- fmap :: (a -> b) -> State s a -> State s b
    -- Our new state will contain a new function which:
    -- 1. Runs the original function, func
    -- 2. Applies f to the value it returns
    fmap f (St func) = St $ \s -> 
        let (  x, s') = func s
        in  (f x, s')

instance Applicative (State s) where
    -- pure :: a -> State s a
    pure x = St (\s -> (x,s))
    
    -- (<*>) :: State s (a -> b) -> State s a -> State s b
    -- The new function will:
    -- 1. Run sf (the lifted function) on the given state
    -- 2. Use the new state to retrieve x from sx
    -- 3. Apply f to x
    -- Notice that the state is always threaded through to the next step
    St sf <*> St sx = St $
        \s -> let
            ( f, s' ) = sf s
            ( x, s'') = sx s'
        in (f x, s'')

instance Monad (State s) where
    -- (>>=) :: State s a -> (a -> State s b) -> State s b
    -- The new function:
    -- 1. Runs func on the given s, to obtain x :: a and new state s' :: s
    -- 2. Runs f x to get the new stateful function func' :: s -> (b, s)
    -- 3. Applies func' on s'
    St func >>= f = St $ 
        \s -> let
            (x, s') = func s
            St func' = f x
        in func' s'
```

`State` also provides us with some helper functions.

```hs
-- Grabs the value of the stateful component, 
-- and returns it as the main value
get :: State s s
get = St (\s -> (s,s))

-- Replaces the state with a new one
put :: s -> State s ()
put s' = St (\_ -> ( (), s' ))

-- Applies a function f to the state
modify :: (s -> s) -> State s ()
modify f = get >>= \val -> put (f val)

-- Example use
example_st :: State String Int
example_st = St $ \x -> (length x, x ++ ", World!")

>>> runState example_st "Hello"
>>> (5, "Hello, World!")

>>> runState (example_st >>= \x -> get) "Hello"
>>> ("Hello, World!", "Hello, World!")

>>> runState (example_st >>= \x -> put "A New String!") "Hello"
>>> ((), "A New String!")

>>> runState (example_st >>= \x -> modify (++ "!!!")) "Hello"
>>> ((),"Hello, World!!!!")
```

### IO

The most powerful monad in Haskell, `IO` is what allows Haskell programs to interact with the "Real World". It provides functions for input and output, including...

```hs
-- Get a line of text from standard input.
getLine :: IO String

-- Write a line of text to standard output.
putStrLn :: String -> IO ()
```

Up until now, we've only really been writing snippets of Haskell. If you want to write a full Haskell program, you'll need a `main :: IO ()` function for execution to begin from. This type signature means that `main` is a function that **exists within the IO monad**, and which **returns unit** (`()`, nothing).

> You can think of `()` as comparable to `void` or `null` in C-like languages.

---

## Do-Notation

The whole point of working with Monads is the ability to string together computations. Do-notation gives us a syntax to achieve this as cleanly as possible.

```hs
-- Suppose we have a random number generator
-- This take a Seed value, and returns a pseudorandom number, and a new Seed
gen :: Seed -> (Int, Seed)
gen = ... 

-- We could add 3 random numbers together like this...
add3 :: Seed -> (Int, Seed)
add3 seed = let
    (x, seed1) = gen seed
    (y, seed2) = gen seed1
    (z, seed3) = gen seed2
in (x + y + z, seed3)

-- Or, using the State monad, like this...
gen_st :: State Seed Int
gen_st = State gen

add3' :: State Seed Int
add3' =
    gen_st >>= \x ->
        gen_st >>= \y ->
            gen_st >>= \z ->
                pure $ x + y + z

-- Notice how this abstracts away the need to 
-- handle the Seed values ourselves

-- But now... WITH THE POWER OF DO-NOTATION...
add3' :: State Seed Int
add3' = do
    x <- gen_st
    y <- gen_st
    z <- gen_st
    pure $ x + y + z
```

In addition to `<-`, we also have `let`, which allows us to bind unlifted value to use later on.

```hs
-- Double the value of the stateful component.
doubleState :: State Int ()
doubleState = do
    x <- get
    let y = x * 2
    put y

-- The old equivalent to this would be...
doubleState :: State Int ()
doubleState = get >>= (\x -> (let y = x * 2 in put y))
```

An example of do-notation for the `IO` monad:

```hs
echo :: IO ()
echo = do
    x <- getLine
    putStrLn x
    echo
```