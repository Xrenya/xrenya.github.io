---
permalink: /
layout: default
title: "Rinat | Machine Learning Engineer"
excerpt: "Machine Learning Engineer working across computer vision, NLP, RL, analytics, and ML competitions."
redirect_from: 
  - /about/
  - /about.html
---

<main class="ml-home" aria-label="Rinat homepage">
  <section class="ml-hero" aria-labelledby="home-title">
    <canvas class="ml-hero__canvas" data-rl-background aria-hidden="true"></canvas>
    <div class="ml-hero__overlay" aria-hidden="true"></div>

    <div class="ml-hero__inner">
      <div class="ml-hero__copy">
        <p class="ml-kicker">Machine Learning Engineer in Tokyo</p>
        <h1 id="home-title">Rinat builds ML systems that learn from messy, real-world signals.</h1>
        <p class="ml-lede">I work across computer vision, NLP, reinforcement learning, data analytics, and machine learning competitions, turning research ideas into practical systems.</p>

        <div class="ml-actions" aria-label="Primary links">
          <a class="ml-button ml-button--primary" href="/posts/">
            <i class="fas fa-book-open" aria-hidden="true"></i>
            <span>Read Notes</span>
          </a>
          <a class="ml-button" href="/cv/">
            <i class="fas fa-briefcase" aria-hidden="true"></i>
            <span>View CV</span>
          </a>
          <a class="ml-button" href="https://github.com/Xrenya">
            <i class="fab fa-github" aria-hidden="true"></i>
            <span>GitHub</span>
          </a>
        </div>

        <div class="ml-skill-row" aria-label="Focus areas">
          <span>Computer Vision</span>
          <span>NLP</span>
          <span>RL</span>
          <span>Analytics</span>
          <span>Competitions</span>
        </div>
      </div>

      <aside class="ml-train-panel" aria-label="Live training metrics">
        <div class="ml-train-panel__top">
          <span>rl-lab/live</span>
          <strong data-rl-status>optimizing</strong>
        </div>
        <div class="ml-metric">
          <span>episode</span>
          <strong data-rl-episode>0248</strong>
        </div>
        <div class="ml-metric">
          <span>reward</span>
          <strong data-rl-reward>+72.4</strong>
        </div>
        <div class="ml-metric">
          <span>epsilon</span>
          <strong data-rl-epsilon>0.18</strong>
        </div>
        <div class="ml-loss">
          <span style="--bar: 68%"></span>
          <span style="--bar: 42%"></span>
          <span style="--bar: 78%"></span>
          <span style="--bar: 53%"></span>
          <span style="--bar: 86%"></span>
        </div>
      </aside>
    </div>
  </section>

  <section class="ml-signal-strip" aria-label="Profile snapshot">
    <div>
      <strong>Tokyo</strong>
      <span>building applied ML</span>
    </div>
    <div>
      <strong>CV + NLP + RL</strong>
      <span>research to production</span>
    </div>
    <div>
      <strong>Competitions</strong>
      <span>ranking pressure, clean validation</span>
    </div>
    <div>
      <strong>PyTorch stack</strong>
      <span>experiments, metrics, iteration</span>
    </div>
  </section>

  <section class="ml-section ml-section--split">
    <div class="ml-section__intro">
      <p class="ml-kicker">What I Like Working On</p>
      <h2>Models that get sharper under feedback.</h2>
      <p>I am interested in the loop where data quality, model behavior, and product constraints collide. That includes visual perception, language models, RL-style optimization, and the practical details that make experiments reproducible.</p>
    </div>

    <div class="ml-focus-grid">
      <article class="ml-focus-card">
        <i class="fas fa-eye" aria-hidden="true"></i>
        <h3>Perception</h3>
        <p>Computer vision pipelines, representation learning, and deployment-minded evaluation.</p>
      </article>
      <article class="ml-focus-card">
        <i class="fas fa-comments" aria-hidden="true"></i>
        <h3>Language</h3>
        <p>NLP systems, retrieval, embeddings, and text classification for real documents.</p>
      </article>
      <article class="ml-focus-card">
        <i class="fas fa-chart-line" aria-hidden="true"></i>
        <h3>Learning Loops</h3>
        <p>Optimization, RL-inspired workflows, analytics, and fast competition iteration.</p>
      </article>
    </div>
  </section>

  <section class="ml-section">
    <div class="ml-section__header">
      <div>
        <p class="ml-kicker">Recent Notes</p>
        <h2>Short logs from the ML workbench.</h2>
      </div>
      <a class="ml-link" href="/posts/">All posts</a>
    </div>

    <div class="ml-post-grid">
      {% for post in site.posts limit:3 %}
        <article class="ml-post-card">
          <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %-d, %Y" }}</time>
          <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
          {% if post.excerpt %}
            <p>{{ post.excerpt | markdownify | strip_html | truncate: 130 }}</p>
          {% endif %}
        </article>
      {% endfor %}
    </div>
  </section>

  <section class="ml-section ml-section--compact">
    <div class="ml-ods">
      <a href="https://ods.ai/" aria-label="Open Data Science community">
        <img src="/images/ods_stickers.jpg" alt="Open Data Science stickers">
      </a>
      <p>I am also part of the Open Data Science community: a good place for ML practice, competitions, and hard-won debugging instincts.</p>
    </div>
  </section>
</main>

<script src="/assets/js/rl-background.js"></script>
