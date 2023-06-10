document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("showText").addEventListener("click", function() {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        setTimeout(function() {
          chrome.tabs.sendMessage(tabs[0].id, { action: "showTextContent" });
        }, 1000); // Delay for 1 second
      });
    });
  });
  
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === "showTextContent") {
      chrome.scripting.executeScript({
        target: { tabId: sender.tab.id },
        func: function() {
          const text = document.documentElement.textContent;
          return text;
        }
      }).then(response => {
        sendResponse(response[0].result);
      }).catch(error => {
        sendResponse(null);
      });
      return true;
    }
  });
  