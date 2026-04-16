+++
title = "8 - Symmetric Multiprocessing and Cache Coherence"
+++

**Symmetric Multiprocessing (SMP)** simply describes the multicore architecture that has now become the standard on processors today: Even low-end systems feature processors with at least four cores, while the latest server offerings can have as much as 192 cores. Having multiple cores means we can do more work at any given time, enable multitasking, pry open the door to parallel computation, and serve thousands of web clients all at the same time. That being said, when we're doing more than one thing at once, we need to make sure we're still keeping our cache in a useful state, giving us a need for **cache coherence**.

## SMP? Hope there's a village nearby

*I haven't had the minecraft itch in a while, is something wrong with me?*

A multicore system, basically means a computer has multiple processors on it, all of which operate on the same instructions and have the same functionality, hence, *symmetric* multiprocessing. They may each have their own L1 (and possibly L2) cache, but they will still share the same main memory and I/O, accessing it on either a bus or an interconnect. To use multiple cores in a program, we need to explicitly code this behaviour ourself, usually achievable by using threads (more on that later).

An operating system that wants to take advantage of multiple cores needs to be able to manage concurrent processes, keep multicore capabilities in mind when scheduling, synchronise processes properly, manage memory and have appropriate fault tolerance should something go wrong.

The concept of a bus should be familiar, it allows any two devices to share data to each other, where there are multiple devices available, and on a computer, busses are split into data, control and address. The allowance for each item to access memory is known as **Direct Memory Access (DMA)**, and allows for I/O devices to write directly to memory, allowing for data exchange with the CPU. Using a shared bus means each core acts as a single CPU unit, so the cores share time using memory, resulting in fairly uniform access times. This is the simplest way of doing things, and enables us flexibility and reliability with I/O, as we can easily add more devices to a bus, and the failure of one can be isolated. However, this again means everything has to take turns with memory, so the bus can prove to be a bottleneck: all data travels along it!

In some cases, we might use an interconnect, where all cores, I/O and memory are connected to each other, like in a mesh network. This enables some additional useful features, such as allowing cores to communicate to each other, or the splitting of memory to enable simultaneous accesses. This creates a **tightly coupled multiprocessor**, often contrasted with a *loosely* coupled multiprocessor which usually describes a distributed computer system (which splits workload across multiple computers).

## You're not coherent, let's go to the hospital

*Remember, think FAST. Although that's hard when you're distracted by burnt toast.*

When we have multiple cores working on the same data, there is a chance that data can update without a core's knowledge, leading to incorrect results. We need a way of ensuring that all cores are on the same page about the information that they are accessing, so that we don't drastically reduce the usefulness of our cache at the cost of parallel performance. This is the motivation for **cache coherence**.

### Software approach

It's possible to design our operating system and compiler in a way such that these issues simply don't happen in our programs, so we trade time lost from stalls caused by invalid cache for compile time, but this also means we still won't utilise cache to its full potential, as the compiler will tend to using cache conservatively.

Instead, it may be better to use a hardware-based approach to manage our cache, or create a cache coherence protocol. This deals with out-of-date cache lines once they occur, removing burden on the developer to create code that avoids these issues, and letting us utilise all of the cache we have available. There are two general types of protocol.

### Action!

**Directory Protocols** store information about the data stored in cache, in main memory, creating a *directory* of cache lines that all cores can check against and fall back on, to recover from invalid operations easily. It's like having a screen display a set of tasks to be completed, and a group of people completing them: everyone can get on with their own work, but can quickly reference the screen to see what to do next.

This can cause a massive bottleneck though, especially if we use a bus network, since every core will be constantly checking the memory. Instead, this approach works better for when we have an interconnect, as we described previously, especially when we can't implement a broadcast system to announce changes to data.

### Good Grief.

**Snoopy Protocols** distribute the responsibility of cache coherence among the cores themselves, so each processor will "check in" with each other to see if any updates have been made, hence they can "snoop" in and check if any processors have announced a change to a certain portion of cache. This is much better suited to a bus-connected system, as now we have an easy means of communicating changes to all devices, instead of needing to access multiple interconnects as we suggested above. That being said, snoopy protocols are great for interconnects where processors can broadcast to each other.

These types of protocols are then split into two sub-types: Write Update and Write Invalidate, although some processors may use both types. **Write Update** means that if a processor writes to a cache line, it broadcasts this change to all processors' caches. Alternatively, **Write Invalidate** "locks" a cache line, such that only one processor may modify it, but all can read it, requiring all other processors to request access. This is also known as the MESI protocol.

### MESI? Why are we talking about football?

**MESI protocol** is essentially write invalidate protocol, and uses four bits per cache line to put it into one of four states:

- **Modified** - The processor has changed this line, but has not updated it in memory yet. All other values are out of date.
- **Exclusive** - Only one processor is accessing this line, and it is up-to-date with memory.
- **Shared** - More than one processor is accessing this line, memory is up-to-date.
- **Invalid** - This cache line has been updated elsewhere, do not use this until update is received.

On boot, all cache entries are marked as invalid. Then, when a processor accesses a line from memory, it marks this as Exclusive, since no other processors will have access to it. While under the exclusive state, no information is relayed between processors, and the processor holding the line will eventually write back to memory as appropriate.

If another processor accesses the same line from memory, the other processor will note this after snooping on this one, and both entries in cache will be marked as shared. Now, if either processor wishes to write to this cache line, it will mark its own version as Modified, and sends a signal to invalidate the cache line on all other processors. This won't necessarily be written back to the main memory yet.

If another processor wants to access a memory location while another processor has a modified copy, this processor will send a signal to the other, telling it to wait until it's done modifying. It will then send the new line over directly, and both versions are marked as Shared.

Often a processor will perform a **read with intent to modify (RWITM)**, where it will fetch data from memory, and then write to it. If another processor has a modified version of this data, it will interrupt the RWITM sequence and write back its copy of the data first. Then, the sequence is resumed and the operation is performed, with the cached line held under the Modified state.

#### Having a MOESI around

Intel and AMD have their own extensions on MESI, with Intel creating **MOSIF**, creating a new **Forward** state, and AMD creating **MOESI**, with the new **Owned** state.

The **Forward** state is an extension to the Shared state, and allows one cache to copy a line to another, which saves time that would be spent fetching a line from main memory. This is ideal for cases where we have distributed memory organisation.

The **Owned** state extends Modified, and gives a processor the exclusive privilege to write to a cache line, while allowing others to read from it, with this processor broadcasting its changes to all other processors. This reduces write-backs to memory, but will still need to write-back changes once done.