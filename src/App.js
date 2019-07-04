import React, { useState } from 'react';
import {Button, Heading, Pane, Paragraph} from 'evergreen-ui';
import './App.css';

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

const TOLERANCE = 1;
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

const App = () => {

  const [state, setState] = useState({
    thicknessSubmit : false,
    materialSubmit: false,
    originSubmit: false,
    initialized: true, //will be false
    groupHovered: [],
  });

  const firstSubmit = (name) => {
    let old = state;
    old[name] = true;

    setState({...state, old});
  }

  const initialized = () => {
    if (!state.initialized && (state.thicknessSubmit && state.materialSubmit && state.originSubmit)) {
      setState({...state, initialized:true});
    }
  }

  const groupHover = (id, enter) => {
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

  const select = (id) => {
    id = id.split('_');
    let toolpath = (id[1] === "toolpath")

    id = id[0];

    if (id && !store.state.selected.includes(id) && !toolpath) {
      store.update(s => s.selected.push(id));;
    } else {
      store.update({selected: []}); //this is a bit hackish
    }

  }



  //should I put everying in a list or all to one model, there seem to be some issues with origins if I mjs.exporter.toSVG() seperately
  if (!state.initialized) {
    initialized();
  };

  let set = calculateSettings("aluminum_roughing", 3, 1, 60000);
  console.log("settings", set);

  let viewModel = Object.entries(store.state.contours).map(([id, lines]) => (
    <g
      onMouseEnter={(e) => groupHover(e.target.parentNode.id, true)}
      onMouseLeave={(e) => groupHover(e.target.parentNode.id, false)}
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

  return (
    <div
      className="wrapper"
      >


      <div>
        <div
          onMouseDown={(e) => select(e.target.parentNode.id)}
          className="mainEvent">
          <Workplane groups={viewModel}/>
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
          <Heading>Settings</Heading>
          <Pane marginTop={4}> <MaterialType firstSubmit={firstSubmit}/></Pane>
          <Pane marginTop={4}> <MaterialThickness firstSubmit={firstSubmit}/></Pane>
          <Pane marginTop={4}> <Units/></Pane>
          <Pane marginTop={4}> <Origin firstSubmit={firstSubmit}/></Pane>
          {(!state.initialized) ? <Paragraph marginTop={4}>select settings before editting options</Paragraph> : ""}
          <Pane> <AdvancedOptions disabled={!state.initialized} setDefault={true} params={store.getState().defaultParameters}/></Pane>
        </div>

        <div>
          <Heading marginTop={8}>Create Toolpaths</Heading>
          {(!state.initialized) ? <Paragraph marginTop={4}>select settings before creating toolpaths</Paragraph> : ""}
          <div className="toolpaths">
            <Pane marginLeft={8} marginTop={4}><ProfileButton disabled={!state.initialized}/></Pane>
            <Pane marginLeft={8} marginTop={4}><PocketButton disabled={!state.initialized}/></Pane>
            <Pane marginLeft={8} marginTop={4}><DrillButton disabled={!state.initialized}/></Pane>
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
