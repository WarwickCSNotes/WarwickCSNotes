>[!warning]- Modified from the original
> These questions have been reworded and cut down, and the diagrams have been redrawn, with some new ones added. The original 2023 class test paper looked different: it framed each question with a story (jewels on chains, *Doctor Who* watch parties).

The CS260 class test from 27 November 2023: two questions of equal weight (25 marks each), 50 minutes in total. The questions are reworded here without the story around them.

When asked to design an algorithm, you must also justify its correctness. Standard algorithms from lectures or CS126 can be referred to by name rather than written out.

---

## Question 1: Non-adjacent nodes on a path

We have a path graph where each node has a value. We want a set of nodes $S$ with the **maximum total value**, such that **no two nodes in $S$ are adjacent**. Picking a node rules out both of its neighbours.

For example, here is a path with $8$ nodes, labelled by value:

```tikz
\begin{tikzpicture}[vertex/.style={circle, draw, semithick, fill=gray!10, minimum size=2em, inner sep=1pt, font=\small}]
\foreach \v [count=\i] in {5,6,4,4,3,1,1,2} {
\node[vertex] (n\i) at (1.4*\i, 0) {$\v$};
}
\foreach \i [evaluate=\i as \j using int(\i+1)] in {1,...,7} {
\draw (n\i) -- (n\j);
}
\end{tikzpicture}
```

Picking the node with value $3$ rules out its neighbours with values $4$ and $1$. The other five nodes are unaffected.

**(a)** *(5 marks)* Find a maximum-value solution for the path above. Briefly justify your answer.

**(b)** *(5 marks)* Consider the greedy approach: pick the most valuable node, remove it and its neighbours, then repeat on the nodes that are left. Is this approach optimal? Explain your answer.

**(c)** *(10 marks)* The input is an array of length $n$, where $\text{value}[i]$ is the value of the $i$th node on the path. Give a polynomial-time algorithm that finds the value of an optimal solution, and justify its optimality.

- What is the running time of your algorithm?
- How can you use the information your algorithm computes to find the optimal set of nodes itself?

**(d)** *(5 marks)* Now the graph is a **rooted tree** instead of a path. The same rule applies: picking a node rules out everything adjacent to it (its parent and its children). In a few sentences, outline how you would design an optimal algorithm for this problem. You don't need a detailed proof of optimality or a running time analysis, just brief comments on why your approach should be optimal.

```tikz
\begin{tikzpicture}[vertex/.style={circle, draw, semithick, fill=gray!10, minimum size=2em, inner sep=1pt, font=\small}]
\node[vertex] (r) at (0, 0) {$3$};
\node[vertex] (a) at (-1.8, -1.4) {$4$};
\node[vertex] (b) at (1.8, -1.4) {$2$};
\node[vertex] (c) at (-2.7, -2.8) {$5$};
\node[vertex] (d) at (-0.9, -2.8) {$1$};
\node[vertex] (e) at (1.8, -2.8) {$6$};
\draw (r) -- (a);
\draw (r) -- (b);
\draw (a) -- (c);
\draw (a) -- (d);
\draw (b) -- (e);
\node[anchor=west, font=\small] at (0.5, 0) {root};
\end{tikzpicture}
```

*An example tree (not part of the original question).*

---

## Question 2: Watch parties

People are connected by friendships, which are symmetric. Anyone can host a party. A party hosted by $h$ can be attended by:

- the host $h$;
- all direct friends of $h$;
- all direct friends of *those* friends.

In other words, in the friendship graph, a party hosted by $h$ can be attended by everyone within **distance $2$** of $h$.

```tikz
\begin{tikzpicture}[vertex/.style={circle, draw, semithick, fill=gray!10, minimum size=2em, inner sep=1pt, font=\small}]
\node[vertex] (h) at (0, 0) {$h$};
\node[vertex] (p) at (2, 0) {};
\node[vertex] (q) at (4, 0) {};
\node[vertex, dashed] (r) at (6, 0) {};
\draw (h) -- (p);
\draw (p) -- (q);
\draw (q) -- (r);
\node[font=\small, below=0.35cm of h] {host};
\node[font=\small, below=0.35cm of p] {friend};
\node[font=\small, below=0.35cm of q, align=center] {friend of\\friend};
\node[font=\small, below=0.35cm of r, align=center] {can't\\attend};
\end{tikzpicture}
```

Here is a friendship network $N$, where an edge means two people are direct friends:

```tikz
\begin{tikzpicture}[x=1.1cm, y=1.1cm, vertex/.style={circle, draw, semithick, fill=gray!10, minimum size=2em, inner sep=1pt, font=\small}]
\node[vertex] (b) at (1, 2) {$b$};
\node[vertex] (c) at (1, 1) {$c$};
\node[vertex] (a) at (0, 0.5) {$a$};
\node[vertex] (d) at (1, 0) {$d$};
\node[vertex] (e) at (2, 1) {$e$};
\node[vertex] (f) at (2, 0) {$f$};
\node[vertex] (g) at (2, -1) {$g$};
\node[vertex] (j) at (3, 0) {$j$};
\node[vertex] (i) at (3, 1) {$i$};
\node[vertex] (h) at (3, 2) {$h$};
\node[vertex] (k) at (4, 1.6) {$k$};
\draw (b) -- (c);
\draw (c) -- (d);
\draw (a) -- (c);
\draw (a) -- (d);
\draw (c) -- (e);
\draw (e) -- (f);
\draw (f) -- (g);
\draw (f) -- (j);
\draw (j) -- (i);
\draw (i) -- (h);
\draw (h) -- (k);
\end{tikzpicture}
```

**(a)** *(5 marks)* Everyone in $N$ wants to attend a party. Argue that the minimum number of parties needed is $2$.

The **Watch-Parties** problem: given a set of people $P$, a set of friendships $F \subseteq P^2$ and an integer $k$, are $k$ parties enough for everybody in $P$ to attend one?

**(b)** *(20 marks)* Prove that Watch-Parties is **NP-complete**.
