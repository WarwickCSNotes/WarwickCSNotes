# Predicate Logic

Propositional logic lets us combine simple statements with logical operators, but it's limited: every statement is a single, atomic truth value. We can't express things like "every student passed" or "there exists a number bigger than $100$" without saying more about the things the statement is *about*.

**Predicate logic** (sometimes called **first-order logic**) extends propositional logic with two new ingredients:
- **Predicates**, which are properties or relations that depend on one or more variables.
- **Quantifiers**, which let us say things hold "for all" or "there exists" some value of a variable.

## Predicates

A **predicate** is like a function that returns a truth value. It depends on one or more variables, and only becomes a proposition (with a definite truth value) once its variables are given specific values.

For example, let $P(x)$ stand for "$x$ is even". Then:
- $P(4)$ is true.
- $P(7)$ is false.
- $P(x)$ on its own has no truth value, since we don't know what $x$ is.

Predicates can take more than one argument: $L(x, y)$ might mean "$x$ loves $y$", $D(x, y)$ might mean "$x$ divides $y$", and so on.

## Domain of Discourse

To pin a predicate down, we have to know what values its variables can take. The set we draw from is called the **domain** (or **universe**).

For example, "$x$ is even" only makes sense once we say what $x$ ranges over: $\mathbb{Z}$, $\mathbb{N}$, or some specific finite set. The truth of statements involving $x$ depends on the domain we picked.

## Quantifiers

We use **quantifiers** to make claims about *all* or *some* values of a variable, ranging over a domain.

### Universal Quantifier ($\forall$)

$\forall x.\, P(x)$, read "for all $x$, $P(x)$", is true exactly when $P(x)$ is true for *every* value $x$ in the domain.

For example, with the domain $\mathbb{R}$ and $P(x)$ standing for "$x \cdot 0 = 0$", the statement $\forall x.\, P(x)$ is true: every real number times $0$ is $0$.

### Existential Quantifier ($\exists$)

$\exists x.\, P(x)$, read "there exists $x$ such that $P(x)$", is true exactly when $P(x)$ is true for *at least one* value $x$ in the domain.

For example, with the domain $\mathbb{R}$ and $P(x)$ standing for "$x^2 = 2$", the statement $\exists x.\, P(x)$ is true (take $x = \sqrt{2}$). With the domain $\mathbb{Q}$, the same statement would be false: there is no rational $x$ with $x^2 = 2$.

>[!info]- Negating "for all" and "there exists"
> "Not for all $x$, $P(x)$" means there is *some* $x$ for which $P(x)$ is false. That is:
> $\neg(\forall x.\, P(x)) \;\equiv\; \exists x.\, \neg P(x)$.
>
> Symmetrically, the negation of $\exists$ flips to $\forall$:
> $\neg(\exists x.\, P(x)) \;\equiv\; \forall x.\, \neg P(x)$.
>
> So negation **swaps** $\forall$ and $\exists$ and pushes the negation onto the predicate.
>
> **Watch out:** the negation of "every student passed" ($\forall s.\, \text{passed}(s)$) is "*some* student didn't pass" ($\exists s.\, \neg\text{passed}(s)$), *not* "no student passed" ($\forall s.\, \neg\text{passed}(s)$, which is much stronger).

### Order of Quantifiers Matters

When quantifiers are nested, their order matters. In general $\forall x.\, \exists y.\, P(x, y)$ is *not* the same as $\exists y.\, \forall x.\, P(x, y)$.

For example, with the domain $\mathbb{Z}$ and $P(x, y)$ being "$y > x$":
- $\forall x.\, \exists y.\, y > x$ is true: for every integer $x$, there is some integer (e.g. $x + 1$) larger than it.
- $\exists y.\, \forall x.\, y > x$ is false: there is no single integer $y$ that is bigger than every integer.

So "for every $x$, *some* $y$ works" is much weaker than "*some* $y$ works for every $x$".

## Bound and Free Variables

Inside a formula, a variable is either **bound** or **free**.

- A variable is **bound** if it sits underneath a $\forall$ or $\exists$ that binds it.
- A variable is **free** if it isn't bound. A free variable is a "placeholder", and the formula's truth depends on what we plug in for it.

For example, in
$\forall x.\, (P(x) \wedge Q(y))$
the variable $x$ is bound (by the $\forall$) and $y$ is free. The truth of this formula depends on the value of $y$, but not on any specific $x$.

A formula with no free variables is called a **sentence** (or a **closed formula**). A sentence has a definite truth value once the domain and predicates are fixed. A formula *with* free variables behaves more like a predicate, since its truth value depends on the values supplied for the free variables.

>[!info]- Renaming bound variables
> The name of a bound variable doesn't matter, you can rename it without changing the meaning of the formula:
> $\forall x.\, P(x) \;\equiv\; \forall y.\, P(y)$.
>
> This is known as $\alpha$-renaming (or alpha-conversion). The only constraint is that the new name doesn't accidentally clash with a free variable already in the formula.
