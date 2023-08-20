import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import Home from "./components/Home";
import Dialog from "./components/Dialog";

const App = () => {
  const initialized = useRef(false);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      chrome.storage.local.get(["win"], (result) => {
        if (typeof result.win !== "undefined") {
          setShowDialog(true);
          chrome.storage.local.remove(["win"]);
        } else {
          setShowDialog(false);
        }
      });
    }
    return () => {};
  }, []);

  return (
    <>
      <title>{chrome.i18n.getMessage("extName")}</title>
      <div className="App">{showDialog ? <Dialog /> : <Home />}</div>
    </>
  );
};

export default App;
