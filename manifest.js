{
  "manifest_version": 2,

  "name": "Magecart Detector by NaxoneZ",
  "version": "0.1.0",
  "description": "Try to detect Magecart Malicious Sites",


  "icons": { "16": "MageCart.png" },

  "content_scripts": [{
    "js": ["content.js"],
    "matches": ["*://*/*"]
  }]

}
