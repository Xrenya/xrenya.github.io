---
title: 'Embeddings'
date: 2023-12-06
last_modified_at: 2026-05-24
permalink: /posts/2023/11/embeddings-tokenizers/
tags:
  - One-hot Vectors
  - Word2Vec
  - Skip-gram
  - CBOW
  - FastText
  - GloVe
  - Transformers
  - RAG
---

Machine learning models do not understand raw text directly. They need text to be converted into numeric vectors. An embedding is a learned vector representation for a token, word, sentence, document, image, or other object.

_Updated: May 24, 2026._

Good embeddings preserve useful similarity: nearby vectors should usually represent items that behave similarly for the task.

## One-Hot Vectors

A one-hot vector has one active dimension and zeros everywhere else. If a word is the i-th item in a vocabulary, its vector has `1` in position `i`.

One-hot vectors are simple, but they have major limitations:

- The vector size grows with the vocabulary.
- Most values are zero.
- Similar words are not close to each other.
- Out-of-vocabulary words are hard to handle.

They are still useful for small categorical variables, but they are rarely the final representation for text.

## Static Word Embeddings

Static embeddings assign one vector per word or subword, independent of context. Classic examples are Word2Vec, GloVe, and FastText.

Skip-gram predicts surrounding words from the center word. CBOW predicts the center word from surrounding context words. Negative sampling makes Word2Vec training much faster by contrasting observed pairs against sampled negative examples.

GloVe learns from global co-occurrence statistics. It combines the intuition of count-based methods with a predictive objective.

FastText represents a word using character n-grams. This helps rare words and misspellings because unseen words can still share subword pieces with known words.

## Tokenization

Modern NLP systems usually tokenize text into subwords rather than whole words. This keeps the vocabulary manageable and reduces out-of-vocabulary problems.

Common tokenization families:

- BPE: repeatedly merges frequent character or byte pairs.
- WordPiece: similar in spirit to BPE, often associated with BERT-style models.
- Unigram language-model tokenization: starts with many candidates and prunes them.
- SentencePiece: trains directly from raw text and treats tokenization as a language-independent preprocessing step.

Tokenization is not a neutral detail. It affects sequence length, multilingual quality, spelling robustness, cost, and how well the model handles domain-specific terms.

## Contextual Embeddings

The biggest change from classic embeddings is context. In a Transformer, the vector for a token depends on the full surrounding sequence. The word "bank" receives a different representation in "river bank" and "bank account".

These contextual embeddings are the backbone of modern language models, dense retrievers, rerankers, and many multimodal systems.

## Sentence And Document Embeddings

For search, clustering, recommendations, deduplication, and retrieval-augmented generation, we often embed larger chunks of text rather than individual tokens.

A practical retrieval pipeline usually includes:

- Chunking documents into coherent passages.
- Embedding each chunk.
- Searching with approximate nearest neighbors.
- Optionally combining dense retrieval with keyword search.
- Reranking the top candidates before sending them to a generator or downstream model.

## Current Practice

As of 2026, classic Word2Vec, GloVe, and FastText are still useful baselines and teaching tools. For production NLP, contextual embeddings from Transformer models are the default. For LLM applications, embeddings are often part of a larger retrieval pipeline, so evaluation should measure the complete system: retrieval recall, answer quality, latency, and failure cases.

Further reading:

- [Efficient Estimation of Word Representations in Vector Space](https://arxiv.org/abs/1301.3781)
- [GloVe: Global Vectors for Word Representation](https://nlp.stanford.edu/projects/glove/)
- [Enriching Word Vectors with Subword Information](https://arxiv.org/abs/1607.04606)
- [SentencePiece: A simple and language independent subword tokenizer](https://arxiv.org/abs/1808.06226)
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401)
