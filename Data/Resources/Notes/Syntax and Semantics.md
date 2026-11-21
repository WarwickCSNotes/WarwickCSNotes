#Y1/CS143 
Take an expression $(2+4) \times 7$. This is just a sequence of symbols of the arithmetic language. We call this representation the **syntax** and the output, the meaning of these symbols the **semantics**.

Def: Take $x$ as a syntactic object of the alphabet $\Sigma$. $[\![x]\!]^\Sigma$ is the semantic meaning of $x$.
$[\![x]\!]^\Sigma$ is a semantic object. We often just write $[\![x]\!]$ without the $\Sigma$ as the alphabet is usually obvious.

e.g. $[\![M]\!] = \mathcal{L}(M)$. A DFA's semantic meaning is the language it recognises.

Big Idea 6:
## Every Model of Computation has syntax and semantics such that there's a mapping from syntactic objects to semantic objects.
