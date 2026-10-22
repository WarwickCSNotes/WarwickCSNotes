#Y1/CS143
**Computation** is really about a box that takes inputs and gives outputs. We must define two, things:

- **What** is being computed. This describes the **specification** of the computation, and is like a mathematical function from the inputs to the outputs. We also call this the **computational task**.
- **How** we are going to compute this. This is the **implementation** of the computation, a program P that when ran on $x \in Inputs$ will output $f(x)$ . We also call this the **algorithm**.

Big Idea 1:
## FUNCTIONS are NOT PROGRAMS

___
#### Examples

Specification: Addition. Input: integers $x, y$ (or rather string representations of these). Output: $x+y$.
Implementation: Primary school addition algorithm.

Specification: Factor. Input: integer $x$. Output: $(p, q)$ such that $p,q \ge 1 \wedge pq=x$.
Implementation: (algorithm)

Specification: Loop? Input: a python program P. Output: YES if there is an input x such that P never stops if ran from said input.
Implementation: impossible.