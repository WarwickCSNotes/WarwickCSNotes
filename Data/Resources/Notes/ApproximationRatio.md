# Approximation Ratio

A problem $P$ has many different possible solutions, many different algorithms that try to find those solutions, and many different problem instances. The **approximation ratio** of an algorithm measures how close the algorithm, *in the worst case from all input instances*, gets to the optimal solution.

## Intuition: Cookies Problem

Let $P$ be the "cookies" problem: find as many cookies as possible. For simplicity, assume $P$ only has two problem instances:

- $I_{\text{DCS}}$ (the DCS building)
- $I_{\text{KITCHEN}}$ (my kitchen)

Consider three algorithms:

- $S$: look for cookies on all surfaces.
- $C$: look for cookies in all cupboards.
- $\text{OPT}$: magically finds all cookies (the optimal).

We write $\text{obj}(A(I))$ (obj for *"objective value"*) for the number of cookies algorithm $A$ finds in instance $I$.

### Instance $I_{\text{DCS}}$

$\text{obj}(S(I_{\text{DCS}})) = 5, \quad \text{obj}(C(I_{\text{DCS}})) = 12, \quad \text{obj}(\text{OPT}(I_{\text{DCS}})) = 33.$

Here $C$ and $S$ both fall short of the optimal:

- $C$ finds $\frac{12}{33} \approx 36.4\%$ of the cookies.
- $S$ finds $\frac{5}{33} \approx 15.2\%$ of the cookies.

### Instance $I_{\text{KITCHEN}}$

The same algorithms can do very differently on a different instance:

$\text{obj}(S(I_{\text{KITCHEN}})) = 23, \quad \text{obj}(C(I_{\text{KITCHEN}})) = 5, \quad \text{obj}(\text{OPT}(I_{\text{KITCHEN}})) = 38.$

So now:

- $S$ finds $\frac{23}{38} \approx 60.5\%$ of the cookies.
- $C$ finds $\frac{5}{38} \approx 13.2\%$ of the cookies.

### The approximation ratio

The approximation ratio of an algorithm $A$ is the *worst* ratio it achieves over all problem instances: the **smallest** value of $\frac{\text{obj}(A(I))}{\text{obj}(\text{OPT}(I))}$ across all instances.

Take algorithm $S$. On $I_{\text{DCS}}$ it scores $\frac{5}{33} \approx 15.2\%$; on $I_{\text{KITCHEN}}$ it scores $\frac{23}{38} \approx 60.5\%$. Its worst case is on $I_{\text{DCS}}$, so its approximation ratio is $\frac{5}{33} \approx 0.152$.

Formally,

$\alpha_S \;=\; \min_{I \in \{I_{\text{DCS}},\ I_{\text{KITCHEN}}\}} \frac{\text{obj}(S(I))}{\text{obj}(\text{OPT}(I))} \;=\; \min\!\left( \frac{5}{33},\ \frac{23}{38} \right) \;=\; \frac{5}{33} \approx 0.152.$

So why is it defined as the **minimum** for this problem? It's because the ratio gives you a guarantee - the algorithm $S$ will find at least 15.2% of the cookies. 

Now try working out the approximation ratio of algorithm $C$ for yourself before opening the callout below.

>[!info]- Approximation ratio of $C$
> On $I_{\text{DCS}}$, $C$ scores $\frac{12}{33} \approx 0.364$.
>
> On $I_{\text{KITCHEN}}$, $C$ scores $\frac{5}{38} \approx 0.132$.
>
> Its worst case is $I_{\text{KITCHEN}}$ (the smaller of the two ratios), so:
>
> $\alpha_C \;=\; \min_{I \in \{I_{\text{DCS}},\ I_{\text{KITCHEN}}\}} \frac{\text{obj}(C(I))}{\text{obj}(\text{OPT}(I))} \;=\; \min\!\left( \frac{12}{33},\ \frac{5}{38} \right) \;=\; \frac{5}{38} \approx 0.132.$
>
> So $C$'s approximation ratio is roughly $0.132$: even worse than $S$'s, because $C$'s worst-case instance (the kitchen) only yields $5$ of the $38$ cookies.

## General definition

For any algorithm $\text{ALG}$ on a **maximisation** problem $P$, with $I^*$ the set of all instances of $P$:

$\alpha_{\text{ALG}} \;=\; \min_{I \in I^*} \frac{\text{obj}(\text{ALG}(I))}{\text{obj}(\text{OPT}(I))} \;\;(\leq 1).$

For a **minimisation** problem (where smaller objectives are better, e.g. shortest-path length, total cost) the inequality flips: $\text{ALG}$ can only ever be at least as large as $\text{OPT}$, so the ratio is $\geq 1$ and the worst case is now the **largest** value:

$\alpha_{\text{ALG}} \;=\; \max_{I \in I^*} \frac{\text{obj}(\text{ALG}(I))}{\text{obj}(\text{OPT}(I))} \;\;(\geq 1).$

In both cases, the approximation ratio is a guarantee: $\text{ALG}$'s objective is *always* within a factor of $\alpha_{\text{ALG}}$ of the optimal, no matter which instance it's run on.
