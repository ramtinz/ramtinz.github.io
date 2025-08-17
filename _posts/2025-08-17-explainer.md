---
title: "How can we explain how a machine learning model makes predictions?"
date: 2025-08-17
---

Machine learning has made incredible progress in recent years, particularly in healthcare and biomedical research. We now train models that can classify, predict, and even guide decision-making in sensitive contexts. But an important question remains: how do we know what these models actually see in the data, and how do they make their predictions?

There is no single method that can fully open the black box. But there are powerful approaches to approximate explanations, helping us understand how variables (features, biomarkers, etc.) are weighted in a model's reasoning. This is where my R package **ExplaineR** comes in.

👉 [GitHub repository](https://github.com/PERSIMUNE/explainer)  
👉 [Documentation and tutorials](https://persimune.github.io/explainer/)

---

## Why I built ExplaineR

I developed ExplaineR in response to the growing need for tools that provide in-depth model explanations, especially in classification and regression settings. Researchers are now encouraged not just to train and validate models, but also to explore why predictions are made the way they are.

ExplaineR was designed with healthcare and biomedical applications in mind, but its methods are broadly applicable. It gives users a set of explanation techniques that go beyond standard model metrics, aiming to make predictions more transparent.

---

## What you can do with ExplaineR

ExplaineR offers support for:
- **Binary classification models** – [tutorial here](https://persimune.github.io/explainer/articles/explainer_tutorial_binary_classification.html)
- **Multiclass classification models** – [tutorial here](https://persimune.github.io/explainer/articles/explainer_tutorial_multiclass.html)
- **Regression models** – [tutorial here](https://persimune.github.io/explainer/articles/explainer_tutorial_regression.html)

These tutorials walk you through how to extract explanations and visualize how your model weighs different variables.

---

## Why this matters

In biomedical research, transparency isn't optional—it's essential. Whether predicting disease outcomes or identifying key biomarkers, interpretability directly impacts clinical trust and adoption. The [recent article in Bioinformatics Advances](https://academic.oup.com/bioinformaticsadvances/article/4/1/vbae049/7641029) discusses these challenges in more detail, highlighting why explanation methods are increasingly recommended.

---

## Try it out

If you're working on classification or regression models and want to better understand what's going on under the hood, I encourage you to give ExplaineR a try:

📦 [Install from GitHub](https://github.com/PERSIMUNE/explainer)  
📖 [Learn from the documentation and tutorials](https://persimune.github.io/explainer/)

And if you find it useful, don't forget to ⭐️ the repo and share it with colleagues. The more people explore and contribute, the stronger the community of model interpretability becomes.

---

## 📌 Tags

`#ExplaineR` `#explainableAI` `#machinelearning` `#interpretability` `#biomedicalAI` `#R` `#modelExplanation` `#XAI` `#healthcare` `#openSource`
