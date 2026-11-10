#Y1/CS143 
$\varepsilon$-NFAs are another Model of Computation. They are similar to [DFAs](Deterministic%20Finite%20Automata.md) , but they are not deterministic. When reading a letter at a certain state, there can be no or multiple states the Automaton could transition to. Additionally, $\varepsilon$-NFAs can have $\varepsilon$ transitions which can be moved along without reading a letter at all!

**Def:** An $\varepsilon$-NFA called $M = (Q, \Sigma, q_0, F, \delta)$, where:
- $Q$ is the set of states.
- $\Sigma$ is the alphabet.
- $q_0 \in Q$ is the initial state.
- $F \subseteq Q$ is the set of final states.
- $\delta : Q \times \Sigma_\varepsilon \rightarrow 2^Q$ is the transition function.
Note that going forward, $\Sigma_\varepsilon$ will be used to denote $\Sigma \cup \{\varepsilon\}$.

E.g.
![Pasted image 20260130134354](assets/Pasted%20image%2020260130134354.png)

#### Semantics:

**Def:** $\forall x \in \mathbb{N} : x \le n, r_x \in Q$ 
$(r_0, r_1, r_2, ... r_n)$ is **a** run of $M$ on $(w = a_1 a_2 ... a_k) \in \Sigma^*$ if there exists $(b_1 b_2 ... b_n) \in \Sigma^*$ such that:
a) $\{a_1 a_2...a_k\} = b_1 b_2 ... b_n$ with any $\varepsilon$ symbols removed.
b) $\forall i \in \mathbb{N} : i \le n, r_i \in \delta (r_{i-1}, b_i)$.

**Def:** The above run is **accepting** iff $r_n \in F$.

**Def:** For an $\varepsilon$-NFA called M: $[\![M]\!] = \mathcal{L}(M) = \{w \in \Sigma^* :$ there is an accepting run of $M$ on $w\}$.

There is also the concept of the [run graph](eNFA%20Run%20Graphs.md) of $M$ on $w$.