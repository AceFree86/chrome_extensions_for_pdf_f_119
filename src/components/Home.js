import Icon from "../icon.svg";
import CardSlider from "./CardSlider/CardSlider";
import Checkbox from "./Checkbox/Checkbox";
import "./MainStyle.css";

const loginAccount = async () => {
  const newUrl = chrome.i18n.getMessage("loginAccount");
  chrome.tabs.create({ url: newUrl });
};

const registerAccount = async () => {
  const newUrl = chrome.i18n.getMessage("registerAccount");
  chrome.tabs.create({ url: newUrl });
};

const tracking = async () => {
  const newUrl = chrome.i18n.getMessage("tracking");
  chrome.tabs.create({ url: newUrl });
};

const offices = async () => {
  const newUrl = "https://offices.ukrposhta.ua/";
  chrome.tabs.create({ url: newUrl });
};

const Home = () => {
  return (
    <div>
      <header className="App-header window-max">
        <img src={Icon} className="logo-max" alt="logo" />
        <div>
          <h4>{chrome.i18n.getMessage("extTitle")}</h4>
        </div>
      </header>
      <div className="container">
        <div>
          <div className="main-button">
            <button className="btn main" onClick={loginAccount}>
              {chrome.i18n.getMessage("btnExit")}
            </button>
            <button className="btn main" onClick={registerAccount}>
              {chrome.i18n.getMessage("btnRegistration")}
            </button>
          </div>
          <div className="main-button">
            <button className="btn main" onClick={tracking}>
              {chrome.i18n.getMessage("btnTrack")}
            </button>
            <button className="btn main" onClick={offices}>
              {chrome.i18n.getMessage("btnOffices")}
            </button>
          </div>
          <div className="checkbox-marg">
            <Checkbox />
          </div>
          <CardSlider />
        </div>
      </div>
    </div>
  );
};

export default Home;
