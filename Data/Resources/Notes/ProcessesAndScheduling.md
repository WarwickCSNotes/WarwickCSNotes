# Processes and Scheduling

> [!note]- Describe what a process and program is.
>
> **Program**: 
>
> - Passive entity — stored on disk as an executable file.
> - Can spawn multiple processes.
>
> **Process**: 
>
> - Active entity — a program in execution.
> - Program becomes process when it is loaded into memory.

# Memory

> [!note]- Describe a process in memory.
> - **Text** stores instructions.
> - **Data** stores global variables.
> - **Heap** dynamically allocated memory.
> - **Stack** local vars, function params.

> [!note]- Describe the **process control block (PCB)**.
> - “Data structure” for information about a process.
>
> **Contains:**
>
> - **Process state** — new, running, waiting, ready, terminated.
> - **PC and CPU registers**
> - **CPU scheduling** **information** — priorities, scheduling queue pointers.
> - **Memory management** **information** — memory allocated to process.
> - **Accounting information** — program stats
> - **I/O status** - open files, devices, etc.

> [!note]- Describe context switching.
> - Save current process state into PCB, then load saved state of new process.
> - Overhead — longer for more complex OS/PCB.

# Scheduling

> [!note]- Describe scheduling.
> - Queues for processes in different states.
> - Increases CPU utilisation.
>     - Takes I/O bursts into account.
> - Represent with Gant chart.
>
> **Types:**
>
> - **Non-preemptive** - once CPU given process, process holds onto CPU until current CPU burst finishes.
> - **Preemptive** - process interrupted to schedule another process.

> [!note]- Describe the performance measures for a scheduler.
> - **CPU utilisation** - fraction of CPU that remains busy when jobs are in ready queue.
> - **Throughput** - number of processes that complete per unit time.
> - **Turnaround time** - amount of time to complete a process.
>     - **end time - arrival time**
> - **Waiting time** - time process spends **waiting in ready queue**.
>     - **end time - arrival time - burst time**
> - **Response time** - amount of time it takes from request → first response.
>     - **start time - arrival time**

> [!note]- Describe the long term and short term scheduler.
>
> **Long term scheduler:**
>
> - **New → ready.**
> - Controls the number of processes in memory.
> - Strives for a good mix of I/O bound (short CPU bursts) and CPU bound (long CPU bursts).
> - Some OS don’t have this - all jobs sent to short term scheduler.
>
> **Short term scheduler:**
>
> - **Ready → running.**
> - Very fast — invoked frequently, need to reduce overhead.

> [!note]- Describe the process scheduling queues.
> - **Ready queue** — processes (their PCBs) in ready state.
> - **Job queue** — ****processes in new state.
> - **I/O waiting queue** — ****processes waiting for I/O. These are in the waiting state.

> [!note]- Describe **first come, first served (FCFS)** scheduler.
> - Non-preemptive.
> - **Performance varies on arrival order.**
>     - Shorter first → better.

> [!note]- Describe **shortest job first (SJF)** scheduler.
> - Process with predicted shortest next CPU burst selected. FCFS if tie.
> - Provably **optimal** - gives minimum average waiting time.
> - **Pre-emptive SJF** - switch to newly arrived shorter process.
> - **Non-preemptive SJF** - allow currently existing job to finish.
> - Priority scheduling can cause starvation:
>     - Aging → increase priority of processes that wait in system for a long time.
>
> ![Pre-emptive SJF Scheduling Wait Time](/Resources/Images/PreemptiveSJFComparison.png)
>
> **Exponential moving average**:
>
> - Uses history of CPU bursts to **predict** the next CPU bursts.
>     - Gives more weight to most recent times.
> - $t_n$ = **ACTUAL** length of **burst n**.
> - $\tau_n$ = **PREDICTED** length of **burst n** ($1-\alpha$ weight is given in the average).
> - $\tau_{n+1}$ = **PREDICTED** length of the **next burst**.
> - $\alpha, \ 0 \leq \alpha \leq 1$
> - $\tau_{n+1} = \alpha t_n + (1- \alpha)\tau_n$
>     - $\tau_{n+1} = \alpha t_n+(1-\alpha)\alpha t_{n-1}+...+(1-\alpha)^j\alpha t_{n-j}+...+(1-\alpha)^{n+1}\tau_0$
>     - $\tau_0$  - random initial guess.
>
> ![Exponential Moving Average](/Resources/Images/ExponentialMovingAverage.png)

> [!note]- Describe **round robin** scheduling.
> - Each process gets a small unit of CPU time (time quantum q) and goes around.
>     - If process finishes in q, immediately start next process.
>     - Process waits not more than (N-1)*q time.
>     
>     ![Round Robin Scheduling](/Resources/Images/RoundRobinScheduling.png)
>     
> - Preemptive:
>     - If they do not finish within the time quantum, interrupted.
> - q large → FCFS, q small → too many context switches.
> - q usually 10ms - 100ms (context swithc < 10 us)

# Forking and Termination

> [!note]- Describe how `fork()` works.
> - Allows the current process (parent) to create a child process.
> - Child address space **is a copy** of the parent address space.
>     - **Resource sharing options** — specify all/subset/none of parent’s resources.
>     - **Execution options** — concurrent or wait until children terminate.
>
> Return value of fork:
>
> - **Child → 0**.
> - **Parent → PID of child (positive).**
> - Negative if failed.
> - **`execlp()`** - execute new program in current process.

> [!note]- Describe process termination, zombie processes and orphan processes.
> - Processes automatically terminate at last statement.
> - Status value/exit code is returned to parent.
> - Resources of process released by OS.
> - Processes are only removed from process table when their exit status is returned.
>
> Code relating to process termination:
>
> - `wait(&val)` — wait for child process to finish, exit code = val.
> - `exit(val)` ****— terminate process with exit code = val.
> - `abort()` — terminate a process.
>     - Usually used to terminate a misbehaving (exceeding resources) or unwanted child.
>     - Cascading termination — can terminate children if parent dies.
>
> **Zombie processes:**
>
> - Child terminates before exit status returned to parent.
> - Resources of child released but PID still in process table.
>
> **Orphan processes:**
>
> - Parent terminates without invoking wait on a child process.
> - The child becomes a parent - init process (PID = 1) assigned to parents.
> - Init process periodically issues wait() to collect exit status of orphan processes.

# Process Communication

> [!note]- Describe the methods of interprocess communication (IPC).
>
> **Shared memory:**
>
> - **Kernel establishes shared region of memory within one of the communicating processes**.
> - Access permissions granted for communicating processes.
> - Communication handled entirely by communicating processes.
>     - **Producer-consumer** can be used with circular queue shared buffer.
> - Faster - no syscall overhead.
>
> **Message passing:**
>
> - **Kernel provides a logical communication channel (a buffer) for processes**.
>     - **Implement `send()` and `receive()`**with message buffer - can be direct or indirect (mailbox).
>     - Blocking (sync):
>         - Block sender until message received.
>         - Block receiver until message available.
>     - Non-blocking (async):
>         - Sender sends message **and continues**.
>         - Receiver receives valid message or **null message**.
> - Syscalls used to pass messages.
> - Easier as no data conflicts.

> [!note]- Describe pipes.
> - **One-way communication** for processes - **output** of a process is **piped to the input** of another process (**producer-consumer**).
> - Named pipes:
>     - Exist as special files in a file system - **persist** when communicating processes exit.
>         - Need to be removed using rm.
>     - Accessible outside of the process that created it.
