import { dispatch } from "./src/dispatch.js";
import { init } from "./src/init.js";

window.dispatch = dispatch;
dispatch("INIT", { state: init() });

const prevent = e => {
  console.log("preventing");
  e.preventDefault();
};

const root = document.getElementById("root");

root.addEventListener("touchmove", prevent, false);
root.addEventListener("wheel", prevent, false);
