# Relations

A **relation** between sets $A$ and $B$ is a subset of $A \times B$. That is, a relation $R \subseteq A \times B$ picks out which pairs $(a, b)$ are "related" and which aren't.

We write $aRb$ to mean $(a, b) \in R$, read "$a$ is related to $b$ by $R$" (or just "$a R b$"). When $A = B$, we say $R$ is a relation **on** $A$.

## An Example

Let $A = \{1, 2, 3, 4\}$ and let $R = \{(1, 2), (2, 3), (1, 3), (3, 3)\}$. Then:
- $1 R 2$ (since $(1, 2) \in R$).
- $1 R 3$, $2 R 3$, $3 R 3$.
- But $2$ is not related to $1$, since $(2, 1) \notin R$.
- And $4$ isn't related to anything (there's no pair starting with $4$ in $R$).

## Properties of Relations

A relation $R$ on $A$ may have any of the following properties.

- **Reflexive:** $aRa$ for every $a \in A$. $\quad(\forall a \in A.\; aRa)$
- **Symmetric:** if $aRb$ then $bRa$. $\quad(\forall a, b.\; aRb \rightarrow bRa)$
- **Transitive:** if $aRb$ and $bRc$ then $aRc$. $\quad(\forall a, b, c.\; (aRb \wedge bRc) \rightarrow aRc)$
- **Antisymmetric:** if $aRb$ and $bRa$ then $a = b$. $\quad(\forall a, b.\; (aRb \wedge bRa) \rightarrow a = b)$

A relation that is **reflexive, symmetric, and transitive** is called an **equivalence relation**. Equivalence relations are essentially "$=$ but more relaxed", they group elements into clumps that count as "the same" in some sense.

A relation that is **reflexive, antisymmetric, and transitive** is called a **partial order**. Partial orders are essentially "$\leq$ but more relaxed", they let you compare some elements without requiring every pair to be comparable.

>[!info]- Three useful built-in relations
> Three relations that come up constantly (and are often the answer to exam questions, or a useful starting point) are the **empty**, **complete**, and **equality** relations on a set $A$.
>
> - **Empty:** $R = \emptyset$, no pair is related.
> - **Complete:** $R = A \times A$, every pair is related.
> - **Equality:** $R = \{(a, a) : a \in A\}$, only equal elements are related.
>
> | Property | Empty $\emptyset$ | Complete $A \times A$ | Equality |
> | --- | --- | --- | --- |
> | Reflexive | No (if $A \neq \emptyset$) | Yes | Yes |
> | Symmetric | Yes (vacuously) | Yes | Yes |
> | Antisymmetric | Yes (vacuously) | No (if $\|A\| > 1$) | Yes |
> | Transitive | Yes (vacuously) | Yes | Yes |
> | **Equivalence relation?** | No | Yes | Yes |
> | **Partial order?** | No | No | Yes |
>
> So **equality is both an equivalence relation and a partial order**, the **complete relation is an equivalence relation but not a partial order**, and the **empty relation is neither** on a nonempty set (it isn't reflexive).

## Equivalence Relations

When $R$ is an equivalence relation on $A$, the **equivalence class** of $a \in A$ is the set of everything $a$ is related to:
$[a]_R = \{x \in A : xRa\}$.

Equivalence classes partition $A$: every element of $A$ belongs to exactly one class, and any two classes are either identical or disjoint.

>[!info]- Prove that if $aRb$, then $[a]_R = [b]_R$.
> Let $R$ be an equivalence relation on $A$ and suppose $aRb$. We show $[a]_R = [b]_R$ by double containment.
>
> **$[a]_R \subseteq [b]_R$:** take any $x \in [a]_R$, so $xRa$. From $aRb$ and transitivity we get $xRb$, so $x \in [b]_R$.
>
> **$[b]_R \subseteq [a]_R$:** by **symmetry** of $R$, the assumption $aRb$ gives $bRa$. Take any $x \in [b]_R$, so $xRb$. By transitivity again, $xRa$, so $x \in [a]_R$.
>
> Hence $[a]_R = [b]_R$.

The set of all equivalence classes of $R$ is called the **quotient set**, written $A/R$:
$A/R = \{[a]_R : a \in A\}$.

If $A$ is finite then $A/R$ is finite too (you can't have more classes than elements). If $A$ is infinite, $A/R$ can be either finite or infinite, depending on $R$. For example, on $\mathbb{Z}$:
- The relation $a \equiv b \pmod{2}$ partitions $\mathbb{Z}$ into just $2$ classes (evens, odds).
- The equality relation gives infinitely many classes (one per integer).

## Partial Orders

When $R$ is a partial order on $A$, we typically write the relation as $\leq$ (or $\preceq$, or $\sqsubseteq$ in some contexts). The pair $(A, \leq)$ is called a **partially ordered set**, or **poset**.

### Maximal, Minimal, Maximum, Minimum

These four terms are easy to mix up but mean different things in a poset, and the distinction matters.

- $m \in A$ is a **maximum** if $a \leq m$ for *every* $a \in A$ (it sits above the entire set).
- $m \in A$ is **maximal** if there is no $a \neq m$ with $m \leq a$ (nothing strictly above it). In a partial order this is weaker than being a maximum: a maximal element need only beat its *comparable* neighbours.
- $m \in A$ is a **minimum** if $m \leq a$ for every $a$.
- $m \in A$ is **minimal** if there is no $a \neq m$ with $a \leq m$.

A maximum is always maximal, but a maximal element need not be a maximum, a poset can have several maximal elements that aren't comparable to each other. The same story holds (dually) for minima and minimals.

### Hasse Diagrams

A **Hasse diagram** is a picture of a finite poset. Vertices are the elements of $A$. An edge is drawn from $a$ up to $b$ exactly when $a < b$ and there is no $c$ strictly between them ($a < c < b$). We say $b$ **covers** $a$.

Two things are deliberately **left out** of the picture:
- **Reflexive loops** ($a \leq a$): always there in a partial order, so we don't draw them.
- **Transitive edges**: if you can already follow $a$ up to $c$ via some intermediate $b$, you don't separately draw $a$ -- $c$. The transitivity is implied by the path.

This keeps the diagram readable while still encoding the entire order.

## Total Orders

A partial order $\leq$ on $A$ is a **total order** (or **linear order**) if every pair of elements is comparable:
$\forall a, b \in A.\; a \leq b \;\vee\; b \leq a$.

Examples:
- $(\mathbb{N}, \leq)$, $(\mathbb{Z}, \leq)$, $(\mathbb{R}, \leq)$, the usual numeric orderings.

Non-examples:
- Divisibility on $\mathbb{N}$: $2 \nmid 3$ and $3 \nmid 2$, so $2$ and $3$ are incomparable.
- Subset inclusion on $\mathcal{P}(A)$ when $|A| \geq 2$: e.g. $\{1\}$ and $\{2\}$ are not subsets of each other.

In a total order on a finite set, the Hasse diagram collapses to a single vertical chain: there's a unique maximum, a unique minimum, and the elements line up linearly.
