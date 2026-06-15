1) True or false? An NFA can be complemented by swapping its accepting states and non-accepting states.

>[!hint]- Hint 1
> The language accepted by a DFA can be complemented by swapping its accepting states and non-accepting states.
>
> However, NFAs extend DFAs through:
> - $\varepsilon$-transitions,
> - multiple choices for transitions.
>
> Do either of these change whether the language accepted can be complemented by swapping the states?

>[!hint]- Hint 2
> $\varepsilon$-transitions break the ability to obtain the complement of a language by flipping states. See if you can find out why, and give an example automaton.
>
> *Note: having non-determinism in general breaks the property, but it's easier to wrap your head around $\varepsilon$-transitions breaking the property.*

>[!hint]- Hint 3
> Consider the following automaton:
>
> ```tikz
> \begin{tikzpicture}
> \node[state, initial] (q1) {$q_1$};
> \node[state, accepting, right of=q1] (q2) {$q_2$};
> \draw (q1) edge node {$\varepsilon$} (q2);
> \end{tikzpicture}
> ```
>
> What is the language of this automaton? What about the language of the automaton with flipped states?

>[!check]- Solution
> **False.**
>
> While this holds for DFAs, it does not hold for NFAs. Given an NFA recognising a language $L$, you can't always generate an NFA recognising $\bar{L}$ by flipping the states of the NFA recognising $L$.
>
> **Counterexample:** Consider the following NFA:
>
> ```tikz
> \begin{tikzpicture}
> \node[state, initial] (q1) {$q_1$};
> \node[state, accepting, right of=q1] (q2) {$q_2$};
> \draw (q1) edge node {$\varepsilon$} (q2);
> \end{tikzpicture}
> ```
>
> The language of this automaton is $\{\varepsilon\}$: from $q_1$ we can take the $\varepsilon$-transition into $q_2$ (an accepting state) without consuming any input, so $\varepsilon$ is accepted. As soon as any symbol is read, the run has nowhere to go (neither $q_1$ nor $q_2$ has any outgoing transition on $0$ or $1$), so no non-empty string is accepted.
>
> If you flip the accepting and non-accepting states, you get:
>
> ```tikz
> \begin{tikzpicture}
> \node[state, initial, accepting] (q1) {$q_1$};
> \node[state, right of=q1] (q2) {$q_2$};
> \draw (q1) edge node {$\varepsilon$} (q2);
> \end{tikzpicture}
> ```
>
> The language of this flipped automaton is also $\{\varepsilon\}$: $q_1$ is now accepting, so $\varepsilon$ is accepted by simply sitting at $q_1$. As before, no symbol can be read because there are still no $0$- or $1$-transitions anywhere, so no non-empty string is accepted.
>
> Both NFAs accept the *same* language $\{\varepsilon\}$, so flipping hasn't produced the complement. The complement $\overline{\{\varepsilon\}}$ is $\Sigma^* \setminus \{\varepsilon\}$ (every non-empty string), nothing like $\{\varepsilon\}$ itself.
>
> So complementation does not work because of $\varepsilon$-transitions: if an accepting state $S_x$ is linked to a non-accepting state $S_y$ by an $\varepsilon$-transition, then strings that are accepted at $S_x$ have a path where they are not accepted, by taking the $\varepsilon$-transition to $S_y$. By taking this same path in the flipped NFA, those strings arrive at $S_y$ and *are* accepted (since $S_y$ is now an accept state in the flipped NFA). So the same string is in both languages, and they can't be complementary.
>
> Symmetrically, the same issue arises if a non-accepting state $S_y$ is linked to an accepting state $S_x$ by an $\varepsilon$-transition (i.e. the $\varepsilon$-arrow goes $S_y \to S_x$, the opposite direction). Strings reaching $S_y$ in the original NFA have a path via the $\varepsilon$-transition to $S_x$, so they are accepted at $S_x$. In the flipped NFA, $S_y$ is now an accepting state, so the run that just stays at $S_y$ is accepted there directly. The same string is accepted by both NFAs once again. So the same string is in both languages, and they can't be complementary.


2) Give regular expressions generating the following languages. In all parts the alphabet is $\{0, 1\}$.

**(1)** $\{w \mid w \text{ begins with a } 1 \text{ and ends with a } 0\}$

>[!hint]- Hint 1
> You can use $(0 + 1)^*$ to accept any string.

>[!hint]- Hint 2
> You know how to write "any string", and you can write "any string starting with a $0$" by putting a $0$ in front of the "any string" pattern.

>[!check]- Solution
> $1 \cdot (0 + 1)^* \cdot 0$.


