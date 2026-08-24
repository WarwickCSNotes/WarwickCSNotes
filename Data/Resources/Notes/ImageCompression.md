Understanding compression can help us understand when a compressed image has been altered.

## Motivation

If a malicious actor saves an image (in a compressed format, say JPEG), uncompresses it, edits it, then compresses it again, the edited image will have two parts: the stuff that was originally in the image, and the edited material.

The stuff that was originally in the image will have been compressed twice (at least), but the edited material will only have been compressed once. There are techniques we can use to examine this!

## Compression Types

**Lossless Compression:** does not lose any information. Lossless compression techniques can be reversed to perfectly reconstruct the original image.

**Lossy Compression:** loses some information. The original image cannot be reproduced.

**Tiff:** a raw file format. Typically no compression (according to this module).

**JPEG:** the most popular lossy compression format.

## Compression Ratio and Redundancy

The **compression ratio** $c_r$ and the **relative data redundancy** $r_d$ are defined as:

$$c_r = \frac{n_1}{n_2}$$

$$r_d = 1 - \frac{1}{c_r}$$

Where $n_1$ is the size of the original data and $n_2$ is the size of the compressed data.

## Types of Redundancy

**Spatial redundancy:** the values of pixels correlate with the values of neighbouring pixels.

**Psychovisual redundancy:** details in images that the human eye cannot see.

**Coding redundancy:** when the encoding uses more bits per pixel than is needed. For example, a black-and-white image (which only needs one bit per pixel) using an 8-bit per pixel encoding.

## Encoding and Decoding

When the image is being compressed, it is said to be **encoded**:

1. First, **transform mapping** removes spatial redundancy.
2. Second, the **quantizer** removes psychovisual redundancy.
3. Third, **entropy coding** removes coding redundancy.

When the image is being de-compressed, it goes through **decoding**:

1. First, **entropy coding**.
2. Then, the **de-quantizer**.
3. Finally, the **transform mapping**.

>[!check]- Redundancy Exam Question
> There are three types of image redundancies, namely, spatial redundancy, psycho-visual redundancy and coding redundancy. Please explain what spatial redundancy and psycho-visual redundancy are, and how to remove both redundancies for image compression. [6]
>
> *Solution: N/A*

### JPEG

The process in JPEG compression specifically:

1. Colour space inversion
2. Division into subimages
3. Discrete cosine transform
4. Quantizer
5. Entropy coding (Huffman coding)

#### Colour Space Inversion

By converting RGB into $YC_bC_r$, you can compress the luminance and chroma components differently.

As mentioned before, humans are more sensitive to luminance than chrominance. So chrominance can be heavily compressed: this is subsampled using chroma subsampling by a factor of 2 or more.

## Compression-Based Forensics

Multiple quantization (images or parts of images undergoing multiple quantizations) can be analysed using **compression-based forensics**.

Two main techniques are used: **Double Compression** and **JPEG Ghost**.

### Double Compression

Tells us if an image has been compressed multiple times. Double Compression is used as a screening process: if unusual artifacts are found, then further forensic analysis is needed.

### JPEG Ghost

Can detect splicing forgery and identify the regions that come from a different image.
