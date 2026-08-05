# Computability

Before we discuss the computability of problems, it is important to note that we can encode Turing machines (TMs) as bit strings - which keeps in theme with encoding problems as bit strings in [Introduction](/resources/Notes/CS301/CS301Intro). This is key for our [incomputability arguments](/resources/Notes/CS301/Uncomputability) later.

>[!note]- TMs encoded as bit strings
> A TM can be fully described by its states (including the start state, and also the end state if it exists), its alphabets, and its transition function, each of which can all be encoded.

**Key Assumption:** We also assume any arbitrary finite bit string encodes some TM - this is to simplify some of our proofs later on.

So all TMs are encoded by a finite bit string, and all finite bit strings encode some TM.

>[!definition] Computability
> Let $f : \{0,1\}^* \to \{0,1\}^*$ and $T : \mathbb{N} \to \mathbb{N}$ be some functions, and let $M$ be a Turing machine. We say that $M$ **computes $f$ in $T(n)$-time** if for every $x \in \{0,1\}^*$, if $M$ is initialised to the start configuration for input $x$, then after at most $T(|x|)$ computational steps it halts and $f(x)$ is the result of the computation.
>
> We say that $M$ **computes $f$** if it computes $f$ in $T(n)$-time for some function $T : \mathbb{N} \to \mathbb{N}$.
