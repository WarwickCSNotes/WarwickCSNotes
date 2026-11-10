#Y1/CS143
[State Transition Diagram](State%20Transition%20Diagram.md)
![Pasted image 20260116184611](assets/Pasted%20image%2020260116184611.png)

[State Transition Table](State%20Transition%20Table.md)
![Pasted image 20260116190448](assets/Pasted%20image%2020260116190448.png)

The above are two ways to represent an example **Deterministic Finite Automaton**. Its memory can be in a finite amount of **states**, represented by the circles in the first diagram or the rows in the latter. The memory can only ever be in one of these states.

When an input is read, the DFA will undergo a **state transition**. It will change to a new state depending on what the input was. So if the machine is in State one and a 0 is read, it will stay in State one. If instead a 1 was read, it would have moved to State two.

In the first diagram, the arrow without a label shows the **initial state** (the state the automata starts at). The double circled states are **final/accepting states** - if the automata ends in one of these states, it will accept the word, otherwise it rejects it.

Big Idea 4:
## A Model of Computation can be defined mathematically
___

**Def:** a **Deterministic Finite Automata** $M = (Q, \Sigma, q_0, F, \delta)$.
$Q$ is the set of all states the DFA can be in.
$\Sigma$ is the alphabet (for the inputs).
$q_0 \in Q$ is the initial state.
$F \subseteq Q$ is the set of final states/accepting states.
$\delta : (Q \times \Sigma) \rightarrow Q$ is the **transition function**. It maps a state and a string to the next state.


**Def:** the **extended transition function** $\hat{\delta} : (Q \times \Sigma^*) \rightarrow Q$.
Let $q \in Q, w \in \Sigma^*$.
If $|w|$ = 0, then $\hat{\delta} (q, w) = \hat{\delta} (q, \varepsilon) = q_0$.
Else if $|w| \ge 1$:
	$w = u \cdot a$ where $u \in \Sigma^*$, $a \in \Sigma$.
	then $\hat{\delta} (q, w) = \delta (\hat{\delta} (q, u), a)$

Essentially, describes what the end state will be when each character in a **word** is inputted subsequently.


**Def:** $M$ **accepts** $w \in \Sigma^*$ if $\hat{\delta} (q_0, w) \in F$. 
	$M$ **rejects** $w \in \Sigma^*$ if $\hat{\delta} (q_0, w) \notin F$.


**Def:** The **run of** $M$ **on** $w$.
For every word $w \in \Sigma^* = a_1 \circ a_2 \circ a_3 \circ ... a_k$  :
	$\forall n \in \mathbb{N} : n \le k, r_n \in Q$. 
	$(r_0, r_1, r_2, ... r_k)$ is the run of $M$ on $w$ if
	1) $r_0$ is the start state of M, $q_0$.
	2) for every $i \in \{1, 2, 3, ... k\}$ we have $\delta (r_{i-1}, a_i) = r_i$
The run is **accepting** if:
	3) $r_k \in F$
Essentially the order of states that $M$ transitions through when the word $w$ is the input. The run is accepting if it ends at a final state.


**Def:** $\mathcal{L} (M)$ is a function which returns the [Language](Languages.md) **recognised** by M.
	$\mathcal{L} (M) := \{ w \in \Sigma^* : M$ accepts $w\}$
**Alternate def:** $\mathcal{L} (M) := \{w \in \Sigma^* :$ the run of $M$ on $w$ is accepting$\}$


**Def:** We say that $L \subseteq \Sigma^*$ is a **regular language** if there is a DFA that recognises $L$. 

If $L \subseteq \Sigma^*$ is a regular language, then $\Sigma^*$ \ $L$ is a regular language. [Proof](CS143%20-%20RegularLanguagesProof.md).
If $L_1,L_2$ are regular, then so are $L_1 \cap L_2$ and $L_1 \cup L_2$.  [Proof](CS143%20-%20RegularLanguagesProof2.md).


$[\![M]\!] = \mathcal{L}(M)$ : the semantic meaning of a DFA is the language that the DFA recognises.