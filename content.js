(function () {
  const SNIPPET_PREVIEW_LEN = 500;
  const MIN_0X_MATCHES = 3; // Mínimo de patrones _0x para considerar sospechoso

  // Detección simplificada: solo busca patrones _0x
  function isSuspicious(code) {
    const matches = code.match(/_0x[a-f0-9]{2,}/gi) || [];
    return matches.length >= MIN_0X_MATCHES;
  }

  const sendMessage = (action) => new Promise((resolve) => {
    try {
      if (!chrome.runtime || !chrome.runtime.sendMessage) {
        resolve(null);
        return;
      }
      
      chrome.runtime.sendMessage({ action }, (resp) => {
        if (chrome.runtime.lastError) {
          resolve(null);
        } else {
          resolve(resp);
        }
      });
    } catch (error) {
      resolve(null);
    }
  });

  function generatePreview(full) {
    if (!full) return '';
    if (full.length <= SNIPPET_PREVIEW_LEN) return full;
    return full.slice(0, SNIPPET_PREVIEW_LEN) + '\n\n... (truncated) ...';
  }

  function showModal(detectedSnippet, matchCount) {
    if (document.getElementById('magecart-detector-modal')) return;

    const overlay = document.createElement('div');
    overlay.id = 'magecart-detector-modal';
    Object.assign(overlay.style, {
      position: 'fixed',
      inset: '0',
      background: 'rgba(0,0,0,0.6)',
      zIndex: '2147483647',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    });

    const modal = document.createElement('div');
    Object.assign(modal.style, {
      width: '600px',
      maxWidth: '95%',
      background: '#fff',
      borderRadius: '14px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
      padding: '24px 28px',
      fontFamily: 'Segoe UI, Roboto, Arial, sans-serif',
      textAlign: 'center',
      color: '#222',
      position: 'relative',
      overflow: 'hidden',
    });

    const icon = document.createElement('div');
    icon.innerHTML = `
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L22 20H2L12 2Z" fill="#b71c1c"/>
        <path d="M12 8V13" stroke="#fff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 17.2H12.01" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
    Object.assign(icon.style, {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '10px'
    });

    const title = document.createElement('h2');
    title.textContent = '⚠️ Possible Card Skimmer Detected';
    Object.assign(title.style, {
      fontSize: '20px',
      color: '#b71c1c',
      margin: '6px 0 10px 0'
    });

    const subtitle = document.createElement('p');
    subtitle.textContent =
      'This site appears to include obfuscated code commonly used in Magecart card skimmers. Do NOT enter payment or personal data.';
    Object.assign(subtitle.style, {
      fontSize: '14px',
      color: '#333',
      lineHeight: '1.4',
      marginBottom: '16px'
    });

    const warn = document.createElement('p');
    warn.innerHTML = `Detected <strong>${matchCount} obfuscated patterns (_0x)</strong> in the same script block. Click "Show more" to view the suspicious snippet.`;
    Object.assign(warn.style, {
      fontSize: '13px',
      color: '#444',
      marginBottom: '12px'
    });

    // hidden snippet area
    const snippetContainer = document.createElement('div');
    Object.assign(snippetContainer.style, {
      display: 'none',
      transition: 'all 0.3s ease',
      marginTop: '10px'
    });

    const textarea = document.createElement('textarea');
    textarea.readOnly = true;
    textarea.value = generatePreview(detectedSnippet);
    Object.assign(textarea.style, {
      width: '100%',
      height: '160px',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      background: '#fafafa',
      fontFamily: 'monospace',
      fontSize: '12px',
      color: '#111',
      textAlign: 'left',
      whiteSpace: 'pre',
      resize: 'none'
    });

    snippetContainer.appendChild(textarea);

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'Show more';
    Object.assign(toggleBtn.style, {
      background: '#fff',
      border: '1px solid #bbb',
      padding: '8px 14px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      marginBottom: '10px',
      transition: 'background 0.2s',
    });
    toggleBtn.onmouseenter = () => (toggleBtn.style.background = '#f5f5f5');
    toggleBtn.onmouseleave = () => (toggleBtn.style.background = '#fff');

    let expanded = false;
    toggleBtn.addEventListener('click', () => {
      if (!expanded) {
        snippetContainer.style.display = 'block';
        toggleBtn.textContent = 'Hide snippet';
        expanded = true;
      } else {
        snippetContainer.style.display = 'none';
        toggleBtn.textContent = 'Show more';
        expanded = false;
      }
    });

    // buttons footer
    const buttons = document.createElement('div');
    Object.assign(buttons.style, {
      display: 'flex',
      justifyContent: 'center',
      gap: '12px',
      marginTop: '18px'
    });

    const continueBtn = document.createElement('button');
    continueBtn.textContent = 'Continue Anyway';
    Object.assign(continueBtn.style, {
      background: '#fff',
      border: '1px solid #666',
      color: '#111',
      fontWeight: '700',
      borderRadius: '8px',
      padding: '10px 18px',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    });
    continueBtn.onmouseenter = () => (continueBtn.style.background = '#f5f5f5');
    continueBtn.onmouseleave = () => (continueBtn.style.background = '#fff');

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close Tab';
    Object.assign(closeBtn.style, {
      background: '#b71c1c',
      border: 'none',
      color: '#fff',
      fontWeight: '800',
      borderRadius: '8px',
      padding: '10px 18px',
      cursor: 'pointer',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      transition: 'background 0.2s ease'
    });
    closeBtn.onmouseenter = () => (closeBtn.style.background = '#c62828');
    closeBtn.onmouseleave = () => (closeBtn.style.background = '#b71c1c');

    continueBtn.addEventListener('click', async () => {
      await sendMessage("ignoreThisTab");
      overlay.remove();
    });

    closeBtn.addEventListener('click', async () => {
      await sendMessage("closeTab");
      overlay.remove();
    });

    buttons.appendChild(continueBtn);
    buttons.appendChild(closeBtn);

    modal.append(icon, title, subtitle, warn, toggleBtn, snippetContainer, buttons);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
  }

  let tabIgnored = false;
  let alertShown = false; // Bandera adicional para prevenir duplicados

  async function analyzeInlineScripts() {
    if (tabIgnored || alertShown) return;
    
    const resp = await sendMessage("checkIgnored");
    if (resp?.ignored) {
      tabIgnored = true;
      return;
    }
    
    // Solo analizar scripts inline (incrustados en la página)
    const scripts = document.querySelectorAll("script:not([src])");
    
    let mostSuspicious = null;
    let maxMatches = 0;
    
    // Encontrar el script más sospechoso
    for (const s of scripts) {
      const code = s.textContent || "";
      
      // Ignorar scripts muy cortos
      if (code.length < 100) continue;
      
      // Contar patrones _0x
      const matches = code.match(/_0x[a-f0-9]{2,}/gi) || [];
      
      if (matches.length >= MIN_0X_MATCHES && matches.length > maxMatches) {
        maxMatches = matches.length;
        mostSuspicious = code;
      }
    }
    
    // Mostrar alerta solo si encontramos algo sospechoso
    if (mostSuspicious && maxMatches >= MIN_0X_MATCHES) {
      console.warn(`Magecart Detector: Found ${maxMatches} obfuscated patterns in inline script (worst case)`);
      alertShown = true;
      tabIgnored = true;
      showModal(mostSuspicious, maxMatches);
    }
  }

  // Verificar que el runtime existe antes de añadir el listener
  if (chrome.runtime && chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg.action === "recheck") {
        tabIgnored = false;
        alertShown = false;
        analyzeInlineScripts();
      }
    });
  }

  // Analizar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(analyzeInlineScripts, 200);
    });
  } else {
    setTimeout(analyzeInlineScripts, 200);
  }

  // Re-analizar si se agregan nuevos scripts dinámicamente
  const observer = new MutationObserver((mutations) => {
    if (tabIgnored || alertShown) return;
    
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeName === 'SCRIPT' && !node.src) {
          const code = node.textContent || "";
          if (code.length < 100) continue;
          
          const matches = code.match(/_0x[a-f0-9]{2,}/gi) || [];
          if (matches.length >= MIN_0X_MATCHES) {
            alertShown = true;
            tabIgnored = true;
            showModal(code, matches.length);
            observer.disconnect();
            return;
          }
        }
      }
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();