# Natural Language Processing

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

- **Translation.** Some languages put adjectives in a different position relative to nouns than English does. For example, English says "red car" but French says "voiture rouge". Knowing which token is the noun and which is the adjective lets a translator re-order them correctly.
- **Sentiment analysis.** Sentiment is mostly carried by adjectives ("great", "terrible") and adverbs ("rarely", "always"). Tagging lets you isolate those and weight them, rather than treating every word equally.
- **Text-to-speech (TTS).** Some words are pronounced differently depending on their part of speech. The classic example is `record`: stressed on the first syllable when used as a noun ("a *re*cord"), on the second when used as a verb ("to re*cord*"). A TTS system needs the PoS to pick the right pronunciation.
