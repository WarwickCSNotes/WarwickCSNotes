Understanding compression can help us understand when a compressed image has been altered.

## Motivation

If a malicious actor saves an image (in a compressed format, say JPEG), uncompresses it, edits it, then compresses it again, the edited image will have two parts: the stuff that was originally in the image, and the edited material.

The stuff that was originally in the image will have been compressed twice (at least), but the edited material will only have been compressed once. There are techniques we can use to examine this!

## Compression Types

**Lossless Compression:** does not lose any information. Lossless compression techniques can be reversed to perfectly reconstruct the original image.

**Lossy Compression:** loses some information. The original image cannot be reproduced.

## Compression Ratio and Redundancy

The **compression ratio** $c_r$ and the **relative data redundancy** $r_d$ are defined as:

$$c_r = \frac{n_1}{n_2}$$

$$r_d = 1 - \frac{1}{c_r}$$

Where $n_1$ is the size of the original data and $n_2$ is the size of the compressed data.

## Types of Redundancy

**Spatial redundancy:** the values of pixels correlate with the values of neighbouring pixels.

**Psychovisual redundancy:** details in images that the human eye cannot see.

**Coding redundancy:** when the encoding uses more bits per pixel than is needed. For example, a black-and-white image (which only needs one bit per pixel) using an 8-bit per pixel encoding.
