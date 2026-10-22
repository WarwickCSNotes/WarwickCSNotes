#Y1/CS143 
A deductive proof is a syntactic derivation of a conclusion formula from a set of assumptions, using a set of [inference rules](Inference%20Rules.md).

**Def:** A proof of $\varphi$ from $A$ via $R$ ([inference rules](Inference%20Rules.md)) is a sequence of formulas such that:
- $\varphi$ is the last formula in the sequence.
- each formula is either:
- one of the premises in $A$ or
- a conclusion of a specialisation of a rule in $R$, such that all assumptions of this specialisation occur earlier in the sequence of formulas.
[Example](CS143%20-%20Deductive%20Proof%20example.md)



**Def:** $\varphi$ is **provable** from A using R iff $\exists$ a proof of $\varphi$ from $A$ via $R$. Written $A \underset{R}\vdash \varphi$.
We can also say that the rule $(A, \varphi)$ is **provable** using $R$.
