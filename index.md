---
layout: default
title: "Home"
---

<!-- Link to the custom CSS and JavaScript files -->
<link rel="stylesheet" href="style.css">
<script src="script.js" defer></script>

<!-- Dynamic Header Section -->
<div id="dynamic-header-container">
  <header id="dynamic-header"></header>
</div>

<!-- Main Content Section -->
<main id="content">
  {% include_relative README.md %}
</main>
