>[!warning]- Modified from the original
> These questions have been reworded and cut down, and the diagrams are new. The original 2024 class test paper looked different: it framed each question with a story, used other names (e.g. "Cov-Loop" for Two-Tracks), and had none of the diagrams below. The questions on their own are [here](/resources/Notes/CS260/CS260ClassTest2024).

1) *We want to build a track of a given whole-number length from segments, using as few segments as possible. The segment lengths are $1$m, $3$m, $6$m and $18$m.*

```tikz
\begin{tikzpicture}[x=0.3cm, y=0.3cm, seg/.style={draw, semithick, fill=gray!10}]
\foreach \l/\y in {1/0, 3/-2, 6/-4, 18/-6} {
\draw[seg] (0,\y) rectangle (\l,\y+1);
\foreach \t in {1,...,\l} {\ifnum\t<\l \draw[thin] (\t,\y) -- (\t,\y+1);\fi}
\node[anchor=west, font=\small] at (\l+0.6,\y+0.5) {$\l$\,m};
}
\end{tikzpicture}
```

**(a)** The greedy algorithm repeatedly picks the longest segment that does not exceed the remaining length. Apply it to build a track of exactly $34$m.

>[!hint]- Hint 1
> Keep track of how much length is left each time. For instance, the first step: select the segment of length $18$, since this is the largest segment length that is no bigger than $34$. Now you have $16$ length remaining to build. What segment do you pick next?

>[!check]- Solution
> First, we note the length left is $34$, so we select a segment of length $18$. Then we keep going:
>
> | Length left | Segment selected | Length left after |
> |---|---|---|
> | $34$ | $18$ | $16$ |
> | $16$ | $6$ | $10$ |
> | $10$ | $6$ | $4$ |
> | $4$ | $3$ | $1$ |
> | $1$ | $1$ | $0$ |
>
> We have $0$ left, so the track is complete!
>
> So we have selected the segments $18, 6, 6, 3, 1$ (5 segments).
>
> ```tikz
> \begin{tikzpicture}[x=0.35cm, y=0.35cm, seg/.style={draw, semithick, fill=gray!10}]
> \draw[seg] (0,0) rectangle (18,1) node[midway, font=\small] {$18$};
> \draw[seg] (18,0) rectangle (24,1) node[midway, font=\small] {$6$};
> \draw[seg] (24,0) rectangle (30,1) node[midway, font=\small] {$6$};
> \draw[seg] (30,0) rectangle (33,1) node[midway, font=\small] {$3$};
> \draw[seg] (33,0) rectangle (34,1) node[midway, font=\small] {$1$};
> \draw[|<->|, >=stealth', semithick] (0,-0.8) -- (34,-0.8) node[midway, below, font=\small] {$34$\,m};
> \end{tikzpicture}
> ```

---

**(b)** Show that the greedy algorithm always uses the fewest possible segments when the segment lengths are $1$m, $3$m, $6$m and $18$m.

>[!hint]- Hint 1
> This follows the same outline as the coin changing example from lectures. It's an **exchange argument**: take any optimal solution, and show that swapping some of its segments for others would use fewer segments, unless it already contains the segment greedy picks.

>[!hint]- Hint 2
> In a solution with the fewest segments, how many $1$m segments can there be at most? What could you replace three of them with?

>[!check]- Solution
> Take any optimal solution (one with the fewest segments). It can contain:
>
> - at most two $1$m segments, since three of them could be swapped for one $3$m segment, using fewer segments;
> - at most one $3$m segment, since two could be swapped for one $6$m segment;
> - at most two $6$m segments, since three could be swapped for one $18$m segment.
>
> So the segments shorter than $18$m in an optimal solution add up to at most $2 \cdot 1 + 1 \cdot 3 + 2 \cdot 6 = 17$m. Likewise, segments shorter than $6$m add up to at most $5$m, and segments shorter than $3$m to at most $2$m.
>
> Now let $n$ be the length left to build, and $s$ the segment greedy picks.
>
> - If $n \geq 18$, the optimal solution must use an $18$m segment, since without one it covers at most $17$m.
> - If $6 \leq n \leq 17$, it can't use an $18$m segment, and without a $6$m one it covers at most $5$m. So it uses a $6$m segment.
> - If $3 \leq n \leq 5$, it must use a $3$m segment in the same way.
> - If $n \leq 2$, only $1$m segments fit.
>
> In every case some optimal solution contains $s$. Removing $s$ leaves an optimal solution for length $n - s$ (if there were a better one, adding $s$ back would beat the original optimum). By induction on $n$, greedy is optimal.

