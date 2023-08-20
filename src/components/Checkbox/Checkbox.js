import React, { useState, useEffect, useRef } from "react";
import "./Chackbox.css";

function Checkbox() {
  const [isChecked, setIsChecked] = useState(false);
  const [isSelectedText, setSelectedText] = useState(false);
  const [isPdfHorizontal, setPdfHorizontal] = useState(false);
  const [isDoesNothing, setDoesNothing] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      chrome.storage.local.get("checkbox", (result) => {
        if (result.checkbox === "checked") {
          setIsChecked(true);
        }
      });
      chrome.storage.local.get("selectedText", (result) => {
        if (result.selectedText === "checked") {
          setSelectedText(true);
        }
      });
      chrome.storage.local.get("pdfHorizontal", (result) => {
        if (result.pdfHorizontal === "checked") {
          setPdfHorizontal(true);
        }
      });
      chrome.storage.local.get("doesNothing", (result) => {
        if (result.doesNothing === "checked") {
          setDoesNothing(true);
        }
      });
    }
    return () => {};
  }, []);

  const handleCheckboxForm = () => {
    setIsChecked(!isChecked);
    const newState = isChecked ? "unchecked" : "checked";
    chrome.storage.local.set({ checkbox: newState }, () => {
      console.log("set");
    });
  };

  const handleCheckboxSelectedText = () => {
    setSelectedText(!isSelectedText);
    const newState = isSelectedText ? "unchecked" : "checked";
    chrome.storage.local.set({ selectedText: newState }, () => {
      console.log("set");
    });
  };

  const handleCheckboxPdfHorizontal = () => {
    setPdfHorizontal(!isPdfHorizontal);
    const newState = isPdfHorizontal ? "unchecked" : "checked";
    chrome.storage.local.set({ pdfHorizontal: newState }, () => {
      console.log("set");
    });
  };

  const handleCheckboxDoesNothing = () => {
    setDoesNothing(!isDoesNothing);
    const newState = isDoesNothing ? "unchecked" : "checked";
    chrome.storage.local.set({ doesNothing: newState }, () => {
      console.log("set");
    });
  };

  return (
    <div>
      <hr></hr>
      <div className="checkbox-box">
        <label className="toggle">
          <input
            className="toggle-checkbox"
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxForm}
            name="switch1"
            id="switch1"
          />
          <div className="toggle-switch"></div>
          <span className="toggle-label">
            {chrome.i18n.getMessage("checkboxForm")}
          </span>
        </label>
      </div>
      <hr></hr>
      <div className="checkbox-box">
        <label className="toggle">
          <input
            className="toggle-checkbox"
            type="checkbox"
            checked={isSelectedText}
            onChange={handleCheckboxSelectedText}
            name="switch2"
            id="switch2"
          />
          <div className="toggle-switch"></div>
          <span className="toggle-label">
            {chrome.i18n.getMessage("checkboxSelectedText")}
          </span>
        </label>
      </div>
      <hr></hr>
      <div className="checkbox-box">
        <label className="toggle">
          <input
            className="toggle-checkbox"
            type="checkbox"
            checked={isPdfHorizontal}
            onChange={handleCheckboxPdfHorizontal}
            name="switch3"
            id="switch3"
          />
          <div className="toggle-switch"></div>
          <span className="toggle-label">
            {chrome.i18n.getMessage("checkboxPdfHorizontal")}
          </span>
        </label>
      </div>
      <hr></hr>
      <div className="checkbox-box checkbox-down">
        <label className="toggle">
          <input
            className="toggle-checkbox"
            type="checkbox"
            checked={isDoesNothing}
            onChange={handleCheckboxDoesNothing}
            name="switch4"
            id="switch4"
          />
          <div className="toggle-switch"></div>
          <span className="toggle-label">
            {chrome.i18n.getMessage("checkboxDoesNothing")}
          </span>
        </label>
      </div>
    </div>
  );
}

export default Checkbox;
