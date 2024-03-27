import { render } from "../libs/lit-html.bundle.js";

import { view } from "./view.js";
import { suggest_bit, recalculate } from "./actions/millingCalculator.js";
import * as utils from "./utils.js";
import { pocket, pocketGcode } from "./toolpaths/pocket.js";
import { profile, profileGcode } from "./toolpaths/profile.js";
import { drill, drillGcode } from "./toolpaths/drill.js";
import { gcodeTransform } from "./gcodeTransform.js";
import { originPoint } from "./originPoint.js";
import { convertToPls, convertPlsToContours } from "./convertToPls.js";
import { isPolylineInside } from "./isPolylineInside.js";
import tk from "./drawingToolkit/toolkit.js";
import { expand, difference, offset2, offset, union } from "./geogram/index.js";
// import { clipperOffsetContour } from "./clipper_offset.js";
import { plsInBoundingBox } from "./plsInBoundingBox.js";

const copy = obj => JSON.parse(JSON.stringify(obj));

export let state = {};
// let cache = new makeCache();
export const dispatch = (action, args = {}, rerender = true) => {
  // console.log(action);
  //and update
  action = action.split(" ");

  // if passed through message use that one
  // args = action.length > 1 ? deserialize(action.slice(1).join(" ")) : args;
  // can call like window.dispatch("ADDCONNECTION ${JSON.serialize({args})}") or window.dispatch("COMMAND", args)

  action = action[0];

  switch (action) {
    case "DRAG_START":
      state.toolpath_drag = { dragged: args.dragged };
      break;
    case "DRAG_OVER":
      state.toolpath_drag.target = args.target;
      break;
    case "DROP":
      const { dragged, target } = state.toolpath_drag;
      if (dragged !== target) {
        // Find the index of the dragged and target toolpaths
        const draggedIndex = state.toolpaths.findIndex(tp => tp.id === dragged);
        const targetIndex = state.toolpaths.findIndex(tp => tp.id === target);

        // Remove the dragged toolpath from its original position
        const [reorderedToolpath] = state.toolpaths.splice(draggedIndex, 1);

        // Insert the dragged toolpath at the target position
        state.toolpaths.splice(targetIndex, 0, reorderedToolpath);
      }
      state.toolpath_drag = {};
      break;
    case "INIT":
      console.log("Initializing Workspace");
      state = args.state;
      break;
    case "UPDATE":
      console.log("Updating");
      break;
    case "EDIT_DEFAULT_SETTINGS":
      state.showPopUpMenu = true;
      state.popUpType = {
        type: "default",
        default: true,
        createOrEdit: "edit",
        edit: ""
      };
      break;
    case "CLOSE_POP_UP_MENU":
      state.showPopUpMenu = false;
      break;
    case "EDIT_FILENAME":
      state.filename = args.filename === "" ? "untitled" : args.filename;
      break;
    case "SUGGEST_BIT":
      suggest_bit(state, args);
      break;
    case "DRAG_TARGET": // TODO
      // if (
      //   document.getElementById(`tablerow:${state.toolpath_drag.target}`) !==
      //   null
      // ) {
      //   document
      //     .getElementById(`tablerow:${state.toolpath_drag.target}`)
      //     .classList.remove("hoveredRow");
      // }
      // document
      //   .getElementById(`tablerow:${args.target}`)
      //   .classList.add("hoveredRow");

      // state.toolpath_drag.target = args.target;

      // rerender = false;
      break;
    case "DRAGGED": // TODO
      // state.toolpath_drag.dragged = args.dragged;
      break;
    case "REORDER": // TODO
      // let { target, dragged } = state.toolpath_drag;
      // // console.log("move", dragged, "over", target);

      // let draggedIndex, targetIndex;
      // targetIndex = target === "LAST" ? state.toolpaths.length : undefined;
      // state.toolpaths.forEach((toolpath, i) => {
      //   if (toolpath.id === dragged) draggedIndex = i;
      //   if (toolpath.id === target) targetIndex = i;
      // });

      // // console.log(draggedIndex, targetIndex);

      // let draggedToolpathGroup = state.toolpaths.filter(p => p.group === dragged);
      // let newToolpaths = state.toolpaths.filter(p => p.group !== dragged);
      // let index = draggedIndex < targetIndex ? targetIndex - 1 : targetIndex;

      // newToolpaths.splice(index, 0, ...draggedToolpathGroup);
      // state.toolpaths = newToolpaths;

      // document
      //   .getElementById(`tablerow:${state.toolpath_drag.target}`)
      //   .classList.remove("hoveredRow");

      // state.toolpath_drag = {
      //   target: undefined,
      //   dragged: undefined
      // };

      break;
    case "RECALCULATE":
      recalculate(state, args);
      break;
    case "SAVE":
      const filename = prompt("Please input a file name.");
      if (filename === null || filename === "") return;
      utils.download(`${filename}.bbjs`, JSON.stringify(state));
      break;
    case "UPLOAD_BBJS": // TODO
      const newState = args.state;

      state.contours = newState.contours
      state.toolpaths = newState.toolpaths;

      document.getElementById("recenter").click();
      break;
    case "UPLOAD_SVG":
      state.contours = {
        ...state.contours,
        ...args.contours
      };

      // clear file input
      document.getElementById("contentFile").value = null;
      document.getElementById("recenter").click();
      break;
    case "SELECT":
      if (!state.selected.includes(args.id)) state.selected.push(args.id);
      break;
    case "UNSELECT":
      state.selected = state.selected.filter(id => id !== args.id);
      break;
    case "CLEAR_SELECTED":
      state.selected = [];
      break;
    case "SELECT_TOOLPATH":
      const targetId = args.id;
      if (state.selectedToolpaths.has(targetId)) {
        state.selectedToolpaths.delete(targetId);
      } else {
        state.selectedToolpaths.add(targetId)
      }
      break;
    case "SELECT_ALL_TOOLPATHS":
      const allToolpathIds = Object.keys(state.toolpaths);
      const allSelected = allToolpathIds.length === state.selectedToolpaths.size;

      state.selectedToolpaths = new Set();
      if (!allSelected) {
        allToolpathIds.forEach(id => state.selectedToolpaths.add(id));
      }

      break;
    case "DELETE_TOOLPATHS":
      [...state.selectedToolpaths].forEach(toolpathId => {
        delete state.toolpaths[toolpathId];
      })

      state.selectedToolpaths = new Set();

      break;
    case "DELETE_SELECTED":
      state.selected.forEach(id => {
        delete state.contours[id];

        Object.entries(state.toolpaths).forEach(([ toolpathId, toolpath ]) => {
          if (!toolpath.sourceGeometryIds.includes(id)) return;

          delete state.toolpaths[toolpathId];
          state.selectedToolpaths.delete(toolpathId);
        })
      });

      state.selected = [];
      break;
    case "DOWNLOAD_GCODE":
      let text = [];
      Object.entries(state.toolpaths).forEach(([k, path]) => {
        if (state.selectedToolpaths.has(k)) {
          let geometry = copy(path.geometry);

          let offset = originPoint(state);
          tk.translate(geometry, [ -offset.x, offset.y ]);
          tk.scale(geometry, [ 1, -1 ]);

          let gcode = [];
          if (path.type === "profile") {
            geometry.forEach(x => {
              gcode.push(profileGcode(x, path.parameters));
            });
          }

          if (path.type === "pocket") {
            gcode.push(pocketGcode(geometry, path.parameters));
          }

          if (path.type === "drill") {
            geometry.forEach(pl => {
              const tempGcode = drillGcode(pl[0], path.parameters);
              gcode.push(tempGcode);
            });
          }

          text.push(...gcode);
        }
      });

      utils.download(`${state.filename}.gcode`, text.join("\n"));
      break;
    case "CHANGE_ORIGIN":
      state.origin = args.origin;
      break;
    case "START_BOX":
      state.selectBox.start = args.start;
      state.selectBox.end = args.start;
      break;
    case "END_BOX":
      state.selectBox.end = args.end;

      const selectBox = document.getElementById("selectBox");
      selectBox.setAttribute(
        "d",
        `
        M ${state.selectBox.start.x} ${state.selectBox.start.y} 
        L ${state.selectBox.end.x} ${state.selectBox.start.y} 
        L ${state.selectBox.end.x} ${state.selectBox.end.y}     
        L ${state.selectBox.start.x} ${state.selectBox.end.y}
        `
      );
      rerender = false;
      break;
    case "CLEAR_BOX":
      // select geo in box
      let contains = (p, selectBox) => {
        // console.log(p, selectBox);
        let { start, end } = selectBox;
        return (
          (p.x > start.x && p.x < end.x && p.y > start.y && p.y < end.y) ||
          (p.x > start.x && p.x < end.x && p.y < start.y && p.y > end.y) ||
          (p.x < start.x && p.x > end.x && p.y > start.y && p.y < end.y) ||
          (p.x < start.x && p.x > end.x && p.y < start.y && p.y > end.y)
        );
      };

      if (
        state.selectBox.start.x === state.selectBox.end.x ||
        state.selectBox.start.x === state.selectBox.end.x
      )
        break;

      Object.entries(state.contours).forEach(([id, pls]) => {
        if (plsInBoundingBox(state.selectBox, pls)) {
          dispatch("SELECT", { id }, false);
        }
      });

      state.selectBox = {
        start: { x: 0, y: 0 },
        end: { x: 0, y: 0 }
      };
      break;
    case "CREATE_PROFILE":
      state.showPopUpMenu = true;
      state.popUpType = {
        type: "profile",
        default: false,
        createOrEdit: "create",
        edit: ""
      };
      break;
    case "CREATE_POCKET":
      state.showPopUpMenu = true;
      state.popUpType = {
        type: "pocket",
        default: false,
        createOrEdit: "create",
        edit: ""
      };
      break;
    case "CREATE_DRILL":
      state.showPopUpMenu = true;
      state.popUpType = {
        type: "drill",
        default: false,
        createOrEdit: "create",
        edit: ""
      };
      break;
    case "EDIT_PROFILE":
      state.showPopUpMenu = true;
      state.popUpType = {
        type: "profile",
        default: false,
        createOrEdit: "edit",
        edit: args.id
      };
      break;
    case "EDIT_POCKET":
      state.showPopUpMenu = true;
      state.popUpType = {
        type: "pocket",
        default: false,
        createOrEdit: "edit",
        edit: args.id
      };
      break;
    case "EDIT_DRILL":
      state.showPopUpMenu = true;
      state.popUpType = {
        type: "drill",
        default: false,
        createOrEdit: "edit",
        edit: args.id
      };
      break;
    case "SAVE_PARAMETERS":
      // console.log(args)
      if (state.popUpType.type === "default") {
        state.defaultParameters = {
          ...state.defaultParameters,
          ...args.params
        };

        document.getElementById("bitDiameter").value =
          state.defaultParameters.toolDiameter;
      } else if (state.popUpType.type === "profile") {
        if (state.popUpType.createOrEdit === "create") {

          const toolpathId = utils.makeID();
          state.toolpaths[toolpathId] = makeProfile(state, args.params);
          state.selectedToolpaths.add(toolpathId);
          dispatch("UPDATE");

        } else if (state.popUpType.createOrEdit === "edit") {

          const toolpathId = state.popUpType.edit;
          const ogIds = copy(state.selected);
          const targetIds = state.toolpaths[toolpathId].sourceGeometryIds;
          state.selected = targetIds;
          state.toolpaths[toolpathId] = makeProfile(state, args.params);
          state.selected = ogIds;
          state.selectedToolpaths.add(toolpathId);
          dispatch("UPDATE");
        }
      } else if (state.popUpType.type === "pocket") {
        if (state.popUpType.createOrEdit === "create") {

          const toolpathId = utils.makeID();
          state.toolpaths[toolpathId] = makePocket(state, args.params);
          state.selectedToolpaths.add(toolpathId);
          dispatch("UPDATE");

        } else if (state.popUpType.createOrEdit === "edit") {
          
          const toolpathId = state.popUpType.edit;
          const ogIds = copy(state.selected);
          const targetIds = state.toolpaths[toolpathId].sourceGeometryIds;
          state.selected = targetIds;
          state.toolpaths[toolpathId] = makePocket(state, args.params);
          state.selected = ogIds;
          state.selectedToolpaths.add(toolpathId);
          dispatch("UPDATE");

        }
      } else if (state.popUpType.type === "drill") {
        if (state.popUpType.createOrEdit === "create") {

          const toolpathId = utils.makeID();
          state.toolpaths[toolpathId] = {
            type: "drill",
            sourceGeometryIds: copy(state.selected),
            geometry: state.selected.map(geoId => {
              const pls = state.contours[geoId];
              const cc = tk.bounds(pls).cc;

              return [ cc ]
            }),
            parameters: { ...state.defaultParameters, ...args.params },
          };
          state.selectedToolpaths.add(toolpathId);
          
        } else if (state.popUpType.createOrEdit === "edit") {

          const toolpathId = state.popUpType.edit;
          const targetIds = state.toolpaths[toolpathId].sourceGeometryIds;
          state.toolpaths[toolpathId] = {
            type: "drill",
            sourceGeometryIds: targetIds,
            geometry: targetIds.map(geoId => {
              const pls = state.contours[geoId];
              const cc = tk.bounds(pls).cc;

              return [ cc ]
            }),
            parameters: { ...state.defaultParameters, ...args.params },
          };
          state.selectedToolpaths.add(toolpathId);
          
        }
      }

      state.showPopUpMenu = false;
      state.selected = [];
      break;
    default:
      console.error("Unknown action requested or no break inserted:", action);
  }

  if (rerender) {
    const target = document.getElementById("root");
    render(view(state), target);
  }
};


