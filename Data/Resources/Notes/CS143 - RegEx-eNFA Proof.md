#Y1/CS143 
We aim to prove the closure of regular languages under $\cup, \circ, *$.

Lets show that every RegEx can be represented by an $\varepsilon$-NFA (note that all DFAs can be an $\varepsilon$-NFA). We do this by creating an $\varepsilon$-NFA for each of the 5 cases for a RegEx expression*:

1) $[\![a]\!] = \{a\}$
2) $[\![\emptyset]\!] = \emptyset$
3) $[\![R_1 \cup R_2]\!] = [\![R_1]\!] \cup [\![R_2]\!]$
4) $[\![R_1 \circ R_2]\!] = [\![R_1]\!] \circ [\![R_2]\!]$
5) $[\![(R_1)^*]\!]$
\*Note that $[\![\varepsilon]\!]$ is not a necessary case since $[\![\emptyset^*]\!] = \{\varepsilon\}$.

**Case 1:** {a}
![Pasted image 20260205004256](assets/Pasted%20image%2020260205004256.png)
**Case 2:** $\emptyset$
![Pasted image 20260205004400](assets/Pasted%20image%2020260205004400.png)
**Case 3:**
Take two machines $M_1 : [\![M_1]\!] = \mathcal{L}(M_1) = [\![R_1]\!]$ and $M_2 : [\![M_2]\!] = \mathcal{L}(M_2) = [\![R_2]\!]$. Let $M'$ be the machine whose states are a pair of states, one from $M_1$ and the other from $M_2$, with any state that has at least one final state being accepting. We can prove that $\mathcal{L}(M') = \mathcal{L}(M_1) \cup \mathcal{L}(M_2)$. See [this proof](CS143%20-%20RegularLanguagesProof2.md).

**Case 4:**
Take the machines $M_i = (Q_i, \Sigma, q_{0,i}, F_i, \delta_i) : [\![M_i]\!] = \mathcal{L}(M_i) = [\![R_i]\!]$ for $i = \{1,2\}$. Let $M' = (Q_1 \cup Q_2, \Sigma, q_{(0,1)}, F_2, \delta')$ where $\delta'$ is the union of $\delta_1$ and $\delta_2$ except all the final states of $M_1$ have an $\varepsilon$-transition to $q_{0,2}$. The machine 'guesses' when to use the $\varepsilon$-transitions to move to the second machine (in reality its just it passes if there is even one accepting run of the machine on the word - see [eNFAs](Epsilon%20Nondeterministic%20Finite%20Automata.md)).
![Pasted image 20260205005702](assets/Pasted%20image%2020260205005702.png)
**Case 5:**
Take the machine $M : [\![M]\!] = \mathcal{L}(M) = [\![R]\!]$. We modify $M$ by adding a new accepting state which becomes the initial state, then adding an $\varepsilon$-transition from it to the old initial state, as well as $\varepsilon$-transitions from every final state to the old initial state.
![Pasted image 20260205011248](assets/Pasted%20image%2020260205011248.png)
