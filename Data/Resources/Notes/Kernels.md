# Kernels

> [!note]- Describe the kernel of an OS.
> - An interface between hardware and processes.
> - Runs at all times.
> - Loaded into main memory at start up.

# Dual Mode Operation

> [!note]- Describe user space and kernel space.
>
> **Kernel space:**
>
> - Section of memory which the kernel executes.
> - Protected from user space and accessed via system calls.
>
> **User space:**
>
> - Section of memory which user processes run.

> [!note]- Describe dual mode operation.
> - Privileged instructions only executable in kernel mode.
> - Mode bit indicates kernel or user mode.
> - After syscall is made, mode bit reset.
> - 1 = user, 0 = kernel.

# Structures

> [!note]- Describe a monolithic structure OS.
> - All functions built into kernel:
>     - (+) Minimum syscall overhead.
>     - (-) Hard to debug.
> - Unstructured - interfaces and levels not well defined.
>     - (-) Nothing stopping an applications directly accessing I/O devices.
>     - Dual mode operation not supported at the time these OS existed.

> [!note]- Describe a layered structure OS.
> - **Layer 0 = hardware.**
> - Reduces dependencies between different parts of kernel code.
> - Layer K uses services from layer K-1 and provides services to layer K+1.
> - **Pros:**
>     - (+) Simplicity — debugging and construction.
>     - (+) Clear interfaces to layers.
> - **Cons:**
>     - (-) Difficult to define layers.
>     - (-) Performance — syscalls may have to access multiple layers leading to greater overhead.

> [!note]- Describe a microkernel.
> - Kernel only contains essential components:
>     - Process management, memory management, inter-process communication.
> - Non-essential components implemented as system or user level programs.
> - **Pros:**
>     - (+) Easy to extend.
>     - (+) Secure and reliable.
> - **Cons:**
>     - (-) Performance — increased syscall overhead.

> [!note]- Describe a loadable modules OS.
> - Kernel provides core services at startup.
> - Services that are not running but are needed are dynamically implemented as the kernel is running.
> - **Pros:**
>     - (+) Provides flexibility and modularity — add functionality without modifying core kernel.
>     - (+) Easier to work on — only need to look at a specific module.
>     - (+) Reduced kernel size.
> - **Cons:**
>     - (-) Performance overhead — loading, managing modules, syscalls.
>     - (-) Security — loadable modules increases security vulnerabilities.
>     - (-) Stability — poorly made modules can break the OS.
