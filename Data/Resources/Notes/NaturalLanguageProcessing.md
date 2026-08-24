Natural Language Processing (NLP) is a field of AI for enabling computers to read and generate human language.

## Applications of NLP

- Speech Recognition
- Sentiment Analysis
- Chatbots (e.g. ChatGPT, Gemini, Claude)
- Translation (e.g. English to French)

## Text Preprocessing

Raw text data is:
- Unstructured
- Noisy

Text preprocessing transforms this into clean, structured data for analysis and learning.

### The preprocessing pipeline

The standard pipeline of steps, in order:

1. **Sentence segmentation**: break the text into sentences.
2. **Word tokenization**: break each sentence into words / tokens.
3. **Stop-word removal**: drop common low-information words (e.g. *the*, *and*, *of*).
4. **Lowercasing**: normalise letter case so the same word isn't represented differently depending on capitalisation.
5. **Normalization**: collapse variants of the same word to a common form. Two main techniques:
   - **Stemming**: strip prefixes/suffixes, sometimes producing non-words.
   - **Lemmatization**: reduce to dictionary form.
6. **PoS tagging**: label each token with its part of speech.

### Sentence Segmentation

Break text into sentences, often along punctuation marks. Also known as **sentence boundary detection** or **sentence boundary disambiguation**.

>[!info]- Challenge: Full-Stops
> Naively splitting on `.` doesn't work, because a full-stop is ambiguous. It might be:
> - a decimal point (e.g. `3.14`)
> - inside a known abbreviation (e.g. `Dr.`, `Prof.`, `etc.`)
> - part of an email address or URL (e.g. `alice@warwick.ac.uk`, `csnotes.uwcs.co.uk`)
> - a file extension (e.g. `paper.pdf`)
>
> Common solutions:
> - **Hand-crafted rules**: e.g. a lower-case letter immediately following a full-stop does *not* indicate a new sentence.
> - **Known abbreviation lists**: recognise `Dr.`, `Mr.`, `Prof.`, `etc.`, `e.g.`, `i.e.` and treat the trailing `.` as part of the abbreviation rather than a sentence boundary.
> - **Numeric context**: if either side of the `.` is numeric, treat it as a decimal point.
> - **Whitespace heuristics**: a full-stop with no following whitespace is unlikely to end a sentence.
> - **Tokenise ambiguous patterns first**: detect URLs, emails, and similar before running segmentation, and replace each with a single token (e.g. a `<URL>` placeholder). The embedded full-stops are then hidden inside the token and can't trigger a split.

### Word Tokenization

Also called **word segmentation**: split a sentence down into its individual words. Each output token usually corresponds to a word, punctuation mark, or other meaningful unit.

### Stop-Word Removal

Remove **stop words**, the filler words that don't usually convey meaning on their own. The classic examples are articles (`a`, `an`, `the`), but the list typically also includes things like `is`, `at`, `which`, `on`, etc. Dropping them shrinks the vocabulary and lets the downstream model focus on content-bearing words.

>[!warning]- Challenge: not every stop word is safe to remove
> The "filler word" label is task-dependent. For some downstream tasks, certain stop words carry critical meaning and removing them changes the result.
>
> The classic example is **negation in sentiment analysis**: dropping `not` from "the food was not good" turns it into "the food was good", which flips the sentiment. Words like `no`, `not`, `nor`, `but`, and `however` typically need to be preserved when meaning depends on their presence.

### Stemming

Reduce a word to a root/base form by chopping off suffixes (and sometimes prefixes). The output is *not* required to be a real word, just a consistent prefix shared by all its variants.

For example, a typical stemmer maps:
- `studying`, `studies`, `studied` → `studi`
- `running`, `runner`, `runs` → `run`

`studi` isn't a real English word, but every variant of the verb *study* collapses to the same token, which is the point.

>[!info]- Advantages of stemming
> - **Reduces vocabulary size.** Variants of the same root share a single token, so the downstream model deals with far fewer distinct types.
> - **Groups words with the same meaning.** All inflections of a verb (or family of related nouns) end up in one bucket, which is useful for tasks like search where you'd want a query for "studies" to also match documents containing "studying".
> - **Fast.** Stemmers are mostly just rule-based suffix-stripping, so they're extremely cheap to run, even on very large corpora.

### Lemmatization

Reduce a word to its **dictionary-valid** root form, called a **lemma**. Unlike stemming, the output is always a real word.

For example: `studying`, `studies`, `studied` all lemmatize to `study`; `was`, `were`, `is` all lemmatize to `be`.

