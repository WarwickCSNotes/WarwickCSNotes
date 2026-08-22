In a linear program, you have a series of constraints and some objective function to maximise or minimise.

For example:

$$\begin{aligned}
\text{Maximise } \quad & x_1 + x_2 \\
\text{subject to } \quad & x_1 \leq 3 \\
& x_2 \leq 2 \\
& x_1,\, x_2 \geq 0
\end{aligned}$$

In this program, our objective function is $x_1 + x_2$.

A **feasible solution** is a set of values for the variables such that the constraints are satisfied. We notate it by an ordered tuple $(v_1, v_2, \ldots, v_n)$ where $x_i$ is set to $v_i$.

We can come up with many feasible solutions for our linear program: for instance, $(1, 2)$, $(2, 0)$, $(2.5, 1.5)$, etc.

With each feasible solution, we calculate a **lower bound** for the optimum. With $(1, 2)$, we get a value of $1 + 2 = 3$, so we know $\text{OPT} \geq 3$. With $(2.5, 1.5)$, we get $2.5 + 1.5 = 4$, so $\text{OPT} \geq 4$.

Here it's pretty obvious that the optimal solution is $(3, 2)$, giving $\text{OPT} \geq 5$. However, it's not so easy for other linear programs. Is there a way we can prove an **upper bound** for $\text{OPT}$, something of the form $\text{OPT} \leq v$?

## Finding the Dual (of a maximising problem)

First, we'll make some assumptions to simplify things (there's a section further down justifying these):

1. All variables are $\geq 0$.
2. There are no equality constraints, only inequalities ($<$, $>$, $\leq$, $\geq$).

### We can manipulate constraints

We can manipulate the constraints we have. We can freely add constraints together to produce new valid constraints. We can also multiply constraints up or down (as long as we multiply by some $y \geq 0$, so the direction of the inequality is preserved). For instance, for the program above, we can get the new constraints:

$$\begin{aligned}
2x_1 &\leq 6 \\
4x_2 &\leq 8 \\
x_1 + x_2 &\leq 5
\end{aligned}$$

>[!check]- How did we get the new constraints?
> Label the original constraints as (1) $x_1 \leq 3$ and (2) $x_2 \leq 2$.
>
> - $2x_1 \leq 6$: multiply (1) by $2$.
> - $4x_2 \leq 8$: multiply (2) by $4$.
> - $x_1 + x_2 \leq 5$: add (1) and (2), so $x_1 + x_2 \leq 3 + 2 = 5$.

### Introducing variables

So we can freely manipulate the constraints. We'll introduce variables ($y_1, y_2, \ldots, y_n$) for each constraint we have. We get new constraints by multiplying the old constraints by these variables:

$$\begin{aligned}
y_1 x_1 &\leq 3 y_1 \\
y_2 x_2 &\leq 2 y_2
\end{aligned}$$

We also have to add new constraints, since we can only scale by a non-negative number:

$$y_1,\, y_2 \geq 0$$

### The target statement

Since we want something of the form $\text{OPT} \leq v$, we really want something like $\text{objective function} \leq \text{some constrained variables}$, e.g. $x_1 + x_2 \leq y_1 + y_2$. If we have something like this, we can plug in values for the constrained variables ($y_1, y_2$ in this example) to get upper bounds on the optimum.

Right now, we have some intermediate constraints which have both the old and new variables in them. If we can establish a chain $\text{objective function} \leq \text{in-between constraints} \leq \text{purely new-variable constraints}$, then we can conclude $\text{objective function} \leq \text{purely new-variable constraints}$.

We can quickly see we have $\text{in-between constraints} \leq \text{purely new-variable constraints}$ by adding our constraints together:

$$\begin{aligned}
y_1 x_1 &\leq 3 y_1 \\
y_2 x_2 &\leq 2 y_2
\end{aligned}$$

becomes

$$y_1 x_1 + y_2 x_2 \;\leq\; 3 y_1 + 2 y_2$$

Now, we just need to establish $\text{objective function} \leq \text{in-between constraints}$, i.e. we need $x_1 + x_2 \leq y_1 x_1 + y_2 x_2$. We can do this by constraining $y_1$ and $y_2$ further so this is true; after all, we introduced them. As long as we don't break the constraint $y_1, y_2 \geq 0$, we can do what we want with them.

Let's see how we need $y_1$ and $y_2$ to be constrained by grouping the coefficients of $x_1$ and $x_2$ in $x_1 + x_2 \leq y_1 x_1 + y_2 x_2$:

$$0 \;\leq\; x_1(y_1 - 1) + x_2(y_2 - 1)$$
