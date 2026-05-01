# Propositional Logic

In the everyday, we talk using loose and casual language which can have many interpretations. However, in mathematics, we must be precise and clear in our language. To this end, we have the language of **logic**. 

## Statements

In Propositional Logic, we can express statements that are either **true** or **false**. It is not valid to give statements that don't have a truthiness (e.g. "Enjoy CS130 or else..." or "What about questions?") or are paradoxical (e.g. the Liar's paradox: "This statement is false").

## Atomic Propositions

An **atomic proposition** is a statement that cannot be broken down into smaller statements. For example, $p$ might stand for "it is raining" or "$2 + 2 = 4$".

We typically use lowercase letters like $p, q, r, \ldots$ for atomic propositions. The whole point is that an atomic proposition is a single, indivisible truth value: it is either true or false, and we don't need to look at its internal structure.

To build more complex statements (called **compound propositions**), we combine atomic propositions using **logical operators**.

## Logical Operators

There are four basic logical operators we use most: **not**, **and**, **or**, and **implies**.

### NOT (Negation)

$\neg p$ is true exactly when $p$ is false.

| $p$ | $\neg p$ |
| --- | --- |
| T | F |
| F | T |

### AND (Conjunction)

$p \wedge q$ is true exactly when both $p$ and $q$ are true.

| $p$ | $q$ | $p \wedge q$ |
| --- | --- | --- |
| T | T | T |
| T | F | F |
| F | T | F |
| F | F | F |

### OR (Disjunction)

$p \vee q$ is true when at least one of $p$ or $q$ is true.

| $p$ | $q$ | $p \vee q$ |
| --- | --- | --- |
| T | T | T |
| T | F | T |
| F | T | T |
| F | F | F |

### Implies (Implication)

$p \rightarrow q$ is false only when $p$ is true and $q$ is false. In every other case it's true.

| $p$ | $q$ | $p \rightarrow q$ |
| --- | --- | --- |
| T | T | T |
| T | F | F |
| F | T | T |
| F | F | T |

>[!info]- How many binary logical operators are there in total?
> A binary operator on $\{T, F\}$ has $4$ possible inputs ($TT, TF, FT, FF$) and assigns each one to either $T$ or $F$. That gives $2^4 = 16$ distinct binary operators.
>
> $\wedge, \vee, \rightarrow$ are three of the more useful ones, but we'll meet others (like XOR and the biconditional) too.

## Close look at Implication

Implication is worth a closer look, because it's so fundamental to proofs and logic, especially since $p \implies q$ can be thought of as "if $p$ then $q$". 

The statement $p \rightarrow q$ ("if $p$ then $q$") says: *whenever $p$ holds, $q$ also holds*. It does **not** say "if $q$ then $p$" - those are *very* different statements.

>[!info]- Intuition for $(p \rightarrow q) \neq (q \rightarrow p)$
> "If it is raining then the ground is wet" is not the same as "If the ground is wet then it is raining". The ground could be wet for many other reasons: a sprinkler, a spilt drink, a recent flood. So $p \rightarrow q$ doesn't give you $q \rightarrow p$ for free.

If you want both directions to hold, $p \rightarrow q$ **and** $q \rightarrow p$, then $p$ and $q$ are logically equivalent $p \leftrightarrow q$. This is true exactly when $p$ and $q$ have the same truth value, hence logical equivalence. It is also written $p \equiv q$.

### Sufficient and Necessary

We use the language of "sufficient" and "necessary" to talk about implications. If $p \rightarrow q$:
- $p$ is **sufficient** for $q$: knowing $p$ alone is enough to conclude $q$.
- $q$ is **necessary** for $p$: $p$ cannot hold without $q$ also holding.

So $p \leftrightarrow q$ ("$p$ if and only if $q$") means $p$ is both sufficient *and* necessary for $q$, i.e. they're equivalent.

>[!info]- The Contrapositive
> The **contrapositive** of $p \rightarrow q$ is $\neg q \rightarrow \neg p$. The two are logically equivalent:
> $p \rightarrow q \;\equiv\; \neg q \rightarrow \neg p$.
>
> **Proof:** Convert each implication into its disjunctive form using $a \rightarrow b \;\equiv\; \neg a \vee b$:
> 1. $p \rightarrow q \;\equiv\; \neg p \vee q$
> 2. By commutativity, $\neg p \vee q \;\equiv\; q \vee \neg p$
> 3. By double negation, $q \vee \neg p \;\equiv\; \neg(\neg q) \vee \neg p$
> 4. Re-applying the implication equivalence (in reverse), $\neg(\neg q) \vee \neg p \;\equiv\; \neg q \rightarrow \neg p$.
>
> The contrapositive is often easier to work with than the original: instead of proving "$p$ implies $q$" directly, you can prove "if $q$ fails, then $p$ fails too".

## Tautology

A **tautology** is a propositional formula that evaluates to true under *every* assignment of its atomic propositions.

The classic example is $p \vee \neg p$ (the law of the excluded middle). Whatever $p$ is, exactly one of $p$ and $\neg p$ is true, so the disjunction is always true:

| $p$ | $\neg p$ | $p \vee \neg p$ |
| --- | --- | --- |
| T | F | T |
| F | T | T |

The dual concept is a **contradiction**: a formula that is false under every assignment, like $p \wedge \neg p$. A formula that is sometimes true and sometimes false is called a **contingency**.

## Propositional Logic Laws

The following laws are equivalences ($\equiv$) you can substitute freely when manipulating formulas. They mirror the corresponding laws of set theory.

| Law | Statement |
| --- | --- |
| **Double Negation** | $\neg(\neg p) \equiv p$ |
| **Idempotence** | $p \wedge p \equiv p$,$\quad$ $p \vee p \equiv p$ |
| **Commutativity** | $p \wedge q \equiv q \wedge p$,$\quad$ $p \vee q \equiv q \vee p$ |
| **Associativity** | $(p \wedge q) \wedge r \equiv p \wedge (q \wedge r)$,$\quad$ $(p \vee q) \vee r \equiv p \vee (q \vee r)$ |
| **Distributivity** | $p \wedge (q \vee r) \equiv (p \wedge q) \vee (p \wedge r)$,$\quad$ $p \vee (q \wedge r) \equiv (p \vee q) \wedge (p \vee r)$ |
| **Annihilation** | $p \wedge F \equiv F$,$\quad$ $p \vee T \equiv T$ |
| **Identity** | $p \wedge T \equiv p$,$\quad$ $p \vee F \equiv p$ |
| **Absorption** | $p \wedge (p \vee q) \equiv p$,$\quad$ $p \vee (p \wedge q) \equiv p$ |
| **Excluded Middle** | $p \vee \neg p \equiv T$,$\quad$ $p \wedge \neg p \equiv F$ |
| **De Morgan's** | $\neg(p \wedge q) \equiv \neg p \vee \neg q$,$\quad$ $\neg(p \vee q) \equiv \neg p \wedge \neg q$ |

These laws let you simplify or rearrange formulas without changing their truth values, and most proofs of equivalence in propositional logic are just chained applications of them.