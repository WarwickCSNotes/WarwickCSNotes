# Simply Typed Lambda Calculus

The Simply Typed Lambda Calculus (STLC) extends the untyped [Lambda Calculus](/resources/Notes/CS349/LambdaCalculus) with a simple system of types.

## Why types?

Types weren't always a given in programming languages. They've been added over time for a range of reasons:

>[!note]- Efficiency (FORTRAN)
> Types were originally introduced (in FORTRAN, one of the first high-level languages) so that compilers could generate efficient machine code. Knowing whether a variable is an integer or a floating-point number lets the compiler pick the right instructions and memory layout without runtime dispatch.

>[!note]- Module systems and interface definitions
> Types describe the interfaces between modules. A function signature says what it takes and what it returns; a struct definition says what fields exist. Callers and implementers can be developed independently and the compiler checks they agree on the shape of the data.

>[!note]- Static analysis and typed intermediate languages
> Types let a compiler reason about a program without running it, catching errors early and enabling optimisations. Modern compilers pass programs through typed intermediate languages internally so that safety properties are preserved through optimisation.

>[!note]- Security and proof
> Types can enforce security properties (e.g. tainted vs sanitised data) and have deep ties to formal logic (the Curry-Howard correspondence: types are propositions, programs are proofs). Historically, types were introduced by Russell to exclude paradoxes like his own from set theory; that same idea underpins modern type systems.

## Basic Concepts

**Type environment:** a set of pairs, where each pair is a variable and its type. Notated:

$$H \;=\; x_1 : t_1,\; x_2 : t_2,\; \ldots,\; x_n : t_n$$

**Typing judgement:** a triple consisting of a type environment $H$, a term $M$, and a type $t$. It reads "under $H$, the term $M$ has type $t$", and is notated $H \vdash M : t$.

For example: $x : t,\; f : t \to t \;\vdash\; (f\, x) : t$.

**Typing derivation:** a tree where nodes are typing judgements, aiming to prove a judgement.

## System $F_1$

Now we introduce the Simply Typed Lambda Calculus, which we will call **System $F_1$**.

It is Lambda Calculus with a base type $o$. Having a type $o$ means we also need function types (e.g. $o \to o$), so we introduce the type grammar:

$$t \;::=\; o \mid t \to t$$

Terms then become:

$$M \;::=\; x \mid (\lambda x : t.\, M) \mid M\, M$$

## Typing Rules

In LC, we used proof trees to look at dynamic semantics (what things evaluate to). In STLC, we can use proof trees to perform static semantics (what type things have).

Let's look at the identity rule (the type of a variable). Our proof tree will have nodes which are typing judgements, so we'll have some type environment under which the term (the variable $x$) has some type.

>[!check]- Identity Rule
> $$\frac{\;}{H,\, x : t \;\vdash\; x : t}\ \text{id}$$
>
> Notice that the $H$ type environment seemingly doesn't do anything: we know $x$ is of type $t$ from the fact it's of type $t$.
>
> We still need the $H$ though, to say that this rule applies with any arbitrary typing environment. No matter what else has happened (whether you're 20 abstractions deep and have a bunch of other variables defined), $x$'s type remains $x$'s type.
