# Memory

> [!note]- Describe a process in memory, physical and logical addresses.
> - Program needs to be in memory to be executed.
>     - Store instructions and data.
>     - OS assigned unique set of addresses to each process.
>     - Memory protection on each process.
>
> **Logical (virtual) address:**
>
> - OS generated addresses that abstract how a process is laid out in memory.
> - Allows processes to use more memory than is physically available.
> - MMU translates logical → physical address.
>
> **Physical address:**
>
> - Address seen by the memory unit for the memory access.

# Memory Allocation

> [!note]- Describe contiguous memory allocation.
> - Each process contained in a single continuous section of memory.
> - **Base address** and **range** of addresses must be decided for each process.
> - Has internal and external fragmentation.
>     - **External fragmentation** — total memory space exists, but is scattered.
>         - OS has to keep track of a large number of small holes.
>         - Can perform **compaction** to rearrange free memory into 1 contiguous block but high overhead.
>     - **Internal fragmentation** — assigned space may be larger than used by process (EVEN WITH BEST FIT).
>
> **MMU:**
>
> - Relocation registers — base addresses (offsets).
> - Limit register — range of addresses.
> - **Check if logical address in range using limit register than add offset.**
>
> **Fixed sized partitions:**
>
> - Memory divided into fixed size partitions.
> - 1 partition per process.
> - Partition freed when process terminates.
> - Problem — number of partitions dictates number of concurrent processes in memory.
> - Not as bad external fragmentation.
>
> **Variable sized partitions:**
>
> - **Holes:**
>     - Available blocks of memory.
>     - Scattered in memory.
>     - Kept track of by OS.
> - When process arrives, OS finds hole large enough to accommodate it.
> - Exiting process creates a hole.
> - Adjacent holes are combined.
> - **First fit** — first hole big enough.
> - **Best fit** — smallest hole that is big enough.
> - **Worst fit** — largest hole.

> [!note]- Describe segmentation.
> - Program divided into segments (contiguous memory blocks).
> - External fragmentation after segments are freed.
>
> **Logical address <segment number | offset>**:
>
> - Segment number can be mapped to base address of segment in memory.
> - Offset used to say what piece in segment is being accessed.
>
> **Segment table:**
>
> - For each process.
> - Indexed by segment numbers.
> - Each entry has **base and limit** (length) of segment.
> - Along with offset, can be used to get the physical address.
> - Need to check not accessing outside of segment → addressing error.

> [!note]- Describe paging.
> - **Page** — fixed size block of program.
> - **Frame** — fixed size block of memory
> - Page size = frame size, assign pages to frames.
> - Internal fragmentation:
>     - 1 frame may be wasted WORST case.
>     - Page size has grown over time as memory has become cheaper.
>
> **Logical address <page number | page offset>:**
>
> - Lookup is same as segments but without limit check.

# Page Table

> [!note]- Describe a **page table**.
> - Page number → frame number.
> - **Invalid address** — logical address does not have corresponding physical frame (logical address space >>> physical address space).
> - **Page fault** — invalid address provided, need to fetch the data from secondary storage, evict an existing page with LRU or LFU.
> - **Page table base register (PTBR)** — load the base address of the page table from the PCB of a process.
> - Lookup time — 2 x memory access (1 to page table, 1 to get the frame).

> [!note]- Describe the **translation lookaside buffer**.
> - Hardware cache to store frequently used page entries (< 256 usually).
> - Lookup time — 1 memory access (if hit), TLB searched parallel.
> - Address space identifier (ASID) — allows multiple processes to use TLB and ensures protection
>
> **On miss:**
>
> - 2 memory accesses still required.
> - Evict another entry to put missed entry in:
>     - Least frequently used (LFU) - keep track of frequencies.
>     - Least recently used (LRU) - keep track of oldest.

> [!note]- Describe methods of making page tables smaller.
> - Reduce overhead, wasted space, reduce page search time in case of TLB miss.
> - **Page tables have many invalid entries (that do not have a corresponding physical memory frame).**
> - For a 32 bit address space with page size = 4KB (this is constant).
>     - 12 bits used for page offset.
>     - 20 bits used for indexing into page table.
>
> **Valid-invalid bit (is there a physical frame?):**
>
> - For each page entry indicates if there is a frame corresponding to the page number (1 if no frame).
> - Can group together invalid entries into 1 entry.
>
> **Hashed page tables:**
>
> - Hash page number portion of address.
> - Hash table has linked list to page numbers with same hash value.
>
> **Inverted page tables (1-1 page table):**
>
> - Logical address: **<PID | page number | offset>**
> - Entry: physical PID and page number.
> - 1-1 relationship with frames in memory.
> - Slow search but smaller table.
>
> **Multi-level paging tables:**
>
> - Want outer most frame to be 1 page, same address space but less memory.
> - **Invalid entries (that do not have a physical memory frame) can be grouped together into a single entry in the outer page table.**
> - Requires MANY memory accesses (can be slower than simple implementation).
> - Page number split into multiple parts:
>     
>     ![Page Number Split](/Resources/Images/PageNumberSplit.png)
