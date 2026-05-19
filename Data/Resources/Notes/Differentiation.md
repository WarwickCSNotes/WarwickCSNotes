# Differentiation

AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA!

## Chain Rule

The chain rule tells you how to differentiate a *composition* of functions (something like $f(g(x))$). If a value depends on $x$ through a chain of intermediate functions, the derivative is the product of the derivatives along that chain.

***Example:*** Take $y = f(g(h(x)))$.

Here $x$ is the input, $h$ acts on $x$, $g$ acts on the result, and $f$ acts on that. To differentiate $y$ with respect to $x$, multiply the derivative of each function with respect to its *immediate* input:

$\dfrac{dy}{dx} \;=\; \dfrac{d\,f(g(h(x)))}{d\,g(h(x))} \;\cdot\; \dfrac{d\,g(h(x))}{d\,h(x)} \;\cdot\; \dfrac{d\,h(x)}{dx}.$

Each factor matches up with a single "step" of the composition:
- $\dfrac{d\,f(g(h(x)))}{d\,g(h(x))}$: derivative of the outer function with respect to its input.
- $\dfrac{d\,g(h(x))}{d\,h(x)}$: derivative of the middle function with respect to its input.
- $\dfrac{d\,h(x)}{dx}$: derivative of the inner function with respect to $x$.

Multiplying them together gives the overall rate of change of $y$ with respect to $x$.

This generalises to any depth of nesting: walk from the outermost function inwards, differentiating each layer with respect to the layer just inside it, then multiply everything.