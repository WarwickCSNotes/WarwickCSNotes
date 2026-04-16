+++
title = "5 - Pipelining"
+++

Let's say you're at home, and you have a few different things that need doing. You need to study for an upcoming exam (how meta), do your laundry, and cook some food for the week. You *could* do one task at a time, waiting for the laundry to finish so you can put it up to dry, then prepare the food and wait for it to cook, then go and study. However, there's a lot of dead time doing that. So *instead*, what you do is put your laundry on, and as the machine does its work, you go and get started on cooking. Once you've started letting it simmer/roast/bake, your hands are then free to study. You'll empty the washing machine out once it's done, and cool the food off once it's finished cooking. This is the basic concept of **pipelining**.

To translate this into computer terms, recall that a CPU is split into different units, such as an ALU, a CU and registers. So while some data is being calculated in the ALU, it makes sense for the CPU to also fetch a new instruction as it's calculating. Unlike humans, computers are very good at multitasking. We split each step of an instruction, such that each step can occur at the same time: each instruction being carried out must also switch to a new step at the same time, and often the timing of this is determined by the slowest stage. This is called a **processor cycle**.

We can measure the performance of pipelining based on the **throughput**, determined by the frequency at which an instruction finished executing, and we want to design a pipeline that ensures that the length of each step is as equal as possible, i.e. as close as we can get to splitting the overall instruction time into equal time splits.

## Table-side service

*Imagine how much better life would be if we all just had drink fountains installed into our tables*

We've seen the Fetch-Decode-Execute cycle before, but have you seen the IF-ID-EX-MEM-WB cycle before? No? Probably because it's far less catchy. But this describes a common architecture of using a five-stage pipeline, where instructions are broken down into each of these steps:

- **Instruction Fetch (IF)** - Get the value of the PC to fetch the instruction from memory, and increment the PC.
- **Instruction Decode (ID)** - Find out what the instruction is saying, get data from the necessary registers and compute possible branches. These are all done in parallel as they use different parts of the processor.
- **Execution/Effective address cycle (EX)** - Perform arithmetic and bitwise operations on data on the ALU.
- **Memory Access (MEM)** - If we're loading from a calculated memory address, fetch the data, or if we're storing to a location, write to the register file.
- **Write-back (WB)** - Output the results of the operation to the register file, whether this was a memory access or a calculation.

We may place these steps and instructions into a table to visualise how instructions are carried out.

|Inst.| 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|-----|---|---|---|---|---|---|---|---|---|
|  1  |IF |ID |EX |MEM|WB |   |   |   |   |
|  2  |   |IF |ID |EX |MEM|WB |   |   |   |
|  3  |   |   |IF |ID |EX |MEM|WB |   |   |
|  4  |   |   |   |IF |ID |EX |MEM|WB |   |
|  5  |   |   |   |   |IF |ID |EX |MEM|WB |

## Things that might bust a pipe

*Please don't.*

Of course, being able to do multiple things at the same time is great, but we need to be weary, as if we're not careful, things can go awry quickly. We need to make sure the pipeline is **executing instructions correctly, keeping them moving, and ensuring the CPU is always busy**! Namely, we need to keep an eye on...

- **Pipeline Latency** - If instruction duration isn't changing, then pipelining is having a more limited effect.
- **Stage time imbalance** - If one stage is taking exceptionally longer than the others, this stalls the clock as a whole, creating an overhead.
- **Pipelining Overhead** - There's some additional delay in managing registers and clock skew, this should be mitigated as much as possible.

### Cycle Time

$\tau = \max_i[\tau_i] + d = \tau_m + d$ where $1 \leq i \leq k$

Cycle time determines how long it takes the processor to advance all instructions to their next step, where each term is...

- $\tau_i$ - Time delay on the $i$th instruction
- $\tau_m$ - Maximum delay of all stages
- $k$ - Number of stages, so five for our example.
- $d$ - Time delay of latch, i.e. the pipeline overhead.

So to put it simply, just get the time of the stage that takes the longest, and then add on the latency of switching over to the next step to get the cycle time.

### Time to execute $n$ instructions

