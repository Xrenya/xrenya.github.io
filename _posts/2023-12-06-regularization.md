---
title: 'Regularization'
date: 2023-12-06
permalink: /posts/2023/11/regularization/
tags:
  - L1
  - L2
  - Dropout
---

Regularization is a set of techniques that can prevent overfitting in neural networks and improve the overall metrics.
There are many variants of regularization techniques:

- Introducing constraints on model's parameters.
- Some add more terms in the objective or cost function, like a soft constraint on the parameter values. Constraints and penalties in the cost function contributes also help to improve model's performance.
- Including extra terms as a prior information based on area of expertise.
- Model's ensembling and stacking.

L1
======
Lasso Regression (Least Absolute Shrinkage and Selection Operator) adds “Absolute value of magnitude” of coefficient, as penalty term to the loss function.
Lasso shrinks the less important feature’s coefficient to zero, basically, it can works as feature selections. This method is quire robust to the outliers.

L2
======
L2 regularization is called Ridge Regression, also known as Tikhonov regularization.
Ridge regression adds “squared magnitude of the coefficient” as penalty term to the loss function. Unlike L1, L2 does not
shrink values to zero, but assign them really small vaules. Both regularization techniques make our solution is being shifted, which mean
it does not improve our model performance on training dataset, but they help to generalize model and getter better performance on test dataset.

Dropout
======
Dropout is a technique where randomly selected neurons are ignored during training. Number of deactivated neurons is depends on the dropour probability.
There are two types of dropout: dropout and inverted dropout. In dropout, in order to adjust the statistics we multiply on keep-probabilty during the inference.
While inverted dropout is adjusting statistics during the training stage, where the output is divided on the keep-probability. The inverted dropout is 
advisiable since it does not make any calculation on inference.

------
