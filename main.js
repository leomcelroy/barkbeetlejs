import { dispatch } from "./src/dispatch.js";
import { init } from "./src/init.js";
import { state } from "./src/dispatch.js";

import { addToolpathDrag } from "./src/events/addToolpathDrag.js";

addToolpathDrag(state);

window.dispatch = dispatch;
dispatch("INIT", { state: init() });

const prevent = e => {
  console.log("preventing");
  e.preventDefault();
};

const root = document.getElementById("root");

root.addEventListener("touchmove", prevent, false);
root.addEventListener("wheel", prevent, false);
