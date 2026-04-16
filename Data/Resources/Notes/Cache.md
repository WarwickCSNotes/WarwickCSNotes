+++
title = "2 - Cache Memory"
+++

Cache acts as an intermediary between CPU registers, which are often designed for at most a few entries of data, and main memory, which can be relatively slow to access. Hence, the purpose of cache is to **store data and instructions that are frequently used**, all while being significantly faster than accessing from main memory. Usually this is achieved by placing the cache on the same die as the processor itself, but in previous years, it wasn't unheard of to have it on the motherboard. Cache usually has **levels**, where for two levels $i$ and $i+1$, the $i$th level has faster access times, and the $i+1$th level has higher capacity.

## Money Talks

Now for some terminology.

**Block** - The amount of data that can be sent between cache and memory at one time. One block may feature a few words on it, and consist of a contiguous *block* of memory addresses.

**Line** - A section of cache which holds one block, plus a tag and some control bits. The *line size* is equivalent to the size of a block

**Tag** - An "index" for cache.

Now for how cache *actually works*. When the processor requests a certain memory address, this request first passes through the cache (starting at level 1, then 2 and so on if needed). If the cache has the data associated to the address given, this is a **cache hit**, and the cache returns the data. If not, then this is a **cache miss**, and the request is sent to main memory, for the associated block, which is then saved to the cache.

This can play with a Memory Management Unit (MMU), which converts the CPU's logical addresses to physical ones. We can attach a cache either between the CPU and MMU, called a **logical cache**, or between the MMU and main memory, called a **physical cache**. Physical caches tend to be more common, as we can use techniques to translate addresses and lookup data in conjunction with each other, but there is a tradeoff between faster hits and faster recovery from misses.

## Hit me, dealer

We obviously want to make sure we get as many cache hits as we can, then. The rate at which a hit occurs is called the **hit ratio** ($h$), and its complement is known as the **miss ratio** ($1-h$).

$h = \frac{\text{Number of cache hits}}{\text{Number of total memory references}}$

We can then create an average access time, $t_{avg}$, where we know the time needed to access the cache, $t_{acc}$, and the penalty time incurred from a cache miss, $t_{miss}$.

$t_{avg} = t_{acc} + (1 - h)t_{miss}$

We can then modify this slightly to express the average access time, relative to the time for a cache hit (i.e. just $t_{acc}$).

$\frac{t_{avg}}{t_{acc}} = 1 + (1 - h)\frac{t_{miss}}{t_{acc}}$

Obviously, the average time can be no smaller than that of a cache hit. With this in mind then, one of our goals is to have $\frac{t_{avg}}{t_{acc}}$ be as close to 1 as possible, meaning we want to both minimise the miss ratio, and reduce the penalty time of a miss.

## Get your toys out

We haven't yet *addressed* how we decide to place a block of words into cache, since caches are much smaller than main memory: how do we map addresses? Well, we use one of three types of mapping: Direct, Associative, and Set Associative.

### Direct to you!

*The good old days of Nintendo*

**Direct Mapping** is comparable to a simple hash table: the cache location of a block, $i$, is determined by computing $j \text{ modulo } m$, where $j$ is the address of the block in main memory, and $m$ is the number of lines in cache.

This means that an address from the CPU is split into three components: **tag**, **index** and **offset**, with the first two identifying a single block in cache. This address is the same as what would be used to access main memory, but it just has to be used in a different manner to identify a block, which is a different structure to a memory location. The tag and index are used to check for a certain address in the cache, and a *valid* bit determines if the data is usable. If the tag and index match the address, and the valid bit is enabled, that's a hit. Otherwise, it's a miss, and the required data is loaded into cache.

Of course, the problem with this is, each memory address deterministically maps to one cache address, so if two memory locations lead to the same modulo value, we may be swapping these two blocks repeatedly. One potential solution to this is to use a small **victim cache**, where any blocks which are removed are moved to. This can then be accessed as another level of cache, after the main one. This cache is small, at only between 4-16 lines, and is fully associative (see below).

### Set by Association

**Set Associative Mapping** allows blocks to be mapped in a similar manner to direct mapping, except *blocks may be included anywhere inside of a set of fixed size*. This way, blocks are still deterministically mapped, but this time to a general region of cache, not a specific address. A cache that uses sets of size 2 or 4 are called 2-way associative and 4-way associative respectively, for example.

Addresses are verified in the same way as direct mapping, splitting the CPU address into the **tag**, **index** and **offset**, and comparing the tag and index, followed by checking the valid bit, but sets may be split such that each line is in a separate memory unit, and tag checks are carried out in parallel across all lines in the set. Additionally, if a cache miss occurs, we need to use a replacement algorithm to decide what line should be swapped out.

### Associating fully

**Fully Associative Mapping**, ironically, does away with any idea of mapping, and lets blocks be allocated to any cache line that is available. This means that this time, the CPU address is split into two: the **tag**, and the **word**. Each line in cache has its tag compared to that of the given address until a match is found. If a miss occurs then, we have to fetch *not only* the data from that address, but also the address it came from, into the cache line. While this does fix the issue of potentially swapping out the same data repeatedly as seen in direct mapping, comparing against every tag in the cache can be complex and computationally expensive.

One way to address this problem is to use **Content Addressable Memory (CAM)**, which takes the tags of the CPU address and cache lines, and compares all of them in parallel over a single clock cycle, returning the address of the correct line, if it exists, otherwise it will signal a miss. CAM is made up of Static RAM cells and is significantly more expensive, with lower capacity. This means we can search for a tag very quickly, but this incurs significant costs.

