#Y1/CS143 

Regular Expressions reads a sequence of symbols to return a language, much like a [DFA](Deterministic%20Finite%20Automata.md) does. However, Regular Expressions use the symbols and follow a set of rules to determine which words to accept and which to reject.

E.g. $[\![(0 \cup \varepsilon)10^*]\!] = \{w: 1$ occurs once in $w$, either in the 1st or 2nd position$\}$.
($w$ is of the set $\Sigma^*$ implicitly, and $\Sigma$ implicitly is the characters $\{0,1\}$).

 $\emptyset = \{\} =$ the empty language.
#### Definition of RegEx:

**Def:** The syntax R is a regular expression if it is:
1) $a$ for some $a \in \Sigma$
2) $\varepsilon$
3) $\emptyset$ See note below.
4) $(R_1 \cup R_2)$ where $R_1, R_2$ are regular expressions and $\cup$ is the union.
5) $(R_1 \circ R_2)$ where $R_1, R_2$ are regular expressions and $\circ$ is concatenation.
6) $(R_1^*)$ where $R_1$ is a regular expression and \* means repeated 0 to a finite k number of times.

Note: $\emptyset$ is used above not as the empty language, but as the syntax of the empty language, rather than have $[\![]\!] = \emptyset$. If the regex for $a$ is typed {"a"} and the regex for $abc$ is typed {"abc"} then $\varepsilon$ is typed {""} and $\emptyset$ is typed {}.

**Def:** The semantics of RegEx:
1) $[\![a]\!] = \{a\}$
2) $[\![\varepsilon]\!] = \{\varepsilon\}$
3) $[\![\emptyset]\!] = \emptyset$
4) $[\![(R_1 \cup R_2)]\!] = [\![R_1]\!] \cup [\![R_2]\!]$
5) $[\![(R_1 \circ R_2)]\!] = [\![R_1]\!] \circ [\![R_2]\!] = \{w_1 \circ w_2 : w_1 \in [\![R_1]\!]$ and $w_2 \in [\![R_2]\!]\}$
6) $[\![(R_1)^*]\!] = \{w_1 \circ w_2 \circ ... w_k : k \in \mathbb{N} \wedge w_1, w_2, ... w_k \in [\![R_1]\!]\}$

Note that most of the time the concatenation operator ($\circ$) is not written out, much like multiplication in algebra it is implied. So $w_1 w_2 w_3$ means $w_1 \circ w_2 \circ w_3$ for example.

$*$ binds stronger than $\circ$ which binds stronger than $\cup$.

It turns out that DFAs and RegEx are **equivalently expressive**! This leads us to
Big Idea 7
## Seemingly different Models of Computation can have the same expressive power.

___
#### Syntactic Sugar for Regex:

**Def:** $R^+ = RR^*$ where R is a regular expression.
(essentially same as $R^*$ except it doesn't include the empty string)

**Def:** $[\![\Sigma]\!] = \Sigma$.
(much like $[\![\emptyset]\!]$, the $\Sigma$ in the double brackets isn't the alphabet, its the syntactic way to represent any letter in the alphabet. So $[\![\Sigma]\!] = [\![0 \cup 1]\!] = [\![0]\!] \cup [\![1]\!] = \{0\} \cup \{1\} = \{0,1\} = \Sigma$).

Interesting to note: $[\![\emptyset^*]\!] = \{\varepsilon\}$ since \* can mean 0 repeats.
