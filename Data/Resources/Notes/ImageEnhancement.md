Images sometimes convey plenty of information, but the information isn't obvious to the human eye: we can use enhancement techniques to let us see them! Examples that need enhancement include images with little contrast and images that are too dark or too bright.

## Pixel-Domain Processing

Also called **spatial domain processing**. These are techniques that directly operate on pixel values.

| Technique | Formula |
|-----------|---------|
| Inverting an image | $g(x, y) = 255 - f(x, y)$ |
| Gamma correction | $g(x, y, \gamma) = 255 \cdot \left(\dfrac{f(x, y)}{255}\right)^{\gamma}$ |

### Histogram Equalisation

Images can be represented by a histogram, with the $x$-axis being pixel values and the $y$-axis being the frequency of pixels.

This lets us apply histogram matching techniques to the histogram to transform the represented image. In particular, we explore **histogram equalisation**, which is a special case of histogram matching: it's about transforming a histogram's distribution to be more like the uniform distribution (i.e. more flat).

Equalisation *generally* increases the contrast of an image, and general histogram matching can be used to shift the tone of an image to resemble the tone of another image (e.g. to make a dark and low-contrast image match the tone of a bright and high-contrast image).

#### What is a histogram

#### PMF and CDF

#### The transformation

### Noise Removal

Noise is an unwanted, often random artifact on images that usually occurs due to imperfections in devices, environment, transmission, or compression.

Generally, two kinds of noise we look at:

- **Gaussian noise**
- **Salt and pepper noise**

We use **local averaging (mean filter)** to get rid of Gaussian noise, and we use a **median filter** to get rid of salt and pepper noise.

#### Mean Filter

#### Median Filter

## Frequency-Domain Processing
