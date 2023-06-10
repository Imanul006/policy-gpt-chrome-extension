chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const text = document.documentElement.textContent;
        alert(text);
      }
    });
  });
  