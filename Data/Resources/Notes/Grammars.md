#Y1/CS143 

Grammars are kind of a generalisation of the concept of [Regular Expressions](Regular%20Expressions.md).

### Syntax

**Def:** A grammar $G = (V, \Sigma, R, S)$ where:
- $V$ is a finite set of variables / non-terminals.
- $\Sigma$ is a finite set of terminals / letters.
- $R$ is a the rule relation such that $R \subseteq (V \cup \Sigma)^+ \times (V \cup \Sigma)^*$, and $R$ is finite.
- $S \in V$ is the starting variable.

Usually, we use capital letters to represent non-terminals and lowercase letters to represent terminals. We call a word of terminals and non-terminals a **sentential form** ($\gamma \in (V \cup \Sigma)^*$).

**Def:** $G$ is a context-free grammar (CFG) iff $R \subseteq V \times (V \cup \Sigma)^*$.
Essentially, each non-terminal maps to a specific string. What it maps to does not depend on the context of what is around it.

**Examples:** 
- [English as a Context Free Grammar](CS143%20-%20Linguistics%20of%20English%20as%20a%20CFG.md), can make strings like "the dog sees"
- $G = (\{S\}, \{0,1\}, [S \mapsto \varepsilon / 0S1], S)$, can make strings like 000111. $[\![G]\!] = \mathcal{L}(G) = \{0^n1^n : n \ge 0\}$


### Semantics

**Def:** For sentential forms $\gamma, \delta \in (V \cup \Sigma)^*$
- $\gamma \Rightarrow \delta$ ($\gamma$ **entails** $\delta$) iff $\gamma = x \alpha y, \; \delta = x \beta y$ and $\alpha \mapsto \beta$ is a rule in R, where $x,y \in (V \cup \Sigma)^*$
- $\gamma \Rightarrow^* \delta$ ($\gamma$ **derives** $\delta$) iff $\exists (z_1, z_2, ... z_k) : \; \gamma \Rightarrow z_1 \Rightarrow z_2 \Rightarrow ... z_k \Rightarrow \delta$

**Def:** $\mathcal{L}(G) = [\![G]\!] := \{w \in \Sigma^* : S \Rightarrow^* w\}$

**Def:** $L \subseteq \Sigma^*$ is a **context-free language** (CFL) iff $\exists G : \mathcal{L}(G) = L$ and $G$ is a CFG.

**Def:** The **leftmost derivation** of $w \in \Sigma^*$ in $G$ means that we always substitute the leftmost non-terminal first.

**Def:**
- A word $w \in \Sigma^*$ is **derived ambiguously** in $G$ iff there are two or more different leftmost derivations of $w$ in $G$.
- A grammar $G$ is **ambiguous** iff $\exists w \in \Sigma^*$ such that $w$ is derived ambiguously in $G$.
- A [Language](Languages.md) $L \subseteq \Sigma^*$ is **inherently ambiguous** iff for every CFG $G : \mathcal{L}(G) = L$,  $G$ is ambiguous.

[Ambiguous Grammar Example](CS143%20-%20Ambiguous%20Arithmetic%20Grammar.md)
