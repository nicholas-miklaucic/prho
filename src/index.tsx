import ReactDOM from "react-dom";
import { App } from "./App";
import { Menu } from "./Menu";
import { FocusStyleManager } from "@blueprintjs/core";
import renderFootnotes from "./footnotes";

FocusStyleManager.onlyShowFocusOnTabs();

const app = document.getElementById("app");
ReactDOM.render(<App showImg={false} />, app, () => renderFootnotes());

const menu = document.getElementById("menu");
ReactDOM.render(<Menu />, menu);
