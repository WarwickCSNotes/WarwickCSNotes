In a linear program, you have a series of constraints and some objective function to maximise or minimise.

For example:

$$
\begin{aligned}
\text{Maximise } \quad & x_1 + x_2 \\
\text{subject to } \quad & x_1 \leq 3 \\
& x_2 \leq 2 \\
& x_1,\, x_2 \geq 0
\end{aligned}
$$

In this program, our objective function is $x_1 + x_2$.

A **feasible solution** is a set of values for the variables such that the constraints are satisfied. We notate it by an ordered tuple $(v_1, v_2, \ldots, v_n)$ where $x_i$ is set to $v_i$.

We can come up with many feasible solutions for our linear program: for instance, $(1, 2)$, $(2, 0)$, $(2.5, 1.5)$, etc.

With each feasible solution, we calculate a **lower bound** for the optimum. With $(1, 2)$, we get a value of $1 + 2 = 3$, so we know $\text{OPT} \geq 3$. With $(2.5, 1.5)$, we get $2.5 + 1.5 = 4$, so $\text{OPT} \geq 4$.

Here it's pretty obvious that the optimal solution is $(3, 2)$, giving $\text{OPT} \geq 5$. However, it's not so easy for other linear programs. Is there a way we can prove an **upper bound** for $\text{OPT}$, something of the form $\text{OPT} \leq v$?

## Assumptions

To simplify things, we'll make some assumptions that apply to both the maximising and minimising cases below:

1. All variables are $\geq 0$.
2. There are no equality constraints, only inequalities ($<$, $>$, $\leq$, $\geq$).
3. The LP is in **standard form**.
    - For minimisation problems, the inequalities all use $\geq$.
    - For maximisation problems, the inequalities all use $\leq$.
4. There is a feasible and bounded solution.

## Finding the Dual (of a maximising problem)

