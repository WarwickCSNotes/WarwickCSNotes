#Y1/CS143 
Logic is a less imperative and more declarative model of computation. For now we talk about **Propositional Logic**.

### Syntax:

**Def:** A **formula** is a finite string over the alphabet $\{p-z, 0-9, (, ), \neg, \wedge, \lor, \rightarrow\}$. A formula F is one of:

- a propositional variable in $Var = [\![\! (p-z)(0-9)^*]\!]\!$.
- True = T = 1
- False = F = 0
- $\neg \varphi$
- $(\varphi \lor \psi)$
- $(\varphi \wedge \psi)$
- $(\varphi \rightarrow \psi)$
where $\varphi$ and $\psi$ are formulas.

**Theorem:** No formula is a prefix of another formula (hence brackets).
**Theorem:** The set of formulas is countably infinite.

### Semantics

**Def:** For a set of variables $S$, a **propositional model** $M$ over $S$ is a function $M: S \rightarrow \{0,1\}$.

**Def:** $Var(\varphi)$ is the set of all the variables used in $\varphi$.

**Def:** The truth value of a formula $\varphi$ in model $M: S \rightarrow \{0,1\}$ where $Var(\varphi) \subseteq S$ is described as below:

- $[\![ T ]\!]_M = 1$
- $[\![F]\!]_M = 0$
- $[\![p]\!]_M = M(p)$
- $[\![\neg \varphi]\!]_M = \{ 0$ if $[\![\varphi]\!]_M = 1$, otherwise $0$.
- $[\![\varphi \lor \psi]\!]_M = \{ 0$ if $[\![\varphi]\!]_M = 0$ and $[\![\psi]\!]_M = 0$, otherwise $1$.
- $[\![\varphi \land \psi]\!]_M = \{ 1$ if $[\![\varphi]\!]_M = 1$ and $[\![\psi]\!]_M = 1$, otherwise $0$.
- $[\![\varphi \rightarrow \psi]\!]_M = \{ 0$ if $[\![\varphi]\!]_M = 1$ and $[\![\psi]\!]_M = 0$, otherwise $1$. 

**Def:** $\varphi$ is **satisfied** (true) in $M$ iff $[\![\varphi]\!]_M = 1$. On the other hand, $\varphi$ is **unsatisfied** (false) in $M$ iff $[\![\varphi]\!]_M = 0$. 


We can view $[\![\varphi]\!]$ as a function that takes a model and outputs True or False ($[\![\varphi]\!] = F: [M: Var(\varphi) \rightarrow \{0,1\}] \rightarrow \{0,1\}$). However, a model can be represented as a string of characters from $\{0,1\}$, with each character representing the truth value of a variable so we can say:

**Fact:** Formulas with $n$ variables can be represented as $F: \{0,1\}^n \rightarrow \{0,1\}$.

There are therefore $2^{(2^n)}$ possible formulas for $n$ variables!


**Def:** A formula $\varphi$ is:
- **satisfiable** iff $\exists M : [\![\varphi]\!]_M = 1$.
- a **contradiction** iff it is not satisfiable ($\forall M, [\![\varphi]\!]_M = 0$).
- a **tautology** iff $\forall M, [\![\varphi]\!]_M = 1$.

___

**Lemma:** For every Model $M:S \rightarrow \{0,1\}$, there is a [Conjunctive Clause](Conjunctive%20Clause.md) formula $\varphi_M$ that is true in $M$ and not in any other model $M' : S \rightarrow \{0,1\}$.

**Theorem:** For every function $F: \{0,1\}^n \rightarrow \{0,1\}$ there is a [Disjunctive Normal Form](Disjunctive%20Normal%20Form.md) formula $\beta$ such that $[\![\beta]\!] = F$.

**Def:** The **characteristic** set of [literals](Literals.md) for a model $M: Var(\varphi) \rightarrow \{0,1\}$, written $C_M$ is: $$C_M = \{p : M(p) = 1\} \cup \{\neg q : M(q)=0\}$$