function makeProfile(state, params) {
  const geometryToOffset = state.selected.map(id => state.contours[id][0]);

  const insidePls = [];

  for (const insideId of state.selected) {

    const geoToCheckAgainst = state.selected
      .filter(id => id !== insideId)
      .map(id => state.contours[id][0])
      ;

    
    const pls = state.contours[insideId];

    const isInside = isPolylineInside(pls, geoToCheckAgainst);

    if (isInside) {
      insidePls.push(insideId);
    }

  }

  const offsetDir = {
    "outside": (id) => {
      return insidePls.includes(id) ? -1 : 1;
    },
    "inside": (id) => {
      return insidePls.includes(id) ? 1 : -1;
    },
    "none": () => 0
  }[params.offsetDirection];

  const offsetGeo = [];
  geometryToOffset.forEach((pl, i) => {
    const id = state.selected[i];
    offsetGeo.push(...offset(
      [ pl ],
      offsetDir(id)*params.compensatedRadius, // sign of this is inside or outside
      { 
        arcTolerance: 0.01,
        endType: "etClosedPolygon" 
      }
    ));
  });

  const toolpathId = utils.makeID();

  return {
    type: "profile",
    sourceGeometryIds: copy(state.selected),
    geometry: offsetGeo,
    parameters: { ...state.defaultParameters, ...params },
  };
}

function makePocket(state, params) {
  const geometryToOffset = state.selected.map(id => state.contours[id][0]);

  const firstPass = copy(offset(
    geometryToOffset,
    -params.compensatedRadius, 
    { 
      arcTolerance: 0.01,
      endType: "etClosedPolygon" 
    }
  ));


  const offsetGeo = [...firstPass];
  let currentPass = firstPass;
  while (currentPass.length > 0) {
    currentPass = copy(offset(
      geometryToOffset,
      -params.compensatedRadius * params.stepoverPercentage/100, 
      { 
        arcTolerance: 0.01,
        endType: "etClosedPolygon" 
      }
    ));
    offsetGeo.push(...currentPass);
  }

  const toolpathId = utils.makeID();

  return {
    type: "pocket",
    sourceGeometryIds: copy(state.selected),
    geometry: offsetGeo,
    parameters: { ...state.defaultParameters, ...params },
  };
}
