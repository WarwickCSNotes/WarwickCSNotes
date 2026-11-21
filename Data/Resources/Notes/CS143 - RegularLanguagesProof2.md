#Y1/CS143
Don't have a proof from the lecturer, but here is my go:

Let $M_i = (Q_i, \Sigma, q_{0,i}, F_i, \delta_i)$ for $i \in {1,2}$ be such that $\mathcal{L}(M_i) = L_i$.

**Case $L_1 \cap L_2$:**

- Consider $M' = (Q_1 \times Q_2, \Sigma, (q_{0,1}, q_{0,2}), F_1 \times F_2, \delta ')$ where $\delta ' : (Q_1 \times Q_2) \times \Sigma \rightarrow Q_1 \times Q_2$ such that $\delta ' ((q_{,1},q_{,2}),a) = (\delta_1(q_{,1},a), \delta_2 (q_{,2}, a))$.
- Take $w \in \Sigma^*$. Let the run of $M'$ on $w$ be $((r_{0,1}, r_{0,2}), (r_{1,1}, r_{1,2}), ... (r_{k,1}, r_{k,2}))$.
- Due to the definition of the transition function $\delta '$, we can take the first element of each pair in the run to get the run of $M_1$ on $w = (r_{0,1}, r_{1,1} ... r_{k,1})$ and the second element of each pair to get the run of $M_2$ on $w = (r_{0,2}, r_{1,2} ... r_{k,2})$.
- By the definition of an accepting run, the run of $M'$ on $w$ being accepting $\Leftrightarrow (r_{k,1}, r_{k,2}) \in (F_1, F_2))$. Since $\forall n \in \mathbb{N}, r_{n,1} \in Q_1 \wedge r_{n,2} \in Q_2$ the above is equivalent to saying that $r_{k,1} \in F_1 \wedge r_{k,2} \in F_2$.
- $\therefore$ the run of $M'$ on $w$ is accepting iff the run of $M_1$ on $w$ is accepting and the run of $M_2$ on $w$ is accepting.
- Thus, $\mathcal{L}(M')=\{w \in \Sigma ^* :$ the run of $M_1$ on $w$ is accepting and the run of $M_2$ on $w$ is accepting$\}$ = $L_1 \cap L_2$.

**Case $L_1 \cup L_2$:**

- Consider $M' = (Q_1 \times Q_2, \Sigma, (q_{0,1}, q_{0,2}), F_1 \times Q_2 \cup F_2 \times Q_1, \delta ')$ where $\delta ' : (Q_1 \times Q_2) \times \Sigma \rightarrow Q_1 \times Q_2$ such that $\delta ' ((q_{,1},q_{,2}),a) = (\delta_1(q_{,1},a), \delta_2 (q_{,2}, a))$.
- Take $w \in \Sigma^*$. Let the run of $M'$ on $w$ be $((r_{0,1}, r_{0,2}), (r_{1,1}, r_{1,2}), ... (r_{k,1}, r_{k,2}))$.
- Due to the definition of the transition function $\delta '$, we can take the first element of each pair in the run to get the run of $M_1$ on $w = (r_{0,1}, r_{1,1} ... r_{k,1})$ and the second element of each pair to get the run of $M_2$ on $w = (r_{0,2}, r_{1,2} ... r_{k,2})$.
- By the definition of an accepting run, the run of $M'$ on $w$ being accepting $\Leftrightarrow (r_{k,1}, r_{k,2}) \in (F_1 \times Q_2 \cup F_2 \times Q_1))$. This set on the right is always made up of one element from $Q_1$ and one element from $Q_2$, with either one or two of these being a final state. Since $\forall n \in \mathbb{N}, r_{n,1} \in Q_1 \wedge r_{n,2} \in Q_2$ the above is equivalent to saying that $r_{k,1} \in F_1 \lor r_{k,2} \in F_2$.
-  $\therefore$ the run of $M'$ on $w$ is accepting iff the run of $M_1$ on $w$ is accepting or the run of $M_2$ on $w$ is accepting.
- Thus, $\mathcal{L}(M')=\{w \in \Sigma ^* :$ the run of $M_1$ on $w$ is accepting or the run of $M_2$ on $w$ is accepting$\}$ = $L_1 \cup L_2$.
$\blacksquare$