#Y1/CS143 
Grammars where originally a linguistic term, before it turned out they were very useful in computer science (especially in parsers!), so the following is a rough representation of the English language as a Context-Free Grammar.

$E = (V, \Sigma, R, S)$
$V= \{S$, NP, VP, PP, CN, CV, A, N, V, P$\}$
$\Sigma = [\![(a-z)]\!]$
$R = [S \mapsto$ NP VP,   NP $\mapsto$ CN/(CN PP),   VP $\mapsto$ CV/(CV PP),   PP $\mapsto$ P CN,   CN $\mapsto$ A N,   CV $\mapsto$ V/(V NP),   A $\mapsto$ a/(the),   N $\mapsto$ (cat)/(dog)/… ,   V $\mapsto$ (run)/(eat)/… ,   P $\mapsto$ (with)/(on)/… $]$
$S = S$

**Example:**
$S \mapsto$
NP VP $\mapsto$
CN CV $\mapsto$
A N V $\mapsto$
a dog sees