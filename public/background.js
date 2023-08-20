chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.url && changeInfo.url !== "") {
    if (
      changeInfo.url.includes(
        "ok.ukrposhta.ua/ua/lk/print/letterDomesticF119/"
      ) ||
      changeInfo.url.includes("ok.ukrposhta.ua/en/lk/print/letterDomesticF119/")
    ) {
      chrome.storage.local.get("doesNothing", (result) => {
        if (
          result.doesNothing === "unchecked" ||
          typeof result.doesNothing === "undefined"
        ) {
          storeDataInLocalStorage(changeInfo.url);
          storageOpenWindows();
        }
      });
    }
  }
});

async function storeDataInLocalStorage(url) {
  try {
    chrome.storage.local.set({ ukrposhta: url }).then(() => {
      openWindows();
    });
  } catch (error) {
    console.log("Error setting value:", error);
  }
}

async function storageOpenWindows() {
  try {
    chrome.storage.local.set({ win: "yes" }).then(() => {
      console.log("");
    });
  } catch (error) {
    console.log("Error setting value:", error);
  }
}

async function openWindows() {
  try {
    chrome.tabs.query({ active: true }, async (tabs) => {
      chrome.tabs.remove(tabs[0].id);
      chrome.windows.getCurrent(async (win) => {
        const width = 250;
        const height = 210;
        const left = win.width / 2 - width / 2 + win.left;
        const top = win.height / 2 - height / 2 + win.top;

        chrome.windows.create({
          width: width,
          height: height,
          type: "popup",
          url: "popup.html",
          top: Math.round(top),
          left: Math.round(left),
        });
      });
    });
  } catch (error) {
    console.log("No active tabs to close: ", error);
  }
}
