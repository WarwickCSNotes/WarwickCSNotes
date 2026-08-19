Images are acquired from the world being captured and going through an imaging pipeline (which includes sensing, sampling, filtering, and post-processing).

We discuss this pipeline and briefly discuss video acquisition.

## Imaging Pipeline

The imaging pipeline for a typical camera:

$$\text{Light} \to \text{Optical Lenses (inside camera)} \to \text{CFA} \to \text{Imaging Sensor} \to \text{Post-Processing} \to \text{Digital Image} \overset{\text{(optional)}}{\to} \text{Compressed Digital Image}$$

Compression is explored later in [Image Compression](/resources/Notes/CS355/ImageCompression). It's optional, but often used in practice.

### CFA

**CFA** stands for **Colour Filter Array**.

Each colour filter allows light of a particular wavelength through: the wavelengths corresponding to red (575nm), green (535nm), or blue (445nm) here.

The CFA is an array of these colour filters. Since each colour filter can only accept one specific colour, there is a pattern of R, G, B colour filters.

A **Bayer pattern** is used, which is a 2×2 pattern with 2 green colour filters, 1 blue colour filter, and 1 red colour filter. Some Bayer patterns:

![Bayer Pattern](/Resources/Images/BayerPattern.png)

>[!note]- Why more green?
> As of 2026, the lecture slides say *"To mimic human physiology which has twice as many green light absorption cells as red or blue"*.
>
> This isn't actually true! In fact, there are twice as many red (L) cones as green (M) cones in the human eye, with a tiny amount of blue (S) cones.
>
> The actual reason there is more green is because green carries the most brightness (luminance), and human eyes are more sensitive to luminance than colour (chrominance). This is actually used later to justify **chroma-subsampling**, which reduces the chrominance information since it's less important.

### CFA Interpolation

The image sensor receives each pixel as containing the information of just one colour. So how can we make each pixel have all three colour channels (R, G, B)?

### Gamma Correction

*(TODO: formula.)*

### Imaging Sensor

*(TODO: fill in. Sampling and quantization go somewhere here.)*

## Video Acquisition

A video is a series of images captured at a regular interval. The speed of these intervals is quantified by the **frame rate (FPS)**.

The higher the FPS, the higher the **temporal resolution**.

Some cameras can capture videos at thousands of FPS.
