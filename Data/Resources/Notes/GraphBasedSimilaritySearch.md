Being able to see how similar two objects are is important, and we look at a couple of ways of doing this: Jaccard similarity, SimRank, and PageRank.

## Jaccard index

$$J(A, B) \;=\; \frac{|A \cap B|}{|A \cup B|}$$

The Jaccard index (above) is an easy way to compare the similarity of two objects. What $A$ and $B$ actually are depends on what you're measuring the similarity of.

In the slides, the $|A \cup B|$ bit is referred to as the **normalisation factor**.

**Text-based similarity:** given two sets representing strings, $A = \{\text{T},\, \text{O},\, \text{P},\, \text{I},\, \text{C}\}$ and $B = \{\text{T},\, \text{P},\, \text{I},\, \text{C}\}$, we can apply Jaccard indexing:

$$J(A, B) \;=\; \frac{|\{\text{T}, \text{P}, \text{I}, \text{C}\}|}{|\{\text{T}, \text{O}, \text{P}, \text{I}, \text{C}\}|} \;=\; \frac{4}{5} \;=\; 0.8$$

**Graph-based similarity:** we can compare the neighbours of two nodes:

$$J(u, v) \;=\; \frac{|N(u) \cap N(v)|}{|N(u) \cup N(v)|}$$

where $N(u)$ is the set of neighbours of $u$.

In a directed graph, we can compare the in-neighbours and the out-neighbours separately to have two metrics:

$$J_{\text{in}}(u, v) \;=\; \frac{|N_{\text{in}}(u) \cap N_{\text{in}}(v)|}{|N_{\text{in}}(u) \cup N_{\text{in}}(v)|} \qquad J_{\text{out}}(u, v) \;=\; \frac{|N_{\text{out}}(u) \cap N_{\text{out}}(v)|}{|N_{\text{out}}(u) \cup N_{\text{out}}(v)|}$$

### Properties of Jaccard Similarity

Have a go at figuring out the form and reasoning for these properties: **reflexivity**, **symmetry**, and **boundedness**.

>[!check]- Properties
> - **Reflexivity:** $\text{sim}_J(A, A) = 1$
> - **Symmetry:** $\text{sim}_J(A, B) = \text{sim}_J(B, A)$
> - **Boundedness:** $\text{sim}_J(A, B) \in [0, 1]$
>
> And here are the proofs for each property:
>
> **Reflexivity:** $\text{sim}_J(A, A) = \dfrac{|A \cap A|}{|A \cup A|} = \dfrac{|A|}{|A|} = 1$.
>
> **Symmetry:** $\text{sim}_J(A, B) = \dfrac{|A \cap B|}{|A \cup B|}$ and $\text{sim}_J(B, A) = \dfrac{|B \cap A|}{|B \cup A|}$. Since $|A \cap B| = |B \cap A|$ and $|A \cup B| = |B \cup A|$, the two are equal.
>
> **Boundedness:** $|A \cap B| \geq 0$ and $|A \cup B| \geq 0$, so both are non-negative. Since neither is negative, $\dfrac{|A \cap B|}{|A \cup B|} \geq 0$. Also, $|A \cap B| \leq |A \cup B|$ (the intersection is a subset of the union), so $\dfrac{|A \cap B|}{|A \cup B|} \leq 1$.
>
> Note that we implicitly assume $|A \cup B| \geq 1$, since otherwise we hit a divide-by-zero problem.

### Limitations of Jaccard Similarity

**Limitation 1 (magnitude of similarity):** any two objects $A, B$ have $\text{sim}_J(A, B) = 1$ regardless of how much overlap there actually is.

For example, in graph-based similarity, two nodes $A$ and $B$ may have $\text{sim}_J(A, B) = 1$ and share 2 neighbours. You might also have $C$ and $D$ with $\text{sim}_J(C, D) = 1$ and share 8 neighbours. You may want $\text{sim}_J(C, D)$ to be higher than $\text{sim}_J(A, B)$, but Jaccard doesn't distinguish.

