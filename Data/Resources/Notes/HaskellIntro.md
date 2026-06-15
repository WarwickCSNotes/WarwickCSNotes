# Introduction to Haskell

> This note covers lecture 1 (2026).

This note is here mostly to give some background, and for completeness (since these notes are designed to align with the existing lecture notes).

## What is Functional Programming?

Haskell is a **purely functional** programming language. Most languages you will have encountered are _imperative_ - they are executed step-by-step, from top to bottom, and change state over the course of their execution by altering program memory using named variables. In Haskell, instead of defining how something is _done_, you instead define what it _is_. The factorial of a number is the product of all the numbers from 1 to that number, the sum of a list of numbers is the first number plus the sum of all the other numbers, and so on - and these are expressed in the form of functions.

Another feature of Haskell is it's **laziness**. Unless specifically told otherwise, Haskell won't execute functions, compute expressions, or really do anything until you actually ask for the result. While this sort of sloth is frowned upon in students, in Haskell it gives us new abilities, such as infinite data structures (e.g. `[1, 2, ..]` to represent the list of all natural numbers).

Lastly, Haskell is **statically typed**. When you try to compile a Haskell program, the compiler knows what's a number, what's a string, and so on - and will whinge at you if you use them improperly. It also has a very clever type inference system - so unlike languages like C, you don't need to label each variable with a data type.

## Features of Functional Languages

Some key features of functional programming as a paradigm.

* **Pure Functions**: Functions have no side effects. Since there's no state to change (more on that later), functions will always produce the same output for the same input.
* **Recursion**: A design pattern you're no doubt familiar with by now, recursion is the practise of defining functions in terms of themselves - handling smaller and smaller inputs until reaching the most simple input, the base case, preventing it from looping into infinity. Since there aren't any loops in Haskell (well, I say that, but that's a topic for _much_ later), you'll become intimately familiar with this design pattern over the course of this module.
* **Referential Transparency**: Because Haskell functions are pure, we can swap out a function call with its result without affecting the functionality of your program. This is to say, the result of the function doesn't change any global state, nor does it depend on any hidden, changing state. This is an easy enough claim to verify: as we've already covered, Haskell programs don't really have any state to begin with.
* **First-Class Functions**: In Haskell, functions are treated as first-class citizens - they are treated the same as data. This means, among other things, we can pass them to, or return them from, other functions (known as _Higher-Order Functions_).
* **Immutability**: Once a variable is initialised, they cannot be modified; if we want to use it to derive new values, we'll need to define a new one.

A number of these features can be boiled down to one simple statement: **Haskell does not have state** - what you get out is derived solely on what you put in.
