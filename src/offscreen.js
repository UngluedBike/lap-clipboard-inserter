const textEl = document.querySelector('#text');
async function readClipboardAndSend() {
    try {
      // if (navigator.clipboard == undefined) throw new Error("navigator is not defined");
      // const text = await navigator.clipboard.readText();
      textEl.focus();
      document.execCommand("paste");
      chrome.runtime.sendMessage({ type: 'clipboardContent', text: textEl.value });
      textEl.value = '';
    } catch (err) {
      console.log(err);
      console.error('Clipboard read failed:', err);
    }
  }
  
  // Poll every 5 seconds (or on demand)
  console.log('about to set the interval');
  // this.setTimeout(readClipboardAndSend, 300);
  this.setInterval(readClipboardAndSend, 300);
  