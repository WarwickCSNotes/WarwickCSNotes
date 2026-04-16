+++
title = "1 - Memory"
+++

We know that, at a basic level, the CPU processes data and runs instructions, and the memory holds instructions that are to be ran by the CPU. In this section we look at how memory has been optimised to be as efficient as possible.

## Everything in its right place

We can define five types of memory: registers, cache, main memory, SSDs and magnetic media. In this order, these decrease in speed but additionally decrease in cost, i.e. at each level, the storage becomes slower to access, but becomes less expensive at higher capacities. For instance, a gigabyte of cache would be significantly more expensive than a gigabyte hard drive. To get the most out of our system, *we want to balance speed and cost*. In an ideal world, we would have infinite instant-access memory, but no such thing exists, so this **Memory Hierarchy** exists as a compromise.

- Registers
- Cache
- Main memory
- Solid State
- Magnetic Media

Having this hierarchy allows us to store information that will be accessed frequently. More specifically, it ensures we take advantage of **Temporal locality**, which states that the same memory location is likely to be accessed multiple times, and **Spatial locality**, which states that neighbouring locations are likely to be accessed within close time proximity. In fact, we can generally presume that 90% of memory access are within 2KB of the last access.

## Chrome has entered the chat

Yes, we're first talking about RAM. Or rather, **solid state devices**. This basically means anything that doesn't whir, click or spin. These devices are built up of many semiconductors, and come in the following flavours:

- **Random Access** (RAM) - Read-writable and volatile.
- **Read-only** (ROM) - As it says on the tin.
- **Programmable ROM** (PROM) - Like ROM, but written electrically, not via a mask.
- **Erasable PROM** (EPROM) - Can be rewritten all at once.
- **Electrically Erasable PROM** (EEPROM) - Can be rewritten at byte level.
- **Flash Memory** - Rewritable at block level.

### RAM it into the motherboard

You may have heard of RAM in different contexts, including SRAM, DRAM, DDR4, and so on. If you're thinking of sheep, you're in the wrong place. A memory cell can hold one bit of data, and has three lines: Read-Write, Select and Data. These each tell the cell to either report its value, or overwrite it, enable it to do these things, send out/receive the value respectively. **DRAM** uses a single transistor and capacitor for each cell, and needs to be refreshed periodically. This is why you may see a clock speed on this type of RAM. By contrast, **SRAM** uses two capacitors and four transistors to store a single bit, but does not need refreshing. As you can imagine, SRAM is the more expensive option of the two.

### Boxes of boxes

So, we have these memory cells. how do we divvy them up? Well, we can arrange them in a 2D grid, so that each row is called a *word*, and the number of columns is the *word size*. We then use some additional circuitry to allow us to fetch all of the values of a single row, by decoding an $N$ bit value to give us the value of one of $2^N$ words. $N$ is the number of **address** lines we are using. If we have word length $W$, then the number of memory cells we are storing is equal to $2^N \times W$. For example, if we have 4 address lines, and each word is 8 bits wide (1 byte), we are using 128 memory cells. We *could* alternatively use 7 address lines and have a word length of 1 bit, but then we need to use a decoder that takes in 7 address lines, which is not only quite awkward, but an inefficient use of space. We can further minimise the number of lines we need by using multiplexers, such that each row has multiple words, and we have some additional address lines which specify what word to output.

### A few offshore accounts

**Interleaved memory** is where we utilise multiple **banks** of memory in parallel, so data is split up across $N$ banks, meaning we can respond to $N$ data access at once. This is otherwise known as N-way interleaving. Interleaving is particularly effective when the number of receiving caches we have is a multiple of the number of banks we have.

### Why does everyone keep talking about rhythm games?

**SDRAM**, or Synchronous DRAM uses multiple banks of RAM, and exchanges data with the processor, using the timing of a clock signal close to that of the CPU. This essentially acts like a pipeline, since the CPU has to wait for a read/write to go through, hence SDRAM enables better utilisation of the memory overall. Each time, data is sent on the rising edge of each clock signal, known as **SDR**. But what if we also sent data on the falling edge? Well, congrats, you've just discovered **DDR** memory, which you'll have heard of if you've ever put together your own PC. Because we're now sending out double the rate of data, we use an additional **prefetch buffer** to hold it before we send it out. 

