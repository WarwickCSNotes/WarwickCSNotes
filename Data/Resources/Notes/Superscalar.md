+++
title = "6 - Superscalar Architectures"
+++

We've just looked at pipelining, which makes sure we're using as much of the CPU as we possibly can at any time. We've also come to realise that doing this presents some hazards as we may come into resource conflicts, issues with branching, or possibly execute code in the wrong order. These all assume we have one ALU, CU, etc... why not have multiple ALUs, CUs and so on? Well, this is exactly what superscalar architecture does! Note that this is different from a multicore architecture, where separate code runs on each core. *A superscalar architecture is still only capable of running one process on a single core.*

Most importantly, superscalar architecture lets us fetch multiple instructions at once, and expands our pipeline so that we can have more than one instruction being fetched, decoded or executed. The number of instructions we can fetch at once is called the **degree** of superscalar architecture, shown as $\sigma$, e.g. 2 or 4. This may differ from the **issue rate**, which describes how many instructions are typically being fetched at once. The **issue window** refers to the hardware which allows multiple instructions to be fetched and allocated.

## More tables

Let's have another example pipeline model: instruction fetch (IF), decode (DR), execute (EX) and write (WB), in this order, so this is a four-stage pipeline ($s=4$). We'll also assume no funny business with differences in time between stages. In a normal, linear pipeline, we may be able to execute four ($N$) instructions in seven cycles, but what about superscalar, with just a degree ($\sigma$) of two?

|Stage| 1| 2| 3| 4| 5| 6|
|-----|--|--|--|--|--|--|
|  IF1| A| B|  |  |  |  |
|  IF2| C| D|  |  |  |  |
|  DR1|  | A| B|  |  |  |
|  DR2|  | C| D|  |  |  |
|  EX1|  |  | A| B|  |  |
|  EX2|  |  | C| D|  |  |
|  WB1|  |  |  | A| B|  |
|  WB2|  |  |  | C| D|  |

Now we only need five cycles! *Keep in mind though*, this can only happen when our four instructions are **aligned**, meaning we are actually able to fetch two instructions right away. In this case, the number of cycles taken to run $N$ instructions on a $s$-stage pipeline using $\sigma$-degree superscalar is:

$s + \frac{N}{\sigma} - 1 \Rightarrow 4 + \frac{4}{2} - 1 = 5$

But what does it mean for instructions to be **unaligned**? Well, this happens when we're unable to fetch two instructions to begin with. This may be because of a stall or hazard, or simply due to how the program is written, like with vectorisation. When we are working with unaligned instructions, the chance of instructions being aligned at any given point is $\frac{1}{\sigma}$. So, we have two components which make up the time taken: the portion of code that did get aligned, and the portion that didn't:

$\frac{1}{\sigma}(s + \frac{N}{\sigma} - 1) + (1 - \frac{1}{\sigma})(s + \frac{N}{\sigma}) = s + \frac{N - 1}{\sigma}$

$\Rightarrow 4 + \frac{4-1}{2} = 5.5$

Which *basically* works out with the resulting table (rounding up of course).

|Stage| 1| 2| 3| 4| 5| 6|
|-----|--|--|--|--|--|--|
|  IF1| -| B| D|  |  |  |
|  IF2| A| C| -|  |  |  |
|  DR1|  | -| B| D|  |  |
|  DR2|  | A| C| -|  |  |
|  EX1|  |  | -| B| D|  |
|  EX2|  |  | A| C| -|  |
|  WB1|  |  |  | -| B| D|
|  WB2|  |  |  | A| C| -|

## Back to the marking of the benches

So now we have the formula for finding the execution time of a set instructions, we can find the **cycles per instruction (CPI)** using the following:

$\frac{s + \frac{N - 1}{\sigma}}{N} = \frac{1}{\sigma} + \frac{1}{N}(s - \frac{1}{\sigma})$

And then, to find the speedup compared to a **scalar** processor,

$S = \frac{s + N -1}{s + \frac{N - 1}{\sigma}} = \frac{\sigma(s + N -1)}{\sigma s + N - 1}$

As we increase the number of instructions we're running, the speedup becomes limited by $\sigma$, so our degree of superscalar becomes the bottleneck. However, if we increase our degree of superscalar, then speedup is limited by the structure of the pipeline, namely $1 + \frac{N-1}{s}$.

This relationship between $\sigma$ and speedup starts as being linear, but then plateaus off once we reach the level of inherent parallelism in the program, i.e. how much of the program we can actually calculate in parallel. This is usually between 2 and 4, so in our processor design, we don't want to have too many execution units, as this makes the chip more expensive, at diminishing returns.

## Reaching great limits

Superscalar inherits similar issues as pipelining, although they're slightly different, since superscalar architecture itself can fix problems with linear pipelining.

- **Data Dependency** - Two nearby instructions access the same memory location, meaning they could be ran out-of-order, causing the latter instruction to stall in order to preserve correctness.
- **Procedural Dependency** - Refers to both issues with branching and variable-length instructions.
  - Branches may mean we've fetched data we don't actually need, and after computing the branch, we need to instead fetch from a new address. This can be a big problem if we've fetched a lot of instructions. Superscalar architectures use branch prediction for this very reason.
  - Variable-length instructions can stall decoding or execution, creating a ripple effect on the rest of execution.
