import { render } from "../libs/lit-html.bundle.js";

import { view } from "./view.js";
import { suggest_bit, recalculate } from "./actions/millingCalculator.js";
import * as utils from "./utils.js";
import { pocket, pocketGcode } from "./toolpaths/pocket.js";
import { profile, profileGcode } from "./toolpaths/profile.js";
import { drill, drillGcode } from "./toolpaths/drill.js";
import { gcodeTransform } from "./gcodeTransform.js";
import { originPoint } from "./originPoint.js";

let state = {};
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
    case "DRAG_TARGET":
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
    case "DRAGGED":
      state.toolpath_drag.dragged = args.dragged;
      break;
    case "REORDER":
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
    case "RECALCULATE":
      recalculate(state, args);
      break;
    case "SAVE":
      utils.download(`${state.filename}.bbjs`, JSON.stringify(state));
      break;
    case "UPLOAD_BBJS":
      let contours = {};
      let idMap = {};

      Object.keys(args.state.contours).forEach(id => {
        let c = args.state.contours[id];
        let newID = utils.makeID();
        idMap[id] = newID;
        contours[newID] = c;
      });

      let toolpaths = args.state.toolpaths.map(path => {
        let newID = utils.makeID();
        idMap[path.id] = newID;
        path.id = newID;
        path.sourceGeometryID = idMap[path.sourceGeometryID];

        return path;
      });

      toolpaths.forEach(path => {
        console.log(path.group, idMap[path.group]);
        path.group = idMap[path.group];
      });

      state.contours = {
        ...state.contours,
        ...contours
      };

      state.toolpaths = [...state.toolpaths, ...toolpaths];

      state.filename = args.state.filename;

      // clear file input
      document.getElementById("contentFile").value = null;
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
      let leader = state.toolpaths[args.id].id;
      let newState = !state.toolpaths[args.id].selected;
      state.toolpaths.forEach(p => {
        if (p.group === leader) p.selected = newState;
      });
      break;
    case "SELECT_ALL_TOOLPATHS":
      const paths = state.toolpaths;
      const allSelected = paths.every(path => path.selected);

      state.toolpaths.forEach(path => {
        let k = path.id;
        path.selected = !allSelected;
      });

      // paths.forEach(path => {
      //   path.selected = !allSelected;
      // })

      // TODO: I may need to manually check the box here
      // document.getElementById(`checkbox:${k}`)

      break;
    case "DELETE_TOOLPATHS":
      state.toolpaths.forEach(path => {
        let k = path.id;
        if (path.selected) {
          state.toolpaths = state.toolpaths.filter(p => p.id !== k);
        }
      });

      break;
    case "DELETE_SELECTED":
      state.selected.forEach(id => {
        delete state.contours[id];

        state.toolpaths.forEach(v => {
          let k = v.id;

          if (v.sourceGeometryID === id) {
            state.toolpaths = state.toolpaths.filter(p => p.id !== k);

            // if this is a leader I need to change leadership to someone else in the group 
            // and give them my position? They should already be grouped by default
            if (v.id === v.group) {
              for (let i = 0; i < state.toolpaths.length; i++) {
                let x = state.toolpaths;
                if (v.id === x.group) x.id = v.id;
              }
            }
          }
        });
      });

      state.selected = [];
      break;
    case "DOWNLOAD_GCODE":
      let text = [];
      state.toolpaths.forEach(path => {
        if (path.selected) {
          let geometry = path.geometry;

          let offset = originPoint(state);
          geometry = gcodeTransform.offset(geometry, -offset.x, -offset.y);

          geometry = gcodeTransform.reflect(geometry, false, true);
          let scaleFactor = 1 / 3.77953;
          geometry = gcodeTransform.scale(geometry, scaleFactor, scaleFactor);

          let gcode;
          if (path.type === "profile")
            gcode = profileGcode(geometry, path.parameters);
          if (path.type === "pocket")
            gcode = pocketGcode(geometry, path.parameters);
          if (path.type === "drill") {
            gcode = drillGcode(geometry, path.parameters);
          }

          text.push(gcode);
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

      Object.entries(state.contours).forEach(([k, lines]) => {
        for (let i = 0; i < lines.length; i++) {
          let line = lines[i];
          let origin = { x: line.origin[0], y: line.origin[1] };
          let end = { x: line.end[0], y: line.end[1] };

          if (
            contains(origin, state.selectBox) ||
            contains(end, state.selectBox)
          ) {
            console.log("contained");
            dispatch("SELECT", { id: k }, false);
            break;
          }
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
          // create profile
          let groupLeaderID;
          state.selected.forEach((id, i) => {
            if (i === 0) groupLeaderID = utils.makeID();

            profile(state.contours[id], args.params)
              .then(p => {
                state.toolpaths.push({
                  type: "profile",
                  // name: args.params.name,
                  sourceGeometryID: id,
                  geometry: p,
                  selected: true,
                  parameters: { ...state.defaultParameters, ...args.params },
                  id: i === 0 ? groupLeaderID : utils.makeID(),
                  group: groupLeaderID
                });
              })
              .then(() => dispatch("UPDATE"));
            // state.toolpaths[utils.makeID()] = {
            //   type: "profile",
            //   // name: args.params.name,
            //   sourceGeometryID: id,
            //   geometry: profile(state.contours[id], args.params),
            //   selected: true,
            //   parameters: {...state.defaultParameters, ...args.params},
            // };
          });
        } else if (state.popUpType.createOrEdit === "edit") {
          // edit target profile toolpath
          let og = state.toolpaths[state.popUpType.edit];
          let leader = og.id;
          // let ogID =
          // let toChange = state.toolpaths.filter(x => x.group !== state.popUpType.edit);
          state.toolpaths.forEach((path, i) => {
            // let geo;
            // if (state.contours[path.sourceGeometryID] === undefined) {
            //   geo = [];
            // } else {
            //   geo = state.contours[path.sourceGeometryID];
            // };//geometry was deleted

            if (path.group === leader) {               

              profile(state.contours[path.sourceGeometryID], args.params)
                .then(p => {
                  state.toolpaths[i] = {
                    ...path,
                    geometry: p,
                    parameters: { ...path.parameters, ...args.params }
                  };
                })
                .then(() => dispatch("UPDATE"));
            }
          });
        }
      } else if (state.popUpType.type === "pocket") {
        if (state.popUpType.createOrEdit === "create") {
          // create pocket

          let groupLeaderID;
          state.selected.forEach((id, i) => {
            if (i === 0) groupLeaderID = utils.makeID();

            pocket(state.contours[id], args.params)
              .then(p => {
                state.toolpaths.push({
                  type: "pocket",
                  // name: args.params.name,
                  sourceGeometryID: id,
                  geometry: p,
                  selected: true,
                  parameters: { ...state.defaultParameters, ...args.params },
                  id: i === 0 ? groupLeaderID : utils.makeID(),
                  group: groupLeaderID
                });
              })
              .then(() => dispatch("UPDATE"));
          });
        } else if (state.popUpType.createOrEdit === "edit") {
          // edit target pocket toolpath
          let og = state.toolpaths[state.popUpType.edit];
          let leader = og.id;
          state.toolpaths.forEach((path, i) => {
            // let geo;
            // if (state.contours[path.sourceGeometryID] === undefined) {
            //   geo = [];
            // } else {
            //   geo = state.contours[path.sourceGeometryID];
            // };//geometry was deleted

            if (path.group === leader) {
              pocket(state.contours[path.sourceGeometryID], args.params)
              .then(p => {
                state.toolpaths[i] = {
                  ...path,
                  geometry: p,
                  parameters: { ...path.parameters, ...args.params }
                };
              })
              .then(() => dispatch("UPDATE"));
            }
          })


        }
      } else if (state.popUpType.type === "drill") {
        if (state.popUpType.createOrEdit === "create") {
          // create drill

          let groupLeaderID;
          state.selected.forEach((id, i) => {
            if (i === 0) groupLeaderID = utils.makeID();

            state.toolpaths.push({
              type: "drill",
              // name: args.params.name,
              sourceGeometryID: id,
              geometry: drill(state.contours[id], args.params),
              selected: true,
              parameters: { ...state.defaultParameters, ...args.params },
              id: i === 0 ? groupLeaderID : utils.makeID(),
              group: groupLeaderID
            });
          });
        } else if (state.popUpType.createOrEdit === "edit") {
          // edit target drill toolpath
          let og = state.toolpaths[state.popUpType.edit];
          let leader = og.id;
          state.toolpaths.forEach((path, i) => {
            // let geo;
            // if (state.contours[path.sourceGeometryID] === undefined) {
            //   geo = [];
            // } else {
            //   geo = state.contours[path.sourceGeometryID];
            // };//geometry was deleted

            if (path.group === leader) {
              state.toolpaths[i] = {
                ...path,
                geometry: drill(state.contours[path.sourceGeometryID], args.params),
                parameters: { ...og.parameters, ...args.params }
              };
            }
          })


        }
      }

      state.showPopUpMenu = false;
      state.selected = [];
      break;
    default:
      console.error("Unknown action requested or no break inserted:", action);
  }

  if (rerender) {
    // console.log("rerendering")
    const target = document.getElementById("root");
    render(view(state), target);

    state.toolpaths.forEach(path => {
      if (path.id !== path.group) return;

      let k = path.id;
      document.getElementById(`checkbox:${k}`).checked = path.selected;
    });
  }
};
