# Deadlocks

> [!note]- Describe deadlocks conditions and the system model.
> - Set of processes is in a deadlock when each process in a set is **waiting for an event** that can be **caused only by another process** in the set.
> - Deadlock free does not mean starvation free — only one process needs to be able to make progress.
>
> **Conditions:**
>
> - Mutual exclusion — for resource.
> - Hold and wait — process waiting to acquire resource held by other processes.
> - No preemptions — a resource can only be voluntarily released by process holding it AFTER it completes its task.
> - Circular wait — a subset of the processes where 1 waits for 2, waits for 3, … waits for 1 (dependencies).
>
> **System model:**
>
> - $R_i$ = different types of resources for the system.
> - $W_i$ = **number of instances of** $R_i$
> - $\{P_0, \ ..., \ P_n\}$ = set of processes
> - Can **request**, **use** or **release** resources.

### Resource Allocation Graph and Deadlock Detection

> [!note]- Describe the resource allocation graph.
> - Diagraph G = (V, E)
>     - P vertex — circle.
>     - R vertex — square with circles denoting number of instances.
> - Request edge — $P_i \rightarrow R_j$
> - Assignment edge — $R_j \rightarrow P_i$
>
> ![Resource Allocation Guide](/Resources/Images/AllocationGraphGuide.png)

> [!note]- Describe how to **detect deadlocks** in a resource allocation graph.
> - No cycles ⇒ no deadlock.
> - Cycle ⇒ need to look further.
>
> **Deadlock detection algorithm**
>
> - **Adjacency matrix** for allocation and request.
> - Array for **currently available resources** (length = number of resources).
> - Array for **finished processes** (length = number of processes).
>
> **Example:**
>
> ![Resource Allocation Graph Example](/Resources/Images/AllocationGraphExample.png)
>
> - Fill out allocation and request as per graph.
> - Set all processes as unfinished.
>
> ![Deadlock Detection 1](/Resources/Images/DeadlockDetection1.png)
>
> ![Deadlock Detection 2](/Resources/Images/DeadlockDetection2.png)
>
> - Look for **unfinished process whose requests can be satisfied** (available - request positive?).
>     - Allocation → currently available pool (ADD IT, can be >1).
>     - Satisfy requests for P.
>     - Mark P as finished.
> - If all processes executed by end of algorithm → no deadlock.

### Prevention and Avoidance

> [!note]- Describe how to prevent deadlocks.
> - Avoid no preemption — if process holding resources **requests more resources** **that cannot be immediately allocated,** **release ALL resources** being held.
> - Avoid circular wait — process holding n cannot request a process with a number less than n (cycle is broken).
> - However, this can be restrictive and harmless requests could be blocked (circular wait condition mainly).

> [!note]- Describe deadlock avoidance and Banker’s safety algorithm.
> - **Safe state** — deadlock cannot occur no matter the future requests.
> - Request granted if it leaves system in a safe state.
> - Needs priori (advance information) on resource requirements.
> - Each process declares the max number of each resource type that it MIGHT need.
>
> **Banker’s safety algorithm:**
>
> - **Allocation adjacency matrix.**
> - **Need matrix** is the max allocation a process might ever need (IS EQUAL TO MAX - ALLOCATION).
> - **Available array** at T0 - what resources are immediately available.
> - Find process whose needs can be satisfied (need - available > 0).
> - Work = work + allocation (for that satisfied process).
> - If all processes have needs satisfied - sequence is safe.
> - **Resource request algorithm** - pretend request is granted then use algorithm.
>     - Check request ≤ available.
>     - Allocation = allocation + request.
>     - If safe, grant immediately.
>     - Else keep request pending and restore old safe state.
>     
>     ![Bankers Algorithm](/Resources/Images/BankersAlgorithm.png)

# Synchronisation

> [!note]- Give an overview of synchronisation.
> - Avoid race conditions — race to see which is last.
> - Critical sections — updates to shared variables.
>     - Should be executed with mutual exclusion.

> [!note]- Describe the factors the consider for an ideal solution to synchronisation.
> - **Mutual exclusion** — in critical sections.
> - **Progress** — if process waiting for critical section and no other process is in it, waiting process should be able to enter it.
> - **Bounded waiting** — no process should **wait indefinitely** to enter critical section.
>     - Check if 1 process can keep entering critical section.
> - Describe 3 issues encountered with synchronisation.
>     
>     **Deadlock:**
>     
>     - 2 or more processes waiting indefinitely for an event that can only be caused by the waiting processes.
>     
>     **Starvation:**
>     
>     - When a process has to wait indefinitely when others make progress (opposite of bounded waiting).
>     - Occurs when signal call wakes up the same process again and again.
>     - Process to wait up should be randomly picked.
>     
>     **Priority inversion:**
>     
>     - Lower priority process holds a lock needed by a higher priority process.
>         - Needed due to the way processes may be scheduled.
>         - Lower priority process acts as a higher priority process.
>     - Solve with **priority inheritance protocol**.
>
> Describe synchronisations solutions.

> [!note]- 2 processes cannot have lock at the same time.

> [!note]- Locking and unlocking should be atomically (non-interruptible, implemented with hardware).
>
> **Test and Set:**
>
> ```c
> boolean test_and_set(boolean *target) {
> 	boolean ret = *target;
> 	*target = true; // set to true
> 	return ret;     // return original value
> }
>
> // Solution using not satisfying BW
> // Can satisfy BW using the **WAITING array:**
> // boolean waiting[n];
>
> boolean lock = false;          // false WHEN AVAILABLE
>
> do {
> 	while (test_and_set(&lock) ; // wait if lock is currently false
> 	// CS
> 	lock = false;                // after CS, broadcast it is available again
> } while (1);
> ```
>
> **Mutex locks:**

