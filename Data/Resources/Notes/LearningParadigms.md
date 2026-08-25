Different problems call for different ways of learning from data. The three main paradigms:

- **Supervised Learning:** use labelled data.
- **Unsupervised Learning:** use unlabelled data.
- **Reinforcement Learning:** make decisions based on feedback while the model is running.

### Supervised Learning

**Common use-cases:** Regression and Classification.

These are correlated: both learn a mapping from input to output, using labelled examples. **Regression** predicts a continuous value (e.g. house price), while **Classification** predicts a discrete category (e.g. spam or not spam). Many classification techniques build on regression underneath: for example, logistic regression outputs a probability, then thresholds to produce a class.

Labelled data is partitioned into **training data** and **testing data**. The model is trained on the training data and then tested for accuracy on the testing data.

### Unsupervised Learning

**Common use-cases:** Clustering (e.g. $k$-means clustering) and Association.

Clustering groups similar data points together without any labels; association discovers rules that describe how data points relate (e.g. "customers who buy A also buy B").

### Semi-Supervised Learning

A hybrid of supervised and unsupervised learning.

Supervised learning has a lot of benefits but data labelling is often **expensive** and **time-consuming**. If you have a small amount of labelled data and a *lot* of unlabelled data (often the case), you can use **semi-supervised learning (SSL)**.

SSL often uses two assumptions:

- **Continuity Assumption:** close-together data points are likely to have the same label.
- **Cluster Assumption:** data points in the same cluster are likely to have the same label.

### Inductive and Transductive Learning

**Inductive Learning** is about learning a general rule (a model) from the labelled data. We can then apply this general rule to any unlabelled data. This involves splitting the dataset into labelled and unlabelled datasets.

General process for **self-learning** (a type of inductive learning):

1. Train a supervised model on the labelled data $L$.
2. Test on the unlabelled data $U$.
3. Add the most confidently classified members from $U$ into $L$ (increasing our labelled data) and remove them from $U$.
4. Repeat 1-3 until $U$ is empty.

**Transductive Learning** aims to make predictions specifically for the fixed set of unlabelled data it is given, without necessarily learning a general rule. It does this without splitting the dataset into labelled and unlabelled parts; it trains using the entire dataset.

| Property | Inductive | Transductive |
|----------|-----------|--------------|
| Goal | Learn a general rule / model | Predict labels for a specific fixed set of unlabelled data |
| Data split | Split into labelled ($L$) and unlabelled ($U$) parts | Uses the entire dataset together |
| Generalisation | Can predict on new, unseen data | Only predicts for the given unlabelled data |
| Reusability | Model can be reused on future data | Must be re-run when new unlabelled data arrives |

### Reinforcement Learning

Agents learn how to behave using feedback and interaction with the environment.

More formally, the agent takes actions which affect the environment, and the agent gets observations from the environment (in the form of reward and new state) which feed back into the agent.

### Pavlovian Conditioning

Reinforcement learning (analogous to **operant conditioning**) is about reward and punishment: stimulus and reaction.

**Pavlovian Conditioning** is about pairing stimuli to other stimuli.

For example, to train a dog (Max) to associate food with the sound of a bell, there are four key steps:

1. **Before Conditioning.** Max is introduced to the food alone. In response to smelling the food, Max starts salivating in the presence of the food.
2. **Before Conditioning.** Max is introduced to the sound of the bell alone. At this stage there is no salivation response, as Max cannot smell the food and Max does not associate the sound with anything.
3. **During Conditioning.** Max is introduced to the food when the bell is rung at the same time. Due to the presence of the food, Max starts salivating. Repeated pairing of food and bell enables Max to learn the association between food and the sound of the bell.
4. **After Conditioning.** Eventually, ringing the bell alone (even without giving food to Max) will lead to the salivation response from Max.