Under the [Assumptions](#assumptions) above, we can start manipulating the LP.

### We can manipulate constraints

We can manipulate the constraints we have. We can freely add constraints together to produce new valid constraints. We can also multiply constraints up or down (as long as we multiply by some $y \geq 0$, so the direction of the inequality is preserved). For instance, for the program above, we can get the new constraints:

$$
\begin{aligned}
2x_1 &\leq 6 \\
4x_2 &\leq 8 \\
x_1 + x_2 &\leq 5
\end{aligned}
$$

>[!check]- How did we get the new constraints?
> Label the original constraints as (1) $x_1 \leq 3$ and (2) $x_2 \leq 2$.
>
> - $2x_1 \leq 6$: multiply (1) by $2$.
> - $4x_2 \leq 8$: multiply (2) by $4$.
> - $x_1 + x_2 \leq 5$: add (1) and (2), so $x_1 + x_2 \leq 3 + 2 = 5$.

### Introducing variables

So we can freely manipulate the constraints. We'll introduce variables ($y_1, y_2, \ldots, y_n$) for each constraint we have. We get new constraints by multiplying the old constraints by these variables:

$$
\begin{aligned}
y_1 x_1 &\leq 3 y_1 \\
y_2 x_2 &\leq 2 y_2
\end{aligned}
$$

We also have to add new constraints, since we can only scale by a non-negative number:

$$y_1,\, y_2 \geq 0$$

### The target statement

Since we want something of the form $\text{OPT} \leq v$, we really want something like $\text{objective function} \leq \text{some constrained variables}$, e.g. $x_1 + x_2 \leq y_1 + y_2$. If we have something like this, we can plug in values for the constrained variables ($y_1, y_2$ in this example) to get upper bounds on the optimum.

Right now, we have some intermediate constraints which have both the old and new variables in them. If we can establish a chain $\text{objective function} \leq \text{in-between constraints} \leq \text{purely new-variable constraints}$, then we can conclude $\text{objective function} \leq \text{purely new-variable constraints}$.

We can quickly see we have $\text{in-between constraints} \leq \text{purely new-variable constraints}$ by adding our constraints together:

$$
\begin{aligned}
y_1 x_1 &\leq 3 y_1 \\
y_2 x_2 &\leq 2 y_2
\end{aligned}
$$

becomes

$$
y_1 x_1 + y_2 x_2 \;\leq\; 3 y_1 + 2 y_2
$$

Now, we just need to establish $\text{objective function} \leq \text{in-between constraints}$, i.e. we need $x_1 + x_2 \leq y_1 x_1 + y_2 x_2$. We can do this by constraining $y_1$ and $y_2$ further so this is true; after all, we introduced them. As long as we don't break the constraint $y_1, y_2 \geq 0$, we can do what we want with them.

Let's see how we need $y_1$ and $y_2$ to be constrained by grouping the coefficients of $x_1$ and $x_2$ in $x_1 + x_2 \leq y_1 x_1 + y_2 x_2$:

$$
0 \;\leq\; x_1(y_1 - 1) + x_2(y_2 - 1)
$$

So the above is true when every term in $x_1(y_1 - 1) + x_2(y_2 - 1)$ is positive or zero. We want $x_1(y_1 - 1) \geq 0$ and $x_2(y_2 - 1) \geq 0$, which happens when $y_1 - 1 \geq 0$ and $y_2 - 1 \geq 0$ (since $x_1, x_2 \geq 0$).

Our constraints are:

$$
\begin{aligned}
y_1 &\geq 1 \\
y_2 &\geq 1
\end{aligned}
$$

So, with the above constraints in place, we have:

$$
x_1 + x_2 \;\leq\; y_1 x_1 + y_2 x_2 \;\leq\; 3 y_1 + 2 y_2
$$

And therefore:

$$
x_1 + x_2 \;\leq\; 3 y_1 + 2 y_2
$$

And thus:

$$
\text{Objective Function} \;\leq\; 3 y_1 + 2 y_2
$$

To get as tight an upper bound as possible, we want to lower the value of $3 y_1 + 2 y_2$. Essentially, we have obtained some new variables and constraints and a value we want to minimise.

### The Dual

We have just figured out the **dual** of the original LP. The dual is a program:

$$
\begin{aligned}
\text{Minimise } \quad & 3 y_1 + 2 y_2 \\
\text{subject to } \quad & y_1 \geq 1 \\
& y_2 \geq 1 \\
& y_1,\, y_2 \geq 0
\end{aligned}
$$

We have a special relationship between the original LP (called the **primal**) and the dual LP. Say $\text{OPT}_1$ is the optimum of the primal LP, and $\text{OPT}_2$ is the optimum of the dual LP.

$$
\text{OPT}_1 \;\leq\; \text{OPT}_2
$$

So finding better solutions for the primal LP provides a better lower bound for $\text{OPT}_2$, and finding better solutions for the dual LP provides a better upper bound for $\text{OPT}_1$.

## Finding the dual (of a minimising problem)

We will omit a lot of explanation for brevity, since we had that logic in the maximising problem. We make the same assumptions (except of course, the symbol used is $\geq$ for all constraints since it's a minimisation problem).

I recommend following along with the below to get some practice with deriving duals. Let's use the following LP as an example:

$$
\begin{aligned}
\text{Minimise } \quad & 2 x_1 + 3 x_2 + 4 x_3 \\
\text{subject to } \quad & x_1 + x_3 \geq 1 \\
& x_2 + x_3 \geq 6 \\
& x_1,\, x_2,\, x_3 \geq 0
\end{aligned}
$$

Let's introduce some variables $y_1, y_2$ for each constraint:

>[!check]- Introducing variables
> $$
> \begin{aligned}
> y_1 x_1 + y_1 x_3 &\geq y_1 \\
> y_2 x_2 + y_2 x_3 &\geq 6 y_2
> \end{aligned}
> $$

Let's combine the new constraints into one inequality and group the coefficients of $(x_1, x_2, x_3)$ together:

>[!check]- Combining and grouping
> $$
> (y_1) x_1 + (y_2) x_2 + (y_1 + y_2) x_3 \;\geq\; y_1 + 6 y_2
> $$

Let's form the target statement (what we want to be true):

>[!check]- Target statement
> $$
> 2 x_1 + 3 x_2 + 4 x_3 \;\geq\; (y_1) x_1 + (y_2) x_2 + (y_1 + y_2) x_3
> $$

Let's solve for the constraints of the dual (what constraints must we have for our newly introduced variables?):

>[!check]- Constraints
> We should move the terms so that we have all the terms $\geq 0$:
>
> $$
> (2 - y_1) x_1 + (3 - y_2) x_2 + (4 - y_1 - y_2) x_3 \;\geq\; 0
> $$
>
> Since $x_1, x_2, x_3 \geq 0$, we need each coefficient to be $\geq 0$:
>
> $$
> (2 - y_1) \geq 0 \quad\text{and}\quad (3 - y_2) \geq 0 \quad\text{and}\quad (4 - y_1 - y_2) \geq 0
> $$
>
> which gives us:
>
> $$
> y_1 \leq 2 \quad\text{and}\quad y_2 \leq 3 \quad\text{and}\quad y_1 + y_2 \leq 4
> $$
>
> From introducing the variables in the first place, we also have $y_1, y_2 \geq 0$ (since inequalities don't get flipped only if the multiplier is non-negative).

Now we have our constraints, we can form the dual LP:

>[!check]- Dual LP
> $$
> \begin{aligned}
> \text{Maximise } \quad & y_1 + 6 y_2 \\
> \text{subject to } \quad & y_1 \leq 2 \\
> & y_2 \leq 3 \\
> & y_1 + y_2 \leq 4 \\
> & y_1,\, y_2 \geq 0
> \end{aligned}
> $$

## The Primal and the Dual

The primal and the dual have a special relationship. Note that which is called the primal and which is called the dual is kind of arbitrary: if you find the dual of the dual, you get the primal back.

When you find the dual of an LP:

- Each **variable** in the dual comes from a **constraint** in the primal.
- Each **constraint** in the dual comes from a **variable** in the primal.
- The **direction** of the objective is reversed (if the primal is maximising then the dual is minimising, and vice versa).

Can you think of some reasons for the above?

>[!check]- Reasoning
> - **Each variable in the dual is from a constraint in the primal:** we introduce one new variable ($y_i$) per constraint when deriving the dual.
> - **Each constraint in the dual is from a variable in the primal:** the dual's constraints fall out of grouping the coefficients of the primal's variables in the target statement.
> - **Direction change:** the dual is set up to bound the primal. A maximising primal is bounded *above* by any feasible dual solution, so we minimise the dual objective to squeeze that upper bound as tight as possible. Symmetrically, a minimising primal is bounded *below*, so its dual maximises. Either way, the dual's objective naturally moves in the opposite direction.

### Weak Duality Theorem

The **Weak Duality Theorem** refers to the property that the optimal values of the primal and dual are related by an inequality.

- If the primal is **maximising** with optimum $\text{OPT}_1$, and the dual is **minimising** with optimum $\text{OPT}_2$, then $\text{OPT}_2 \geq \text{OPT}_1$.
- If the primal is **minimising** with optimum $\text{OPT}_1$, and the dual is **maximising** with optimum $\text{OPT}_2$, then $\text{OPT}_1 \geq \text{OPT}_2$.

>[!note]- Some intuition
> If the primal is maximising, we're trying to find as big an $\text{OPT}$ as possible. We don't know how far this goes, so the dual is introduced to provide an upper bound: any dual-feasible objective is $\geq$ the primal optimum, and we minimise it to squeeze the bound tight.
>
> Symmetrically, if the primal is minimising, we're trying to find as small an $\text{OPT}$ as possible, and the dual is a lower bound that we maximise.

### Strong Duality Theorem

The **Strong Duality Theorem** refers to the property that the optimal values of the primal and dual are exactly the same:

- If the primal has optimum $\text{OPT}_1$ and the dual has optimum $\text{OPT}_2$, then $\text{OPT}_1 = \text{OPT}_2$.
