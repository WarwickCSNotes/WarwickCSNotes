+++
title = "7 - Parallel Processing"
+++

They say two minds are better than one, the more the merrier, and many hands make light work. Somewhere along the line, we hit a plateau in making processors physically faster, and so decided to switch to essentially, increasing the number of processors that we fit into one package. Nowadays it's common for CPUs to have at least four **cores**, which are essentially just independent processors all in the same physical space.

Let's go back to Flynn's taxonomy. We're done toying around with SISD processors (i.e. do one thing on one bit of data), so now we're going to focus on Single Instruction on Multiple Data Streams (SIMD), and Multiple Instructions on Multiple Data Streams (MIMD). These have their own distinct technologies that let us do more in the same space of time.

## (semi-)Ambidexterity

We'll look at SIMD first, or cases where we run the same logical instruction, over different pieces of data. This is the type of parallelism leveraged by **Array Processors** and **Vector Processors**, and uses a single control unit to perform the same operation over separate other units, such as ALUs, or possibly one big one. If you think about how often we run loops over arrays, it makes sense to carry out instructions in this way to cut down on time.

**Array Processors** work by performing the same step of execution on multiple data pieces at the same time. That's to say, we may have four parallel ALUs, for example, all performing the same mathematical function on multiple data entries. This is contrasted with **Very Long Instruction Words (VLIW)**, which pack multiple, independent instructions on the same word, which the processor then splits into four separate operations carried out, well, independently.

**Vector Processors** work by performing the same step in the same general location, but performing operations in consecutive time, similar to pipelining. This overall achieves the same goal, in a different amount of time. Vector instructions are usually much easier to perform than pipelines however, since vectors by definition, have no interdependencies, meaning there isn't a single correct order in which to process elements. Vector processing as such then, allows us to reduce memory bandwidth, works well with *memory interlacing*, and reduces our need for expensive loops. Note that vector operations work best on contiguous sequences of data, rather than that which needs to be accessed in random order. 

> In all honestly, in the DuckDuckGo search I just performed, this difference *isn't that big*. Often Vector and Array Processors are considered basically the same thing: <https://en.wikipedia.org/wiki/Vector_processor>
>
> Modern processors exploit techniques from both pools. For the rest of this bit, we'll mainly talk about vector processors.

When we use vector processing, also called vectorisation, we need to make use of special **vector registers** which have the appropriate space to handle multiple M-bit wide values. The maximum number of these M-bit values that a vector register can handle is determined by N. Processors will have control registers, often called VLEN, which gives N, and VMASK, which selects some $n \leq N$ value to work on. At a **vector functional unit**, such unit uses a *deep pipeline*, which means that this functional unit itself has a pipeline, allowing us to pass multiple pieces of data through at once: the unit isn't atomic and has split its function into smaller steps to allow this.

Of course, all of this means that we need to load and store multiple data elements that are stored in contiguous blocks, and this is done by using a base address, with some **stride length** which splits each element by a constant amount. If we're able to fetch an element in one clock cycle, this means we can fetch, increment the stride, and fetch, but usually, this isn't possible, so we instead use *interleaved memory* to fetch from multiple *banks*, so that we do more work per cycle.

Vector processing is also very register-forward, which means we immediately store the results of operations in close-by registers, rather than immediately committing it to memory: we do that when we explicitly choose to store our values back into a data structure. But there's of course some latency in storing the results of an operation into a register, then dumping said vector into another functional unit. **Vector chaining** fixes this by simply bypassing the registers, and passing the output of an operation immediately to another functional unit.

Vector processing is ubiquitous nowadays, the biggest examples being Intel's AVX and MMX instruction sets, which you'll have used in the coursework!

## nVidia, f*** you!

*I like Linus Torvalds.*

