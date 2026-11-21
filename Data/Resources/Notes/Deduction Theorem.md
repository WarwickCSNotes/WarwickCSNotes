#Y1/CS143 
Firstly, **Fact:** If $A \underset{R}\vdash (\varphi \rightarrow \psi)$, then $A \cup \{\varphi\} \underset{R \cup \{MP\}}\vdash \psi$. This is trivial to see, as you simply add a single line to the proof, using Modus Ponens and the Assumption $\varphi$ to conclude $\psi$.

**Lemma:** If $A \cup (\varphi) \underset{R}\vdash \psi$, then $A \underset{R \cup F}\vdash (\varphi \rightarrow \psi)$.

Using these two things, we can say that so long as $F \subseteq R$ then we can bring assumptions into and out of the conclusion! $(\{a_1, a_2,\; ... \; a_n\}, \; \psi)$ is equivalent to $(\emptyset, \; (a_1 \rightarrow (a_2 \rightarrow ... \; (a_n \rightarrow \psi))))$.



# Deduction Theorem
If $F \subseteq R$ then $A \cup \{\varphi\} \underset{R}\vdash \psi$ iff $A \underset{R}\vdash (\varphi \rightarrow \psi)$.

**Proof:**
"$\Leftarrow$" is trivial. As seen above, we simply specialise Modus Ponens via the assumption $\varphi$ and the old conclusion $(\varphi \rightarrow \psi)$ using $[p \mapsto \varphi, \; q \mapsto \psi]$.

"$\Rightarrow$" General idea is to replace every line $\psi_i$ for $i \in \{1, 2, ...\}$ by the line $\varphi \rightarrow \psi_i$. This replacing is not straightforward, unfortunately.