> [!note]- Synchronisation primitive.
>
> ```c
> struct mutex_lock {
> 	boolean lock;
> 	struct list *waiting;
> }
>
> // perform atomically
> void lock(struct mutex_lock *mutex) {
> 	if (!mutex->lock) {
> 		get calling process P
> 		add P to mutex->waiting
> 		block(P); 
> 	}
> 	mutex->lock=FALSE;
> }
>
> // perform atomically
> void unlock(struct mutex_lock *mutex) {
> 	remove a process P from mutex->list
> 	wakeup(P)
> 	mutex->lock=TRUE;
> }
> ```
>
> **Semaphores:**

> [!note]- Can have integer values.

> [!note]- 0 value → not available

> [!note]- Positive value → available

> [!note]- Negative value → not available.

> [!note]- `wait()` - calling process waits until positive, when it is, decrement by 1.

> [!note]- `signal()` - increments value of semaphore by 1.

> [!note]- Code same as mutex lock but ++ and -- instead of TRUE/FALSE.

### Algorithms

> [!note]- Describe **Peterson’s algorithm**.
> - Busy wait and controls turn.
> - Shared variables:
>     - `int turn` - the process whose turn it is.
>     - `boolean flag[2] = {false, false}` - stores wish to enter CS.
>
> ```c
> boolean flag[2] = {false, false};
> int turn = 0;
>
> // P0
> while (true) {
> 	flag[0] = true; // express wish
> 	turn = 1; // the other process can go even though I want to
> 	while (flag[1] && turn != 0); // if the other process does not want to go OR if its my turn, enter CS
> 	// CS
> 	flag[0] = false;
> 	// finish up	
> }
>
> // P1
> while (true) {
> 	flag[1] = true; 
> 	turn = 0; 
> 	while (flag[0] && turn != 1); 
> 	// CS
> 	flag[1] = false;
> 	// finish up	
> }
>
> ```
>
> - Progress satisfied — **a process cannot immediately re-enter critical section**.
> - Bounded waiting — **a process cannot always be bypassed by another process**.
> - Mutual exclusion — flag + turn to enter CS.
>
> **Issues:**
>
> - Busy wait
> - May fail in modern architectures as R/W operations may be reordered to make programs run more efficiently - use locks.

> [!note]- Describe the **bounded buffer problem** and solution.
> - Should not produce when n buffers are full, should not consume when buffers are empty.
> - Consumer and producer solution:
>
> ```c
> // ARE ALL I THE PERSPECTIVE OF THE BUFFER
> semaphore lock = 1;  // buffer_mutex
> semaphore full = 0;   // full buffer slots
> semaphore empty = n; // empty buffer slots
>
> // Producer
> while (1) {
> 	wait(empty); // only produce if there are empty slots
> 	wait(lock); // lock the buffer
> 	// add item to buffer
> 	signal(lock);
> 	signal(full); // full++ (1 more full slot)
> }
>
> // Consumer
> while (1) {
> 	wait(full); // only consume if there are full slots
> 	wait(lock); // lock the buffer
> 	// remove item from buffer
> 	signal(lock);
> 	signal(empty); // empty++ (1 more empty slot)
> }
>
> ```

> [!note]- Describe the **readers and writer problem** and solution.
> - Shared dataset
>     - Readers and writers (can R + W)
> - Multiple readers should be able to read at the same time.
> - Only 1 write should be able to access data at same time.
>
> ```c
>
> int readers = 0;
> semaphore resource_mutex = 1;
> semaphore reader_mutex = 1;
>
> // writer
> while (1) {
> 	wait(resource_mutex);
> 	**/* WRITE SECTION */**
> 	/signal(resource_mutex);
> }
>
> // reader
> while (1) {
>
> 	// get reader lock, increment AND read then release
> 	wait(reader_mutex);
> 	readers++;
> 	if (readers == 1) wait(resource_mutex); // if you are the first writer, lock the resouce
> 	signal(reader_mutex); 
> 		
> 	**/* READ SECTION */**
> 	
> 	// get reader lock, decrement AND read then release
> 	wait(reader_mutex);
> 	readers--;
> 	if (readers == 0) signal(resource_mutex); // if no readers are left, unlock the resource
> 	signal(reader_mutex); 
> }
> ```

> [!note]- Describe the **dining philosophers problem** and solution.
> - Alternate between think and eat
> - Don’t interact with their neighbours — try to pick up 2 chopsticks (one at a time to eat from bowl). On the table, it is SINGULAR CHOPSTICKS.
>     
>     ![Dining Philosophers Problem](/Resources/Images/PhilosophersProblem.png)
>     
>     ```c
>     semaphore chopstick[5] = {1, 1, 1, 1, 1};
>     semaphore room = 4
>     
>     // Philosopher i
>     while (1) {
>     	wait(room);
>     	wait(chopstick[i]);
>     	wait(chopstick[(i+1) % 5];
>     	// EAT
>     	signal(chopstick[(i+1) % 5];
>     	signal(chopstick[i]);
>     	signal(room);
>     	// THINK
>     } 
>     
>     ```
>     
> - Deadlock can occur — all philosophers become hungry at the same time at grab the left chopstick.
>     - Solve by only allowing at most 4 at the table.
>     - Allow only picking up chopsticks if both available.
>     - Odd and even number philosophers pick up different chopsticks.
