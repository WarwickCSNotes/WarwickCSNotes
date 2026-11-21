#Y1/CS143 
**Def:** A set $A$ of formulas **entails** formula $\varphi$ iff every model that satisfies all formulas in $A$ also satisfies $\varphi$.
$A \models p \Leftrightarrow$     $\forall M: S \rightarrow \{0,1\}$  $($ $\forall \alpha \in A$  $($ $[\![\alpha]\!]_M = 1 \rightarrow [\![\varphi]\!]_M = 1))$
(above not quite right?)
**Examples:** $\{\neg \neg p\} \models p$,   $\emptyset \models (p \lor \neg p)$, $\{(p \rightarrow q), p\} \models q$



**Def:** An **inference rule** $(A, \varphi)$ consists of a set of formulas $A$ called **assumptions** and a formula $\varphi$ called the **conclusion**. It is **sound** if $A \models \phi$.
*in this module, we only really care about sound inference rules*

**Examples:**
- **Modus Ponens:** $A = \{(p \rightarrow q), p\},$  $\varphi = p$.
- **The law of the Excluded Middle:** $A = \emptyset,$  $\varphi = \neg p \lor p$.
- **The resolution rule:** $A = \{(p \lor q), (\neg p \lor r)\}$,  $\varphi = q \lor r$.



**Def:** If $A = \{\varphi_1, \; \varphi_2, \;... \; \varphi_n\}$ and $Var(A, \varphi) = \{x_1, \; x_2, \; ... \; x_n\}$ then
$A[x_1 \mapsto \varphi_1, \; x_2 \mapsto \varphi_2, \; ... \; x_n \rightarrow \varphi_n]$, and $\varphi [x_1 \mapsto \varphi_1, \; ...]$ is the **specialisation** of $(A, \varphi)$ by the substitution map $[x_1 \mapsto \varphi_1, \; ...]$.

**Example:** Take $(A, \varphi) = \; (\{(x \lor y), \; (\neg x \lor x)\}, \; y \lor x)$ is the specialisation of the resolution rule by $[p \mapsto x, \; q \mapsto y, \; r \mapsto x]$.