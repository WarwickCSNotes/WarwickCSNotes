# Image Representation

Notes for [Digital Forensics (CS355)](/module/CS355).

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

### SSIM
