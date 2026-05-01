# Perceptron

>[!note]- MP Neuron is special case of Perceptron
> - Perceptron has inputs $\in \mathbb{R}$ whereas MP Neuron is constrained $\in \{0, 1\}$
> - Perceptron can learn a threshold or manually-set, but MP Neuron must be manually set
> - Perceptron has weights, whereas MP Neuron does not (same as having weights where all are set to $1$)
> 
> You might think: what about inhibitory inputs in the Perceptron? 
> You can model inhibitory inputs by having weights assigned to these inputs with incredibly high negative weighting (ideally -inf)

>[!tip]- Checking if data can be fit by a single perceptron
> A perceptron is a binary classifier. 
>
> Therefore, if you want to see if data can be fit by a perceptron, draw an $n$-dimensional graph (where $n$ is number of inputs/weights), and see if there is a hypersurface that divides the two groups of points (for $n=2$, see if there is a line that divides the two groups).