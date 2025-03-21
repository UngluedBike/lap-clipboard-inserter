import { ClipboardInserter, Request } from "./clipboardInserter";


export function contentScript() {
    let previousText = "";
    // let polling = true;
    // const clipboardInserter: ClipboardInserter = {
    //     previousText: "",
    //     //interval: undefined,
    // };
    // const checkClipboard = (clipboardInserter: ClipboardInserter) => {
    //     navigator.clipboard
    //         .readText()
    //         .then((clipText) => {
    //             if (
    //                 clipText !== "" &&
    //                 clipText !== clipboardInserter.previousText
    //             ) {
    //                 clipboardInserter.previousText = clipText;
    //                 const pasteTarget = document.createElement("p");
    //                 pasteTarget.textContent = clipText;
    //                 document.querySelector("body")?.appendChild(pasteTarget);
    //             }
    //         })
    //         .catch((error) =>
    //             console.error(`Failed to read clipboard: ${error}`)
    //         );
    // };
    // function clipBoardPollLoop() {
    //     if (!polling) return;
    //     console.log("Polling clipboard...");
    //     checkClipboard(clipboardInserter);
    //     setTimeout(clipBoardPollLoop, 300);
    // }
    // clipBoardPollLoop();
    // clipboardInserter.interval = setInterval(
    //     checkClipboard,
    //     300,
    //     clipboardInserter
    // );
    console.log('Adding listeners');
    chrome.runtime.onMessage.addListener(function handleMessage(
        request: Request
    ) {
        if (request === "eject") {
          console.log('Disabling');
            //clearInterval(clipboardInserter.interval);
            //clipboardInserter.interval = undefined;
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
