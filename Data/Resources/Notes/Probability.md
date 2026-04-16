# Probability

We discuss a set-theoretic view of probability established by Kolmogorov, which consists of 4 components and 3 axioms! 

Don't worry too much about learning the exact components and axioms right now, since you'll pick them up with practice as they appear so much.
## 4 Components

4 key components of Kolmogorov's formulation of probability.

### 0) Reproducibility 
This is often assumed - the experiment should be reproducible; that is, you can repeat the experiment an arbitrary number of times.
### 1) Sample Space 
 A ***sample space ($\Omega$)*** is the set of possible outcomes of the experiment. 

**Example 1:** You toss a fair coin. $\Omega = \{H, T\}$.

The possible outcomes are also called ***elementary events*** (sometimes *elementary outcomes*). From Example 1, $H$ is an elementary event as is $T$. Often, this is written as $\{H\}$ and $\{T\}$ for reasons that will become clear in the next component. 

**Example 2:** You toss two fair coins. $\Omega = \{(H, H), (H, T), (T, H), (T, T)\}$.
### 2) Events 
An ***event*** is a subset of the sample space. 

From Example 2, $\textit{at least one tail} = \{(H,T), (T, H), (T, T)\}$.
We know $\textit{at least one tail} \subseteq \Omega$.
Therefore $\textit{at least one tail} \in 2^{\Omega}$.

The term *elementary event* should make more sense now! In Example 2 for instance, we have $\{(H, T)\}$ as an elementary event. 

I will refer to the set of events ($2^{\Omega}$) as the ***event space***. 

>[!info]- Measure Theory
> **This note is not relevant to doing well in the module - you do not need to know this.**
> 
> The probability in cs130 is very simple so we take the event space to be $2^{\Omega}$ however in measure theory (which some of you may take!), the event space is more generally a $\sigma$-algebra on the sample space.
> 
> A $\sigma$-algebra is just a subset of $2^{\Omega}$ which satisfies some properties, and defines which subsets in $2^{\Omega}$ may be considered valid events; anything not in the $\sigma$-algebra is not defined as an event and hence does not have a defined probability. 
> 
> *Why* do we need $\sigma$-algebras? It's because $\Omega$ can be an uncountable set (such as $\mathbb{R}$) and this breaks maths. If you're interested in this, then have a look at Measure Theory.

#### Special Events
$\Omega \subseteq \Omega$ is called the ***certain event*** since it contains all outcomes, and is therefore guaranteed to occur. 
Later, we learn that $P(\Omega) = 1$.

$\emptyset \subseteq \Omega$ is called the ***impossible event*** since it contains no outcomes, and cannot occur. 
Later, we show that $P(\emptyset) = 0$.

>[!tip]- Exam Tip
>The *certain event* and *impossible event* can be used in any experiment, and are often the answer to an exam question as they have special properties!
### 3) Probability Measure
We have a function called the ***probability measure*** which takes in an event, and spits out the probability of that event occurring. 

$P: 2^{\Omega} \rightarrow \mathbb{R}$.

From Example 1, we have $P(\{H\}) = P(\{T\}) = \frac{1}{2}$.
From Example 2, we have $P(\{(H,H)\}) = P(\{(H,T)\}) = P(\{(T,H)\}) = P(\{(T,T)\}) = \frac{1}{4}$.

## Probability Space

When you combine these components, you get a ***probability space***. 

A probability space is written down as $(\Omega, 2^{\Omega}, P)$; a 3-tuple consisting of the *sample space*, *event space*, and the *probability measure*. 

From Example 1, the probability space is $(\{H, T\}, \{\emptyset, \{H\}, \{T\}, \Omega\}, P)$ where $P(\{H\}) = P(\{T\}) = \frac{1}{2}$. You would write the probability space as $(\Omega, 2^{\Omega}, P)$ though, and those components are generally well-defined. 

We will now look at the axioms that apply to probability spaces!
## 3 Axioms

We have 3 axioms to provide some foundations for this formulation; we'll use these axioms to prove further key properties!

### 1) Non-negative probability 
All probabilities are non-negative, for every event.

$\forall E \in 2^{\Omega}. \; P(E) \geq 0$.

### 2) Certain event is certain 
The certain event has a probability of 1. 

$P(\Omega) = 1$.

### 3) Mutual Exclusion 
If two events are mutually exclusive (they can't happen at the same time), then the probability of either event occurring is the sum of the probability of each event occurring. 

$\forall A, B \in 2^{\Omega}. \; (A \cap B = \emptyset) \implies P(A \cup B) = P(A) + P(B)$.

For this, we must define ***disjoint*** events. 

We call events $A, B$ ***disjoint*** iff $A \cap B = \emptyset$.
In other words, "A and B are disjoint if you can't have both".

## Corollaries of the axioms 

We'll now prove some facts using the axioms. 

***Fact 1:*** The probability of the impossible event is 0. $P(\emptyset) = 0$.
**Proof:** Using Axiom 3, since $\emptyset \cap \Omega = \emptyset$, we have $P(\emptyset \cup \Omega) = P(\emptyset) + P(\Omega)$.

$P(\emptyset \cup \Omega) = P(\Omega) = P(\emptyset) + P(\Omega)$.
Using Axiom 2, $P(\Omega) = 1 = P(\emptyset) + P(\Omega) =  P(\emptyset) + 1$.
Hence, $1 = P(\emptyset) + 1$.
$P(\emptyset) = 0.$

***Fact 2:*** 

## Basic Terms

**Scenario:** Imagine that you roll a D10 dice. 

A ***sample space*** ($\Omega$) is the set of all possible outcomes. 
For this dice, $\Omega = \{1, 2, \dots , 10\}$.

An ***event*** is a subset of the sample space.
For this dice, events include: 
- $E = \{3\}$ (rolling a 3)
- $E = \{8, 9, 10\}$ (rolling greater than 7)
- $E = \{2, 4, 6, 8, 10\}$ (rolling an even number)

An event occurs if the outcome is one of the outcomes in the event. 


For example, $A = \{2, 3, 5, 7\}$ and $B = \{4, 6, 8\}$ are disjoint events. 

The ***complement*** of an event $A$ is everything *else* in the set.
That is, $\bar{A} = \Omega \setminus A$.
For example, if $E = \{2, 4, 6, 8, 10\}$ then $\bar{E} = \{1,3,5,7,9\}$.
A universal example, $\bar{\Omega} = \emptyset$


## Combinatorics and Probabilities 


