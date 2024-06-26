import { createListener } from "../createListener.js";
import { makePhantom } from "../makePhantom.js";

export function addToolpathDrag(state, callback) {
  const body = document.body;
  const listen = createListener(body);

  let fromIndex = null;
  let toIndex = null;

  listen("mousedown", "[toolpath-handle]", e => {
    const toolpath = e.target.closest("[toolpath]");
    if (!toolpath) return;

    fromIndex = Number(toolpath.dataset.toolpathIndex);

    makePhantom(e, toolpath);
  });

  listen("mousemove", "[toolpath], [toolpath] > *", e => {
    if (fromIndex === null) return;
    const toolpath = e.target.closest("[toolpath]");
    // const index = Number(toolpath.dataset.toolpathIndex);

    body.querySelectorAll(".hovered-toolpath").forEach(el => {
      el.classList.remove("hovered-toolpath");
    });

    toIndex = Number(toolpath.dataset.toolpathIndex);

    toolpath.classList.add("hovered-toolpath");
    
  });

  listen("mouseup", "", e => {

    body.querySelectorAll(".hovered-toolpath").forEach(el => {
      el.classList.remove("hovered-toolpath");
    });

    if (fromIndex === null || toIndex === null) {
      return;
    }

    if (toIndex < fromIndex) toIndex++;

    if (fromIndex !== toIndex) {
      callback(fromIndex, toIndex);
    }

    fromIndex = null;
    toIndex = null;

  });


}



/*
@dragstart=${(e) => {
  let id = e.target.id.split(":")[1];
  dispatch("DRAGGED", {dragged: id});
}}
@dragover=${e => {
  e.preventDefault();

  let row = e.target.parentElement;
  let id = row.id;
  if (id.includes("tablerow")) {
    // row.classList.add("hoveredRow");
    // should maybe add drag target state
    id = id.split(":")[1];
    dispatch("DRAG_TARGET", {target: id});
  }
}}
@dragend=${e => {
  dispatch("REORDER");
}}


case "DRAG_TARGET": // TODO
  if (
    document.getElementById(`tablerow:${state.toolpath_drag.target}`) !==
    null
  ) {
    document
      .getElementById(`tablerow:${state.toolpath_drag.target}`)
      .classList.remove("hoveredRow");
  }
  document
    .getElementById(`tablerow:${args.target}`)
    .classList.add("hoveredRow");

  state.toolpath_drag.target = args.target;

  rerender = false;
  break;
case "DRAGGED": // TODO
  state.toolpath_drag.dragged = args.dragged;
  break;
case "REORDER": // TODO
  let { target, dragged } = state.toolpath_drag;
  // console.log("move", dragged, "over", target);

  let draggedIndex, targetIndex;
  targetIndex = target === "LAST" ? state.toolpaths.length : undefined;
  state.toolpaths.forEach((toolpath, i) => {
    if (toolpath.id === dragged) draggedIndex = i;
    if (toolpath.id === target) targetIndex = i;
  });

  // console.log(draggedIndex, targetIndex);

  let draggedToolpathGroup = state.toolpaths.filter(p => p.group === dragged);
  let newToolpaths = state.toolpaths.filter(p => p.group !== dragged);
  let index = draggedIndex < targetIndex ? targetIndex - 1 : targetIndex;

  newToolpaths.splice(index, 0, ...draggedToolpathGroup);
  state.toolpaths = newToolpaths;

  document
    .getElementById(`tablerow:${state.toolpath_drag.target}`)
    .classList.remove("hoveredRow");

  state.toolpath_drag = {
    target: undefined,
    dragged: undefined
  };

  break;

*/