### What's with all this dynamic typing nowadays?

Okay great, so now we're up to date as to how DRAM is used, but where does SRAM fit into this? Remember that SRAM is more expensive than DRAM, but less complicated to work with, so we usually use SRAM in cache, which comes higher up on the memory hierarchy.

## How quickly are we forgiving and forgetting?

Having a hierarchy in place is good, but it can always be unbalanced, which can lower performance, give us low space to work with, or worst of all, drain our pockets unnecessarily. Keep in mind the following properties for cost, access time and capacity for each level $i$ and its parent.

- **Cost** - The parent is always cheaper per unit, i.e. $C_i > C_{i+1}$
- **Access time** - The parent is always slower, i.e. $t_{Ai} < t_{Ai + 1}$
- **Capacity** - The parent always has larger capacity, i.e. $S_i < S_{i+1}$

Performance is also dependent on the following factors:

- How are addresses being referenced? Lots of sequential accesses or random?
- How big is each block we move between levels?
- How do we allocate space? How does the algorithm swap out data?

### Average Cost

$C_S = \frac{C_1 S_1 + C_2 S_2}{C_1 + C_2}$

We aim to make $C_S$ approach $C_2$. Since we know that $C_1 > C_2$, we should use the fact $S_1 < S_2$.

### Hit me

Let $H < 1$ be the hit ratio. The average access time between two layers is:

$t_{average} = Ht_1 + (1 - H) (t_1 + t_2)$

### Access Efficiency

Let $r = \frac{t_2}{t_1}$, and access efficiency $e = \frac{t_1}{t_{average}}$

Hence $e = \frac{t_1}{1 + (1 - H)r}$

We aim to have $e$ approach 1, i.e. get as close to 100% efficiency as possible.

### Give me some space

Utilisation $u = \frac{S_u}{S}$

Where $S$ is total capacity, and $S_u$ is occupied memory. We want to ensure as much utilisation as possible, without increasing miss ratio.

Any 'wasted' space may be due to fragmentation, inactive regions of data that are never used by the CPU, and system overhead.

## All my memories, virtualised and contained on magnetic mediums

**Virtual Memory** is hard disk space being used as RAM. If you're the type to tinker around with Linux (firstly, we should hang together :3), you may have created a "Swap Partition" before, this is the same thing as virtual memory. This allows us to temporarily unload process data that we don't need in memory currently, letting us decouple applications from memory limits and simplifying the process of loading up a program into a, well, process. I'd suggest taking a quick look over the notes for [memory management in CS241](/resources/cs241/os7-memory), this is one of those moments where modules overlap in content (yippee).

### Mixed Management

Paging suffers from internal fragmentation, whereas segmentation can suffer from external fragmentation. Is it possible for us to leverage both types of management while preventing both types of fragmentation? Yes, this is called **Segmented Page Mapping**, where we split memory into variable-length segments, which each have their own number of pages: addresses are split by segment number, followed by page number, followed by page offset.

We can use either of segmentation, paging and segmented page mapping to manage virtual memory, just as we would do with main memory, although with segmented page mapping, we will be performing more physical memory accesses, as we have to lookup *both* a segment number and page number: we only need one or the other with the other two methods, meaning this is much slower.

### Tabular Performance

I'll assume you looked back over at the Translation Lookaside Buffer and Memory Management Unit sections in the CS241 content, as we'll now discuss more about how to improve the performance of virtual memory (which is also applicable to main memory).

Since a TLB is basically a form of cache, the equation for address translation time is comparable to that of average cache access time:

$t_t = t_{tlb} + (1 - H_{tlb})t_{mt}$

Where $t_{tlb}$ is the access time for the TLB, $H_{tlb}$ is its hit ratio, and $t_{mt}$ is the penalty incurred by a TLB miss, i.e. the requested table address is not in the buffer.

We've previously said that page size ($S_p$) can have a significant factor on how effectively we're using our memory/storage space, but we're yet to properly demonstrate this mathematically. Let's do this then, using $S_s$ to denote segment size, where a segment could represent a typical process, or average memory allocation. If $S_s > S_p$, then we have some "overhang" where, on average, a segment uses half of a page, plus however many other pages we fill completely, denoted by $\frac{S_s}{S_p}$. So, each segment has a memory overhead which looks like this:

