#Y1/CS143 
If we read a long word via a DFA $M$ with n states, we know that at least one of the states has been visited more than once. (Based on the Pidgeon Hole Principle).

**Fact:** If $(r_0, r_1, ... r_n)$ is the run of a DFA $M = (Q, \Sigma, q_0, F, \delta)$ on $w \in \Sigma^*$ such that $n \ge |Q|$, then $\exists \ell, \mathbb{r} : 0 \le \ell \lt \mathbb{r} \le |Q| : r_\ell = r_\mathbb{r}$.

**Corollary:** $\forall w \in \mathcal{L}(M): |w| \ge Q,$
$\exists x,y,z \in \Sigma^* : w=xyz :$
a) $|y| \ge 1$
b) $|xy| \le |Q|$
c) $\forall k \ge 0, xy^kz \in \mathcal{L}(M)$

**Proof:**
- Let $M = (Q, \Sigma, q_0, F, \delta)$ be a DFA, and $(w = a_1a_2 ... a_n) \in \mathcal{L}(M)$ be a word where $n \ge |Q|$.
- Let $(r_0, r_1, ... r_n)$ be the run of $M$ on $w$.
- Take $\ell, \mathbb{r} : 0 \le \ell \lt \mathbb{r} \le |Q| \wedge r_\ell = r_\mathbb{r}$ (we know that this exists via the Pidgeon Hole Principle). Let $x = a_1a_2 ... a_\ell$ ;  $y = a_{\ell + 1} ... a_\mathbb{r}$ ;  $z = a_{\mathbb{r} + 1} ... a_n$.
- We know that $|y| \ge 1$ because $\ell \lt \mathbb{r}$. We know that $|xy| \le |Q|$ because $\mathbb{r} \le |Q|$. Finally, we know that $\forall k \ge 0, xy^kz \in \mathcal{L}(M)$ because $r_\ell = r_\mathbb{r}$ and so we can cut out $y$ completely or even do repetitions of $y$ and still end up at the same state as $a_\ell$, meaning the run is still accepting.

___
### The Pumping Lemma for Regular Languages

$\forall L \subseteq \Sigma^*$ such that $L$ is regular
$\exists p \ge 1 :$
$\forall w \in L : |w| \ge p$
$\exists x,y,z \in \Sigma^* : w=xyz$ :
$|y| \ge 1$ and $|xy| \le p$ and $\forall k \ge 0, xy^kz \in L$.

*(for all regular languages, all words that are longer than the DFA's |Q| will have a loop in there)*

**Proof:** We apply the Corollary to a DFA $M = (Q, \Sigma, q_0, F, \delta)$ such that $\mathcal{L}(M) = L$, setting $p = |Q|$.

___
### The contrapositive of the Pumping Lemma for Regular Languages

Normal: $\forall_L ($premise($L$) $\Rightarrow$ conclusion($L$)$)$, where the premise is that $L$ is regular and the conclusion is the rest.

Contrapositive: $\forall_L ( \neg$ conclusion($L$) $\Rightarrow$ $\neg$ premise($L$)$)$.

If $\forall p \ge 1$
	$\exists w \in L : |w| \ge p :$
	$\forall x,y,z \in \Sigma^* : w=xyz$
		If $|y| \ge 1 \wedge |xy| \le p$ then $\exists k \ge 0 : xy^kz \notin L$.
Then $L$ is not regular.

**Example:** $L = \{w \in \{a,b\} :$ # a's in $w \ge$ # b's in $w\}$ isn't regular.
**Proof:**
- Take any $p \ge 1$.
- We pick $(w = b^p a^{p+1}) \in L$.
- Take any $w=xyz$.
- Suppose $|y| \ge 1 \wedge |xy| \le p$
- We pick $k=3$.
- Since $|xy| \le p$ ,  $x = b^\alpha$ and $y = b^\beta$ where $\alpha + \beta \le p$. Since $|y| \ge 1$ ,  $\beta \ge 1$.
- Therefore $z = b^{p - \alpha - \beta} a^{p+1}$.
- $\therefore xy^3z = b^\alpha b^{3 \beta} b^{p - \alpha - \beta} a^{p+1} = b^{p + 2 \beta} a^{p+1}$.
- Since $\beta \ge 1$ ,  $2 \beta \ge 2$ and so $p + 2 \beta \ge p + 1$.
- Therefore $xy^3z \notin L$ and so $L$ is not regular.