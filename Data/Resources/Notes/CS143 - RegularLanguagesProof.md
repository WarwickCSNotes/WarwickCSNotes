#Y1/CS143
**Fact:** If $L \subseteq \Sigma^*$ is a regular language, then $\Sigma^*$ \ $L$ is a regular language.

**Proof:** Let $M = (Q, \Sigma, q_0, F, \delta)$ be a [DFA](Deterministic%20Finite%20Automata.md) such that $\mathcal{L} (M) = L$.
- Consider $M' = (Q, \Sigma, q_0, Q$ \ $F, \delta ')$, where $\delta ' = \delta$.
- We argue that $\mathcal{L} (M') = \Sigma^*$ \ $L$.
- Note that $\hat{\delta} = \hat{\delta} '$.
- $\hat{\delta} (q_0, w) \in F$   iff   $\hat{\delta}' (q_0, w) \notin Q$ \ $F$.
- Hence $w \in \mathcal{L} (M)$   iff   $w \notin \mathcal{L} (M')$
- So $\mathcal{L} (M') = \Sigma^*$ \ $\mathcal{L} (M)$ = $\Sigma^*$ \ $L$
$\blacksquare$