>[!info]- Advantage over stemming
> The resulting tokens are real words, which keeps the corpus human-readable and lets downstream components (dictionaries, embeddings trained on real text, etc.) line up with the lemmas directly. This usually gives better accuracy on meaning-sensitive tasks than stemming, at the cost of being slower (lemmatizers often need a vocabulary lookup and sometimes the word's PoS).

### PoS Tagging

**Part-of-Speech tagging** labels each token with its grammatical category: noun, verb, adjective, adverb, determiner, preposition, etc.

>[!info]- Context matters: same word, different PoS
> The same surface word can have different parts of speech in different contexts, so you can't tag in isolation.
>
> For example, "face":
> - "Her **face** was tired." (noun)
> - "We must **face** the problem." (verb)
>
> The tagger has to look at the surrounding words to decide which it is.

### Use cases of PoS Tagging

- **Translation:** Some languages put adjectives in a different position relative to nouns than English does. For example, English says "red car" but French says "voiture rouge". Therefore, you can't rely on order for translation - this is why we have PoS Tagging.
- **Sentiment analysis:** Sentiment is mostly carried by adjectives ("great", "terrible") and adverbs ("rarely", "always"). Tagging lets you identify these types of words easily.
- **Text-to-speech (TTS):** Some words are pronounced differently depending on their part of speech. The classic example is `record`: stressed on the first syllable when used as a noun ("a *re*cord"), on the second when used as a verb ("to re*cord*"). A TTS system needs the PoS to pick the right pronunciation.

## Document-Level Representation

Each document is represented by one vector.

- Sparse, high-dimensional
- Vector built from all words in the document
- Representation can't capture word semantics

### Basic Terms

- **Corpus:** a collection of text documents.
- **Vocabulary:** a collection of all unique words in the corpus.

### BOW

**Bag of Words (BOW)** represents each document as a vector.

Each document vector has the same length: the length of the vocabulary. The $i$-th entry of the document vector is the number of times word $i$ appears in the document.

For example:

- $D_1$: *Ed is unemployed until Ed gets a job.*
- $D_2$: *Ed is a programmer.*
- $D_3$: *Job market for CS is cooked.*

Vocabulary (alphabetical):

$$
V = \{\text{a},\, \text{cooked},\, \text{cs},\, \text{ed},\, \text{for},\, \text{gets},\, \text{is},\, \text{job},\, \text{market},\, \text{programmer},\, \text{unemployed},\, \text{until}\}
$$

$$
|V| = 12
$$

So the document vectors for $(D_1, D_2, D_3)$ each have length $12$:

$$
\begin{aligned}
D_1 &= (1,\, 0,\, 0,\, 2,\, 0,\, 1,\, 1,\, 1,\, 0,\, 0,\, 1,\, 1) \\
D_2 &= (1,\, 0,\, 0,\, 1,\, 0,\, 0,\, 1,\, 0,\, 0,\, 1,\, 0,\, 0) \\
D_3 &= (0,\, 1,\, 1,\, 0,\, 1,\, 0,\, 1,\, 1,\, 1,\, 0,\, 0,\, 0)
\end{aligned}
$$

**Pros:**

- Simple, easy to implement
- Computationally cheap

**Cons:**

- Often sparse (solved by sparse storage, LSA)
- Ignores how frequent words are across all documents (solved by TF×IDF)
- Neglects word order, e.g. "Bear loves Nikki" vs "Nikki loves Bear" (can't be distinguished by BOW; **bag of n-grams** solves this)
- Neglects similarity between words like synonyms, e.g. "old building" and "ancient building"

### Sparse Storage

Two common formats for sparse storage: **Yale format** and **COO format**.

#### COO format

**Coordinate List format**, also called **COO format**, is a way to compress a 2D matrix (such as a document-by-vocabulary matrix) into an array of triples (3-tuples).

The idea is to track where all the non-zero values in the 2D matrix are.

Each value in the array is the 3-tuple: `(row index, column index, value)`.

For example:

```
4 0 7
0 0 0
0 9 0
```

The above is stored in COO format as: `[(1, 1, 4), (1, 3, 7), (3, 2, 9)]`.

#### Yale format

**Yale Format**, also called **Compressed Sparse Row (CSR) format**, is another way to compress the 2D matrix, but with different pros and cons. It also has three arrays, but they may not be the same length so we don't use an array of triples.

The idea is (again) to track where all the non-zero values in the 2D matrix are. It's easiest to show with an example:

```
4 0 7
0 0 0
0 9 0
```

We have 3 non-zero entries:

- $(1, 1) = $ 1st row, 1st column $= 4$
- $(1, 3) = 7$
- $(3, 2) = 9$

These points are ordered by row number, then column number. With this order in place, we can compute the arrays for the Yale format.

- One array in Yale format holds the **column number**: `[1, 3, 2]`.
- Another array in Yale format holds the **values**: `[4, 7, 9]`.
- The final array in Yale format is for **row pointers**, which tell you where each row starts in the column-number array:
  - The first row starts with point $(1, 1)$, so the first entry is $1$.
  - The second row is empty, so we set the second entry to whatever is in the third entry.
  - The third row starts with $(3, 2)$, which is the third point recorded. So the third entry is $3$.
  - There is no fourth row, so the last entry is $4$ (there is no 4th point).

The row pointer array in Yale format is: `[1, 3, 3, 4]`.

#### Yale vs COO format

| Format | Pros | Cons |
|--------|------|------|
| **COO** | Good for incremental construction (just append a new triple); simple format; easy to convert to other formats | Slow row access (must scan the whole triple list); slow matrix-vector multiplication; 3 stored values per non-zero entry |
| **Yale (CSR)** | Fast row access (row pointer gives a direct offset); fast matrix-vector multiplication (iterate row-by-row); compact storage for row-heavy workloads | Expensive to add entries (shift arrays and update row pointers); poor for column-based access; harder to build one entry at a time |

### TF × IDF

The problem with the current document-level representation methods is that frequency of words across all documents isn't accounted for. Words that are frequent in just one document are probably more important to that document than words which are frequent across all documents.

**TF × IDF** identifies words that are frequent in one document but rare in the corpus.

Consider:

```
Doc 1: "the algorithm sorts the array using quicksort! Quicksort is very effective. I love quicksort."
Doc 2: "the algorithm sorts the list using mergesort"
Doc 3: "the algorithm compares two arrays for sorting"
```

"algorithm" has high frequency but it doesn't really say much (and appears in all documents), whereas the term "quicksort" conveys a lot of meaning in Doc 1 and so should be weighted higher.

- **TF** is short for **Term Frequency**: how often this term appears in one document.
- **IDF** is short for **Inverse Document Frequency**: we apply a penalty for this term appearing in *all* documents.

$$
\text{TF}(w, d) \;=\; \frac{\text{number of times } w \text{ appears in } d}{\text{number of words in } d}
$$

$$
\text{IDF}(w, D) \;=\; \log\!\left(\frac{|D|}{|\{d \in D : w \in d\}|}\right)
$$

where $D$ is the corpus.

If you get given the **document frequency** ($\text{df} = |\{d \in D : w \in d\}| \,/\, |D|$), then we can use:

$$
\text{IDF}(w, D) \;=\; -\log(\text{document frequency})
$$

>[!check]- Derive the document-frequency IDF formula
> Starting from the original definition and letting $n_w = |\{d \in D : w \in d\}|$:
>
> $$\text{IDF}(w, D) \;=\; \log\!\left(\frac{|D|}{n_w}\right)$$
>
> The document frequency is $\text{df} = \dfrac{n_w}{|D|}$, so $\dfrac{|D|}{n_w} = \dfrac{1}{\text{df}}$.
>
> $$\text{IDF}(w, D) \;=\; \log\!\left(\frac{1}{\text{df}}\right) \;=\; \log(1) - \log(\text{df}) \;=\; -\log(\text{df})$$

#### IDF Properties

If a word appears across all documents then $\text{IDF}(w, D) = \log(|D|/|D|) = \log(1) = 0$.

If no documents have the word then $\text{IDF}(w, D) = \log(|D|/0) = \infty$.

To prevent the above happening, IDF can be adjusted by adding $1$s to the formula:

$$
\text{IDF}(w, D) \;=\; \log\!\left(\frac{|D| + 1}{n_w + 1}\right) + 1
$$

The $+1$ outside the log is to prevent $\text{IDF}(w, D) = 0$, and the $+1$s inside the fraction inside the log are to prevent $\text{IDF}(w, D) = \infty$.

### Bag of N-Grams

An **N-gram** is a sequence of $N$ contiguous words. Consider the phrase *"Ed loves Epic: The Musical"*.

BOW would break this document down into "Ed", "loves", "Epic", "The", "Musical" (perhaps removing "The" if stop-word removal has taken place). This effectively uses **1-grams** (or **unigrams**).

**Bi-grams** might break it down into: "Ed loves", "loves Epic", "Epic The", "The Musical".

**Tri-grams** break it into: "Ed loves Epic", "loves Epic The", "Epic The Musical". This captures more of the semantics in each gram.

>[!check]- Advantages and Disadvantages
> **Advantage:** captures more context for each word.
>
> **Disadvantage:** more computation, more storage needed, and more sparse (more possible gram combinations, so more zero counts across documents).

### LSA

## Word-Level Representation

Another representation method, in contrast to Document-Level Representation.

| Property | Document-Level (DLR) | Word-Level (WLR) |
|----------|---------------------|------------------|
| Dimensionality | Sparse, high-dimensional | Dense, low-dimensional |
| Vector represents | All words in the document | A single word |
| Semantics | Can't capture word semantics | Can capture word semantics |

Note also that WLR can be aggregated (e.g. averaging or summing the word vectors) to find a document vector.

### Word Embeddings

### CBOW

### Skip-Gram

### Hierarchical Softmax

### Negative Sampling
