# Generative Adversarial Networks

**Generative Adversarial Networks (GANs)** are a deep learning model used to generate new data, usually to use as a training dataset.

## Why the name?

The name breaks down into three parts:

- **Generative**: we are generating new samples.
- **Adversarial**: two competing neural networks (the **generator** of data and the data **discriminator**).
- **Network**: the two competitors are neural networks.

## The competition

The two networks have opposing goals, and training them against each other is what makes the system learn.

- The **generator** aims to produce new data which fools the discriminator into thinking it came from the original dataset.
- The **discriminator** aims to correctly distinguish generated data from original data.

When the generator improves, the discriminator's job gets harder, which pushes the discriminator to improve. When the discriminator improves, the generator has to work harder to fool it. The result is that both networks get progressively better, until the generator's output is hard to distinguish from real samples.

>[!info]- Terminology: "new data"
> The output of the generator goes by several names in different sources. All of these refer to the same thing:
> - **Generated data**
> - **Fake data**
> - **Synthesised data**

>[!info]- Diversity of generated data
> The generator takes **random noise** as part of its input. This randomness is what makes the generator able to produce a *diverse* set of outputs rather than the same sample every time. Each noise vector seeds a different point in the learned data distribution, so varying the noise gives you varied fakes.
