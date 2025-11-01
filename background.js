// background.js (service worker) - Versión simplificada
const ignoredTabs = new Set();

// Limpiar pestañas cerradas del set
chrome.tabs.onRemoved.addListener((tabId) => {
  ignoredTabs.delete(tabId);
});

// Message handler para acciones de la UI
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  const tabId = sender?.tab?.id ?? null;

  switch (msg.action) {
    case "checkIgnored":
      sendResponse({ ignored: tabId !== null && ignoredTabs.has(tabId) });
      break;

    case "ignoreThisTab":
      if (tabId !== null) {
        ignoredTabs.add(tabId);
        sendResponse({ success: true });
      } else {
        sendResponse({ success: false });
      }
      break;

    case "closeTab":
      if (tabId !== null) {
        chrome.tabs.remove(tabId, () => {
          if (chrome.runtime.lastError) {
            sendResponse({ success: false, reason: chrome.runtime.lastError.message });
          } else {
            ignoredTabs.delete(tabId);
            sendResponse({ success: true });
          }
        });
        return true; // async response
      } else {
        sendResponse({ success: false, reason: "no-tab" });
      }
      break;

    default:
      sendResponse({ ok: false });
  }

  return false;
});

// Mantener el service worker activo
let keepAliveInterval;

function keepAlive() {
  if (keepAliveInterval) clearInterval(keepAliveInterval);
  keepAliveInterval = setInterval(() => {
    chrome.tabs.query({}, () => {});
  }, 25000);
}

chrome.runtime.onInstalled.addListener(() => {
  keepAlive();
  console.log('Magecart Detector installed/updated');
});

chrome.runtime.onStartup.addListener(() => {
  keepAlive();
});