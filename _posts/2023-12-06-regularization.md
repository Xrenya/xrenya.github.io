---
title: 'Regularization'
date: 2023-12-06
last_modified_at: 2026-05-24
permalink: /posts/2023/11/regularization/
tags:
  - L1
  - L2
  - Dropout
  - Weight Decay
  - Early Stopping
  - Label Smoothing
---

Regularization is any training choice that helps a model generalize instead of only memorizing the training set. It can be a penalty in the loss, noise during training, constraints on parameters, better data augmentation, or a validation-based stopping rule.

_Updated: May 24, 2026._

The useful question is not "which regularizer is best?", but "which failure mode do I see?" A large train-validation gap suggests stronger regularization. Poor training loss suggests the model may need more capacity, better optimization, or less regularization.

## L1 Regularization

L1 regularization adds a penalty proportional to the absolute value of the weights:

```text
loss = task_loss + lambda * sum(abs(w))
```

It encourages sparse weights, so it is useful when feature selection or interpretability matters. In linear models this is Lasso. L1 can drive some coefficients exactly to zero, but it is not automatically robust to outliers if the base loss is still squared error.

## L2 Regularization And Weight Decay

L2 regularization adds a penalty proportional to squared weights:

```text
loss = task_loss + lambda * sum(w ** 2)
```

It shrinks weights toward zero without usually making them exactly zero. In linear models this is Ridge regression.

For neural networks, "L2 regularization" and "weight decay" are often used interchangeably, but adaptive optimizers make the distinction important. AdamW decouples weight decay from Adam's gradient update, which is why it is the common default for Transformers and many modern deep learning workloads. A practical default is to apply weight decay to matrix weights, but often exclude bias terms and normalization parameters.

## Dropout

Dropout randomly zeroes activations during training. This makes the model less dependent on any one feature or hidden unit. At evaluation time dropout is disabled.

Modern frameworks usually implement inverted dropout: during training the remaining activations are scaled by `1 / (1 - p)`, so no extra scaling is needed at inference. Dropout is still useful, especially for small datasets and fine-tuning, but large pretrained models often use lower dropout than older networks.

## Other Practical Regularizers

- Data augmentation: often the strongest regularizer for vision, audio, and text tasks.
- Early stopping: stop when validation metrics stop improving, not when training loss is lowest.
- Label smoothing: prevents a classifier from becoming overconfident.
- Mixup and CutMix: interpolate examples or image regions, especially useful for image classification.
- Stochastic depth / DropPath: randomly skip residual branches, common in modern vision backbones.
- Ensembling: reduces variance, but increases inference cost.

## Current Practice

As of 2026, regularization is usually part of a training recipe rather than a single trick. For tabular models, tune tree depth, learning rate, subsampling, and L1/L2 penalties. For deep nets, start with data augmentation, AdamW or SGD with weight decay, a good learning-rate schedule, and early stopping. For fine-tuning foundation models, prefer small learning rates, weight decay, validation monitoring, and parameter-efficient adapters when full fine-tuning overfits or is too expensive.

Further reading:

- [PyTorch Dropout documentation](https://docs.pytorch.org/docs/stable/generated/torch.nn.Dropout.html)
- [PyTorch AdamW documentation](https://docs.pytorch.org/docs/stable/generated/torch.optim.AdamW.html)
- [Decoupled Weight Decay Regularization](https://arxiv.org/abs/1711.05101)
- [mixup: Beyond Empirical Risk Minimization](https://arxiv.org/abs/1710.09412)
