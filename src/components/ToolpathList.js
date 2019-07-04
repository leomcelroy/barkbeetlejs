import React from 'react';
import {Table, Checkbox, Button} from 'evergreen-ui';
import {AdvancedOptions} from './AdvancedOptions.js';
import * as utils from '../utils.js';
import store from '../store.js';

import {drillGcode} from '../toolpaths/drill.js';
import {pocketGcode} from '../toolpaths/pocket.js';
import {profileGcode} from '../toolpaths/profile.js';

import {transformations} from '../gcodeManipulations.js';


const ToolpathList = ({ state }) => {
  let toolpaths = state.toolpaths;

  return (
    <Table>
      <Table.Head>
        <Table.TextHeaderCell>name</Table.TextHeaderCell>
        <Table.TextHeaderCell>type</Table.TextHeaderCell>
        <Table.TextHeaderCell>modify</Table.TextHeaderCell>
        <Table.TextHeaderCell>reorder</Table.TextHeaderCell>
        <Table.TextHeaderCell>select/view</Table.TextHeaderCell>
      </Table.Head>
      <Table.Body height={240}>
        {toolpaths.map((path, i) => (
          <Table.Row
            key={path.id}
            onMouseDown={() => {

              // let toolpath = toolpaths[i];
              //
              // toolpath.cutSelected = !toolpath.cutSelected;
              //
              // store.update({ toolpaths })
            }}
            style={{background:(path.cutSelected) ? "lightblue" : "white"}}>
            <Table.TextCell>{path.name}</Table.TextCell>
            <Table.TextCell>{path.type}</Table.TextCell>
            <Table.TextCell>
              <AdvancedOptions
                params={path.parameters}
                name={path.name}
                setDefault={false}
                index={i}
                onMouseDown={(e) => e.stopPropagation()}/>
            </Table.TextCell>
            <Table.TextCell>^ v</Table.TextCell>
            <Table.TextCell>
              <Checkbox
                checked={path.visible}
                onMouseDown={(e) => e.stopPropagation()}
                onChange={e => {
                  // let toolpaths = toolpaths;
                  let toolpath = toolpaths[i];

                  toolpath.visible = e.target.checked;

                  store.update({ toolpaths })
                }}
              />
            </Table.TextCell>
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Row>
        <Table.TextCell><Button onClick={() => {
          let text = []
          toolpaths.forEach(path => {
            if (path.visible) { // if(path.cutSelected) {
              let geometry = path.geometry.geometry;

              let gcode;
              if (path.type === "drill") gcode = drillGcode(geometry, path.parameters);
              else {
                //now I can mutate geometry
                geometry = transformations.reflect(geometry, false, true);
                geometry = transformations.scale(geometry, 0.5, 0.5);

                if (path.type === "profile") gcode = profileGcode(geometry, path.parameters);
                if (path.type === "pocket") gcode = pocketGcode(geometry, path.parameters);
              }

              text.push(gcode);
            }
          })

          utils.download("toolpaths.gcode", text.join("\n"));
        }}>
          Export
        </Button></Table.TextCell>
        <Table.TextCell>
          <Button
            onClick={() => {
              //let toolpaths = store.state.toolpaths.filter(toolpath => !toolpath.cutSelected);
              let toolpaths = store.state.toolpaths.filter(toolpath => !toolpath.visible);


              // console.log(toolpaths);

              store.update({ toolpaths })
            }}>
              Delete
          </Button>
        </Table.TextCell>
        <Table.TextCell>
          <Button onClick={() => {
            toolpaths = store.getState().toolpaths; //TODO: fix this hack not sure why I have to do this here

            let allVisible = toolpaths.every(path => path.visible);

            toolpaths = toolpaths.map((path, i) => {
              path.visible = !allVisible;

              return path;
            })

            //console.log(store.getState())

            store.update({ toolpaths })
          }}>
            Select/View All
          </Button>
        </Table.TextCell>
      </Table.Row>
    </Table>
  )
}

export {ToolpathList}
//
// <Table.TextCell>
//   <Button onClick={() => {
//     toolpaths = store.getState().toolpaths; //TODO: fix this hack not sure why I have to do this here
//
//     let allSelected = toolpaths.every(path => path.cutSelected);
//
//     let toolpaths = toolpaths.map((path, i) => {
//       path.cutSelected = !allSelected;
//
//       return path;
//     })
//
//     //console.log(store.getState())
//
//     store.update({ toolpaths })
//   }}>
//     Select
//   </Button>
// </Table.TextCell>
