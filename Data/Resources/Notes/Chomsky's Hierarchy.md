#Y1/CS143 

Chomsky is a linguist who came up with the concept of [grammars](Grammars.md). He classified them into 4 groups. Note that each group gets less restrictive.

For all $A, B \in V; \;\;\; a,b \in \Sigma; \;\;\; \alpha, \beta, \gamma, x, y \in (V \cup \varepsilon)^* \;\;\;$:

Type 3 Grammars (**Right-linear Grammars**) are equi-expressive with Regular Languages! They have the following restriction on the rules in $R$  :   $A \mapsto \varepsilon | a | bB$

Type 2 Grammars (**Context Free Grammars**) are more expressive than Regular Languages. They have the following restriction on the rules in $R$  :  $A \mapsto \alpha$

Type 1 Grammars (**Context Sensitive Grammars**) are more expressive again! They have the following restriction on the rules in $R$  :  $\alpha \mapsto \beta$ where $\alpha = xAy$ and $\beta = x \gamma y$.

Type 0 Grammars (**Recursively Enumerable Grammars**) are more expressive yet again, they produce Recursively Enumerable [Languages](Languages.md). These [grammars](Grammars.md) have no restrictions at all on their rules in $R$.