## Performing Switcheroos

Swapping out blocks for direct-mapped caches is simple, just compute the modulus as described above, but with set associative and fully associative caches, we need to be a bit more mindful and create a **replacement policy** in hardware. We can either use a random approach, or go for a FIFO algorithm, but the most effective (unsurprisingly) is to use a **least recently used** algorithm.

If we have a set associative cache with fairly small sets, we can use just a few bits to create an order in which lines were last accessed. A 2-way associative cache only requires one bit for this: set 1 to the line that was most recently accessed or fetched from memory, and 0 to the other. We then overwrite the line with a 0 bit. 

Fully and larger set associative caches are slightly more complicated, and in these cases, we use an **aging counter**. This starts at 0 when a line is accessed or fetched from memory, and incremented regularly. When a cache hit occurs, the line has its counter reset, and any other lines that were "younger" before the hit, are incremented. On a miss, we swap the "oldest" cache line, and increment all other lines.

## Committing to Memory

No doubt, we'll end up changing some values in the cache to perform operations, so we need to write these changes back to memory, otherwise we end up with inconsistent data, making everything a hot mess. We have two options manage this: **write-through**, where all write operations are immediately sent to main memory, or **write-back**, where lines are marked as "dirty" when written to, then these writes are only committed to main memory once the associated cache line is removed from the cache. The former is simple, but can easily hog up memory bandwidth, which the latter fixes, at the expense of requiring more complex circuitry.

What's even more messy, is we may want to write to a memory location, *but it's not in the cache*. This is called a **write miss**. We can either fetch the word into cache and write there, **write allocate**, or just make the changes to memory directly, **no write allocate**. We can use either with write-through or write-back, but most commonly, we do write-through with no write allocate, and write-back with write allocate. 

## Your face is drooping

*All toasters toast toast*

We mentioned that we can have multiple levels of cache, which can be very useful, and for each increasing level, if the next is larger than the previous, we can expect great increases in hit ratio. But this gives us another problem, just like how we have to write changes from cache back into memory, we have to write changes in lower-level cache, up to higher level caches: we need **cache coherency**. It might seem like we could just use write-through like with memory, but this may not account for other caches, leading to invalid data being stored, e.g. on another processing unit (more on that later!). There are three main approaches to ensuring coherency.

- **Write-through with a bus** - Add a bus connecting all caches together, and use write-through to commit any changes to all caches.
- **Hardware Transparency** - Monitor for changes to main memory at the cache level. If any are made, reflect them in all caches.
- **Noncacheable Memory** - Any memory location can be accessed by at most one processor. If we use shared memory, *always* read/write from memory, never allow a cache hit.

We may also use **inclusive policy**, where if we experience a cache miss on L2, the same fetched data is also written to L1, since a miss would've occurred here too.

## Lastly, a W from Harvard

If you've done A-Level computer science, you may recall Von-Neumann and Harvard architecture, and how modern computers use both architectures. They do this, by storing instructions and data in main memory, but have separated instruction and data caches, typically just at L1 (i.e., the lowest possible level). Instruction cache is read-only for the CPU, we don't need to modify instructions.

## Missing your shot

Let's go back to talking about access time: we mentioned how we want to improve performance by lowering our hit time, miss ratio and the miss penalty: how can we do that? Well, there are a few techniques, but first, we should understand that there are four types of cache miss.

- **Compulsory** - We're accessing a new section of memory: we can't avoid this type of miss.
- **Capacity** - We've ran out of space and we need to swap blocks out.
- **Conflict** - Specific to direct and set-associative maps, where multiple addresses lead to "collisions".
- **Coherence** - Unique to multiprocessors, where data becomes invalid because another processor has modified it.

Now for the fixes!

### Blocks. Big ones.

First, **just increase the block size and store more words**! This takes advantage of *spacial locality*, but since we are transferring more data, we end up increasing the miss penalty. Usually we aim for a block size that hits the sweet spot between maximising the hit ratio, while not making the miss penalty too high.

> Miss rate goes down, *miss penalty goes up.*

### Just download more RAM

Or, cache, in this case. As in, just build bigger caches. While this does reduce misses, we end up with greater power consumption and longer hit times, as we have more cache lines to keep track of.

> Miss rate goes down, *hit time goes up.*

### Associate with more people

Increasing the size of our sets in set-associative caches means fewer collisions happen, reducing conflict misses, but can cause longer hit times as, again, we end up checking more cache lines.

> Miss rate goes down, *hit time goes up.*

### Spenny on multiple levels

Deploy multi-level caches! These reduce the miss penalty, and allow us to make faster lower-level caches.

> Miss penalty goes down.

### Before you start writing, read.

**Prioritise reads over writes.** If we encounter a write miss, place the write in a **write buffer**, and keep it there until the relevant memory address is read, a read miss will occur and we can instead use the data in the buffer. This is also called a *read-after-write hazard*.

> Miss penalty goes down.

### No need to translate, I'm fluent.

We've currently worked with the idea of first identifying a line in cache using a tag and index. What if there was a way of just needing to use the index? This is what a **Virtually Indexed, Physically Tagged (VIPT)** cache achieves. Its size is limited by the number of offset bits that we use in our CPU address, and the VIPT cache uses the offset as its own index, plus a smaller, byte offset, to then return a tag. This is compared with the tag given by a Translation Lookaside Buffer, who has been given the same CPU address and if these match, the cache data is valid. If not, fetch from memory.

This can only be our L1 cache, since it relies on the offset of a CPU address. This greatly limits the structure of the cache, but we can still increase the size of it by making it (bigger) set-associative.

> Hit time goes down.