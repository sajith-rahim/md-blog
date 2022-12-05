# nltk

Reference: [nltk book](https://www.nltk.org/book/)

```python
import nltk
nltk.download()

# download books

from nltk.book import *
# texts() & sents()
```
---

---
## Basic Functions:

```nltk.text.Text```

1. concordance

Usage: `concordance("search-word")`
> returns occurances of the search-word with some context (few leading and trailing words)


2. similar
Usage: `text1.similar("search-word")`
> returns other words that come in the same context of the search word.

3. common_contexts
Usage: `text1.common_contexts(["word1", "word2"])`
> examine just the contexts that are shared by two or more words

4. dispersion_plot

Usage: `text1.dispersion_plot(["word1", "word2", "word3"])`
> location/occurances of a word in each text, this positional information can be displayed using a dispersion plot

<pre>
* set(text3)          : get vocabulary items
* sorted(set(text3))) : get vocabulary sorted
* text3count("smote") : get count
* FreqDist(text1)     : get the freq. distribution
    FreqDist(text1) // dict: <word,count>
    FreqDist(text1).keys() // [words]
    
    FreqDist(text1).plot()
    FreqDist(text1).most_common(n)

---
 	
def lexical_diversity(text):
     return len(set(text)) / len(text)

def percentage(count, total):
     return 100 * count / total
</pre>



