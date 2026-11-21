#Y1/CS143
**Lemma:** For every Model $M:S \rightarrow \{0,1\}$, there is a **conjunctive clause** formula $\varphi_M$ that is true in $M$ and not in any other model $M' : S \rightarrow \{0,1\}$.

**Proof:**
- $\varphi_M := \bigwedge\limits_{p \in S} \psi_p$
- $\psi_p := \{ p$ if $M(p) = 1$, $\neg p$ if $M(p) = 0$



**Example:** $M = \{p \mapsto 0, q \mapsto 1, r \mapsto 1\}$. Therefore $\varphi_M = (\neg p \wedge (q \wedge r))$.