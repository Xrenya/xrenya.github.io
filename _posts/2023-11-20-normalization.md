---
title: 'ML: Normalization'
date: 2023-11-20
last_modified_at: 2026-05-24
permalink: /posts/2023/11/normalization/
tags:
  - BatchNorm
  - InPlace-ABN
  - GroupNorm
  - LayerNorm
  - RMSNorm
  - SpectralNorm
---

Normalization makes optimization easier by controlling the scale and distribution of activations, features, weights, or gradients. The right normalization depends on the architecture and batch regime.

_Updated: May 24, 2026._

## Data Normalization

Before the model, normalize inputs using statistics from the training set only. Common examples:

- Standardization: subtract mean and divide by standard deviation.
- Min-max scaling: map values to a fixed range.
- Image normalization: channel-wise mean and standard deviation.
- Text normalization: case folding, Unicode normalization, or domain-specific cleanup when appropriate.

Do not leak validation or test statistics into the training pipeline.

## BatchNorm

Batch Normalization normalizes activations using batch statistics during training and running estimates during evaluation. It works very well in many convolutional networks.

Limitations:

- Small batch sizes can make statistics noisy.
- Train and evaluation modes behave differently.
- Distributed and gradient-accumulated training need care because the statistical batch may not match the optimization batch.

## In-Place Activated BatchNorm

InPlace-ABN combines batch normalization and activation while saving memory. It can be useful for memory-heavy segmentation or dense prediction models. In current practice, memory pressure is also handled with mixed precision, activation checkpointing, fused kernels, and better hardware, so InPlace-ABN is more specialized than BatchNorm or LayerNorm.

## GroupNorm

GroupNorm splits channels into groups and normalizes within each group. It does not depend on batch size, which makes it useful for small-batch vision tasks such as detection, segmentation, and high-resolution training.

## LayerNorm

LayerNorm normalizes features within each sample. It does not depend on other examples in the batch, so it is stable for sequence models and variable batch sizes.

LayerNorm is standard in Transformers. Modern Transformer variants often use pre-normalization, where the normalization layer is applied before attention or feed-forward blocks.

## RMSNorm

RMSNorm is a simplified LayerNorm variant that scales by root mean square without subtracting the mean. It is common in modern LLM architectures because it is cheaper and works well in pre-normalized Transformer blocks.

## SpectralNorm

Spectral Normalization constrains a weight matrix by its largest singular value. It is not an activation normalization layer. It is often used when Lipschitz control matters, especially in GAN discriminators and some stability-sensitive models.

## Current Practice

As of 2026, the rough defaults are:

- CNN image classification: BatchNorm or newer architecture-specific norms.
- Small-batch vision: GroupNorm or LayerNorm-like variants.
- Transformers and LLMs: LayerNorm or RMSNorm, usually pre-norm.
- GAN discriminators: SpectralNorm can help stability.
- Tabular ML: normalize numeric features for linear models and neural networks; tree ensembles usually need less feature scaling.

Further reading:

- [Batch Normalization](https://arxiv.org/abs/1502.03167)
- [PyTorch BatchNorm documentation](https://docs.pytorch.org/docs/stable/generated/torch.nn.BatchNorm2d.html)
- [Group Normalization](https://arxiv.org/abs/1803.08494)
- [Layer Normalization](https://arxiv.org/abs/1607.06450)
- [Root Mean Square Layer Normalization](https://arxiv.org/abs/1910.07467)
- [Spectral Normalization for GANs](https://arxiv.org/abs/1802.05957)
