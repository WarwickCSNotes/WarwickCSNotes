+++
title = "3 - Code Optimisation"
+++

One of the biggest questions we ask when writing code is *"How do we make it faster?"*, and usually we can answer that using information learnt in [CS260](/resources/cs260/), but we can usually add some, shall we say, *hardware specific* changes. We can optimise code, broadly using at least one of the three following methods:

- **Algorithmic** - Basically reducing our time or memory complexity, again, see CS260.
- **Code Refactoring** - Making minor changes to code, such that we're making better utilisation of resources.
- **Parallelisation** - Use vectorisation or multithreading.

We can also trust our compiler to perform some optimisations for us, mainly by using the `-O0`, `-O1`, `-O2` or `-O3` options (use the last one with care!). We can either use these at compile time, e.g. `gcc main.c -O2`, or by using **pragmas** in our C code:

```c
...
#pragma <optimisation> <options>
...
```

We should also consider potential dependencies between instructions we are using, as these could limit the level of **instruction-level parallelism** that we can achieve. For instance, take a look at the code below:

```c
int a = 5;
int b = a * 6;
```

This is an example of a **read-after-write** dependency, and depending on the rest of our code, we can't really change this without massive changes elsewhere.

## Going Loopy

We use loops in our code a lot, so there are some optimisations we can employ that directly target them, including interchange, blocking, fusion, fission, unrolling and pipelining, but first, we should talk about dependencies.

*We can't optimise loops if there are inter-loop dependencies*, as this inherits sequential behaviour, like with this array creating the fibonacci sequence:

```c
int n = 20;
int* fib = malloc(n * sizeof(int));
fib[0] = 0; fib[1] = 1;
for (int i=2; i<n; i++) {
    fib[i] = fib[i-1] + fib[i-2];
}
```

You can identify such dependencies by looking at each variable, checking that they are *only read from and never written to*. If so, there isn't a dependency on this variable. Otherwise, if a variable is written, will that same variable be read from later on? If so, then there is a dependency. Note that a "variable" means a single element in an array, not just the whole array itself.

**Pointer Aliasing**, where we use another variable to point to the same, or overlapping, points in memory, can also cause loop dependency, even if it isn't intended. For instance, by itself, `a[i] = b[i-1] + i` doesn't admit a dependency, but if we find earlier in the code, `b=a`, then this clearly becomes a dependency, as it's the same as `a[i] = a[i-1] + i`. If you don't plan on aliasing a variable, use the `restrict` keyword in C to aid your compiler, which may automatically optimise loops for you.

### No, that orange isn't speaking to you

**Loop unpeeling** removes loop dependencies where we rely on the same element across multiple iterations, like this:

```c
for (int i=0; i<n; i++) {
    a[i] = a[i] + a[0];
}
```

We know that `a[0]` gets set once only, but this code isn't optimisable because of the dependency *inside* the loop. It makes sense, then, to bring this iteration outside of the loop, hence *unpeeling* it.

```c
a[0] = a[0] + a[0]
for (int i=1; i<n; i++) {
    a[i] = a[i] + a[0];
}
```

### Running for the 12X

*Sorry, that's a Warwick Specific joke there...*

**Loop Interchange** is very simple, if we have a multidimensional array, it may be more efficient to change around the shape of the array, usually because of the structure of your cache. Let's say we have a cache that can store four integers on a cache line. Then the following code:

```c
for (int i=0; i<4; i++) {
    for (int j=0; j<5; j++) {
        a[i][j] = some_function(i,j);
    }
}
```

Won't run optimally, as it will try to load part of a sub-array of size 5, then fetching the rest in a second cycle. Instead, if our code permits, we should try this:

```c
// Assume we did some muddling about above...
for (int j=0; j<5; j++) {
    for (int i=0; i<4; i++) {
        a[i][j] = some_function(i,j);
    }
}
```

### Divide and Conquer returns...

**Loop blocking** is the process of splitting a multi-dimensional array into smaller *blocks* over some process, and combining the results. A good example of this is *matrix multiplication*, but to be honest, I din't feel like reading 100+ slides (if you have access to them you'll know what I mean).

### KABOOM!

*Wait no, that's nuclear fission.*

**Loop fusion and fission** are the acts of combining and separating loops respectively.


**Loop Fission**

```c
for (int i=0; i<n; i++) {
    a[i] *= 5;
}
for (int i=0; i<n; i++) {
    b[i] += 7;
}
```

**Loop Fusion**

```c
for (int i=0; i<n; i++) {
    a[i] *= 5;
    b[i] += 7;
}
```

### Wow, that loops like a fruit rollup

*No, that's not a spelling error.*

**Loop unrolling** is the process of performing multiple loop iterations, in one iteration of the loop itself. This basic concept is also useful for *vectorisation*, which we'll see shortly.

```c
for (int i=0; i<n; i++) {
    a[i] *= 5;
}
```

Let's unroll this loop by a factor of 4.

```c
int loopFactor = (n/4)*4;
for (int i=0; i<loopFactor; i+=4) {
    a[i] *= 5;
    a[i+1] *= 5;
    a[i+2] *= 5;
    a[i+3] *= 5;
}
// Cleanup loop, if n isn't a multiple of 4.
for (int i=loopFactor; i<n; i++) {
    a[i] *= 5;
}
```

### Silly Straws

**Loop Pipelining** is the process of taking multiple operations inside a loop, and refactoring the code, such that we initiate the next operation, before the current one ends. Maybe I'll put code for this later but it's Friday and I wanna play Mario kart right now. You shouldn't need to remember this optimisation tho.

## Double Down

There are two methods to parallelisation: vectorisation, and multithreading.

**Vectorisation** uses special registers which can store multiple data values at once, and uses *deep pipelines* to quickly process them simultaneously. We'll talk more about how this works later, for now we'll focus on a key implementation: SSE and AVX instructions, which are on x86 CPUs, i.e. Intel and AMD.

If we want to use vectorisation, we first need to unroll the loop we are using, then we can load a set of values into a vector, perform operations on them, and then store them back in an array. AVX lets us process four doubles points at once this way.

```c
__m128 vecA = _mm_load_ps(a + i);
__m128 vecB = _mm_load_ps(b + i);
__m128 vecC = _mm_add_ps(vecA, vecB);
_mm_store_ps(c + i, vecC);
```

**Multithreading** allows us to create multiple *threads* which can run across multiple processing cores, allowing us to process data more literally in parallel. Again, we will go into more detail about this later, plus this topic is covered in [CS241](/resources/cs241/os3-threads), but this focusses on POSIX threads (also called pthreads), whereas this module uses OpenMP to allow for multithreading (which is easier to use, but is also more restrictive).

```c
#pragma omp parallel for
for (int i=0; i<n; i++) {
    a[i] = (a[i] * 6) + 27;
}
```