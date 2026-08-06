# Lambda Calculus

Notes for [Principles of Programming Languages (CS349)](/module/CS349).

## Introduction

First, some introductory ideas that you may or may not know from earlier modules.

**Association:** when an operation associates to the left, it means that the operations on the left are grouped and executed first. For example: $f\, g\, x = (f\, g)\, x$.

With right associativity, what order are things executed?

>[!check]- Solution
> With right associativity, the operations on the right are grouped first: $f\, g\, x = f\,(g\, x)$.

## Substitution

The ***substitution*** $M[x \leftarrow N]$ is the term obtained by replacing every **free** occurrence of the variable $x$ in $M$ with $N$. The "free" qualifier matters - see rule **(4)** below, where it forces the substitution to leave a $\lambda x$-bound body untouched.

We define it inductively on the structure of $M$. Write $\mathrm{FV}(M)$ for the set of free variables of $M$.

**(1)** $\ x[x \leftarrow N] = N$

Substituting $N$ for $x$ in the variable $x$ itself just yields $N$.

**(2)** $\ a[x \leftarrow N] = a$, for $a \neq x$

A different variable is unaffected. Note that $a=x$ leads to rule 1 being applied.

**(3)** $\ (P\, Q)[x \leftarrow N] = (P[x \leftarrow N])(Q[x \leftarrow N])$

Substitution distributes over application - substitute into each side separately.

**(4)** $\ (\lambda x.\, M)[x \leftarrow N] = \lambda x.\, M$

Every occurrence of $x$ inside $M$ is bound by the surrounding $\lambda x$, so none of them are free, and the substitution has nothing to do.

**(5)** $\ (\lambda y.\, M)[x \leftarrow N] = \lambda y.\, M[x \leftarrow N]$, provided $x \neq y$ and $y \notin \mathrm{FV}(N)$

If the bound variable $y$ is different from $x$ *and* doesn't appear free in $N$, we can safely push the substitution under the $\lambda$. Note that $y=x$ leads to rule 4 being appplied, and $y \in \mathrm{FV}{N}$ leads to rule 6 being applied.

**(6)** $\ (\lambda y.\, M)[x \leftarrow N] = \lambda z.\, ((M[y \leftarrow z])[x \leftarrow N])$, where $x, y \neq z$ and $z \notin \mathrm{FV}(M\, N)$

The case where (5) doesn't apply: $y$ *is* free in $N$, so blindly pushing the substitution under $\lambda y$ would capture it. To avoid capture, we ***$\alpha$-rename*** the bound variable first - pick a fresh $z$ (distinct from $x$ and $y$, and not free in either $M$ or $N$), rename $y$ to $z$ inside $M$, and *then* perform the original substitution.
