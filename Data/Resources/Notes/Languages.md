#Y1/CS143
Languages are just a set of strings ($L \subseteq \Sigma^*$). They are used for when we want to compute a function $f: \Sigma^* \rightarrow \{0, 1\}$. Turns out restricting our output to just a 0 or a 1 does not change the number of things we can represent! This is just as computationally powerful as if we had a larger set for the outputs.

 $\emptyset = \{\} =$ the empty language.

$L_f := \{w \in \Sigma^* : f(w)=1\}$
$f_L (w) := \{ 0$ if $w \notin L$,  $1$ if $w \in L$

**Def:** We say that $L \subseteq \Sigma^*$ is a **regular language** if there is a [DFA](Deterministic%20Finite%20Automata.md) that recognises $L$.

If $L \subseteq \Sigma^*$ is a regular language, then $\Sigma^*$ \ $L$ is a regular language. [Proof](CS143%20-%20RegularLanguagesProof.md).
If $L_1,L_2$ are regular, then so are $L_1 \cap L_2$ and $L_1 \cup L_2$.  [Proof](CS143%20-%20RegularLanguagesProof2.md).
If $L$ is regular, then so is $L' = \{(a_1a_2a_3...a_k) \in \Sigma^* : a_k...a_3a_2a_1 \in L\}$. [Proof](CS143%20-%20RegularLanguagesProof3.md).

Def: $REG(\Sigma)$ is the set of all regular languages for the alphabet $\Sigma$.
So therefore, $REG(\Sigma)$ is [closed under](Sets%20Closed%20Under%20Definition.md) complement, union and intersection.

Big Idea 5:
## Languages are our alternative (equivalent) way to describe decision (YES/NO) computation problems.
