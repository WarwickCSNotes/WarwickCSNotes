+++
title = "9 - Multithreading and Multicore Systems"
+++

We already mentioned how multicore systems are ubiquitous nowadays, here we look into systems other than SMP, and discuss multithreading, which you may already be somewhat familiar with, after studying [CS241](/resources/cs241/os3-threads).

## Threading the needle

As a reminder, a **thread** represents a line of execution. A thread exists in a process, and has its own register values, program counter value and heap memory, although a process may hold more than one thread for concurrent execution. A **thread switch** is the process of swapping in different threads on the same processor, within the same process. We can quite easily allocate threads on a per-core basis known as **Chip multiprocessing**, but how about processing multiple threads on the same core?

**Hardware multithreading** lets us run multiple threads on the same core, concurrently, and this allows us to increase latency tolerance (i.e. doing useful stuff while waiting on something else), enable better throughput and utilisation, and reduce the penalty of a context switch (changing between processes on the same core), but this requires additional hardware implementation, and can hurt single-threaded performance.

### How fine do you grind your coffee?

There are three types of hardware multithreading: Fine-grained, Coarse-grained and Simultaneous.

**Fine-grained multithreading** swaps threads on a cycle-by-cycle process. So, if on each cycle we're processing a single stage of a pipeline, we're processing a different thread on each functional unit. We don't need to check for dependencies or predict branches, plus we can "fill in" bubbles with other thread data if we have a stall. Depending on the number of stages in our pipeline, and the number of threads we run at once over a single core, this can have the further side effect of greatly reducing the number of hazards in our pipeline too! Of course, this does require additional hardware, namely registers, which may cause resource contention. We may also still have dependency checking between threads taking place, which is redundant.

**Coarse-grained multithreading** swaps threads if the current one in execution has stalled (due to a cache miss for example), or on some other event such as a timeout. This results in better single-threaded performance over fine-grained, but overall tends to be slower, and additional complexity is added, since we need to capture the pipeline state of each thread, before we load in a new thread. Finer-grained threading is usually preferred, as this gives the programmer more flexibility in parallelising a program.

**Symmetric Multithreading (SMT)** exploits a superscalar processor (has with multiple functional units, remember?) by issuing instructions from multiple threads at the same time, and using dynamic allocation. This way, thread-level parallelism is used for latency hiding, so that we can almost always be doing useful work, even if something has stalled. Dynamic Scheduling and Register Renaming are used to handle potential dependencies and ensure output is correct. This allows multiple threads to execute simultaneously, as does chip multiprocessing.

## Double the fun

Somewhere along the line, just clocking processors faster and faster led to diminishing returns in performance, so we soon switched to creating multicore systems. Components were also (and kinda still are) getting smaller and smaller, meaning we could fit more logic or storage in the same die size. In fact, Pollack's rule dictates that performance is proportional to the square root of the die area that we use:

$\text{Performance} \propto \sqrt{\text{die area}}$

So, if we doubled the logic in a processing core, we can expect about a 41% increase in performance. *Multicore architecture can give us close to linear increase in performance*, hence why there is significant reason to invest in this architecture! Again though, we need to build software that takes advantage of this.

Multicore performance is usually dependent on three factors: the number of cores we have, the number of levels of cache we have, and how big these caches are. We typically have a per-processor level one instruction and data cache, and we may have a level two cache either per-core, shared on all cores, or external to the die. If we have per-core level 2 cache, we may additionally have a shared L3 cache. Having shared cache is very useful, as it reduces cache misses, confines the problem of cache coherency and enables faster inter-process communication.

We can also mix multicore architecture and symmetric multithreading, and this is done on basically all modern processors today. Just look at any CPU you'd go and buy, and you'll constantly see mentions of **hyperthreading**. This is just SMT wrapped up in marketing fluff, and allows for two threads to run simultaneously per core. That is why, when you look at specifications, you'll see the number of cores on a CPU, with double the number in brackets: this means your CPU has hyperthreading.

## Heterogeneity!

*Vinegar leg is where again?*

Your CPU may also have *integrated graphics* on it. This is the basic idea behind **heterogeneous system architecture**, where we have different types of core on the same physical die, usually CPU cores and GPU cores, although now we're starting to see increasing inclusion of NPUs (Neural Processing Units, for better or for worse...). These cores are usually connected using an interconnect on the chip, enabling all cores the same access to some block(s) of virtual memory space, allowing programmers to access the best of both worlds in parallel and serial execution.

## NUMA NUMA

*mya hee, mya hoo, mya ha, mya ha ha!*

Most systems use Uniform Memory Access (UMA), where each processor core can access memory in the same amount of time, and in the same way. This all seems fine, but this can only scale up so far, until you have too many cores competing for memory access. We could use a cluster, but we might not always want to do this. **Non-Uniform Memory Access (NUMA)** allows for processors to have non-uniform access times to memory by splitting memory into different locations: each core may have its own local memory which it can access very quickly, but to access another core's memory (aka, remote memory), which is in the same address space, it may have to wait longer. **Cache-coherent NUMA** is a variant with some additional cache coherence measures, which use directory-based protocols (snoopy protocols are infeasible on larger scale systems).

This can allow us to easily add even more cores to our system, achieving higher levels of parallelism than symmetric multiprocessing, all without needing drastic changes to software unlike clusters (see below). This being said, it is possible that we break up performance too much, as programs get fractured among remote memory. This also means that NUMA is not fully transparent: how is performance affected if an OS's page file is stuck in remote memory? How do we allocate processes? Lastly, if a portion of the system fails, this can disrupt performance noticably: we knock out some processing units *and* memory.

## And with that clusterf*** of information...

**Clusters** are an alternative to the usual SMP, as they allow for execution of instructions across multiple computer systems, connected using high-speed links. Each computer is called a node, and clusters are very useful in high-performance computing applications, so a server cluster for scientific simulations is very common. So were GPU clusters when people decided that JPEGs were somehow more valuable than food and shelter... and their eyes. Clusters can scale very easily, whilst also allowing for greater reliability and better price-to-performance: why fork out lots of money on a very expensive, single CPU when you can buy multiple for less, with comparable performance?

Blimey, I think I might be seeing double after all of that talk about parallel computing... You should take breaks, remember that, unlike your computer, sometimes you do need to slow down and take things one step at a time.