---
title: 'Modern ML Practice in 2026'
date: 2026-05-24
last_modified_at: 2026-05-24
permalink: /posts/2026/05/modern-ml-practice/
tags:
  - LLM
  - RAG
  - Fine-tuning
  - Evaluation
  - Multimodal
  - PEFT
---

This is a short snapshot of practical machine learning work as of 2026. The biggest shift is that many projects now start from pretrained foundation models, but the hard work is still data, evaluation, latency, cost, reliability, and deployment.

## Foundation Models Are Infrastructure

For text, image, audio, and multimodal tasks, the first baseline is often a pretrained model plus prompting, retrieval, fine-tuning, or adapters. Training from scratch is reserved for cases with enough data, budget, and a clear reason.

Useful questions:

- Can prompting solve the task?
- Does the model need private or fresh knowledge?
- Is retrieval enough, or does the behavior itself need fine-tuning?
- What latency and cost can the product tolerate?
- How will failures be detected?

## Retrieval-Augmented Generation

RAG is useful when the model needs information outside its parameters: internal documents, policies, code, support tickets, papers, or recent data.

A strong RAG system is not just "embed and search":

- clean and chunk documents carefully
- store metadata and permissions
- combine dense retrieval with keyword search when needed
- rerank top candidates
- cite sources in the answer
- evaluate retrieval recall separately from generation quality

## Fine-Tuning And Adapters

Full fine-tuning updates all model parameters and can be expensive. Parameter-efficient fine-tuning updates a small number of additional parameters.

LoRA is a common adapter method: it learns low-rank updates to selected weight matrices. QLoRA makes fine-tuning cheaper by combining quantization with LoRA-style adapters.

Fine-tuning is most useful when you need consistent behavior, formatting, domain style, or task-specific decision boundaries. It is less useful when the issue is missing knowledge that can be retrieved.

## Evaluation Is The Product

Modern ML systems need more than one score. Useful evaluation includes:

- offline metrics on clean validation sets
- stress tests and adversarial examples
- human review for ambiguous cases
- latency and cost measurements
- regression tests for prompts, retrieval, and model versions
- monitoring for data drift and behavior drift

For generative systems, keep a small hand-labeled eval set and a larger automatically checked set. Do not rely only on demos.

## Multimodal Workflows

Many systems now combine text, images, audio, video, structured data, and tool outputs. The engineering challenge is often alignment between modalities: timestamps, bounding boxes, document pages, frames, OCR text, and metadata.

Good multimodal systems keep intermediate evidence inspectable. If the answer depends on a chart, page region, or frame, store that trace.

## Tabular ML Still Matters

Not every problem is an LLM problem. For tabular prediction, gradient-boosted trees are still hard to beat. For ranking, recommender systems, fraud, churn, pricing, and forecasting, classical validation discipline still matters more than model hype.

## Practical Checklist

- Build the smallest useful baseline first.
- Keep train, validation, and test boundaries clean.
- Version data, prompts, model weights, and retrieval indexes.
- Log failures with enough context to reproduce them.
- Measure quality, latency, and cost together.
- Prefer boring systems when boring systems solve the task.

Further reading:

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401)
- [LoRA: Low-Rank Adaptation of Large Language Models](https://arxiv.org/abs/2106.09685)
- [QLoRA: Efficient Finetuning of Quantized LLMs](https://arxiv.org/abs/2305.14314)
- [scikit-learn ensemble documentation](https://scikit-learn.org/stable/modules/ensemble.html)
