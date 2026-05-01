# Sets (and sequences)

A set is a mathematical object with a notion of membership i.e. whether something is in it or not. 

Since they do NOT have a notion of counting, you can only include an element *once* (it is in or it is out).
That is, $\{A, B, C\} = \{A, A, B, C\} = \{A, B, B, C, C\}$.

(sets are typically wrapped in curly braces $\{\}$)

## Membership of a Set

We can interact with a set $S$ by asking whether an element $a$ is in the set, written $a \in S$ (and $a \notin S$ for "$a$ is not in $S$").

- For example, let $A = \{1, banana, ⭐\}$
- $1 \in A$? True.
- $2 \in A$? False.

## Cardinality

The **cardinality** of a set $S$, written $|S|$, is the number of (distinct) elements in $S$.

- $|\{1, banana, ⭐\}| = 3$
- $|\{1, 1, 2, 2, 3, 4\}| = 4$ (duplicates aren't "extra elements", a set contains each value at most once)
- $|\emptyset| = 0$ (the empty set has no elements)

If $|S|$ is a natural number we call $S$ a **finite set**; otherwise $S$ is **infinite**, and $|S|$ is one of several "infinite cardinalities" (more on those later).

## Examples of Sets

Some sets that come up everywhere:
- $\emptyset$, the **empty set**, the unique set with no elements.
- $\mathbb{N}$, the **natural numbers**: $\{0, 1, 2, 3, \ldots\}$ (some authors start from $1$).
- $\mathbb{Z}$, the **integers**: $\{\ldots, -2, -1, 0, 1, 2, \ldots\}$.
- $\mathbb{Q}$, the **rationals**: numbers expressible as $\frac{a}{b}$ for integers $a, b$ with $b \neq 0$.
- $\mathbb{R}$, the **real numbers**: the rationals plus irrationals like $\sqrt{2}$ and $\pi$.
- $\mathbb{C}$, the **complex numbers**: numbers of the form $a + bi$ with $a, b \in \mathbb{R}$ and $i^2 = -1$.

These satisfy a natural chain of inclusions: $\mathbb{N} \subseteq \mathbb{Z} \subseteq \mathbb{Q} \subseteq \mathbb{R} \subseteq \mathbb{C}$.

## Operations on Sets

The three most fundamental ways of combining two sets are **intersection**, **union**, and **set difference**.

### Intersection ($\cap$)

$A \cap B$ is the set of elements that are in *both* $A$ and $B$:
$A \cap B = \{x : x \in A \wedge x \in B\}$.

Example: $\{1, 2, 3\} \cap \{2, 3, 4\} = \{2, 3\}$.

### Union ($\cup$)

$A \cup B$ is the set of elements that are in *either* $A$ or $B$ (or both):
$A \cup B = \{x : x \in A \vee x \in B\}$.

Example: $\{1, 2, 3\} \cup \{3, 4, 5\} = \{1, 2, 3, 4, 5\}$.

### Set Difference ($\setminus$)

$A \setminus B$ is the set of elements that are in $A$ but *not* in $B$:
$A \setminus B = \{x : x \in A \wedge x \notin B\}$.

Example: $\{1, 2, 3, 4\} \setminus \{2, 4, 6\} = \{1, 3\}$.

## Laws of Set Operations

Set operations satisfy a number of structural laws. They mirror the corresponding laws of propositional logic, because the definitions of $\cap$ and $\cup$ translate directly through $\wedge$ and $\vee$.

| Law | Statement |
| --- | --- |
| **Idempotence** | $A \cap A = A$,$\quad$ $A \cup A = A$ |
| **Commutativity** | $A \cap B = B \cap A$,$\quad$ $A \cup B = B \cup A$ |
| **Associativity** | $(A \cap B) \cap C = A \cap (B \cap C)$,$\quad$ $(A \cup B) \cup C = A \cup (B \cup C)$ |
| **Distributivity** | $A \cap (B \cup C) = (A \cap B) \cup (A \cap C)$,$\quad$ $A \cup (B \cap C) = (A \cup B) \cap (A \cup C)$ |

These let you rearrange or simplify set expressions without changing what they mean.

## Subsets

We say that $A$ is a **subset** of $B$, written $A \subseteq B$, if every element of $A$ is also an element of $B$.

Formally, using a quantifier:
$A \subseteq B \;\;\iff\;\; \forall x.\, (x \in A \rightarrow x \in B)$.

Examples:
- $\{1, 2\} \subseteq \{1, 2, 3\}$.
- $\{1, 4\} \not\subseteq \{1, 2, 3\}$ ($4$ is in the left set but not the right).
- $\emptyset \subseteq A$ for any set $A$ (the implication $x \in \emptyset \rightarrow x \in A$ is vacuously true).
- $A \subseteq A$ for any set $A$.

>[!info]- Prove $(A \subseteq B) \land (B \subseteq A) \implies (A = B)$ (Subset antisymmetry)
> This is a super useful technique: to prove two sets are equal, the standard move is to show each is a subset of the other.
>
> Suppose $A \subseteq B$ and $B \subseteq A$. We want to show $A = B$, i.e. that $A$ and $B$ have exactly the same elements.
>
> Take any $x$:
> - If $x \in A$, then by $A \subseteq B$ we have $x \in B$.
> - If $x \in B$, then by $B \subseteq A$ we have $x \in A$.
>
> So $x \in A$ iff $x \in B$ for every $x$. Hence $A$ and $B$ have the same elements, i.e. $A = B$.

## Power Sets

The **power set** of a set $A$, written $\mathcal{P}(A)$, is the set of *all* subsets of $A$:
$\mathcal{P}(A) = \{S : S \subseteq A\}$.

Examples:
- $\mathcal{P}(\emptyset) = \{\emptyset\}$ — note this has $1$ element (the empty set itself).
- $\mathcal{P}(\{a\}) = \{\emptyset, \{a\}\}$.
- $\mathcal{P}(\{a, b\}) = \{\emptyset, \{a\}, \{b\}, \{a, b\}\}$.

If $|A| = n$ is finite, then $|\mathcal{P}(A)| = 2^n$ (each element of $A$ can independently be either in or out of a given subset, giving $2$ choices per element).

## Sequences

A **sequence** (also called a **tuple**) is an ordered collection of elements. Unlike a set:
- **Order matters:** $(1, 2) \neq (2, 1)$.
- **Duplicates count:** $(1, 1, 2) \neq (1, 2)$.

So sequences capture the two things sets ignore: position and multiplicity.

We typically write sequences using parentheses, $(a, b, c)$, to distinguish them from sets which use curly braces $\{a, b, c\}$.

A sequence with $n$ elements is called an **$n$-tuple**. The first few have their own names:
- A **pair** (or **ordered pair**) is a 2-tuple, like $(a, b)$.
- A **triple** is a 3-tuple, like $(a, b, c)$.
- A **quadruple** is a 4-tuple, a **quintuple** is a 5-tuple, and so on.

For larger $n$ we just say "$n$-tuple". Sequences can also be infinite, like the sequence of natural numbers $(0, 1, 2, 3, \ldots)$.

## Cartesian Products

The **Cartesian product** of two sets $A$ and $B$, written $A \times B$, is the set of all ordered pairs whose first component is in $A$ and second component is in $B$:
$A \times B = \{(a, b) : a \in A \wedge b \in B\}$.

Order matters: $(a, b)$ is not the same as $(b, a)$ in general, so $A \times B \neq B \times A$ in general.

Examples:
- $\{1, 2\} \times \{x, y\} = \{(1, x), (1, y), (2, x), (2, y)\}$.
- $\mathbb{R} \times \mathbb{R} = \mathbb{R}^2$, the points of the plane.

If $A$ and $B$ are finite then $|A \times B| = |A| \cdot |B|$.

The construction extends to more than two sets: $A \times B \times C$ is the set of triples $(a, b, c)$ with $a \in A$, $b \in B$, $c \in C$, and so on.
