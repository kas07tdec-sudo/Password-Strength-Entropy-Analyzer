# Advanced Cryptographic Password Strength Analyzer 🔐

An academic information security web application designed to evaluate credential resilience through real-time heuristic analysis and information theory.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=netlify)](https://crypto-password-analyzer.netlify.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

---

## 🚀 Overview

The **Advanced Cryptographic Password Strength Analyzer** moves beyond basic string matching. By computing Shannon entropy, estimating offline GPU brute-force cracking intervals, and validating complex character-set requirements, this tool provides users with granular feedback to prevent vulnerabilities and enforce secure authentication habits[cite: 2].

---

## ✨ Key Features

* **Shannon Entropy Calculation ($E = L \times \log_2 R$):** Measures true cryptographic unpredictability based on password length ($L$) and active character pool size ($R$)[cite: 2].
* **Brute-Force Threat Modeling:** Computes offline cracking time intervals assuming high-end GPU cluster benchmarks ($10^{10}$ guesses per second)[cite: 2].
* **Real-Time Heuristic Validation:** Instantly scans inputs using regular expressions (`RegEx`) for lowercase/uppercase letters, numbers, and special symbols[cite: 2].
* **Interactive UI & Visibility Toggle:** Features a responsive dark-themed dashboard with a "SHOW/HIDE" toggle for credential visibility and real-time dynamic meter updates.

---

## 🛠️ Tech Stack

* **Frontend Structure:** HTML5 (`Passcode.html`)[cite: 2]
* **Styling & Theming:** CSS3 with CSS Custom Properties (`style.css`)[cite: 2]
* **Cryptographic & Logic Engine:** Vanilla JavaScript (`script.js`)[cite: 2]

---

## 📂 Project Architecture

```text
├── Passcode.html     # Main structural layout and semantic DOM containers
├── style.css         # Responsive styling, CSS variables, and animation states
└── script.js         # Cryptographic math, event listeners, and real-time DOM renderers
