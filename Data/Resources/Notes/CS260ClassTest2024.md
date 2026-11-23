>[!warning]- Modified from the original
> These questions have been reworded and cut down, and the diagrams are new. The original 2024 class test paper looked different: it framed each question with a story, used other names (e.g. "Cov-Loop" for Two-Tracks), and had none of the diagrams below.

The CS260 class test from 25 November 2024: two questions of equal weight (25 marks each), 50 minutes in total. The questions are reworded here without the story around them.

When asked to design an algorithm, you must also justify its correctness. Standard algorithms from lectures or CS126 can be referred to by name rather than written out.

---

## Question 1: Building a track with few segments

We want to build a track of a given length, which is always a whole number of metres. The track is made by joining segments end to end, and we want to **minimise the number of segments used**.

The available segment lengths are $1$m, $3$m, $6$m and $18$m, with unlimited supply of each.

```tikz
\begin{tikzpicture}[x=0.3cm, y=0.3cm, seg/.style={draw, semithick, fill=gray!10}]
\foreach \l/\y in {1/0, 3/-2, 6/-4, 18/-6} {
\draw[seg] (0,\y) rectangle (\l,\y+1);
\foreach \t in {1,...,\l} {\ifnum\t<\l \draw[thin] (\t,\y) -- (\t,\y+1);\fi}
\node[anchor=west, font=\small] at (\l+0.6,\y+0.5) {$\l$\,m};
}
\end{tikzpicture}
```

**(a)** *(4 marks)* The **greedy algorithm** repeatedly picks the longest segment that does not exceed the remaining length. Apply it to build a track of exactly $34$m.

```tikz
\begin{tikzpicture}[x=0.3cm, y=0.3cm]
\draw[dashed, semithick] (0,0) rectangle (34,1);
\node[font=\small] at (17,0.5) {?};
\draw[|<->|, >=stealth', semithick] (0,-1) -- (34,-1) node[midway, below, font=\small] {$34$\,m};
\end{tikzpicture}
```

**(b)** *(10 marks)* Show that the greedy algorithm always uses the fewest possible segments when the segment lengths are $1$m, $3$m, $6$m and $18$m.

**(c)** *(4 marks)* Now the only segment lengths available are $1$m, $4$m and $5$m. Give a counterexample showing that the greedy algorithm does not always use the fewest segments.

```tikz
\begin{tikzpicture}[x=0.3cm, y=0.3cm, seg/.style={draw, semithick, fill=gray!10}]
\foreach \l/\y in {1/0, 4/-2, 5/-4} {
\draw[seg] (0,\y) rectangle (\l,\y+1);
\foreach \t in {1,...,\l} {\ifnum\t<\l \draw[thin] (\t,\y) -- (\t,\y+1);\fi}
\node[anchor=west, font=\small] at (\l+0.6,\y+0.5) {$\l$\,m};
}
\end{tikzpicture}
```

**(d)** *(7 marks)* Design a dynamic programming solution for the fewest segments when the lengths are $1$m, $4$m and $5$m. Give the **Bellman equations**, and define what $\text{OPT}$ represents. You do not need to write out the full algorithm or analyse its running time.

---

## Question 2: Two equal tracks

We are given a multiset of segments with non-negative integer lengths. Zero-length segments (joints) are allowed. We want to build **two tracks** such that:

- **every** segment is used, including the zero-length ones;
- both tracks have the **same number** of segments;
- both tracks have the **same total length** (the length itself doesn't matter).

Whether this is possible depends on the segments given. For example, the segments $\{3, 1, 4, 2, 0, 2, 5, 3, 0, 0\}$ can be split like this, with zero-length joints drawn as circles:

```tikz
\begin{tikzpicture}[x=0.6cm, y=0.6cm, seg/.style={draw, semithick, fill=gray!10}, joint/.style={circle, draw, semithick, fill=gray!10, inner sep=1.6pt}]
\node[anchor=east, font=\small] at (-0.4,0.5) {Track A};
\draw[seg] (0,0) rectangle (3,1) node[midway, font=\small] {$3$};
\draw[seg] (3,0) rectangle (4,1) node[midway, font=\small] {$1$};
\draw[seg] (4,0) rectangle (8,1) node[midway, font=\small] {$4$};
\draw[seg] (8,0) rectangle (10,1) node[midway, font=\small] {$2$};
\node[joint] at (4,0.5) {};
\node[anchor=west, font=\small] at (10.4,0.5) {5 segments, $10$\,m};
\node[anchor=east, font=\small] at (-0.4,-1.5) {Track B};
\draw[seg] (0,-2) rectangle (2,-1) node[midway, font=\small] {$2$};
\draw[seg] (2,-2) rectangle (7,-1) node[midway, font=\small] {$5$};
\draw[seg] (7,-2) rectangle (10,-1) node[midway, font=\small] {$3$};
\node[joint] at (2,-1.5) {};
\node[joint] at (7,-1.5) {};
\node[anchor=west, font=\small] at (10.4,-1.5) {5 segments, $10$\,m};
\end{tikzpicture}
```

**(a)** *(5 marks)* Is it possible to build the two tracks from the following segments?

$$0,\ 0,\ 1,\ 2,\ 2,\ 3,\ 4,\ 5,\ 7,\ 8$$

```tikz
\begin{tikzpicture}[x=0.25cm, y=0.3cm, seg/.style={draw, semithick, fill=gray!10}, joint/.style={circle, draw, semithick, fill=gray!10, inner sep=1.6pt}]
\node[joint] at (0,0.5) {};
\node[font=\small] at (0,-0.8) {$0$};
\node[joint] at (1.5,0.5) {};
\node[font=\small] at (1.5,-0.8) {$0$};
\foreach \a/\b in {3/4, 5/7, 8/10, 11/14, 15/19, 20/25, 26/33, 34/42} {
\draw[seg] (\a,0) rectangle (\b,1);
\pgfmathtruncatemacro{\len}{\b-\a}
\node[font=\small] at ({(\a+\b)/2},-0.8) {$\len$};
}
\end{tikzpicture}
```

**(b)** *(20 marks)* Let **Two-Tracks** be the decision problem: given a multiset of non-negative integer segment lengths, can the two tracks be built subject to the constraints above? Prove that Two-Tracks is **NP-complete**.

>[!hint]- Hint (given in class test)
> The **Partition** problem (given a set of non-negative integers, can it be split into two groups with the same sum?) is NP-complete (Karp). You may use this fact.
