import React, { useState, useEffect, useRef } from "react";
import modifyPdf from "../addTextToPDF";
import "./MainStyle.css";

const h4StyleUa = {
  marginLeft: "29px",
};

const h4StyleEn = {
  marginLeft: "49px",
};

const btnStyleUa = {
  marginLeft: "51px",
};

const btnStyleEn = {
  marginLeft: "65px",
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function countSetap() {
  chrome.storage.local.get(["timerStart"], (result) => {
    if (result.timerStart !== "yes") {
      return 1000;
    }
   return 0;
  });
}

const cleanupChromeStorage = async () => {
  await chrome.storage.local.remove(["ukrposhta"]);
};

async function getSelectetText() {
  const textarea = document.createElement("textarea");
  document.body.appendChild(textarea);
  textarea.focus();
  document.execCommand("paste");
  const clipboardData = textarea.value;
  document.body.removeChild(textarea);
  return clipboardData;
}

function Dialog() {
  const [count, setCount] = useState(2);
  const [text, setText] = useState("");
  const [url, setUrl] = useState(null);
  const initialized = useRef(false);
  const ref = useRef(null);

  useEffect(() => {
    chrome.storage.local.get(["timerStart"], (result) => {
      if (result.timerStart !== "yes") {
        const timer = setInterval(() => {
          if (count > 0) {
            setCount(count - 1);
          }
        }, 1000);
        return () => clearInterval(timer);
      } else {
        setCount(0);
        chrome.storage.local.remove(["timerStart"]);
      }
    });
    return () => {
      // Cleanup if needed
    };
  }, [count]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      chrome.storage.local.get(["ukrposhta"], (result) => {
        setUrl(result.ukrposhta);
        if (typeof result.ukrposhta !== "undefined") {
          ref.current.click();
          chrome.storage.local.remove(["timerStart"]);
        }
      });
    }
    return () => {};
  }, []);

  window.addEventListener("beforeunload", (event) => {
    if (typeof url !== "undefined") {
      cleanupChromeStorage();
    }
  });

  function setStyle() {
    if (chrome.i18n.getMessage("uaStyle") === "ua") {
      return h4StyleUa;
    } else {
      return h4StyleEn;
    }
  }

  function setStyleBtn() {
    if (chrome.i18n.getMessage("uaStyle") === "ua") {
      return btnStyleUa;
    } else {
      return btnStyleEn;
    }
  }

  async function btnClick() {
    try {
      console.log("btnClick started");
      await sleep(countSetap());

      if (typeof url !== "undefined") {
        const t = await getSelectetText();
        const selected = await chrome.storage.local.get(["selectedText"]);

        if (
          selected.selectedText === "unchecked" ||
          typeof selected.selectedText === "undefined"
        ) {
          await modifyPdf(t);
        } else {
          await modifyPdf(" ");
        }

        if (text !== "Error modifying PDF") {
          window.close();
        }
      }
    } catch (error) {
      setText("Error modifying PDF");
      cleanupChromeStorage();
    }
    console.log("btnClick completed");
  }

  return (
    <div>
      <header className="App-header window-min">
        <div>
          <h4 style={setStyle()}>{chrome.i18n.getMessage("extTitle")}</h4>
        </div>
      </header>
      <div className="container">
        <div>
          <div style={setStyleBtn()} className="main-print">
            <button
              id="button"
              ref={ref}
              className="btn print"
              onClick={btnClick}
            >
              {chrome.i18n.getMessage("btnDialog")}
            </button>
          </div>

          <div className="dialog-text-container">
            <div
              className={`dialog-text-info ${
                text !== "Error modifying PDF"
                  ? "dialog-text-info-color"
                  : "dialog-text-erro-color"
              }`}
            >
              {text !== "Error modifying PDF" ? (
                <p className="mt-1">
                  {chrome.i18n.getMessage("textDialog")}
                  {count}
                  {chrome.i18n.getMessage("text2Dialog")}
                </p>
              ) : (
                <p className="mt-1">
                  {chrome.i18n.getMessage("textErrorDialog")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dialog;
