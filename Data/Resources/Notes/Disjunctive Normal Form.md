#Y1/CS143 
**Theorem:** For every function $F: \{0,1\}^n \rightarrow \{0,1\}$ there is a Disjunctive Normal Form formula $\beta$ such that $[\![\beta]\!] = F$.

**Proof:** $\beta_F := \bigvee\limits_{M:F(M)=1} \varphi_{M}$


**Example:** $F = \{000 \mapsto 1,$  $001 \mapsto 1,$  $010 \mapsto 0,$  $011 \mapsto 1,$  $100 \mapsto 0,$  $101 \mapsto 0,$  $110 \mapsto 0,$  $111 \mapsto 0 \}$.

$\beta_F = (\neg p \wedge (\neg q \wedge \neg r)) \vee (\neg p \wedge (\neg q \wedge r)) \vee (\neg p \wedge (q \wedge r))$


The disadvantage of the Disjunctive Normal Form is that it can get really long, and is hard to parse. It proves that every such function has a formula, but in general we use simplified formulas!