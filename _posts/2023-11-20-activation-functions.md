---
title: 'Activation Functions'
date: 2023-11-20
last_modified_at: 2026-05-24
permalink: /posts/2023/11/activation-functions/
tags:
  - sigmoid
  - relu
  - leaky-relu
  - softmax
  - gelu
  - swish
  - silu
  - tanh
  - elu
---

Activation functions introduce nonlinearity. Without them, a deep network is still equivalent to one linear transformation.

_Updated: May 24, 2026._

## Sigmoid

```text
sigmoid(x) = 1 / (1 + exp(-x))
```

Sigmoid maps values to `(0, 1)`. It is useful for binary classification outputs and gates, but it is rarely a good hidden-layer default because large positive or negative values saturate and produce small gradients.

Derivative:

```text
sigmoid'(x) = sigmoid(x) * (1 - sigmoid(x))
```

## Tanh

```text
tanh(x) = (exp(x) - exp(-x)) / (exp(x) + exp(-x))
```

Tanh maps values to `(-1, 1)`. It is zero-centered and still useful in recurrent gates and some bounded-output settings, but it can also saturate.

Derivative:

```text
tanh'(x) = 1 - tanh(x)^2
```

## ReLU, Leaky ReLU, ELU

ReLU is simple and efficient:

```text
relu(x) = max(0, x)
```

It avoids much of the saturation problem, but units can "die" if they stay negative and stop receiving gradient. Leaky ReLU keeps a small slope for negative values. ELU uses a smooth negative branch and can improve optimization in some architectures.

## GELU

GELU weights inputs by the probability that they are positive under a Gaussian assumption. It is smoother than ReLU and became standard in many Transformer models.

Exact form:

```text
gelu(x) = x * Phi(x)
```

where `Phi` is the standard normal cumulative distribution function.

## SiLU / Swish

SiLU, also called Swish, is:

```text
silu(x) = x * sigmoid(x)
```

It is smooth and non-monotonic, and it is common in modern vision, diffusion, and efficient network blocks.

## Softmax

Softmax converts logits into a probability distribution:

```text
softmax(x_i) = exp(x_i) / sum_j exp(x_j)
```

Use numerically stable implementations instead of writing softmax by hand. For training classifiers, prefer framework losses such as cross entropy, which combine log-softmax and negative log-likelihood safely.

## Current Practice

As of 2026, ReLU is still a strong baseline, GELU is common in Transformers, and SiLU/Swish is common in many modern convolutional, diffusion, and efficient architectures. Sigmoid and tanh are mostly used for gates or output constraints, not as default hidden activations.

Activation choice should be tested with the whole recipe: initialization, normalization, optimizer, learning-rate schedule, and architecture.

Further reading:

- [PyTorch activation functions](https://docs.pytorch.org/docs/stable/nn.functional.html)
- [Gaussian Error Linear Units](https://arxiv.org/abs/1606.08415)
- [Searching for Activation Functions](https://arxiv.org/abs/1710.05941)
