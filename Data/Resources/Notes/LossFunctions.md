# Loss Functions

Common loss functions used in regression and classification, along with their derivatives with respect to the prediction $\hat{y}$. The derivative is what backprop multiplies into the chain rule when training a network, so it's the thing you actually need at every step.

We use $y$ for the ground truth and $\hat{y}$ for the model's prediction throughout.

>[!info]- Per-sample vs. averaged losses
> $L_1$ and MAE describe the same loss at different scales: $L_1$ is the per-sample form $|y - \hat{y}|$, MAE is the mean over a batch. Same relationship between $L_2$ and MSE. They're listed separately below to make the per-sample / batch distinction explicit.

## $L_1$ Loss

$L_1(y, \hat{y}) = |y - \hat{y}|$

$\dfrac{\partial L_1}{\partial \hat{y}} = \operatorname{sign}(\hat{y} - y) = \begin{cases} +1 & \hat{y} > y \\ -1 & \hat{y} < y \\ \text{undefined} & \hat{y} = y \end{cases}$

The derivative has constant magnitude, so the gradient doesn't shrink as you approach the right answer. The flip side is that it's non-smooth at $\hat{y} = y$ and can oscillate around the minimum.

## $L_2$ Loss

$L_2(y, \hat{y}) = (y - \hat{y})^2$

$\dfrac{\partial L_2}{\partial \hat{y}} = -2(y - \hat{y}) = 2(\hat{y} - y)$

Smooth everywhere. The gradient scales linearly with the error, so larger mistakes get a proportionally stronger correction — which also means outliers dominate training more than they do under $L_1$.

## Log Loss

For binary classification with $y \in \{0, 1\}$ and $\hat{y} \in (0, 1)$:

$L(y, \hat{y}) = -\bigl[\, y \log(\hat{y}) + (1 - y) \log(1 - \hat{y}) \,\bigr]$

$\dfrac{\partial L}{\partial \hat{y}} = \dfrac{\hat{y} - y}{\hat{y}(1 - \hat{y})}$

Also known as binary cross-entropy. The $\hat{y}(1 - \hat{y})$ factor in the denominator cancels neatly with the derivative of the sigmoid activation, which is why sigmoid + log loss is the standard pairing for binary classifiers.

## MAE (Mean Absolute Error)

For a batch of $n$ samples:

$\text{MAE} = \dfrac{1}{n} \sum_{i=1}^{n} |y_i - \hat{y}_i|$

$\dfrac{\partial \text{MAE}}{\partial \hat{y}_i} = \dfrac{1}{n} \operatorname{sign}(\hat{y}_i - y_i)$

## MSE (Mean Squared Error)

For a batch of $n$ samples:

$\text{MSE} = \dfrac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2$

$\dfrac{\partial \text{MSE}}{\partial \hat{y}_i} = \dfrac{2}{n}(\hat{y}_i - y_i)$

## Huber Loss

A hybrid of $L_2$ near zero and $L_1$ away from it. Parameter $\delta > 0$ controls where the switch happens:

$L_\delta(y, \hat{y}) = \begin{cases} \tfrac{1}{2}(y - \hat{y})^2 & |y - \hat{y}| \leq \delta \\ \delta \bigl( |y - \hat{y}| - \tfrac{\delta}{2} \bigr) & |y - \hat{y}| > \delta \end{cases}$

$\dfrac{\partial L_\delta}{\partial \hat{y}} = \begin{cases} \hat{y} - y & |y - \hat{y}| \leq \delta \\ \delta \operatorname{sign}(\hat{y} - y) & |y - \hat{y}| > \delta \end{cases}$

Both pieces of the loss and both pieces of the derivative agree at $|y - \hat{y}| = \delta$, so $L_\delta$ is $C^1$ (continuously differentiable) despite being piecewise. Used when you want $L_2$-style smooth optimisation near the minimum but $L_1$-style robustness to outliers.