**(2)** $\{w \mid w \text{ contains at least three } 1\text{'s}\}$

>[!hint]- Hint 1
> "Contains at least three $1$s" is the same as "there definitely being three $1$s". You can ensure there are three $1$s by explicitly writing them in your regular expression.

>[!hint]- Hint 2
> From Hint 1, you ensure there are three $1$s by writing them in your expression. What do you put around and in between the three $1$s? Think about problem (1).

>[!check]- Solution
> $(0 + 1)^* \cdot 1 \cdot (0 + 1)^* \cdot 1 \cdot (0 + 1)^* \cdot 1 \cdot (0 + 1)^*$.


**(3)** $\{w \mid w \text{ contains the substring } 0101\}$

>[!hint]- Hint 1
> You can ensure the substring exists by explicitly writing the substring. What do you put around it?

>[!check]- Solution
> $(0 + 1)^* \cdot 0101 \cdot (0 + 1)^*$.


**(4)** $\{w \mid \text{the length of } w \text{ is at most } 5\}$

>[!hint]- Hint 1
> You can denote an optional character by $(\text{character} + \varepsilon)$. Think about how you'd represent an optional "any character".

>[!hint]- Hint 2
> An optional "any character" $(0 + 1 + \varepsilon)$ is the same as "the length of $w$ is at most $1$". How would you do "the length of $w$ is at most $5$"?

>[!check]- Solution
> $(0 + 1 + \varepsilon) \cdot (0 + 1 + \varepsilon) \cdot (0 + 1 + \varepsilon) \cdot (0 + 1 + \varepsilon) \cdot (0 + 1 + \varepsilon)$.
>
> Each factor independently chooses a $0$, a $1$, or nothing at all, so the concatenation accepts every string of length $0, 1, 2, 3, 4,$ or $5$ and no string longer than that.


**(5)** $\{w \mid w \text{ is any string except } 11 \text{ and } 111\}$

>[!hint]- Hint 1
> Split it into the cases of: strings of length $4$ or more, and the strings of length $3$ or fewer.

>[!hint]- Hint 2
> You can manually enumerate the cases for strings of length $3$ or fewer, just make sure you don't enumerate $11$ and $111$!

>[!hint]- Hint 3
> Any string of length $4$ or more can be represented as $(\text{any character})^4 \cdot (\text{any character})^*$ (note this isn't proper regular expression notation).
>
> **Note:** There are better ways to capture the brute-forced/manually-enumerated patterns than listing each one e.g. $0^*$ captures the manual cases of $0$, $00$, $000$,  and $\varepsilon$ (though this isn't the most effective way to simplify) 

>[!check]- Solution
> $\varepsilon + 0 + 1 + 00 + 01 + 10 + 000 + 001 + 010 + 011 + 100 + 101 + 110 + (0+1) \cdot (0+1) \cdot (0+1) \cdot (0+1) \cdot (0+1)^*$.
>
> The first thirteen alternatives manually enumerate every short string ($\varepsilon$ plus every binary string of length $1$, $2$, or $3$) *except* the two forbidden ones $11$ and $111$. The final term $(0+1)^4 \cdot (0+1)^*$ captures every string of length $\geq 4$, none of which can be $11$ or $111$ (those are length $2$ and $3$). Together that's exactly $\Sigma^* \setminus \{11, 111\}$.
>
> The above is correct, but you can **simplify this further**.
>
> Most of the hardcoded patterns contain a $0$, so we can replace all of those with the pattern "contains at least one $0$", since the excluded patterns ($11$ and $111$) do not have $0$s in them. So $(0+1)^* \cdot 0 \cdot (0+1)^*$ replaces $0, 00, 01, 10, 000, 001, 010, 011, 100, 101,$ and $110$ in one go.
>
> Now we just need to encode $\varepsilon$ and $1$ manually, resulting in the compact solution:
> $$\varepsilon + 1 + (0+1)^* \cdot 0 \cdot (0+1)^* + (0+1) \cdot (0+1) \cdot (0+1) \cdot (0+1) \cdot (0+1)^*.$$
>
> Note that generally it's okay for patterns to overlap, i.e. for some regular expression $X + Y$, it's okay for strings to be generated by both $X$ and $Y$. For example, $0000$ is matched by both $(0+1)^* \cdot 0 \cdot (0+1)^*$ (it contains a $0$) and $(0+1)^4 \cdot (0+1)^*$ (it has length $\geq 4$); the union is what we care about, and a string being in multiple branches doesn't change membership.


**(6)** $\{w \mid w \text{ has a } 1 \text{ in every odd position}\}$

>[!hint]- Hint 1
> In problem (2) you encode "at least three $1$s" by explicitly writing the $1$s into the regular expression.
>
> In this problem you can explicitly write a $1$ in every odd position, and have another pattern for filling in the even positions. How would you do that?

>[!hint]- Hint 2
> If you have something of the form $(1 \cdot \text{(a character)})^*$, then it has a $1$ in every odd position. However, this is not the complete solution. See if you can think of edge cases and what would complete it.

>[!hint]- Hint 3
> Strings of odd length end at an odd position, so their last symbol must be a $1$, but a pattern like $(1 \cdot \text{(a character)})^*$ only ever produces strings of *even* length. To capture odd-length strings as well, you can append an optional $1$ at the end.

>[!check]- Solution
> $(1 \cdot (0 + 1))^* \cdot (1 + \varepsilon)$.
>
> The $(1 \cdot (0 + 1))^*$ part forces a $1$ into every odd position by alternating a literal $1$ with an "any character" slot. Each repetition contributes two symbols, so $(1 \cdot (0 + 1))^*$ on its own only generates strings of *even* length: the $1$s land at positions $1, 3, 5, \ldots$ and the free slots at positions $2, 4, 6, \ldots$.
>
> The trailing $(1 + \varepsilon)$ handles the odd-length case. The final symbol of an odd-length string lives at an odd position and so must be $1$, which the $1$ branch covers; the $\varepsilon$ branch is what lets even-length strings match (with nothing appended).
>
> >[!note] Why not $(1 \cdot (0 + 1 + \varepsilon))^*$?
> > It's tempting to try to fold the optionality into the inner pattern by writing $(1 \cdot (0 + 1 + \varepsilon))^*$. At first glance this looks like it still forces $1$s into the odd positions, but the $\varepsilon$ option breaks the alignment between the regular expression's repetitions and the string's actual positions. As soon as a repetition picks $\varepsilon$ for its second slot, the next repetition's literal $1$ no longer lands on an odd position of the *generated string*, so the next "any character" slot can put a $0$ at an odd position.
> >
> > Concretely, $(1 \cdot (0 + 1 + \varepsilon))^*$ admits $110$ by taking two repetitions: $(1 \cdot \varepsilon)$ for the first (contributing just $1$) and $(1 \cdot 0)$ for the second (contributing $10$). The resulting string is $1 \cdot 1 \cdot 0$, which has a $0$ at position $3$ (an odd position), so $110$ should *not* be in the intended language.


**(7)** $\{w \mid w \text{ contains an even number of } 0\text{'s, or contains exactly two } 1\text{'s}\}$

>[!hint]- Hint 1
> For "contains exactly two $1$s", you can explicitly write in the $1$s and then consider what pattern goes in between (and around) to enforce no extra $1$s.

>[!hint]- Hint 2
> For "contains an even number of $0$s", you can ensure the count is even by adding two $0$s at a time.

>[!check]- Solution
> The language is a union: let $L_1 = \{w \mid w \text{ has an even number of } 0\text{s}\}$ and $L_2 = \{w \mid w \text{ has exactly two } 1\text{s}\}$. We want $L_1 \cup L_2$, which corresponds to $L_1 + L_2$ as a regular expression.
>
> **For $L_1$** (even number of $0$s): build the string by placing $0$s in pairs, with arbitrarily many $1$s allowed anywhere:
> $$1^* \cdot (1^* \cdot 0 \cdot 1^* \cdot 0 \cdot 1^*)^* \cdot 1^*.$$
> Each repetition of the inner block contributes exactly two $0$s, and the $1^*$ slots cover any number of $1$s in any positions. So the total $0$ count is always even.
>
> **For $L_2$** (exactly two $1$s): write the two $1$s explicitly and only allow $0$s around and between them:
> $$0^* \cdot 1 \cdot 0^* \cdot 1 \cdot 0^*.$$
> The two literal $1$s are the only $1$s, and the $0^*$ slots fill in $0$s in any position.
>
> **Union:**
> $$1^* \cdot (1^* \cdot 0 \cdot 1^* \cdot 0 \cdot 1^*)^* \cdot 1^* \;+\; 0^* \cdot 1 \cdot 0^* \cdot 1 \cdot 0^*.$$
>
> The two pieces overlap (e.g. $11$ has both an even count of $0$s and exactly two $1$s, so it matches both branches), but that's fine: as noted in problem (5), a string being generated by more than one branch of a union doesn't change membership.

---

## Key Takeaways

>[!note] Mix-and-Match
> When you have $(X + Y + Z + \ldots)^*$, each repetition independently picks one of the alternatives, so the generated string can freely mix and match copies of $X$, $Y$, $Z$, etc., in any order and any quantity (including zero).
>
> This is a useful pattern. For instance, in problem (7) the inner block $1^* \cdot 0 \cdot 1^* \cdot 0 \cdot 1^*$ wrapped in $(\ldots)^*$ lets the regex paste together arbitrarily many "two more $0$s" segments, with $1$s scattered between them. And in problem (6) the same idea drives $(1 \cdot (0+1))^*$: each repetition picks one of two two-symbol blocks ($10$ or $11$), and the final string is any concatenation of those blocks.