**Limitation 2 (no similarity):** any two objects $A, B$ have $\text{sim}_J(A, B) = 0$ whenever $|A \cap B| = 0$, marking them as completely dissimilar.

In a graph-based example, two nodes $A$ and $B$ could be close-by (only 2 nodes apart) with no Jaccard similarity. You could also have $C$ and $D$ nowhere near-by (9 nodes in between them) with no Jaccard similarity. Most would say $A$ and $B$ are more similar than $C$ and $D$, but Jaccard doesn't see that.

Hence, Jaccard is said to be a **local** measure since it only considers 1-hop neighbours.

## SimRank Similarity

SimRank is a recursive similarity search where the similarity between two nodes $a$ and $b$ is based on how similar the neighbours of $a$ are to the neighbours of $b$.

As base cases: completely isolated nodes have $0$ similarity to any other, and a node is most similar to itself, i.e. $\text{sim}_{SR}(a, a) = 1$.

In what follows, for a node $x$ we write $I(x)$ for the set of nodes with edges going into $x$, i.e. $I(x) = \{ y \mid (y, x) \in E \}$.

$$s(a, b) \;=\; \begin{cases} 0 & \text{if } I(a) = \emptyset \text{ or } I(b) = \emptyset \\[4pt] \dfrac{C}{|I(a)|\,|I(b)|} \displaystyle\sum_{x \in I(a)} \sum_{y \in I(b)} s(x, y) & \text{if } a \neq b \\[4pt] 1 & \text{if } a = b \end{cases}$$

Here $C \in (0, 1)$ is a **damping factor**.

### Properties of SimRank

We have the same set of properties as for Jaccard similarity: **reflexive**, **symmetry**, and **boundedness**. Try to define them and prove them (answers in the callout).

>[!check]- Properties
> - **Reflexive:** $s_{SR}(a, a) = 1$
> - **Symmetry:** $s_{SR}(a, b) = s_{SR}(b, a)$
> - **Boundedness:** $s_{SR}(a, b) \in [0, 1]$
>
> And here are the proofs for each property:
>
> **Reflexive:** by the definition of SimRank, since $a = a$ we have $s_{SR}(a, a) = 1$.
>
> **Symmetry:** starting from the definition,
>
> $s_{SR}(a, b) = \dfrac{C}{|I(a)|\,|I(b)|} \displaystyle\sum_{x \in I(a)} \sum_{y \in I(b)} s(x, y)$
>
> $s_{SR}(b, a) = \dfrac{C}{|I(b)|\,|I(a)|} \displaystyle\sum_{y \in I(b)} \sum_{x \in I(a)} s(y, x)$
>
> By commutativity of multiplication and summation, and by induction on the recursion (with $s(x, y) = s(y, x)$ at shallower levels), the two are equal.
>
> **Boundedness:** proof by induction on the recursion depth. Define SimRank inductively:
>
> $s_0(a, b) = \begin{cases} 0 & \text{if } a \neq b \\ 1 & \text{if } a = b \end{cases}$
>
> with $s_k$ using $s_{k-1}$ in place of $s$ in the general formula. So $s_k(\cdot, \cdot)$ makes calls to $s_{k-1}(\cdot, \cdot)$.
>
> **Inductive step:** assume $s_k(a, b) \leq 1$ for all pairs. Then
>
> $s_{k+1}(a, b) \;=\; \dfrac{C}{|I(a)|\,|I(b)|} \displaystyle\sum_{x \in I(a)} \sum_{y \in I(b)} s_k(x, y) \;\leq\; \dfrac{C}{|I(a)|\,|I(b)|} \displaystyle\sum_{x \in I(a)} \sum_{y \in I(b)} 1 \;=\; \dfrac{C}{|I(a)|\,|I(b)|} \cdot |I(a)|\,|I(b)| \;=\; C \;\leq\; 1$
>
> Non-negativity follows because the base case is $\geq 0$ and the recursive formula is a non-negative multiple of sums of non-negative terms. Thus, by induction, $s_k(a, b) \in [0, 1]$ for each $k$.