If we have a $k$-stage pipeline, and are executing $n$ instructions, then the time to complete them all is represented as $T_{k,n}$ and is calculated as such:

$T_{k,n} = (k + (n-1)) \times \tau$

Where $\tau$ is the cycle time. So, if we were executing 5 instructions on a 5-stage pipeline, where $\tau = 200 \text{ns}$, this would take 1.8 milliseconds, or $9 \tau$.

To see the speedup compared to purely sequential execution, we use $T_{1,n} = nk\tau$.

$S_k\frac{nk\tau}{(k + (n-1)) \tau}$

So for our example, we can expect a speedup of ~2.78.

## Slippy when wet

We may encounter **pipeline hazards** on occasion, which are instances where we have to stall the pipeline because we've hit a condition where we need to wait for something to finish before we can proceed. There are three types of hazards: Resource (also called Structural), Control and Data hazards.

### Why can't we all just get along?

A **Resource Hazard** is where two or more instructions attempt to access a resource at the same time, i.e. a resource conflict. This could happen when two resources use the same memory address or register. This can be a problem as it could cause a race condition, throwing our execution out of order and potentially making things unstable. So, we should allow the earlier instruction to perform its action first, then allow the next.

#### Wait a minute...

Let's look at this pipeline table again. Suppose instruction 1 writes to the same address as instruction 4 fetches from. This is of course a resource conflict, and bad things could happen!

|Inst.| 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|-----|---|---|---|---|---|---|---|---|---|
|  **1**  |IF |ID |EX |**MEM**|WB |   |   |   |   |
|  2  |   |IF |ID |EX |MEM|WB |   |   |   |
|  3  |   |   |IF |ID |EX |MEM|WB |   |   |
|  **4** |   |   |   |**IF** |ID |EX |MEM|WB |   |
|  5  |   |   |   |   |IF |ID |EX |MEM|WB |

In this case, we need to see what's causing the issue, then *stall* the later instruction, like this:

|Inst.| 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|-----|---|---|---|---|---|---|---|---|---|
|**1**|IF |ID |EX |MEM|WB |   |   |   |   |
|  2  |   |IF |ID |EX |MEM|WB |   |   |   |
|  3  |   |   |IF |ID |EX |MEM|WB |   |   |
|**4**|   |   |   |*Stall*|IF |ID |EX |MEM|WB    |
|  5  |   |   |   |   |   |IF |ID |EX |MEM|

This stall is sometimes called a **bubble**, since it's an unhelpful gap in the pipeline, like air bubbles in a water pipe.

We could also prevent structural hazards by **changing the scheduling of instructions**, which would be a responsibility of the programmer, or we could **add hardware** which allows multiple instructions to access the same resource at the same time.

### Who took my CTRL keys?

A **Control Hazard**  describes what happens when we branch and jump to a new portion of memory, it essentially invalidates all of the instructions we've just queued. So if a branch required us to run `subi` instead of `addi`, here's what would happen in our pipeline:

|Inst.| 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|-----|---|---|---|---|---|---|---|---|
|addi |IF |ID |EX |MEM|WB |   |   |   |
| **beq** |   |IF |ID |EX |MEM|WB |   |   |
|addi |   |   |**!** |ID |EX |MEM|WB |   |

Here, we've just noticed that this is the wrong instruction. We now need to quickly swap in the new instruction.

|Inst.| 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|-----|---|---|---|---|---|---|---|---|
|addi |IF |ID |EX |MEM|WB |   |   |   |
| **beq** |   |IF |ID |EX |MEM|WB |   |   |
|~~addi~~ |   |   |IF | idle |idle |idle|idle |   |
|addi |   |   |   | IF |ID |EX |MEM|WB |   |

So now we've created some dead time where we can't actually do any work. Of course, it would be nice if we could just get rid of branches (I mean, with some clever programming you could), but branching is an integral part of programming, so we're a bit stuck here. Instead, here's what we can do to work with them:

