+++
title = "4 - Processor Organisation"
+++

Storing stuff and writing code to be as fast as possible is great and everything, but... what are we even processing and running our code and data on? Well, a **central processing unit**, or CPU, of course! But we probably ought to know how a CPU even works... at least we're part of the way there since we already covered cache.

At the simplest level, a CPU follows instructions in code: we *fetch* the instructions from memory, *decode* their meaning and activate the relevant circuits to then *execute* said instruction, over several clock cycles. This describes the infamous **fetch-decode-execute cycle**.

## Don't talk to me or my son ever again

Up to this point, we've been talking about architecture, however it's important to distinguish this with micro-architecture when we talk about CPUs.

**Architecture** refers to the instruction set (hence why we sometimes also refer to this as the Instruction Set Architecture, or ISA). This describes what instructions and operations are made transparent to the user, as well as execution semantics (i.e. interrupts), I/O and what data types are available. Think of this as the *"What we can do"*.

**Micro-architecture** explores this instruction set is then implemented, often trying to achieve either the fastest speeds, highest power efficiency, or lowest cost possible. This outlines things like pipelining, deep pipelines, superscalar architecture, and other constructs which are not made transparent to the programmer. This is the *"How we can do it"*.

## >processor >looks inside >processing units

A CPU has the following components:

- **Cache** - we covered this already
- **Arithmetic Logic Unit (ALU)** - performs arithmetic and boolean logic instructions
- **Control Unit (CU)** - responsible for decoding instructions and activating the necessary other parts of the CPU to then execute that instruction.
- **Registers** - tiny, very high-speed stores of data. Some of these are made transparent to the programmer (user-visible), others are not (control or status), such as the program counter or current instruction register.
- **Internal Bus** - Connects all of the above together.

The **program status word** is a, or a collection of, registers which contain information about the program's status, including information about arithmetic signs, zero, carry bits (for adding), equals, overflows and interrupts. The control unit will often use these to decide where to fetch data and how to execute the next instruction, where necessary.

In normal operation, the *program counter* dictates which address the next instruction is, so we use its value to fetch that address's data into the CPU's *current instruction register*. This is passed to the *control unit*, which decodes the instruction, after which the rest of the logic will execute the instruction. But this doesn't always happen in this order, e.g. we may need to fetch additional data as part of the execution of our instruction, which is called an **indirect cycle**. It's for this reason, plus the chance for optimisation, that the fetch-decode-execute cycle is often decomposed further.

## Do as I say, not as I do

**Machine Instructions** generally consist of three components: an opcode, and two operand references. The **opcode** defines what the instruction is, like an add, load or or (no you're not misreading that), which we abbreviate in assembly using *mnemonics*. This is of course a fixed set of instructions, so we use a predetermined set of bytes to map to each type of instruction. **Operands** are the pieces of data we want to operate the instruction on, where the first is our *source*, and the second is our *target*.

Instructions fall into one of four categories:

- **Data Processing** - Arithmetic or Logic expressions
- **Data Storage** - Loading or storing instructions
- **Data Movement** - Management of I/O devices
- **Control** - Branches or Jumps

And our operands need to be sourced, or **addressed** in some manner, and this is done in one of eight ways:

- **Register** - Directly reference a value loaded into a CPU register
- **Immediate** - Constant value, no need to load anything
- **Displacement** - Index from memory, with a constant base address, indexing using a register value
- **Register Indirect** - Memory address, as directed by a register's value
- **Absolute** - Selecting a specific memory address
- **Memory Indirect** - Address in memory, given by the value of another memory address, which we find using a register's value
  - i.e. `Mem[Mem[Register]]`
- **PC relative** - Use displacement, with the program counter as our register value
- **Scaled** - Use displacement with two register values, the first providing a constant offset, the second using a register value, scaled by sone constant
  - i.e. `Mem[Base + Reg1 + (Reg2 * 4)]`, useful for larger data types. Speaking of...

You may be familiar with some data types, but here's a recap of the common ones, and their sizes.

- Integers (16, 32 or 64 bits)
- Floating Points (32 or 64 bits, usually following IEEE-754 standard)
- Packed Vector Data (icl I looked this up and Verilog showed up so I nope'd outta there)

Keep in mind things like characters are just integers, so strings are just arrays of integers. Booleans? Just use integers! Have you never seen C code before?

There are also three different types of *instruction encoding*.

- **Fixed Width** - Every instruction uses the same width, i.e. the same number of operands. ARM uses this architecture.
- **Variable Width** - Instructions can have different numbers of operands or operands of differing sizes. x86 uses this architecture.
- **Very Long Instruction Word (VLIW)** - Each word contains multiple instructions, usually for instruction-level parallelism. Multiflow uses this architecture.

## Wait a minute!

**Interrupts** are signals sent to the CPU which divert its attention to something more important, i.e., an interrupt will tell the CPU to set aside what it's doing, and instead execute something else, before letting it return back to its original workload. These may be generated by our program, an OS timer, an I/O controller, or as a result of a hardware failure (BSOD my beloved). An interrupt handler, separate to our handler, takes over execution.

## Who's really in control here?

The **Control Unit (CU)** is the puppeteer of the whole CPU: it enables all of the other parts of the CPU, containing the mapping of each opcode and hence deciding how each instruction is carried out. It achieves this by opening and closing logic gates, directing the flow of data. Its inputs include a clock signal, the instruction register which holds the next instruction to decode, flags from the last instruction (e.g. has an overflow occured?), and control signals over the control bus, which is connected to I/O. It then uses this information to send out control signals within the processor, enabling functional units, or over the control bus, to I/O. Control Units are either hardwired or microprogrammed.

A **hardwired CU** uses logic circuits to determine where and how signals are sent, so the set of inputs will enable certain gates, altering the flow of data. A *sequencer* is often used to dictate this flow. This makes the control unit very fast, but also harder to debug, as circuits aren't very flexible, and you need to redesign them to fix any problems. RISC CPUs have hardwired control units (RISC-V, ARM, etc.).

A **microprogrammed CU** is like a CPU inside a CPU. Each opcode maps to a specific *microprogram* that is ran with the other inputs, to then output its control signals. It will read the instruction and use the microprogram to send the data in the right direction, often using multiple clock cycles to complete the program and move to the next instruction. Now the design is far more simple, flexible and hence easier to debug or extend with new instructions, but this comes at the cost of speed. CISC computers have microprogrammed control units (x86, etc.).

## Look, Mum, I'm famous!

Oh wait, it says Flynn, not Flynt.

**Flynn's Taxonomy** is a classification system of different types of processors, depending on what types of *parallelism* we can achieve. We'll talk more about parallelism later on, but keep this structure in the back of your mind, as we'll cover most of it later on.

- **Single Instruction, Single Data (SISD)** - No parallelism
  - Uniprocessor
- **Single Instruction, Multiple Data (SIMD)** - Processors where we can apply the same instruction to multiple data points simultaneously
  - Vector and Array Processors
- **Multiple Instruction, Single Data (MISD)** - Ability to apply different instructions to the same piece of data
  - [insert tumble weed gif here]
- **Multiple Instruction, Multiple Data (MIMD)** - Idea of separated "cores" which act as one overall system that can multitask.
  - Shared Memory
    - Symmetric Multiprocessors, i.e. multicore CPUs
    - Non-uniform Memory Access (NUMA)
  - Distributed Memory, i.e. Clusters.