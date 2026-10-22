#Y1/CS143 
Some words cannot be distinguished by a Model of Computation.

**Def:** A DFA $M =(Q, \Sigma, q_0, F, \delta)$ **does not distinguish** $x \in \Sigma^*$ and $y \in \Sigma^*$ (i.e. $x \equiv_M y$) iff $\hat{\delta}(q_0, x) = \hat{\delta}(q_0, y)$.

**Fact 1:** a) $\equiv_M \subseteq \Sigma^* \times \Sigma^*$ is an equivalence relation (trivial to prove).
b) $\equiv_M$ has **finite index** (means $\Sigma^*/\equiv_M$ is a finite set).


**Def:** A Language $L \subseteq \Sigma^*$ **does not distinguish** $x \in \Sigma^*$ and $y \in \Sigma^*$ (i.e. $x \equiv_L y$) iff $\forall z \in \Sigma^*, [xz \in L \Leftrightarrow yz \in L]$.

**Fact 2'':** $\equiv_M \subseteq \equiv_{\mathcal{L}(M)}$.

We can trivially see that: If $x \equiv_M y$ then $\forall z \in \Sigma^*, [xz \in \mathcal{L}(M) \Leftrightarrow yz \in \mathcal{L}(M)]$.
We can rewrite this to be: If $x \equiv_M y$ then $x \equiv_{\mathcal{L}(M)} y$.
And again to get $\equiv_M \subseteq \equiv_{\mathcal{L}(M)}$.


**Fact 3:** a) $\equiv_L$ is an equivalence relation.
b) $\equiv_L$ need not have a **finite index**!

___
**Side def:** For $(w=a_1a_2...a_n) \in \Sigma^*$, $w=x^k$ where $x \in \Sigma^*$ means that $w$ is made of k repetitions of the word $x$.
___

**Example:**
If $L = \{a^n b^n : n \ge 0\} = \{\varepsilon, ab, aabb, aaabbb, ...\}$ then $\equiv_L$ has infinitely many equivalence classes.

**Proof:** Consider for $n \ge 0$ the words $a^n = \varepsilon, a, aa, aaa, ...$
We aim to show that $a^i \not\equiv_L a^j$ if $i \ne j$.

- Take $b^i \in \Sigma^*$. We can see that $a^ib^i \in L$ and $a^ib^j \notin L$.
- Therefore there are infinitely many equivalence classes ($\Sigma^* / \equiv_L = \{\{\varepsilon\}, \{a\}, \{aa\}, \{aaa\}, ... \{ab, aabb, aaabbb, ... b, bb,... aba, abaa, ... \}\}$).
- Therefore this language isn't regular by the [Myhill-Nerode Theorem](Myhill-Nerode%20Theorem.md).