- **Use Multiple Streams** - Fetch *both* instructions at the same time, swapping in the one we need. This may not be ideal as this could contend with other instructions, and multiple branches could clog registers up.
- **Prefetch the Branch Target** - If we come across a branch, fetch its target as well as the next instruction.
- **Loop Buffer** - Use a small amount of high-speed memory to store the $n$ most frequently accessed instructions in sequence, similar to an instruction cache. Also well-suited to looping instructions.
- **Branch Prediction** - Can be done via a few different techniques: static approaches such as always or never taking the branch, or using the opcode, or dynamic approaches, alternating or using a history table, which both use previously executed code to make a decision.
- **Delayed Branch** - Compute the result of the branch first, allowing other instructions to run in other execution units, avoiding the potential of fetching unusable data. May suffer from dependency issues (see below).

### My precious precious DATA!

**Data Hazards** are instances where two nearby instructions conflict because one reads a value, and the other writes to it. This can cause unintended behaviour and completely throw off our execution. For instance, if we have the two following instructions, which are sequentially next to each other:

```
0x0...0: r3 = r1 + r2;
0x0...4: r4 = r3 - r5;
```

Then the second instruction will have to stall at the EX step to wait for the correct value of `r3` to be computed. Fixing this sort of problem can be more difficult, as this pattern is very common.

- **Schedule** - Simply *don't do data hazards* and be a better programmer, just reschedule these instructions.
- **Stall** - Wait for the first instruction to finish execution, then run the next.
- **Bypass** - Directly send the calculated value to the next instruction, while the first one is still in the pipeline.
- **Speculate** - Assume a problem will not occur, otherwise stop the second instruction and try again.

#### rawr

There are a few different *subtypes* of data hazard.

**Write After Read (WAR)**

```
read x;
write x + 1;
```

Not possible in the given 5-stage pipeline, but is possible on other types.

**Read After Write (RAW)**

```
write x + 1;
read x;
```

This creates a **flow dependence**. We can remove these by swapping the instructions, creating an **anti dependence**.

**Write After Write (WAW)**

```
write x + 1;
write x * 2;
```

Again, cannot occur in the 5-stage pipeline, but may occur in other types of pipeline.

## Sprinkling in more enhancements

**Data Forwarding** - Add lines between CPU portions to directly send data outputs to the next stage immediately. We may forward data to the execution stage after completing the memory or write-back stage, for example.

**Instruction and Data Caches** - Separate operators from their operands, removing fetch and execution conflicts.

**Separated Execution Units** - Create multiple execution units with different delays, so that we can purposefully "stall" instructions to prevent hazards.

**Reservation Station** - Relieves a bottleneck in operand fetching, by using a buffer which can load a new instruction into the processor once the relevant functional units are available and hazards have been dealt with.

## I'd like to make a reservation

Up to this point, we've covered how to avoid control and data hazards, but how can we prevent *resource hazards* from occuring, also known as *structural hazards*? We want to create a pipeline that ensures we enable as much throughput as possible, while avoiding these hazards, since they will cause stalls.

### Getting rear-ended by a physicist

We can properly schedule instructions by finding the **reservation table**, which shows us the timings for one instruction over multiple different units, and using this to identify a **collision vector**, which tells us where we can introduce new instructions without causing an overlap or conflict.

Let's say we have the following pipeline stages:

1. Fetch some data from memory
2. Decode the instruction
3. Execute the instruction
4. Update registers
5. Write-back to memory

And we execute them in the following order (X (Y cycles)):

1 (2 cycles), 2 (1 cycle), 3 (1 cycle), 1 (1 cycle), 4 (1 cycle), 5 (1 cycle).

Now let's make the reservation table for this. Each row represents one stage, and each column, one clock cycle.

|Stage| 1| 2| 3| 4| 5| 6| 7| 8| 9|10|11|12|13|14|
|-----|--|--|--|--|--|--|--|--|--|--|--|--|--|--|
|    1| x| x|  |  | x|  |  |  |  |  |  |  |  |  |
|    2|  |  | x|  |  |  |  |  |  |  |  |  |  |  |
|    3|  |  |  | x|  |  |  |  |  |  |  |  |  |  |
|    4|  |  |  |  |  | x|  |  |  |  |  |  |  |  |
|    5|  |  |  |  |  |  | x|  |  |  |  |  |  |  |