- **Resource Conflicts** - Two or more instructions attempt to access the same memory location, bus, cache or functional unit at the same time. These cause stalls, like data dependency, but can be mitigated with duplicate resources and hardware changes.

As we said above, every program has its own level of **instruction level parallelism (ILP)** that can be performed: only so much of a program can be parallelised on a processor without affecting its output and correctness. Likewise, the architecture of our system has its own amount of instruction level parallelism that it can achieve, the **machine parallelism**. Ideally we are able to balance both.

## The skill of issue

*Not the other way around*

Identifying ILP isn't a trivial task, as we need to analyse the incoming code to make sure we don't accidentally change the order of a sequential task. We also are yet to address the all-important question of *"How do we know which instructions to execute at the same time?"*. Well first, stop calling it executing and start calling it **issuing**, as this term describes the act of sending instructions into our pipeline. The **Instruction Issue Policy** describes how we do this.

Consider the two following programs:

```asm
ADDIU r1, r2, r3
MUL   r4, r1, 2
ADDIU r5, r4, r6
```

```asm
ADDIU r1, r2, r3
ADDIU r4, r1, 1
ADDIU r5, r1, 2
```

For our first program, this would mathematically look like this:

$r_1 = r_2 + r_3, r_4 = r_1 \times 2, r_5 = r_4 + r_6 \Rightarrow r_5 = 2(r_2 + r_3) + r_6$

So swapping these around or letting any instructions run at the same time could change the expression, which we of course don't want.

However, for our second program, the second and third lines *can be swapped without changing the functionality*. Hence, we can issue these two instructions in any order we like. Things like this may be happening in a more complex way as well, for instance we may be using multiple registers to calculate two values in parallel, allowing us to, well, parallelise this.

Ultimately, we want to consider three types of ordering when we look ahead at what instructions to parallelise: Order of fetching, order of execution and order of updates in memory locations. The processor is free to swap around the order of instructions in order to better facilitate parallelism, so long as the correct output is maintained, however this is why some older algorithms have stopped working in the modern day, as newer processors do accidentally swap the wrong instructions!

### Order up!

We can issue instructions in three ways:

- **In-order issue, in-order completion** - Basically what we've already been looking at, issue in the order of the program, then do not swap this order within the pipeline. Usually not considered nowadays, but this is useful as a baseline.
  - If there's a resource conflict, instructions will stall.
- **In-order issue, out-of-order completion** - Issue in the same order as the program, *but* allow the processor to swap instruction steps, e.g. let I1 execute before I2, but let I2 write to memory before I1. This has better performance when instructions take multiple cycles.
  - Data hazards still need to be avoided, such as WAWs, also called output dependencies.
- **Out-of-order issue, out-of-order completion** - Allow issuing and execution to disobey the order given by the program, requiring us to further split decoding of instructions from their execution. This bypasses the problem of in-order issuing, as if there is a dependency, we can issue other, independent instructions without having to wait for the dependency to be resolved.
  - May suffer from WARs, also called anti-dependencies, where a value *must* be read before being written to, to preserve correctness.

## Anita Schauweur

*And so do you!*

So, now we know that when we start issuing and/or executing instructions out of order, we introduce output dependencies and anti-dependencies, which can alter our results. But let's have a look at another program with such dependencies...


```asm
1: ADD r1, r2, 7
2: MUL r1, r3, 12
3: ADD r5, r4, 8
4: STO r4, 33
```

So instructions 1 and 2 have a WAW dependency, and 3 and 4 have a WAR dependency. But here's a question for you, *what's stopping us from using more registers?* Often, our code is written to reuse the same registers over and over again, but this is more often to leave space open to use other registers, rather than the need to use the same value frequently. So, we could always do this instead:

```asm
1: ADD hw1, hw2, 7
2: MUL hw6, hw3, 12
3: ADD hw5, hw4, 8
4: STO hw7, 33
```

Now we can execute these instructions in any order we want to! But why have we changed "r" to "hw"? Well, this is how **register renaming** works. The *logical* addresses in the code are dynamically translated with additional hardware into *hardware addresses* that we can use later. Of course, we still need to be mindful of how each register is used, e.g. a register is written to and then read from several instructions later, hence why we use additional hardware for this allocation. This essentially eliminates the problem of anti-dependencies and output dependencies.

### Stepping on twigs

We've previously talked about issues when encountering branches, and these can be exacerbated in superscalar architecture. One solution we've mentioned is *prefetching* the branch target, alongside the next sequential instruction, so surely this would work great for superscalar, since we're able to work on multiple instructions at one? Not really. A branch could be in a completely different memory location, and/or drastically change what happens in our code, so we may still end up with useless instructions, and we will typically get a two-cycle delay. We clearly need to do more.

What about the *delayed branch* strategy? This doesn't really work either, since although we always fetch the next instruction we need, we still need to do work in the delay slot we made, which can be quite big for superscalar, and we can't quite be sure if this work is useful until *after* we calculate the result of the branch.

The solution then, is to use **branch prediction**. We may use static prediction, which prefers branches based on what "generally" happens, or use dynamic prediction, which uses execution history to determine if a branch will be used.

But branch prediction isn't a perfect solution, so some processors may use *speculative execution*, which executes both branches, before knowing which one is needed. Of course, this does need an abundance of resources, but this can heavily reduce stalls and dead time in the pipeline.