---

**(c)** Now the only segment lengths are $1$m, $4$m and $5$m. Give a counterexample showing that the greedy algorithm does not always use the fewest segments.

>[!hint]- Hint 1
> Greedy always grabs a $5$m segment first if it can. Find a length where that is a bad idea, e.g. one that $4$m segments fill exactly.

>[!check]- Solution
> Take a track of length $12$m. Greedy picks $5$, then $5$ again, leaving $2$m, which needs two $1$m segments: $5, 5, 1, 1$ is $4$ segments in total. The optimal solution is three $4$m segments: $3$ segments.
>
> ```tikz
> \begin{tikzpicture}[x=0.6cm, y=0.6cm, seg/.style={draw, semithick, fill=gray!10}]
> \node[anchor=east, font=\small] at (-0.4,0.5) {Greedy};
> \draw[seg] (0,0) rectangle (5,1) node[midway, font=\small] {$5$};
> \draw[seg] (5,0) rectangle (10,1) node[midway, font=\small] {$5$};
> \draw[seg] (10,0) rectangle (11,1) node[midway, font=\small] {$1$};
> \draw[seg] (11,0) rectangle (12,1) node[midway, font=\small] {$1$};
> \node[anchor=west, font=\small] at (12.4,0.5) {4 segments};
> \node[anchor=east, font=\small] at (-0.4,-1.5) {Optimal};
> \draw[seg] (0,-2) rectangle (4,-1) node[midway, font=\small] {$4$};
> \draw[seg] (4,-2) rectangle (8,-1) node[midway, font=\small] {$4$};
> \draw[seg] (8,-2) rectangle (12,-1) node[midway, font=\small] {$4$};
> \node[anchor=west, font=\small] at (12.4,-1.5) {3 segments};
> \end{tikzpicture}
> ```

---

**(d)** Give the Bellman equations for a dynamic programming solution that finds the fewest segments when the lengths are $1$m, $4$m and $5$m. Define what $\text{OPT}$ represents. You do not need the full algorithm or its running time.

>[!hint]- Hint 1
> $\text{OPT}(j)$ should be the answer for a track of length $j$. You should be able to write base cases for $j \leq 5$, and then something recursive for $j > 5$.

>[!hint]- Hint 2
> The recursive step should represent a choice. How do you write: "for the next segment, you can choose length $1$, $4$ or $5$. Pick the choice that leads to the fewest segments used after it"?

>[!hint]- Hint 3
> If the segment you choose has length $s$, what's left is a track of length $j - s$, which takes $\text{OPT}(j - s)$ segments at best. Try all three choices, keep the best, and add $1$ for the segment you just used:
>
> $$\text{OPT}(j) = 1 + \min\{\text{OPT}(j-5),\ \text{OPT}(j-4),\ \text{OPT}(j-1)\} \quad \text{for } j > 5$$

>[!check]- Solution
> Let $\text{OPT}(j)$ be the fewest segments needed to build a track of length exactly $j$m. Then:
>
> $$\text{OPT}(j) = j \quad \text{for } j \leq 3$$
>
> $$\text{OPT}(4) = 1$$
>
> $$\text{OPT}(5) = 1$$
>
> $$\text{OPT}(j) = 1 + \min\{\text{OPT}(j-5),\ \text{OPT}(j-4),\ \text{OPT}(j-1)\} \quad \text{for } j > 5$$
>
> **Why this is right:**
>
> - For $j \leq 3$, only $1$m segments fit, so we need exactly $j$ of them. This includes $\text{OPT}(0) = 0$.
> - For $j = 4$ and $j = 5$, a single segment fits exactly.
> - For $j > 5$, the last segment of an optimal track is $1$m, $4$m or $5$m, and all three fit since $j \geq 6$. Removing it leaves a track of length $j - 1$, $j - 4$ or $j - 5$. That shorter track must itself be built optimally, or we could swap in a better one and beat the optimum. So we take the best of the three options and add $1$ for the last segment. Since $j \geq 6$, all three lengths are at least $1$, so we never look up a negative length.

