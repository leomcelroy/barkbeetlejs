import { dispatch } from "./src/dispatch.js";
import { init } from "./src/init.js";
import { state } from "./src/dispatch.js";
import { loadUrlParam } from "./src/loadUrlParam.js";
import { addToolpathDrag } from "./src/events/addToolpathDrag.js";
import { addPanZoom } from "./src/events/addPanZoom.js";


window.dispatch = dispatch;
dispatch("INIT", { state: init() });

addToolpathDrag(state, (fromIndex, toIndex) => {
  
  moveItem(state.toolpathOrder, fromIndex, toIndex);
  
  dispatch("RENDER");
});

const svgViewer = document.querySelector("#svg_viewer");
const panZoomMethods = addPanZoom(svgViewer);
svgViewer.panZoomMethods = panZoomMethods;

loadUrlParam("src").then(text => {
  if (!text) return;

  dispatch("UPLOAD_BBJS", { state: JSON.parse(text) });
});


const prevent = e => {
  console.log("preventing");
  e.preventDefault();
};

const root = document.getElementById("root");


function moveItem(arr, fromIndex, toIndex) {
  const [item] = arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, item);
}
