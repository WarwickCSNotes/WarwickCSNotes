#Y1/CS143 

We make a [grammar](Grammars.md) for arithmetic $G = (V, \Sigma, R, S)$ such that:
- $V = \{E\}$
- $\Sigma = \{0, 1, +, *, (, )\}$
- $R = [E \mapsto 0 | 1 | E+E | E*E | (E)]$
- $S = E$

Lets do a leftmost derivation:
$E \Rightarrow E + E \Rightarrow 1 + E \Rightarrow 1 + E*E \Rightarrow 1 + 1 * E \Rightarrow 1 + 1 * 0$

However, there is another leftmost derivation that gets the same result:
$E \Rightarrow E * E \Rightarrow E + E * E \Rightarrow 1 + E * E \Rightarrow 1 + 1 * E \Rightarrow 1 + 1 * 0$

Therefore, this [grammar](Grammars.md) $G$ is ambiguous.

___
We can define a different grammar $G'$ which has the same [language](Languages.md) but is not ambiguous.

$G' = (V', \Sigma, R', S')$ such that:
- $V' = \{E', T, F\}$
- $\Sigma = \{0, 1, +, *, (, )\}$
- $R' = [E' \mapsto T | E'+T, \; T \mapsto F | T * F, \; F \mapsto 0 | 1 | (E')]$
- $S = E'$

The only way to derive 1 + 1 * 0 here is:
$E \Rightarrow E + T \Rightarrow T + T \Rightarrow F + T \Rightarrow 1 + T \Rightarrow 1 + T * F \Rightarrow 1 + F * F \Rightarrow 1 + 1 * F \Rightarrow 1 + 1 * 0$