>[!info]- Going further (not needed for the marks)
> An optimal solution uses at most four $1$m segments (five could be one $5$m) and at most four $4$m segments (five of them make $20$m, which four $5$m segments also make). So the segments other than $5$m add up to at most $4 + 16 = 20$m, and for $j > 20$ an optimal solution must contain a $5$m segment: $\text{OPT}(j) = 1 + \text{OPT}(j - 5)$. Only lengths up to $20$ need the table, so the answer for any $j$ takes $O(1)$ time.

---

2) *We are given a multiset of segments with non-negative integer lengths (zero-length joints allowed). We want two tracks that use every segment, have the same number of segments, and have the same total length.*

**(a)** Is it possible to build the two tracks from these segments?

$$0,\ 0,\ 1,\ 2,\ 2,\ 3,\ 4,\ 5,\ 7,\ 8$$

>[!hint]- Hint 1
> Add up all the lengths and count the segments. How long must each track be, and how many segments must each have?

>[!check]- Solution
> Yes. The lengths add up to $32$ and there are $10$ segments, so each track needs $5$ segments and a length of $16$m. One way:
>
> $$0 + 5 + 7 + 2 + 2 = 16 \qquad 0 + 1 + 3 + 4 + 8 = 16$$
>
> Each track has $5$ segments and every segment is used. Other splits also work.
>
> ```tikz
> \begin{tikzpicture}[x=0.5cm, y=0.6cm, seg/.style={draw, semithick, fill=gray!10}, joint/.style={circle, draw, semithick, fill=gray!10, inner sep=1.6pt}]
> \node[anchor=east, font=\small] at (-0.4,0.5) {Track A};
> \draw[seg] (0,0) rectangle (5,1) node[midway, font=\small] {$5$};
> \draw[seg] (5,0) rectangle (12,1) node[midway, font=\small] {$7$};
> \draw[seg] (12,0) rectangle (14,1) node[midway, font=\small] {$2$};
> \draw[seg] (14,0) rectangle (16,1) node[midway, font=\small] {$2$};
> \node[joint] at (5,0.5) {};
> \node[anchor=west, font=\small] at (16.4,0.5) {5 segments, $16$\,m};
> \node[anchor=east, font=\small] at (-0.4,-1.5) {Track B};
> \draw[seg] (0,-2) rectangle (1,-1) node[midway, font=\small] {$1$};
> \draw[seg] (1,-2) rectangle (4,-1) node[midway, font=\small] {$3$};
> \draw[seg] (4,-2) rectangle (8,-1) node[midway, font=\small] {$4$};
> \draw[seg] (8,-2) rectangle (16,-1) node[midway, font=\small] {$8$};
> \node[joint] at (4,-1.5) {};
> \node[anchor=west, font=\small] at (16.4,-1.5) {5 segments, $16$\,m};
> \end{tikzpicture}
> ```

---

**(b)** Let **Two-Tracks** be the decision problem: given a multiset of non-negative integer segment lengths, can the two tracks be built? Prove that Two-Tracks is NP-complete.

>[!hint]- Hint (given in class test)
> The **Partition** problem (given a set of non-negative integers, can it be split into two groups with the same sum?) is NP-complete (Karp). You may use this fact.

>[!hint]- Hint 1
> NP-complete means two things: Two-Tracks is in NP, and Two-Tracks is NP-hard. For NP, what certificate would you check, and how quickly?

>[!hint]- Hint 2
> Two-Tracks is Partition with an extra rule: the groups must be the same size. Partition doesn't care about size. Which segments could you add to a Partition instance so that sizes can always be balanced, without changing any sums?

