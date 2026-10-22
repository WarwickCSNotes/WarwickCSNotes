#Y1/CS143 
**Theorem:** $L$ is regular iff $L / \equiv_L$ has finite index.

**Proof:**
Case "$\Rightarrow$": $L$ is regular so $\exists$ a DFA that recognises $L$. Take $\equiv_M \subseteq \equiv_L$. Since $\Sigma^* /\equiv_M$ is finite, $\Sigma^* / \equiv_L$ must be finite also, since its elements must be unions of elements of $\Sigma^* / \equiv_M$. (Not a rigorous proof but we can see the gist).

Case "$\Leftarrow$": We construct a DFA $M = (Q, \Sigma, q_0, F, \delta)$, where a state is identified by a set of letters, such that we define:
- $Q := \Sigma^* / \equiv_L$
- $q_0 := [\varepsilon]_{\equiv_L}$
- $F := \{[w]_{\equiv_L} : w \in L\}$
- $\forall x \in \Sigma^*, \delta([x]_{\equiv_L}, a) := [xa]_{\equiv_L}$

For $\delta$ to be a function it must be well-defined. We can prove that it is using
**Fact 4:** If $x \equiv_L y$ and $a \in \Sigma$ then $xa \equiv_L ya$. (Can see this is true by [definition](Distinguishing%20words.md) of $\equiv_L$).

___
From this Theorem we get Big Idea 8:
## It is possible to prove rigorously that some specific function cannot be expressed in a specific Model of Computation.
