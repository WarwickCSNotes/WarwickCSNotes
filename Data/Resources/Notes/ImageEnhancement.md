# Image Enhancement

Notes for [Digital Forensics (CS355)](/module/CS355).

Images sometimes convey plenty of information, but the information isn't obvious to the human eye: we can use enhancement techniques to let us see them! Examples that need enhancement include images with little contrast and images that are too dark or too bright.

## Pixel-Domain Processing

Also called **spatial domain processing**. These are techniques that directly operate on pixel values.

| Technique | Formula |
|-----------|---------|
| Inverting an image | $g(x, y) = 255 - f(x, y)$ |
| Gamma correction | $g(x, y, \gamma) = 255 \cdot \left(\dfrac{f(x, y)}{255}\right)^{\gamma}$ |

## Frequency-Domain Processing
