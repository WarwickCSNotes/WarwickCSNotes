#Y1/CS143 
Determinisation.

- Take an $\varepsilon$-NFA $M=(Q, \Sigma, q_0, F, \delta)$. We aim to construct a DFA $M' = (Q', \Sigma, q_0', F', \delta')$ such that $\mathcal{L}(M) = \mathcal{L}(M')$.
- We take the states in $M'$ to be represented by a set of states in $M$.
- Let $E(S \subseteq Q) := \{ q \in Q : q$ can be reached by $\varepsilon$-transitions only in 0 or more steps from an element of $S\}$.
- We define:
- $Q' := 2^Q$
- $q_0' := E(\{q_0\})$
- $F' := \{S \subseteq Q : S \cap F \ne \emptyset\}$
- For $S \subseteq Q, a \in \Sigma$, we have $\delta'(S, a) := E(\underset{q \in S}{\bigcup} \delta (q, a))$
To prove that $\mathcal{L}(M) = \mathcal{L}(M')$ we need to prove that $\forall (w=a_1a_2...a_k) \in \Sigma^*$:
$\exists$ an accepting run $(r_0, r_1, ... r_n)$ of $M$ on $w$ iff the run $(r_0', r_1', ... r_k')$ of $M$ on $w$ is accepting.

Below is not a rigorous proof, but rather the 3 main ideas which underpin the proof, and it is fairly easy to see where it is going from there:

1) The set of runs of $M$ on $w$ = the set of paths from level 0 to the level $k$ in $G_{M,w}$.
2) For all levels $i \in \{0,1,...k\}, q_i'$ is the set of states at level $i$ in $G_{M,w}$.
3) Every vertex in $G_{M,w}$ is the end of a path from level 0.