You've likely heard of **Graphics Processing Units (GPUs)** before. They basically have the same function as the CPU, processing data, but they use a different approach, wherein instead of having multiple processors which operate on independent logic, we have multiple cores operate over the same instruction. This enables us to play games with beautiful and vibrant graphics, process thousands of pieces of data in a much shorter amount of time and uh... create soulless AI horrors even beyond the imagination of Lovecraft. Support real, human artists, I beg you!

GPUs enable us multithreading, SIMD and MIMD processing, making them very flexible, but there's significant challenge in figuring out how to leverage them, as we need to communicate over a different interface, usually PCIe instead of a native CPU socket. GPU programming also means we need to ensure we are timing our processing correctly, sharing data between main memory and the GPU's memory appropriately. Nvidia uses the **Compute Unified Device Architecture (CUDA)** programming language to help with this, as well as OpenCL to enable the use of custom languages and drivers. Nvidia enables parallelism using **CUDA threads**, so we don't use parallelised instructions, instead we create threads.

### The fabric of ~~reality~~ sadness

GPUs will usually parallelise instructions by running the same set of instructions in at the same time, on different data, such as multiplying values from two arrays together, storing the result in a third array. Each of these is a *thread* of execution, and a cluster of these threads running in parallel is called a **warp**: think of warps as an overarching process, which is allocated a set of threads to use. In essence, warps are a hardware implementation of SIMD instructions: they aren't visible to the programmer. This comes together in the paradigm of **Same Instruction, Multiple Threads (SIMT)**, and we will discuss shortly how programmers can leverage this. 

### Coming Together

When a set of threads are working on the same instruction, they are fed into the relevant functional unit(s) which have a deep pipeline, just like with a vector processor. The main difference is, each thread has its own set of registers, which we need for each one to be independent. Nvidia handles this by using *shader cores* or similarly, which each have a series of pipelines, which share a program counter, instruction cache and decoding unit. A CUDA core has one pipeline. These cores are connected to memory (independent from system memory) which stores data for each warp (and hence, the thread data).

Each of these CUDA cores (also called **Streaming Processors (SP)**) will then form part of a **streaming multiprocessor (SM)**. Since at this stage, we're working with dozens of cores, some additional hardware to allocate warps is used, including warp schedulers and dispatchers. It's possible for a scheduler to swap threads around, since it doesn't matter what order operations are carried out in (at least, that should be the case with the code we run!).

> Example: The RTX 5090 has 21,760 CUDA cores, and 170 streaming multiprocessors. That's 128 separate threads per multiprocessor! All for the low, low MSRP of $2,000. Good fucking luck finding one at that price though.
>
> Source: <https://www.techpowerup.com/gpu-specs/geforce-rtx-5090.c4216>

### Cotton Cubes

The programmer can leverage these multiprocessors by placing threads into **thread blocks** and **thread grids**, where each block is uniquely identifiable, assigned to one SM, and acts independently. It's not possible to synchronise threads as such, but some inter-block communication is possible by using memory operations. A grid is used to represent a collection of blocks belonging to the same kernel (aka program), which allows the blocks to be collected properly once execution finishes. The use of blocks means we can dynamically assign execution between multiple SMs, which is useful when we have multiple programs we want to run, and enables scalability in hardware devices, which may each have different numbers of SMs or SPs per SM.

### Delay? What delay?

Some instructions may take a longer time to execute, this may be because they fetch more data from memory, for example. If we were running a program sequentially, or even all on the same SM, then we'd be able to notice this quite clearly, but if we're just waiting on some other part of the GPU and not actually doing any processing... why not do something else in the meantime? Well, that's what **Fine-grained Multithreading (FGMT)** achieves, by scheduling threads with a *round-robin* approach. This gives the effect of **latency hiding**, since we achieve a more consistent throughput of data by doing this: fewer stalls are apparent.

### And what about branches?

It's possible to run branch instructions on GPUs too, by simply processing the same data over multiple threads, then deactivating the threads on the branch that is no longer needed. This prevents any costly stalls that would otherwise be needed, as we fetch a new set of instructions to allocate to blocks from grids, causing a mess.