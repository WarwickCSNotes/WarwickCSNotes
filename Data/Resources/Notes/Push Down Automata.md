#Y1/CS143 
***Rough***
We only look at **non-deterministic PDAs**.
A PDA is the same as an $\varepsilon$-NFA except it has the additional computational power of the stack. When doing a state transition, the PDA can push to or pop from the stack, and can check the stack top before taking a transition. The stack is infinite in size.

A PDA $P = (Q, \Sigma, \Gamma, q_0, F, \delta)$ where:
- $Q$ is the finite set of states.
- $\Sigma$ is the finite alphabet.
- $\Gamma$ is the finite stack alphabet.
- $q_0 \in Q$ is the initial state.
- $F \subseteq Q$ is the set of accepting states (though we usually actually just use $F \in Q$ is the accepting state since non-determinism can get us to one accept state).
- $\delta : Q \times \Sigma_\varepsilon \times \Gamma_\varepsilon \rightarrow 2^{Q \times \Gamma_\varepsilon}$ is the transition function, which takes the current state, the letter being read, and the stack letter to be popped ($\varepsilon$ meaning no pop), and returns the set of possible (next state and stack letter to be pushed ($\varepsilon$ meaning no push)).

Often we add $\bot$ (bottom) to our stack alphabet to allow us to ensure an empty stack before accepting. We push $\bot$ at the start (then never again), and then pop $\bot$ at the end, which ensures the stack has nothing else on it.