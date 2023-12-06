---
title: 'Embeddings'
date: 2023-12-06
permalink: /posts/2023/11/embeddings-tokenizers/
tags:
  - One-hot Vectors
  - w2v
  - skipgram
  - cbow
  - fasttext
  - glove
---

The machine learning models cannot interpretate data as human do. For example,
we can easily understand the text "I saw a cat", but our models can not - they need vectors of features.
Such vectors, or word embeddings, are representations of words which can be fed into your model.

In practice, you have a vocabulary of allowed words; you choose this vocabulary in advance.
For each vocabulary word, a look-up table contains its embedding. This embedding can be found
using the word index in the vocabulary (i.e., you to look up the embedding in the table using word index).

One-hot Vectors
======
The easiest you can do is to represent words as one-hot vectors: for the i-th word in the vocabulary,
the vector has 1 on the i-th dimension and 0 on the rest. In Machine Learning, this is the most simple way to represent categorical features.

You probably can guess why one-hot vectors are not the best way to represent words.
One of the problems is that for large vocabularies, these vectors will be very long:
vector dimensionality is equal to the vocabulary size, quite sparse, problems with handling issues with out-of-vocabulary.
What is really important, is that these vectors know nothing about the words they represent. It is impossible to measure 
how close similar words. These issues are undesirable in practice. Words which frequently appear in similar contexts have similar meaning.

Skip-Gram
======
Skip-Gram is the model we considered so far: it predicts context words given the central word. Skip-Gram with negative sampling is the most popular approach.
The skip-gram can use different context window size: 1, 2, 3 etc. But wider context window size does not guarantee a better quality. Negative
sampling improves embeddings and decrease training time.

CBOW
======
CBOW (Continuous Bag-of-Words) predicts the central word from the sum of context vectors.
This simple sum of word vectors is called "bag of words", which gives the name for the model.
Context words embeddings are sum together and used to predict the central word (target). 

GloVe: Global Vectors for Word Representation
======
The GloVe model is a combination of count-based methods and prediction methods (e.g., Word2Vec).
Model name, GloVe, stands for "Global Vectors", which reflects its idea: the method uses global information from corpus to learn vectors.

As we saw earlier, the simplest count-based method uses co-occurrence counts to measure the
association between word w and context c: N(w, c). GloVe also uses these counts to construct the loss function:
- rare events are penalized,
- very frequent events are not over-weighted.


FastText
======
FastText is quite different from the above 2 embeddings. While Word2Vec and GLOVE treats each word
as the smallest unit to train on, FastText uses n-gram characters as the smallest unit.
For example, the word vector ,”apple”, could be broken down into separate word vectors units as
“ap”,”app”,”ple”. The biggest benefit of using FastText is that it generate better word embeddings
for rare words, or even words not seen during training because the n-gram character vectors are
shared with other words. This is something that Word2Vec and GLOVE cannot achieve.

------
