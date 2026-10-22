#Y1/CS143 
**Specialisation Lemma:** If $R$ is a sound rule and $S$ is a specialisation of $R$, then $S$ is sound.



**Soundness Theorem for Propositional Logic:** If $A \underset{R}\vdash \varphi$ and all rules in $R$ are sound, then $A \models \varphi$.

**Proof:** We will prove the contrapositive - If $A \not\models \varphi$, then (if $A \underset{R}\vdash \varphi$ then there's a rule in $R$ that's not sound).

1) Assume $A \not\models \varphi$
2) By 1), there is a model $M : [\![\varphi]\!]_M = 0$ and $\forall \alpha \in A, \; [\![\alpha]\!] = 1$
3) Assume $A \underset{R}\vdash \varphi$
4) By 3), let $\Pi$ be a proof of $\varphi$ from $A$ via $R$.
5) Let $\gamma$ be a formula that is the earliest line in $\Pi$ such that $[\![\gamma]\!]_M = 0$.
6) By the definition of a formal deductive proof, $\gamma$ is a conclusion of a specialisation of a rule $r \in R$ where $r = (B, \gamma)$.
7) By 4), 5) and 6) we have that $\forall b \in B, \; [\![b]\!]_M = 1$.
8) By 5). 6) and 7) we have that the rule $(B, \gamma)$ is not sound.
9) By 8) and the specialisation lemma, we have that the rule $r$ is not sound.
$\blacksquare$