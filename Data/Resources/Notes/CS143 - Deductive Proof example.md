#Y1/CS143 
We want to prove the [inference rule](Inference%20Rules.md): $(\emptyset, \; (p \rightarrow p))$. We will prove it via the [inference rules](Inference%20Rules.md):
- Modus Ponens (**MP**) = $\{p, \; (p \rightarrow q)\}, \; q$
- Implication Rule 1 (**I1**) = $\emptyset, \; (q \rightarrow (p \rightarrow q))$
- **D** = $\emptyset, \; (\;\; (p \rightarrow (q \rightarrow r))\; \rightarrow \;((p \rightarrow q) \rightarrow (p \rightarrow r)) \;\;)$

**Proof:**
1) Specialise **D** with $[p \mapsto p; \; q \mapsto (p \rightarrow p); \; r \mapsto p]$ to get: $$(\;\;\; (p \rightarrow \; ((p \rightarrow p) \rightarrow p))\; \rightarrow \;((p \rightarrow (p \rightarrow p)) \rightarrow (p \rightarrow p)) \;\;\;)$$
2) Specialise **I1** with $[p \mapsto (p \rightarrow p); \; q \mapsto p]$ to get: $$(\;\; p \rightarrow ((p \rightarrow p) \rightarrow p) \;\;)$$
3) Specialise **MP** from 1) and 2), such that $[p \mapsto (\;p \rightarrow ((p \rightarrow p) \rightarrow p) \;); \; q \mapsto (\; (p \rightarrow (p \rightarrow p))\; \rightarrow \;(p \rightarrow p) \;)]$ to get: $$(\; (p \rightarrow (p \rightarrow p))\; \rightarrow \;(p \rightarrow p) \;)$$
4) Specialise **I1** with $[p \mapsto p; \; q \mapsto p]$ to get: $$(\; p \rightarrow (p \rightarrow p) \;)$$
5) Specialise **MP** from 3) and 4), such that $[p \mapsto (\; p \rightarrow (p \rightarrow p); \; q \mapsto (\; p \rightarrow p \;) \;)]$ to get: $$(\; p \rightarrow p \;) = \varphi$$
