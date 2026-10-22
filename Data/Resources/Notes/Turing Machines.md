#Y1/CS143 
***Rough***
They are Finite Automata with extra power. They have an infinite tape which has a finite number of letters printed on it (the input word), with infinite blank cells after the input. This tape can be read and written too, and the head can move both forwards and backwards.
(Note we can interpret a Turing Machine as having an output: when it halts, the output is the current string of symbols).

### Syntax
A Turing Machine $M = (Q, \Sigma, \Gamma, q_0, q_A, q_R, \delta)$ where:
- $Q$ is a finite set of states
- $\Sigma$ is the input alphabet.
- $\Gamma$ is the tape alphabet. Usually, $\Sigma \cup \{\textvisiblespace, \vdash\} \subseteq \Gamma$ (we use $\textvisiblespace$ to mean blank, and have $\vdash$ to be the first symbol on the tape).
- $q_0$ is the initial state.
- $q_A$ is the accept state.
- $q_R$ is the reject state.
- $\delta : Q \times \Gamma \rightarrow Q \times \Gamma \times \{L, R\}$ is the transition function from a state and stack letter (reading wherever the head is on the stack) to the new state, whether to move the head left or right, and what to write to the old head position.

Can formally show a Turing Machine by drawing out a state transition diagram, with transition being marked **R -> W, M** (what needs to be read, what will be written, and which direction to move the head). Often we can use shorthands such as **R -> M** if nothing is written, and **R_1, R_2 -> W, M** if reading either R leads to the same state, write and move.

However, this often takes a while and is hard to interpret. So we can instead give a high level description of the Turing Machine, which doesn't explain how the state transition diagram would look, but overviews the general strategy we use to identify if a word is in the language. We can also do an implementation description which is kind of a halfway point between the two.

### Semantics

**Configurations:** $(q, w, v)$ is a configuration of a TM iff $w, v \in \Gamma^*$ and $q \in Q$. The header on the tape points at the first letter of $v$, with $w$ being to its left (so the entire tape is $w \circ v \circ \textvisiblespace$ infinitely long).

**Start configuration:** $q = q_0, \space w = \vdash , \space v =$ (input word, so $v \in \Sigma^*$).
**Accepting configuration:** $q = q_A$
**Rejecting configuration:** $q = q_R$
**Hating configuration:** $q \in \{q_A, q_R\}$

If we take $q = q$,  $w = w'a$,  $v = b v'$ and $\delta (q, b) =$
- $(q', c, R)$ then it will yield $(q', w'ac, v')$
- $(q', c, L)$ then it will yield $(q', w', acv')$
- However, if $w= \vdash$ then $(q', c, L)$ will yield $(q', \vdash, cv')$ since it can't go left anymore.
We write yields as $\Rightarrow$.

**Def (run):** A run of $M$ on a word $w \Sigma^*$ is $(c_0, c_1, ... c_n)$ where $c_0 = (q_0, \vdash, w)$ and $\forall i \in \{1, 2, ... n\} (c_{i-1} \Rightarrow c_i)$.

**Def (halting run):** A run is halting/accepting/rejecting iff $c_n$ is halting/accepting/rejecting respectively.

**Def:** A Turing Machine is either a **recogniser** or a **decider**.

The language recognised by $M$ is $\mathcal{L}(M) := \{ w \in \Sigma^* :$ there is an accepting run of $M$ on $w \}$. We can also say that $M$ is a **recogniser** for the language $\mathcal{L}(M)$.

$M$ is a **decider** iff $\forall w \in\Sigma^* (\exists$ a halting run of $M$ on $w )$.