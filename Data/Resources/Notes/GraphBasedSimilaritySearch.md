Being able to see how similar two objects are is important, and there are a couple of different ways of doing this.

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
