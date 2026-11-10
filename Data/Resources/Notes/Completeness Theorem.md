#Y1/CS143
**Lemma:** If $[\![\varphi]\!]_M = 1$, then $C_M \underset{F}\vdash \varphi$. Also, if $[\![\varphi]\!]_M = 0$, then $C_M \underset{F}\vdash \neg \varphi$.

**Lemma (Elementary contradictory assumptions):** If $(A \cup \alpha) \underset{R}\vdash \varphi$ and $(A \cup \neg \alpha) \underset{R}\vdash \varphi$, then $A \underset{R \cup F}\vdash \varphi$.


## Tautology Theorem
$\emptyset \models \varphi$ iff $\emptyset \underset{F}\vdash \varphi$.

"$\Leftarrow$". Trivial. Also I already proved a superset of this with the [Soundness Theorem](Soundness%20Theorem.md).

"$\Rightarrow$". General idea is that we know that $\varphi$ holds in all models, but we can take one model $M$ and construct a proof of $\varphi$ from $C_M$ as in the first lemma above. However, we can then take another model $M'$ that is identical to $M$ except one of the variables is negated. We can also prove $\varphi$ from $C_M'$ using the lemma above, since $\varphi$ holds in all models.

By the Elementary Contradictory Assumptions lemma, the variable we negated is irrelevant to the proof of $\varphi$. So we can repeat this process to one by one remove all of the assumptions in $C_M$ until we have no assumptions, and so $\emptyset \underset{F}\vdash \varphi$.


# Completeness Theorem

**Theorem:** $A \models \varphi$ iff $A \underset{F}\vdash \varphi$.

**Proof:**

"$\Leftarrow$" Proof of the [Soundness Theorem](Soundness%20Theorem.md).

"$\Rightarrow$" General Idea is to use the [Deduction Theorem](Deduction%20Theorem.md) to move all the assumptions into the conclusion, then use the Tautology Theorem to show that $\emptyset \underset{F}\vdash \varphi$, then use the [Deduction Theorem](Deduction%20Theorem.md) again to extract the assumptions back out again.