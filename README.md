# 🛡️ Magecart Detector

> **Lightweight browser extension for detecting Magecart-style card skimmers directly from your browser.**

<img width="616" height="608" alt="image" src="https://github.com/user-attachments/assets/b0fbe216-2bc5-4e9b-9e62-de7742bf77b9" />
<img width="607" height="430" alt="image" src="https://github.com/user-attachments/assets/d53df6f1-83dc-4000-bfe5-517ecd0c90a9" />

---

## 🔍 Overview

**Magecart Detector** is a Chrome extension designed to identify potentially malicious JavaScript associated with *Magecart*-style credit card skimmers.  
It enables analysts, incident responders, and security researchers to detect obfuscated scripts in real time — before sensitive information can be stolen.

Magecart attacks typically inject malicious JavaScript into e-commerce sites to intercept card or personal data at checkout.  
This extension provides an early-warning mechanism by detecting common obfuscation heuristics in client-side scripts.

---

## 🧰 Features

- ✅ **Automatic scanning** of all inline and external JavaScript on every visited page  
- 🧠 **Heuristic detection** of obfuscation patterns used in Magecart and skimming frameworks  
- 🚨 **Visual alert modal** when suspicious code is detected  
  - Displays a clear warning message and a truncated code preview  
  - Lets the user decide: **Continue** (ignore) or **Close Tab** (exit safely)
- 🔒 **Privacy-preserving:** All analysis is done locally, no telemetry or external API calls  
- ⚡ **Lightweight:** Runs silently until a detection is triggered

---

## Installation (for development/testing)

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** in the top right corner.
4. Click **Load unpacked** and select the folder of this project.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.


## License

MIT License
