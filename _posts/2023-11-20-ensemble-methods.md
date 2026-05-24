---
title: 'Ensemble Methods'
date: 2023-11-20
last_modified_at: 2026-05-24
permalink: /posts/2023/11/ensemble-methods/
tags:
  - Decision Tree
  - Random Forest
  - CatBoost
  - XGBoost
  - LightGBM
  - Gradient Boosting
---

Ensembles combine multiple models to improve generalization. The main idea is to reduce variance, bias, or both by making predictions from many weaker learners.

_Updated: May 24, 2026._

## Decision Tree

A decision tree recursively splits data by feature conditions. It is easy to interpret and can model nonlinear interactions, but a deep tree overfits easily.

Important hyperparameters:

- `max_depth`
- `min_samples_leaf`
- `min_samples_split`
- feature and split criteria
- pruning or regularization parameters

## Bagging And Random Forest

Bagging trains many models on bootstrapped samples and averages their predictions. Random Forest adds feature subsampling at each split, making trees less correlated.

Advantages:

- Strong baseline for tabular data.
- Less tuning than boosted trees.
- Works with nonlinear interactions.
- Gives useful feature-importance diagnostics.

Limitations:

- Larger inference cost than one tree.
- Usually less accurate than well-tuned gradient boosting on structured tabular data.
- Extrapolates poorly outside the observed feature range.

## Gradient Boosting

Gradient boosting trains models sequentially. Each new tree tries to correct errors from the current ensemble. The learning rate controls how much each tree contributes.

Key controls:

- learning rate
- number of trees
- tree depth or number of leaves
- row and column subsampling
- L1/L2 regularization
- early stopping on validation data

## XGBoost

XGBoost is a regularized gradient boosting library known for strong tabular performance, sparse-data handling, and mature production tooling.

Use it when you want a robust, flexible baseline for structured data and can spend time tuning.

## LightGBM

LightGBM is optimized for speed and memory efficiency. It uses histogram-based algorithms and leaf-wise tree growth, which can be very accurate but may overfit if depth and leaf constraints are loose.

It is a good choice for large tabular datasets.

## CatBoost

CatBoost is especially strong when categorical features matter. It has built-in categorical handling and ordered boosting techniques that reduce target leakage risk.

It is often the fastest route to a strong tabular baseline when the dataset has many categorical columns.

## Current Practice

As of 2026, gradient-boosted decision trees remain extremely competitive for tabular data. Deep learning is dominant for text, images, audio, and multimodal data, but for classic structured tables, start with CatBoost, LightGBM, XGBoost, or scikit-learn's histogram gradient boosting before building a neural network.

For competitions, ensembles still matter:

- Blend models that make different errors.
- Keep a clean validation split.
- Use cross-validation when data is limited.
- Avoid leaderboard overfitting.
- Calibrate probabilities when the metric or downstream decision requires it.

Further reading:

- [scikit-learn ensemble documentation](https://scikit-learn.org/stable/modules/ensemble.html)
- [XGBoost documentation](https://xgboost.readthedocs.io/)
- [LightGBM documentation](https://lightgbm.readthedocs.io/)
- [CatBoost documentation](https://catboost.ai/docs/)
- [XGBoost paper](https://arxiv.org/abs/1603.02754)
- [CatBoost paper](https://arxiv.org/abs/1706.09516)
