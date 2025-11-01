# 🛡️ Magecart Detector

> **Lightweight browser extension for detecting Magecart-style card skimmers directly from your browser.**

<img width="628" height="516" alt="Captura" src="https://github.com/user-attachments/assets/59e108e6-8599-47dd-95b2-0a5f22a0c4ac" />
<img width="628" height="516" alt="Captura1" src="https://github.com/user-attachments/assets/2fa0b3be-f99d-4f0e-8750-0fffe115a1e0" />

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