It should be pretty clear that we can't introduce a new instruction on every clock cycle for this pipeline, so now we use this table, also known as the **iniital collision vector**, to test where we can add new instructions, and hence construct our *collision vector*, $(C_1, C_2, ..., C_n)$ where $n$ is the largest latency we can apply to introducing an instruction, until we end up simply "appending" the next instruction without utilising multiple stages. For this case, $n = 6$.

For any $C_i$, we set this value to 1, if there is a collision, i.e. two instructions use the same stage at the same time. This is called a **forbidden latency**. If there is no such conflict, then we set this to 0, a **permitted latency**. $C_0$ is always 1, as otherwise we are introducing two instructions at the same time! Not that this matters too much, as we don't include this in the final collision vector.

#### $C_1$

|Stage| 1| 2| 3| 4| 5| 6| 7| 8| 9|10|11|12|13|14|
|-----|--|--|--|--|--|--|--|--|--|--|--|--|--|--|
|    1| x|**!!**|x+|  | x|x+|  |  |  |  |  |  |  |  |
|    2|  |  | x|x+|  |  |  |  |  |  |  |  |  |  |
|    3|  |  |  | x|x+|  |  |  |  |  |  |  |  |  |
|    4|  |  |  |  |  | x|x+|  |  |  |  |  |  |  |
|    5|  |  |  |  |  |  | x|x+|  |  |  |  |  |  |

We have a collision here, so $C_1 = 1$.

#### $C_2$

|Stage| 1| 2| 3| 4| 5| 6| 7| 8| 9|10|11|12|13|14|
|-----|--|--|--|--|--|--|--|--|--|--|--|--|--|--|
|    1| x| x|x+|x+| x|  |x+|  |  |  |  |  |  |  |
|    2|  |  | x|  |x+|  |  |  |  |  |  |  |  |  |
|    3|  |  |  | x|  |x+|  |  |  |  |  |  |  |  |
|    4|  |  |  |  |  | x|  |x+|  |  |  |  |  |  |
|    5|  |  |  |  |  |  | x|  |x+|  |  |  |  |  |

No collisions here, so $C_2 = 0$.

#### $C_3$

|Stage| 1| 2| 3| 4| 5| 6| 7| 8| 9|10|11|12|13|14|
|-----|--|--|--|--|--|--|--|--|--|--|--|--|--|--|
|    1| x| x|  |x+|**!!**|  |  |x+|  |  |  |  |  |  |
|    2|  |  | x|  |  |x+|  |  |  |  |  |  |  |  |
|    3|  |  |  | x|  |  |x+|  |  |  |  |  |  |  |
|    4|  |  |  |  |  | x|  |  |x+|  |  |  |  |  |
|    5|  |  |  |  |  |  | x|  |  |x+|  |  |  |  |

Another collision here, so $C_3 = 1$.

#### $C_4$

|Stage| 1| 2| 3| 4| 5| 6| 7| 8| 9|10|11|12|13|14|
|-----|--|--|--|--|--|--|--|--|--|--|--|--|--|--|
|    1| x| x|  |  |!!|x+|  |  |x+|  |  |  |  |  |
|    2|  |  | x|  |  |  |x+|  |  |  |  |  |  |  |
|    3|  |  |  | x|  |  |  |x+|  |  |  |  |  |  |
|    4|  |  |  |  |  | x|  |  |  |x+|  |  |  |  |
|    5|  |  |  |  |  |  | x|  |  |  |x+|  |  |  |

This is getting repetitive... we've got yet another collision so $C_4 = 1$.

#### $C_5$

|Stage| 1| 2| 3| 4| 5| 6| 7| 8| 9|10|11|12|13|14|
|-----|--|--|--|--|--|--|--|--|--|--|--|--|--|--|
|    1| x| x|  |  | x|x+|x+|  |  |x+|  |  |  |  |
|    2|  |  | x|  |  |  |  |x+|  |  |  |  |  |  |
|    3|  |  |  | x|  |  |  |  |x+|  |  |  |  |  |
|    4|  |  |  |  |  | x|  |  |  |  |x+|  |  |  |
|    5|  |  |  |  |  |  | x|  |  |  |  |x+|  |  |

