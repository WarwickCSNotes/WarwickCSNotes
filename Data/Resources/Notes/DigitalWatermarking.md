# Digital Watermarking

Notes for [Digital Forensics (CS355)](/module/CS355).

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

## Bitplanes
