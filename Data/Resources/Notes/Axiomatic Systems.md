#Y1/CS143 
An **Axiomatic System** is a set of inference rules. *(that will let us prove anything???)*
We care about the following Axiomatic System $F$:
- Modus Ponens = $\{p, \; (p \rightarrow q)\}, \; q$
- Inference 0 = $\emptyset, \; (\; p \rightarrow p \;)$    *for clarity, from now on I'll write axioms without the set of assumptions*
- Inference 1 = $(\; q \rightarrow (p \rightarrow q) \;)$
- Inference 2 = $(\; \neg p \rightarrow (p \rightarrow q) \;)$
- Negation Implication = $(\; p \rightarrow (\neg q \rightarrow \neg (p \rightarrow q)) \;)$
- Double Negation = $(\; p \rightarrow \neg \neg p \;)$
- Resolution Rule = $(\; (q \rightarrow p)\; \rightarrow \;((\neg q \rightarrow p) \rightarrow p) \;)$
- D = $(\; (p \rightarrow (q \rightarrow r))\; \rightarrow \;((p \rightarrow q) \rightarrow (p \rightarrow r)) \;)$

There are also other Axiomatic Systems, such as $\mathcal{H} = \{$MP, I1, N, D$\}$ and $\not\mathcal{L} = \{$MP, $\not{L}\}$. So some of the above rules are unnecessary - but they are useful in making things a lot more readable!
