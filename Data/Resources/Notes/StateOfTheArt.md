+++
title = "A - State of the Art Architecture"
+++

*Uh oh, we're using hexadecimal values now!*

We now know some of the advancements made in the past to make computers run as fast as we possibly can, but what does the future of hardware design look like? We answer that question here, by looking at some emerging technologies. Many people believe we are coming to the end of Moore's law, as we have consistently fell behind the predicted transistor count on leading CPUs: the reality is, you can only pack things so closely until you start reaching atomic limits and things start getting unstable. Furthermore, on multicore architectures, only a small percentage of cores can operate at the full frequency at any given time, those that can't are known as *dark silicon*. So how else can we improve performance?

## Heterogeneity! (Again!)

*Does anyone else fancy some white wine right about now?*

We are seeing more and more examples of **specialisation** in computers, which means we delegate tasks to different types of processors which are optimised for that specific task, instead of offloading all work to the CPU. Just imagine trying to run graphics fully on a CPU nowadays! This does mean we lose flexibility in the types of workloads we can run, but we can make these special processors all the more efficient as a trade-off. Using specialisation, we can remove unnecessary parts of CPUs, dedicating more space to useful hardware now that it has been delegated elsewhere, on which we may use different forms of parallelism best-suited to a certain application.

**Domain-Specific Architectures** are such specialised processors. They are designed, from the ground up, to run a specific type of workload, such as graphics processing, with a GPU or neural computing, with an NPU. Each of these can be independently optimised, given its own memory hierarchy and use its own domain-specific programming language/interface to properly cater to its use case.

## Systolic Architectures

We've previously worked on the notion of having a processing unit which works on some data, then sends the result to memory, then gets it back to do more work. What if we just pass the output to some other processing unit? This is the basis of **Systolic Architecture**, where homogenous processing units or "nodes" in an array are connected together, and can share data in a well-orchestrated way, reducing the need to fetch from memory so often. These arrays can be non-linear and multidimensional, so this allows for all sorts of possibilities, such as performing convolution, an important part of image processing and machine learning. Each node performs some simple function on a piece of data, then passes it along to another node, before it can be returned back to memory.

Again, this reduces the number of accesses from memory, which may be relatively costly, and allow for *incredible* levels of concurrency, but any parallelism will need to be at least a bit regular: this still doesn't work well on irregular parallelism, plus these architectures are special-purpose: it's infeasible to use a systolic architecture for a CPU.

## Dumb Memory? Hey, we all make mistakes.

We are processing more and more data in parallel in every microsecond to this day. It's getting to the point where it's not just overwhelming to people like you and me, it's also overwhelming the machines! In fact, it was found that across consumer workloads at Google, over 60% of energy was spent moving data to-and-from memory. What if we didn't have to move that data when performing simple instructions? Well, whaddya know, some people have tried this! There are a few solutions, including In-memory copying, RowClone, UPMEM and DRAM Processing Units.

**UPMEM** - A memory solution using the standard DIMM format and DDR4 technology, which includes lots of data processing units inside memory chips.

**DRAM Processing Units** - Newer types of RAM modules which include simple processors, that use an in-order pipeline, and can even be multithreaded with up to 24 threads!

## \*CLANK\* \*CLANK\* \*CLANK\*

Of any type of cyber security vulnerability, a hardware vulnerability is by far the scariest of them all, as it's un-patchable: you need to redesign the hardware from the ground up! One example of this is **RowHammer**, which can be described as "like breaking into an apartment by repeatedly slamming a neighbour's door until the vibrations open the door you were after". It works by overloading memory with reads and writes, leading to predictable bit flips, creating errors and making systems unstable and compromised. *This is terrifying!* But this has been around since 2012, so serious efforts have been made to prevent RowHammer from being effective.

But why did this even happen? Well, we were making memory too compact! There comes a point where memory cells are put so close together, that electricity passed to one cell may accidentally trigger another. So, if we force lots of current into the same cells, we can almost guarantee that we will affect neighbouring cells, even if we're not supposed to change them. This has led to a few different exploits, such as compromising of Android phones, gaining root privileges from website visitors, and RAM dumps. We can mitigate RowHammer by developing better RAM chips, using more frequent refreshes (this is DRAM after all), and use error-checking code (ECC). Lots of servers use ECC memory.

## Aw, my ice cream...

Here's another scary hardware vulnerability for you: imagine being able to have your personal data and security compromised, even though you've done nothing wrong, and your programs are completely secure. That's what **Meltdown** and **Spectre** can do, as they exploit **speculative execution**, something we've briefly touched on, where processors will run code ahead of time, for use on branch statements. The thing with this is, the results of unneeded branches are still stored in cache, so an attacker, with sophisticated tools, can extract this data. This is invisible to the developer, so it's not possible to use a software patch.

Meltdown works by selecting a portion of memory that's inaccessible to the attacker. This is sent into cache, then a register, and some instruction will access this cache location to perform work on it. The attacker then uses a side channel attack, called Flush+Reload, which highlights this cache line, exposing the hidden memory location. Fortunately, this has been patched for all CPUs made after 2018

## Open Sesame

**Open Architectures** mix computer hardware and the concept of open-sourcing. What results is, a huge collaborative effort, from paid entities, academics and volunteers to create an architecture. This naturally means the architecture will be secure, as if someone discovers a vulnerability, they can immediately swoop in and fix it: unlike proprietary architectures,, where it has to be employees of a company who fix it.

Examples of these include RISC-V, an extendible instruction set which is intended to be used in SoCs, and Nvidia's Deep Learning Accelerator.

When one door closes, another opens. Moore's Law may be dead, but open architectures promise a world of possibilities: there are many opportunities to make computers harder to hack, better at data processing, faster, and stronger in helping humanity. (work is never over)