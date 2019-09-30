import React, { useState } from 'react';
import {Button, Heading, Pane, Paragraph} from 'evergreen-ui';
import './App.css';

import {MillingCalculator} from './components/MillingCalculator.js';

import simplify from 'simplify-js';

import * as utils from './utils.js';

import {uploadSVG, uploadBBJS} from './uploadSVG.js';
import {calculateSettings} from './jensSettings.js';

import {Workplane} from './components/Workplane.js'
import {MaterialType} from './components/MaterialType.js';
import {MaterialThickness} from './components/MaterialThickness.js';
import {Origin} from './components/Origin.js';
import {Units} from './components/Units.js';
import {PocketButton} from './components/PocketButton.js';
import {ProfileButton} from './components/ProfileButton.js';
import {DrillButton} from './components/DrillButton.js';
import {AdvancedOptions} from './components/AdvancedOptions.js';
import {ToolpathList} from './components/ToolpathList.js';

import {renderLine, connectPoints} from './unmakerjs/primitives.js';

import store from "./store.js"; //this is my global state library, this is the only file that will getState() it will pass that to all sub components or should i import store in respective components

const TOLERANCE = .1;
const HQ = false;

const linesToPolylinePoints = (lines, lastIndex) => lines.map((line, i) => {
  if (i === lastIndex-1) return [{x:line.origin[0], y:line.origin[1]}, {x:line.end[0], y:line.end[1]}];

  return {x:line.origin[0], y:line.origin[1]}
}).flat()

const simplifyLines = (lines) => connectPoints(simplify(linesToPolylinePoints(lines, lines.length), TOLERANCE, HQ).map(el => [el.x, el.y]));

const simplifyToolpath = (toolpath) => toolpath.map(lines => {
  if (!Array.isArray(lines[0])) return simplifyLines(lines, lines.length);

  return lines.map(lines2 => simplifyLines(lines2, lines2.length)).flat();
}).flat()

const groupHover = (id, enter, state, setState) => {
  id = id.split('_');
  let toolpath = (id[1] === "toolpath")
  id = id[0];

  let currentGroupHovered = state.groupHovered;
  currentGroupHovered.push(id);


  if (id && !toolpath && enter) {
    setState({...state, groupHovered: currentGroupHovered});
  } else {
    setState({...state, groupHovered: []});
  }

}

const getCursorPoint = (evt) => {
  let svg = document.getElementById("tempSVGID");
  let pt = svg.createSVGPoint();  // Created once for document

  pt.x = evt.clientX;
  pt.y = evt.clientY;

  // The cursor point, translated into svg coordinates
  let cursorpt =  pt.matrixTransform(svg.getScreenCTM().inverse());
  return [cursorpt.x, cursorpt.y];
}

const insideSelectionBox = () => {};

const select = (id) => {
  id = id.split('_');
  let toolpath = (id[1] === "toolpath")

  id = id[0];

  let selected = store.state.selected;

  if (id && !toolpath) {
    if (!store.state.selected.includes(id)) {
      store.update(s => s.selected.push(id));
    } else {
      let filtered = selected.filter(value => value !== id);
      store.update({selected: filtered});
    }
  } else {
    store.update({selected: []}); //this is a bit hackish
  }

}

