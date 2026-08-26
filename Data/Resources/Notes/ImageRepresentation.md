## Colour Spaces: RGB vs Y'UV

## Chroma Subsampling

Written as an $A{:}b{:}c$ ratio, where:

- **$A$** is the width of the sampling block, which is usually $4$ (height is fixed to $2$, so always $2$ rows).
- **$b$** is the number of chroma samples to take in the first row.
- **$c$** is the number of chroma samples to take in the second row.

$4{:}2{:}0$ is the most popular for digital images and videos.

### Sampling Methods

- **Average:** average of all pixels in the chroma block.
- **Left:** average of the leftmost chroma pixels.
- **Right:** average of the rightmost chroma pixels.
- **Direct:** top-left pixel value is used.

## Image Similarity Measures

It's useful to be able to compare images, or sections of images, to figure out how similar they are. Quantitative measures are needed for this, so we look at three methods: **MSE**, **Correlation (Pearson's $r$)**, and **SSIM**.

### MSE

### Correlation (Pearson's $r$)

Some setup first. The **variance** of $X$ is:

$$\text{Var}(X) = \frac{1}{N} \sum_i (x_i - \bar{x})^2$$

The **covariance** of $X$ and $Y$ is:

$$\text{Cov}(X, Y) = \frac{1}{N} \sum_i (x_i - \bar{x})(y_i - \bar{y})$$

>[!check]- What happens to $\text{Cov}(X, Y)$ when $X = Y$?
> $$\text{Cov}(X, X) \;=\; \frac{1}{N} \sum_i (x_i - \bar{x})(x_i - \bar{x}) \;=\; \frac{1}{N} \sum_i (x_i - \bar{x})^2 \;=\; \text{Var}(X)$$

### SSIM

SSIM uses three measures: **luminance comparison**, **contrast comparison**, and **structural comparison**.

**Luminance:** uses mean intensity.

$$
l(x, y) \;=\; \frac{2 \mu_x \mu_y + C_1}{\mu_x^2 + \mu_y^2 + C_1}
$$

**Contrast:** uses standard deviation of intensity.

$$
c(x, y) \;=\; \frac{2 \sigma_x \sigma_y + C_2}{\sigma_x^2 + \sigma_y^2 + C_2}
$$

**Structure:** uses correlation.

$$
s(x, y) \;=\; \frac{\sigma_{xy} + C_3}{\sigma_x \sigma_y + C_3}
$$

Where $\mu$ is the mean, $\sigma$ is the standard deviation, $\sigma_{xy}$ is the covariance, and $C_1, C_2, C_3$ are small positive constants to prevent divide-by-zero.

The overall SSIM combines the three:

$$
\text{SSIM}(x, y) \;=\; \bigl[l(x, y)\bigr]^{\alpha} \cdot \bigl[c(x, y)\bigr]^{\beta} \cdot \bigl[s(x, y)\bigr]^{\gamma}
$$

Typically $\alpha = \beta = \gamma = 1$.

#### Local vs Global

Image quality and distortions often aren't uniform across an entire image. So when you're comparing two images $A$ and $B$, and part of $B$ has been significantly distorted, a global statistic (like the mean, variance, or correlation of the entire images) would say $A$ and $B$ are mostly the same despite that distortion, because the distortion gets averaged away by the mostly-fine rest of $A$ and $B$.

Due to this, a **window** is used to calculate a **local SSIM** score. These scores are then aggregated into one global score, **MSSIM (Mean SSIM)**:

$$
\text{MSSIM}(X, Y) \;=\; \frac{1}{M} \sum_{j=1}^{M} \text{SSIM}(x_j, y_j)
$$

where $M$ is the number of windows, and $x_j, y_j$ are the $j$-th window pair from $X$ and $Y$ respectively.

#### Properties

- **Symmetry**
- **Boundedness**
- **Unique maximum**

>[!check]- Can you come up with the mathematical formulae?
> - **Symmetry:** $\text{SSIM}(x, y) = \text{SSIM}(y, x)$
> - **Boundedness:** $\text{SSIM}(x, y) \leq 1$
> - **Unique maximum:** $\text{SSIM}(x, y) = 1$ only when $x = y$