>[!check]- Solution
> **In NP:** A certificate says which track each segment goes on. We check that every segment is used exactly once, that the tracks have the same number of segments, and that they have the same total length. This takes linear time.
>
> **NP-hard:** We reduce Partition to Two-Tracks. (Two-Tracks is also known as Equal-Cardinality-Partition.) Given a Partition instance $X$ with $n$ numbers, build the Two-Tracks instance $X' = X$ plus $n$ segments of length $0$, and answer whatever Two-Tracks answers on $X'$. Building $X'$ takes $O(n)$ time and we ask the Two-Tracks oracle once, so this is a polynomial-time (Karp) reduction.
>
> *If $X$ is a yes-instance of Partition*, split it into $Y$ and $Z$ with equal sums. Put $Y$ plus $|Z|$ zeros on one track and $Z$ plus $|Y|$ zeros on the other. Both tracks have $|Y| + |Z| = n$ segments, they use exactly $|Y| + |Z| = n$ zeros between them so every segment is used, and their lengths are equal because zeros add nothing. So $X'$ is a yes-instance.
>
> For example, take $X = \{3, 1, 1, 2, 2, 1\}$, so $n = 6$ and we add $6$ zeros. Partition splits $X$ into $Y = \{3, 2\}$ and $Z = \{1, 1, 2, 1\}$, both summing to $5$, but with $2$ and $4$ numbers. Padding $Y$ with $|Z| = 4$ zeros and $Z$ with $|Y| = 2$ zeros evens out the counts:
>
> ```tikz
> \begin{tikzpicture}[x=0.7cm, y=0.6cm, seg/.style={draw, semithick, fill=gray!10}, joint/.style={circle, draw, semithick, fill=gray!10, inner sep=1.6pt}]
> \node[anchor=east, font=\small] at (-0.4,0.5) {$Y$};
> \draw[seg] (0,0) rectangle (3,1) node[midway, font=\small] {$3$};
> \draw[seg] (3,0) rectangle (5,1) node[midway, font=\small] {$2$};
> \node[anchor=west, font=\small] at (7.6,0.5) {2 numbers, sum $5$};
> \node[anchor=east, font=\small] at (-0.4,-1) {$Z$};
> \draw[seg] (0,-1.5) rectangle (1,-0.5) node[midway, font=\small] {$1$};
> \draw[seg] (1,-1.5) rectangle (2,-0.5) node[midway, font=\small] {$1$};
> \draw[seg] (2,-1.5) rectangle (4,-0.5) node[midway, font=\small] {$2$};
> \draw[seg] (4,-1.5) rectangle (5,-0.5) node[midway, font=\small] {$1$};
> \node[anchor=west, font=\small] at (7.6,-1) {4 numbers, sum $5$};
> \draw[->, >=stealth', semithick] (2.5,-2.2) -- (2.5,-3.6) node[midway, right, font=\small] {add $n = 6$ zeros};
> \node[anchor=east, font=\small] at (-0.4,-4.5) {Track A};
> \draw[seg] (0,-5) rectangle (3,-4) node[midway, font=\small] {$3$};
> \draw[seg] (3,-5) rectangle (5,-4) node[midway, font=\small] {$2$};
> \foreach \z in {5.5,6,6.5,7} {\node[joint] at (\z,-4.5) {};}
> \node[anchor=west, font=\small] at (7.6,-4.5) {6 segments, $5$\,m};
> \node[anchor=east, font=\small] at (-0.4,-6) {Track B};
> \draw[seg] (0,-6.5) rectangle (1,-5.5) node[midway, font=\small] {$1$};
> \draw[seg] (1,-6.5) rectangle (2,-5.5) node[midway, font=\small] {$1$};
> \draw[seg] (2,-6.5) rectangle (4,-5.5) node[midway, font=\small] {$2$};
> \draw[seg] (4,-6.5) rectangle (5,-5.5) node[midway, font=\small] {$1$};
> \foreach \z in {5.5,6} {\node[joint] at (\z,-6) {};}
> \node[anchor=west, font=\small] at (7.6,-6) {6 segments, $5$\,m};
> \end{tikzpicture}
> ```
>
> *Zero-length segments are drawn as circles. They change the count but not the length.*
>
> *If $X'$ is a yes-instance of Two-Tracks*, take the two tracks and delete the $n$ added zeros. Deleting zeros doesn't change either track's length, so what's left splits $X$ into two groups with equal sums. Partition doesn't care about group sizes, so $X$ is a yes-instance.
>
> So $X$ is a yes-instance of Partition exactly when $X'$ is a yes-instance of Two-Tracks. Since Partition is NP-complete, Two-Tracks is NP-hard, and together with membership in NP it is NP-complete.