const App = () => {

  const [state, setState] = useState({
    // thicknessSubmit : false,
    // materialSubmit: false,
    // originSubmit: false,
    groupHovered: [],
    mouseDown: false,
    downPoint: undefined,
    drag: false,
    selectionBoxWidth: undefined,
    selectionBoxHeight: undefined,
    selectionBoxOrigin: [0,0],
  });

  const firstSubmit = (name) => {
    let old = state;
    old[name] = true;

    setState({...state, old});
  }

  // const initialized = () => {
  //   if (!state.initialized && (state.thicknessSubmit && state.materialSubmit && state.originSubmit)) {
  //     setState({...state, initialized:true});
  //   }
  // }

  // const hover = (id) => {
  //   id = id.split('_');
  //   let toolpath = (id[1] === "toolpath")
  //
  //   id = id[0];
  //
  //   if (id && !toolpath) {
  //     store.update({ hovered: [id] });
  //   } else {
  //     store.update({ hovered: [] }); //this is a bit hackish
  //   }
  //
  // }

  //should I put everying in a list or all to one model, there seem to be some issues with origins if I mjs.exporter.toSVG() seperately
  // if (!state.initialized) {
  //   initialized();
  // };

  //let set = calculateSettings("aluminum_roughing", 3, 1, 18000);
  //console.log("settings", set);

  let viewModel = Object.entries(store.state.contours).map(([id, lines]) => (
    <g
      onMouseEnter={(e) => groupHover(e.target.parentNode.id, true, state, setState)}
      onMouseLeave={(e) => groupHover(e.target.parentNode.id, false, state, setState)}
      key={`${id}`}
      id={`${id}_contour`}>
      {simplifyLines(lines, lines.length).map((line, i) => renderLine(
        line,
        `${id}_index${i}`,
        {
          selected: store.state.selected.includes(id),
          highlighted: state.groupHovered.includes(id)
        }))}
     </g>
  ));

  let toolpathView = store.state.toolpaths.map(toolpath => (
    <g
      key={`${toolpath.id}`}
      id={`${toolpath.id}_toolpath`}>
      {toolpath.visible && simplifyToolpath(toolpath.geometry.drawing).map((line, i) => renderLine(line,
        `${toolpath.id}_index${i}`,
        {
         toolpath: true
        }))}
    </g>
  ));

  let origin = <circle cx="0" cy="0" r="2" stroke="orange" strokeWidth="1" fill="orange" opacity=".8" key="origin"/>

  viewModel = [...viewModel, ...toolpathView, origin]
  // let viewModel = [];

  return (
    <div
      className="wrapper"
      >


      <div>
        <div
          onMouseDown={(e) => {
            let point = getCursorPoint(e);

            setState({
              ...state,
              mouseDown: true,
              downPoint: point,
            })

          }}
          onMouseMove={(e) => {

            if (state.mouseDown) {
              let [downPointX, downPointY] = state.downPoint;
              let [cursorPointX, cursorPointY] = getCursorPoint(e);

              let selectionBoxWidth =  Math.abs(downPointX - cursorPointX);
              let selectionBoxHeight = Math.abs(downPointY - cursorPointY);
              let selectionBoxOrigin = [0,0];

              if (downPointX < cursorPointX && downPointY < cursorPointY) {
                selectionBoxOrigin = state.downPoint;
              }

              else if (downPointX < cursorPointX && downPointY > cursorPointY) {
                selectionBoxOrigin = [downPointX, downPointY - selectionBoxHeight];
              }

              else if (downPointX > cursorPointX && downPointY < cursorPointY) {
                selectionBoxOrigin = [downPointX - selectionBoxWidth, downPointY];
              }

              else if (downPointX > cursorPointX && downPointY > cursorPointY) {
                selectionBoxOrigin = [downPointX - selectionBoxWidth, downPointY - selectionBoxHeight];
              }

              setState({
                ...state,
                drag: true,
                selectionBoxWidth,
                selectionBoxHeight,
                selectionBoxOrigin,
              })
            }
          }}
          onMouseUp={(e) => {
            if(!state.drag) {
              select(e.target.parentNode.id);
            } else {
              let newlySelected = [];
              Object.entries(store.state.contours).forEach(([key, contour]) => {
                // if selection box contains a point of contour then I should add contour id to selected list

                let points = contour.map((line, i) => {
                  let lastIndex = contour.length;

                  if (i === lastIndex-1) return [line.origin, line.end];

                  return [line.origin]
                }).flat()

                let contains = points.some(point => {
                  let [x, y] = point;

                  let selectionBoxOrigin = state.selectionBoxOrigin;
                  let selectionBoxX =  state.selectionBoxWidth + selectionBoxOrigin[0];
                  let selectionBoxY = state.selectionBoxHeight + selectionBoxOrigin[1];

                  if (selectionBoxOrigin[0] < x && x < selectionBoxX && selectionBoxOrigin[1] < y && y < selectionBoxY) {
                    return true
                  } else {
                    return false
                  }
                })

                if (contains && !store.state.selected.includes(key)) {
                  newlySelected.push(key);
                }

              })

              store.update({selected: [...store.state.selected, ...newlySelected]})

            }

            setState({
              ...state,
              mouseDown: false,
              drag: false,
            })
          }}
          className="mainEvent">
          {state.drag ?
            <Workplane
              groups={[
                ...viewModel,
                <rect
                  key="selectionBox"
                  x={`${state.selectionBoxOrigin[0]}`}
                  y={`${state.selectionBoxOrigin[1]}`}
                  width={`${state.selectionBoxWidth}`}
                  height={`${state.selectionBoxHeight}`}
                  style={{fill:"blue", opacity:.1}}
                />
              ]}
            />
          :
            <Workplane
              groups={[
                ...viewModel
              ]}
            />
          }
          <svg width={0} height={0} id={"thisIsDumb"}></svg>
        </div>

        <div>
          <input
            id="myInput"
            type="file"
            style={{display:"none"}}
            onChange={(e) => {
              let files = e.target.files;
              let file = files[0];

              let filetype = file.name.split('.')[1];

              if (filetype === "bbjs") return uploadBBJS(e);
              if (filetype === "svg") return uploadSVG(e)
            }}/>
          <Button
            marginRight={4}
            onClick={() => document.getElementById("myInput").click()}>
              upload (SVG or BBJS)
          </Button>
          <Button
            onClick={() => {
              utils.download("save.bbjs", JSON.stringify(store.state));
              }}>
            save
          </Button>
          <br/>
          Number Selected: {store.state.selected.length}
          &nbsp;
          <Button
            onClick={() => {
              let contours = Object.entries(store.state.contours);
              contours = contours.filter(([id, contour]) => !store.state.selected.includes(id))

              let toolpaths = store.state.toolpaths.filter(toolpath => !store.state.selected.includes(toolpath.sourceGeometryID));

              let newContours = {};

              contours.forEach(contour => {
                newContours[contour[0]] = contour[1];
              })

              contours = newContours;

              store.update({
                contours,
                toolpaths,
                selected: []
              })

            }}>
            Delete
          </Button>
        </div>
      </div>

      <div className="sidebar">
        <div>
          <MillingCalculator/>

          <br/>
          <div>Origin: Top Left</div>
          <br/>

          {(!store.state.initialized) ? <Paragraph marginTop={4}>enable calculator before editting options</Paragraph> : ""}
          <Pane> <AdvancedOptions disabled={!store.state.initialized} setDefault={true} params={store.getState().defaultParameters}/></Pane>
        </div>

        <div>
          <Heading marginTop={8}>Create Toolpaths</Heading>
          {(!store.state.initialized) ? <Paragraph marginTop={4}>enable calculator before creating toolpaths</Paragraph> : ""}
          <div className="toolpaths">
            <Pane marginLeft={8} marginTop={4}><ProfileButton disabled={!store.state.initialized}/></Pane>
            <Pane marginLeft={8} marginTop={4}><PocketButton disabled={!store.state.initialized}/></Pane>
            <Pane marginLeft={8} marginTop={4}><DrillButton disabled={!store.state.initialized}/></Pane>
          </div>
        </div>

        <div>
          <Heading marginTop={8}>Toolpaths</Heading>
          <ToolpathList marginTop={4} state={store.getState()}/>
        </div>
      </div>
    </div>
  );
}

export default App;
