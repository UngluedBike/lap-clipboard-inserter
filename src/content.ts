import { Request } from "./clipboardInserter";


export function contentScript() {
    let previousText = "";
    console.log('Adding listeners');
    chrome.runtime.onMessage.addListener(function handleMessage(
        request: Request
    ) {
        if (request === "eject") {
          console.log('Disabling');
            chrome.runtime.onMessage.removeListener(handleMessage);
            chrome.runtime.onMessage.removeListener(appendTextIfChanged);
        }
    });
    // Handle messages from offscreen.js
    chrome.runtime.onMessage.addListener(appendTextIfChanged);

    function appendTextIfChanged(message: { type: string; text: string; })
    {
      if (message.type === "clipboardContent") {
        const text = message.text;
        console.log("Clipboard content received:", text);

        const textIsTheSame = text !== "" &&
          text !== previousText;
          console.log('text is the same:' + textIsTheSame)
        // Now inject it into a page if needed
        if (
            textIsTheSame
        ) {
            console.log('text is' + text)
            previousText = text;
            const pasteTarget = document.createElement("p");
            pasteTarget.textContent = text;
            document.querySelector("body")?.appendChild(pasteTarget);
        }
    }
    }
}
