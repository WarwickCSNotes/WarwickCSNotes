#Y1/CS143
In this module, all inputs and outputs are represented using **finite strings** from a **finite alphabet $\Sigma$**. Eg: $\Sigma = \{a, b, c, d, ... z\}$  or $\Sigma = \{0, 1\}$ .

$\varepsilon =$ the empty string
$\Sigma^*$ is the set of all strings (for a given alphabet). $\Sigma^* = \{\varepsilon\} \cup \Sigma^1 \cup \Sigma^2 ...$
$\Sigma^+ = \Sigma^*$ \ $\{\varepsilon\}$

Let us call an element of $\Sigma^*$ a **word**. (basically call stuff words rather than strings).

Big Idea 2:
## All relevant Inputs/Outputs can be represented by strings
(rationals, images, videos, etc. However all the Irrationals can't be represented since they are not countably infinite and $\Sigma^*$ is countably infinite)

[Languages](Languages.md) are just a set of strings ($L \subseteq \Sigma^*$). They are used for when we want to compute a function $f: \Sigma^* \rightarrow \{0, 1\}$. Turns out restricting our output to just a 0 or a 1 does not change the number of things we can represent! This is just as computationally powerful as if we had a larger set for the outputs.