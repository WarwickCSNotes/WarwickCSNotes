We know functions as some machine which takes an input $x$, does stuff to it, and returns some value. Things like $f(x) = x + 1$, $g(x) = 2x^2$, and $h(x) = \sin(2x)$.

Now, we see functions as a special kind of [relation](/resources/Notes/CS130/Relations). Let's consider some $R \subseteq X \times Y$. $R$ is a function if it has the properties:

- **Completeness:** every input of the function maps to something. $\quad(\forall x \in X.\; \exists y \in Y.\; xRy)$
- **Uniqueness:** no input maps to two different things, so "$f(x)$" is unambiguous.

Uniqueness is more concisely stated as "if $x$ has outputs $y_1$ and $y_2$ through the function, then $y_1$ is the same as $y_2$". Try to come up with the mathematical statement for this.

>[!info]- Formalising uniqueness
> $$\forall x \in X.\; \forall y_1, y_2 \in Y.\; (xRy_1 \wedge xRy_2) \rightarrow y_1 = y_2$$
>
> A relation like $R = \{(1, 2), (1, 3)\}$ fails uniqueness ($1$ points at two things), and $R = \emptyset$ on a nonempty $X$ fails completeness (nothing gets an output).

The two properties combine together:
- Completeness says each $x \in X$ is related to **at least one** $y$
- Uniqueness says it's related to **at most one**

Together they say a function is a relation where every $x \in X$ is related to **exactly one** $y \in Y$.

## Domain, Codomain, and Range

Once we know $R$ is a function we stop calling it $R$ and start calling it $f$, and we give names to the two sets it maps between. 

- The **domain** is $X$, the set of allowed inputs. 
- The **codomain** is $Y$, the set we've declared the outputs live in.
- The **range** is the subset of values in the codomain that actually gets mapped to: $\{y \in Y : \exists x \in X.\; f(x) = y\}$.

The domain and codomain are choices we make when we write the function down; the range is then forced on us. For $g(x) = 2x^2$ with domain $\mathbb{R}$ and codomain $\mathbb{R}$, the range is only $\{y \in \mathbb{R} : y \geq 0\}$, since $2x^2$ is never negative.

We indicate that $f$ is a function from $A$ into $B$ by writing $f : A \rightarrow B$. And as an alternative to the relation notation $(a, b) \in R_f$ or $a f b$, we write $f(a) = b$, which is the notation you've been using since school. Uniqueness is what earns us this notation: because there's exactly one $b$ for each $a$, the expression "$f(a)$" names a single thing, so we can write it inside other expressions.

### Image and Pre-image

Sometimes we want to push a whole set through $f$ rather than one element. For $S \subseteq A$, the **image** of $S$ under $f$ is everything you get out when you feed in everything from $S$:
$$f(S) = \{f(s) : s \in S\}$$

The range is just the image of the whole domain, $f(A)$.

Going the other way, for $T \subseteq B$, the **pre-image** of $T$ is everything in the domain that lands inside $T$:
$$f^{-1}(T) = \{a \in A : f(a) \in T\}$$

Taking $f(x) = x^2$ with domain and codomain $\mathbb{R}$: $f(\{1, 2, 3\}) = \{1, 4, 9\}$, $f^{-1}(\{4\}) = \{-2, 2\}$, and $f^{-1}(\{-1\}) = \emptyset$.


## Surjectivity, Injectivity, and Bijectivity
