# Lambda Calculus

Lambda Calculus (LC) is a turing-complete computational model.

## Introduction

First, some introductory ideas that you may or may not know from earlier modules.

**Association:** when an operation associates to the left, it means that the operations on the left are grouped and executed first. For example: $f \odot g \odot x = (f \odot g) \odot x$.

With right associativity, what order are things executed?

>[!check]- Solution
> With right associativity, the operations on the right are grouped first: $f \odot g \odot x = f \odot (g \odot x)$.

## Structure

Lambda Calculus is a simple language, with just three terms. An LC expression is defined as:

$$M ::= x \mid (\lambda x.\, M) \mid M\, M$$

Broken down:

- **variables** e.g. $x$, $y$, $z$
- **abstraction** (a fancy term for function creation) e.g. `\x -> x` (which is $(\lambda x.\, M)$ when $M = x$)
- **application** (so calling a function with an argument) e.g. `(\x -> x) y` (which is $M\, M$ where the first $M$ is `\x -> x` and the second is $y$)

>[!warning]- Just syntax
> People get a bit confused by application because it's just two terms next to each other. There is no enforcement in the syntax for the first term $M_1$ in $(M_1\, M_2)$ being an abstraction, even though $M_1$ should be an abstraction for the expression to make sense. This is purely syntax.
>
> We will see later that we have a special name for applications where the first term is an abstraction: these are called reducible expressions (**redexes**), since they can be simplified by passing the argument through the function (called a **beta reduction**).

## Free vs Bound Variables

Variables are **bound** by abstractions. For example, when we have an abstraction $\lambda x.\, M$, then any occurrence of $x$ inside $M$ is bound. A more concrete example: in $\lambda y.\, y$, the $y$ is bound. Bound variable names are completely arbitrary, so the specific name doesn't matter for what the expression does.

**Free** variables are not bound by any abstraction. In actual applications, these would refer to things outside the current expression, like a specific function, constant, or value in the surrounding context.

>[!note]- Define the set of free variables in an expression
> We use the syntax of LC (that we saw earlier) to define free variables. It would look something like:
>
> $\mathrm{FV}(x) = \ldots$
>
> $\mathrm{FV}(\lambda x.\, M) = \ldots$
>
> $\mathrm{FV}(M_1\, M_2) = \ldots$
>
> Now fill in the definitions!

>[!check]- Solution
> $\mathrm{FV}(x) = \{x\}$
>
> $\mathrm{FV}(\lambda x.\, M) = \mathrm{FV}(M) \setminus \{x\}$
>
> *($X \setminus Y$ means to exclude elements of $Y$ from $X$, e.g. $\{a, b, c\} \setminus \{c\} = \{a, b\}$.)*
>
> $\mathrm{FV}(M_1\, M_2) = \mathrm{FV}(M_1) \cup \mathrm{FV}(M_2)$

>[!note]- Putting it all together
> Consider $(\lambda x.\, x\, y)\, z$.
>
> Using what we've learned, $(\lambda x.\, x\, y)$ is an **abstraction**. The whole expression $((\lambda x.\, x\, y)\, z)$ is an **application** of that abstraction (with $z$ being $M_2$).
>
> $x$, $y$, $z$ are variables here, with $x$ being a **bound** variable and $y$, $z$ being **free** variables.

## Substitution

The ***substitution*** $M[x \leftarrow N]$ is the term obtained by replacing every **free** occurrence of the variable $x$ in $M$ with $N$.

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

## Reduction and Equivalence

There are standard ways to simplify/evaluate terms: **beta reduction** and **eta reduction**. We also use **alpha equivalence** to help us.

### Alpha Equivalence

A fancy name for renaming **bound** variables. For example:

$(\lambda x.\, x\, x) = (\lambda y.\, y\, y) = (\lambda z.\, z\, z)$

$(\lambda a\, b.\, b\, a\, a\, c) = (\lambda x\, y.\, y\, x\, x\, c)$

Only bound variables get renamed (note $c$ above stays as $c$).

>[!note]- Why bound and not free?
> Free variables generally aren't renamed because they may refer to specific things outside the expression, like a specific function, constant, or value in the surrounding context. Renaming them would change what the expression is about, which gives you a different expression entirely.
>
> That's why, when there's a conflict between a bound variable and a free variable, it's the bound variable that gets renamed.

This is done using substitution, and matters when bound variables may conflict with free variables. You don't want free variables to be captured!

*(Insert example here)*

Since we can alpha convert the other way (so it's reversible), the two expressions are considered equivalent. Hence alpha equivalence.

### Eta Reduction

Eta reduction simplifies an abstraction of the form $\lambda x.\, M\, x$:

$$\lambda x.\, M\, x \rightarrow_\eta M$$

It is the same as removing an unnecessary function call, like in the example below.

```rust
fn f(x) {
  g(x)
}
```

Here, `f` is a useless function and just does what `g` does with extra steps.

## Reduction Order

## Evaluation Order

## Normal Forms

## "Extensions" to LC

## Proof Rules

## Evaluation Contexts
