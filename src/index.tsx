import * as React from "react";
import * as ReactDOM from "react-dom";
import Main from "./components/Main";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

ReactDOM.render(<Main />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