$S = \frac{S_p}{2} + \frac{S_s}{S_p}$

Where $S$ gives us the total amount of memory used to add entries to the page table, and the wasted space from that overhang we mentioned. *This is additional space used to store $S_s$*.

$u = \frac{S_s}{S_s + S} = \frac{2S_sS_p}{S_p^2 + 2S_s(1 + S_p)}$

This tells us what proportion of memory used to store the segment, is actually of the segment itself, so we can determine if our page size is ensuring the minimum waste possible. So, we want to find what the optimal page size is, $S_p^{OPT}$, based on our segment size $S_s$. We'll use a bit of calculus (eek!) to help us out, and derive the equation of $S$ with respect to $S_p$, letting us see how changing the page size affects the overhead.

$\frac{dS}{dS_p} = \frac{1}{2} - \frac{S_s}{S_p^2}$

Since we want to minimise the overhead, we should find $S_p$ where $\frac{dS}{dS_p} = 0$. Hence we have...

$S_p^{OPT} = \sqrt{2S_s}$

And, we can use this to show what the optimum utilisation is!

$u^{OPT} = \frac{1}{1 + \sqrt{\frac{2}{S_s}}}$

As the size of our segments increases, we see a logarithmic increase in utilisation, but utilisation remains most optimal where page size is $\sqrt{2S_s}$. Predictably, we can never reach full utilisation, but this gets us fairly close.

Remember that page size also influences hit ratio as well, as the greater the page size, the greater distance two addresses may be within the same page. While the page size is small, the hit ratio increases with the page size, but up to a certain point, the hit ratio will start to decrease where the page size continues to increase. This results in a "sweet spot" of hit ratio that we want to hit, and this can be greater than the "optimal page size" we just discussed. It's up to us whether we want better space utilisation or the fastest possible access times!

### The Swap Files

If we encounter a **page fault**, then this means that we are trying to access a page that isn't in main memory, and has been sent to our hard disk. We can't just access this page directly, we have to move this to main memory first. But what if our main memory is already full? Then we have to move something out of it! But how do we decide what gets pulled out, in other words, what **page replacement algorithm** should we use?

**Random** - Use a pseudorandom number generator, and swap out the page number it spits out. Obviously, this means we may swap out another page that's also currently needed, causing repeated replacements. This will perform poorly.

**First-in, First-out (FIFO)** - Swap out the page that has been in memory for the longest. We can easily put in a "sequence value" for each page in software, but this still doesn't consider how pages are used, like with the random approach.

**Clock replacement algorithm** - This takes the idea of FIFO, and extends it by introducing a *use bit*, which is set to 1, if the page has been referenced recently. On a page fault, select the first inserted page and check its use bit. If it's 1, set it to 0 and skip to the next page. Once we hit a page with a use bit set to zero, swap with this page.

**Least Recently Used (LRU) algorithm** - Swap out the page that has not been accessed for the longest time. To achieve this, each page has an "age counter" associated to it, which is reset to 0 on each access, and incremented at fixed intervals. This can be infeasible on larger page counts, so we may approximate.

> LRU is used very often, although it kind of combines clock replacement and LRU, using a use bit instead of an age counter: the bit is set to 1 on an access, but at a fixed interval, is set to 0, creating a "time limit for access" so to speak. We swap any page with a use bit of 0.

**Working Set** - At a given timestamp $t$, find the *working set* $w(t,T)$ where $T$ is some constant interval length, which gives the set of all pages that have been accessed within that time. We then swap with any page not in this set. This allows these "working pages" to remain in memory undisturbed. The challenges of this approach are determining *how* to identify a working page, fine-tuning $T$, and dealing with situations where we introduce a new process in a multiprogramming environment (i.e. where we're trying to increase CPU utilisation by scheduling tasks).

### Screeching to a halt

*Say goodbye to those family pictures*

Of course, sometimes we may rely on virtual memory too much, where your computer will become noticeably slower, and is performing swaps more than anything else. This is called **thrashing**, and it can significantly reduce the life of your hard drive, whether that be an HDD or SSD. We can prevent thrashing by either using better page replacement algorithms, running fewer processes... or just buying more memory!