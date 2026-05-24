---
title: 'Optimizers'
date: 2023-11-20
last_modified_at: 2026-05-24
permalink: /posts/2023/11/optimizers/
tags:
  - SGD
  - Adadelta
  - Adagrad
  - RMSprop
  - Adam
  - AdamW
  - SparseAdam
  - Adafactor
---

Optimizers update model parameters using gradients. The optimizer matters, but it is only one part of the recipe: initialization, normalization, batch size, learning-rate schedule, warmup, gradient clipping, weight decay, and data quality often matter just as much.

_Updated: May 24, 2026._

## SGD

Stochastic Gradient Descent updates parameters in the negative gradient direction. With momentum, it accumulates a velocity term, which helps smooth noisy gradients.

SGD is simple, memory efficient, and still competitive for many vision tasks. It often needs careful learning-rate schedules and can be slower to tune than adaptive methods.

## Adagrad

Adagrad scales each parameter by the history of squared gradients. Parameters with frequent large gradients get smaller steps, and rare features can receive larger updates.

This is useful for sparse features, but the accumulated denominator can grow so much that learning becomes very slow.

## Adadelta

Adadelta modifies Adagrad by using a moving window of gradient statistics instead of accumulating all past gradients. It reduces the need to choose a global learning rate, but it is less common in modern deep learning recipes.

## RMSprop

RMSprop keeps an exponential moving average of squared gradients. It was historically popular for recurrent neural networks and reinforcement learning. It can still work well, but Adam and AdamW are more common defaults today.

## Adam

Adam keeps exponential moving averages of both gradients and squared gradients. It is robust, easy to start with, and widely used.

Adam's convenience has a cost: it can overfit more easily than SGD in some settings, and classical L2 regularization interacts with Adam's adaptive scaling.

## AdamW

AdamW decouples weight decay from Adam's gradient update. This usually makes weight decay easier to tune and is one reason AdamW became the default optimizer for Transformers, diffusion models, and many modern architectures.

Common starting point:

```text
optimizer = AdamW(model.parameters(), lr=1e-4 to 3e-4, weight_decay=0.01)
```

The real values depend on model size, batch size, schedule, and task.

## SparseAdam

SparseAdam is designed for sparse gradients, such as embedding layers where only a subset of rows receives gradients on each step. It should not be used as a drop-in replacement for dense neural networks.

## Adafactor

Adafactor reduces optimizer memory by factorizing second-moment estimates. It is useful for very large Transformer models or memory-constrained training, but its behavior is more specialized than AdamW.

## Current Practice

As of 2026, AdamW is the safest first choice for most Transformer, diffusion, and fine-tuning work. SGD with momentum remains strong for many convolutional vision models. For tabular gradient boosting, the "optimizer" is usually the boosting procedure, so tune learning rate, tree depth, regularization, and sampling instead.

Before changing optimizer families, check:

- Is the learning rate schedule reasonable?
- Is warmup needed?
- Are gradients exploding or vanishing?
- Is weight decay applied to the right parameters?
- Is validation improving, or only training loss?
- Is mixed precision causing instability?

Further reading:

- [PyTorch optimizer documentation](https://docs.pytorch.org/docs/stable/optim.html)
- [PyTorch AdamW documentation](https://docs.pytorch.org/docs/stable/generated/torch.optim.AdamW.html)
- [Adam: A Method for Stochastic Optimization](https://arxiv.org/abs/1412.6980)
- [Decoupled Weight Decay Regularization](https://arxiv.org/abs/1711.05101)
- [Adafactor: Adaptive Learning Rates with Sublinear Memory Cost](https://arxiv.org/abs/1804.04235)
