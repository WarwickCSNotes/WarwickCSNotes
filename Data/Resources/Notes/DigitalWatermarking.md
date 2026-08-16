Digital watermarks!

## Properties of Watermarks

There are several kinds of watermarks, with different properties. Different properties are desirable for different applications.

| Property | Opposite | Meaning |
|----------|----------|---------|
| Visible | Invisible | Can the human eye see it? |
| Blind | Non-blind | Doesn't need access to the unwatermarked version of the asset to detect it |
| Private | Public | Only authorised users can detect the watermark |
| Robust | Fragile | Robust watermarks survive modification (malicious or not) |

>[!note]- Semi-fragile
> Robust watermarks survive modification but fragile watermarks don't survive modification.
>
> Semi-fragile watermarks survive *some* modifications, usually things like rotation, cropping, and scaling.

## Watermarking Framework

A watermarking system typically has three components:

**Encoder ($E$):** adds the watermark. Inputs are the original image ($I$) and the signature ($S$). Output is the watermarked image ($I'$).

**Decoder ($D$):** extracts the watermark. Input is the watermarked image ($I'$). If the watermark is non-blind, then you also have the original image ($I$) as an input. Output is an extracted watermark ($S'$).

**Comparator ($C$):** compares two watermarks to see if they are the same. Inputs are the signature ($S$) and another signature ($S'$). Output is whether it's a match.

## Bitplane Substitution

One way of watermarking an asset is to change bitplanes in the data of the asset.

### What is a bitplane?

As we know, digital data is stored as binary. Let's take the pixel values of a $2 \times 2$ image as an example: $57$, $122$, $255$, $46$.

In binary (as 8-bit values), these are:

| Decimal | Binary |
|---------|--------|
| 57 | `00111001` |
| 122 | `01111010` |
| 255 | `11111111` |
| 46 | `00101110` |

The first digits (leftmost bits) of each binary number are said to form a **bit plane**, the second digits of each binary number form another bit plane, and so on.

In particular, the values in the first digits contribute the most to the value of the binary number and the most to the colour of the pixel. This bit plane is called the **Most Significant Bit (MSB) bit plane**.

Similarly, the values in the last digits contribute the least, so these form the **Least Significant Bit (LSB) bit plane**.

### Visualising Bitplanes

### LSB Substitution

Probably the simplest encoding technique is **LSB substitution**. We take the LSB bit plane (which doesn't contribute much to the image anyway) and replace it with some signature.

>[!check]- What kind of watermark is this?
> This is an **invisible**, **public**, and **semi-fragile** watermark.
>
> - **Invisible** since the LSB bit plane is modified.
> - **Public** since anyone can extract the bit planes with sufficient knowledge.
> - **Semi-fragile** since the watermark won't survive modifications that may change the LSB bit plane (like contrast enhancement, brightening/darkening), but it will survive rotation and scaling.

### MSB Substitution

We take the MSB bit plane and replace it with some signature.

This signature will be very much visible on the image!

>[!check]- What kind of watermark is this?