Are you also getting bored of this? Even with lots of experience using VSC this is getting really repetitive to duplicate and edit. Anyways, no collisions here so $C_5 = 0$.

#### $C_6$

|Stage| 1| 2| 3| 4| 5| 6| 7| 8| 9|10|11|12|13|14|
|-----|--|--|--|--|--|--|--|--|--|--|--|--|--|--|
|    1| x| x|  |  | x|  |x+|x+|  |  |x+|  |  |  |
|    2|  |  | x|  |  |  |  |  |x+|  |  |  |  |  |
|    3|  |  |  | x|  |  |  |  |  |x+|  |  |  |  |
|    4|  |  |  |  |  | x|  |  |  |  |  |x+|  |  |
|    5|  |  |  |  |  |  | x|  |  |  |  |  |x+|  |

There we go... all done! No collisions so $C_6 = 0$.

#### And the result?

We now have the collision vector **101100**. You may think *"Great, so we can introduce instructions after 2, 5 and 6 clock cycles."*. Slow down there. Remember how there's a collision if we have a latency of 1 cycle? The same thing would happen here. We've still got a bit more work to do.

### Who doesn't love MALamutes?

The timings at which we introduce new instructions is known as a **latency cycle**, and is represented as a tuple, e.g. $(1,2,2,1)$, which would mean we introduce new instructions after 1, then 2, 2 again, then 1 cycle. This creates an **average latency** of 1.5 cycles, and we can have a **constant latency** if we introduce instructions at a regular interval. This next step will explore how we create a latency cycle, while achieving the **minimum average latency (MAL)**.

To do this, we use a scheduling strategy. When we introduce a new instruction into the pipeline, we have to "duplicate" the collision vector, since, like we said earlier, the collision vector still doesn't tell us where we *should* put latencies, just where *can* put *one*. There may also be multiple latency cycles we could make, but we need to determine which is the best one. So, we create a *state diagram*, which starts with our original collision vector, then shows how introducing new instructions changes it.

- Start with the original collision vector as a state.
- Perform left bitwise shifts, appending a 0 to the end of the end of the vector
  - This represents increasing the latency by 1.
- Once we *remove* a zero, we've come across a permissible latency, so we can introduce a new instruction at this shifted vector.
- Create a new state, formed by doing a bitwise OR on this new vector and the original, and assigning a transition based on how many shifts you needed to get there.
- Repeat for each number of shifts needed to pull out a 0 from the original vector.

Given this information, let's construct the state diagram for 101100. We can do two different numbers of shifts to remove a 0, either 2 or 5, to give us the shifted vectors 110000 and 000000. Let's investigate each of these paths.

- 101100 OR 110000 = 111100
  - We can perform 5 shifts to get 000000
  - 101100 OR 000000 = 101100, our original vector, so this loops back to the start.
- 101100 OR 000000 = 101100, so this is a self-loop.

Giving us the following state diagram:

![State diagram for the collision vector 101100](/images/resources/cs257/pipeline-states.png)

In this case, the diagram is very simple, but depending on how our pipeline is structured, we may end up with may different avenues we could go down. We end up with many different cycles to choose from, so here we can use the cycle (2,5), or constant latency 5. Our first option, using both states, is also called a **greedy cycle**, as it selects the transition with the lowest latency, i.e., we introduce a new instruction as soon as possible. This doesn't necessarily give us the MAL, but often it is "close enough". There may even be multiple greedy cycles, which don't start at the original vector.

In this case, our MAL is 3.5 cycles, using the latency cycle of (2,5). The MAL also has the following properties:

- It can't be any lower than the largest number of crosses in any row of the reservation table for the pipeline
- It's the lowest average latency of any greedy cycle in the state diagram
- It can't be any higher than the count of 1s in the collision vector, plus 1. This also applies to any average latency for a greedy cycle.

This all checks out, as $3 \leq 3.5 \leq 4$.

It's also important to remember that even with all of this work, our pipeline may still have a high latency, even if we achieve the MAL, so we may want to use this information to try constructing a better pipeline. We may even want to add delays on purpose to improve latency!