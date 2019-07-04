import React, { useState } from 'react';
import {Button, Dialog, TextInputField, SegmentedControl, Heading} from 'evergreen-ui';
import * as utils from '../utils.js';
import {pocket} from '../toolpaths/pocket.js';

import store from '../store.js';

const PocketButton = ({ disabled }) => {

  const [state, setState] = useState({
    isShown: false,
    nameValid: true,
    cutDepthValid: true,
    toolDiameterValid: true,
    stepoverPercentageValid: true,
    toleranceValid: true,
    jogHeightValid: true,
    jogRateValid: true,
    feedRateValid: true,
    dogboneTemp: store.getState().defaultParameters.dogbone,
  });

  if ((state.dogboneTemp !== store.getState().defaultParameters.dogbone) && !state.isShown) {
    console.log("bug fixin time")
    setState({
      ...state,
      dogboneTemp: store.getState().defaultParameters.dogbone,
    })
  }

  return (
      <div>
        <Dialog
          isShown={state.isShown}
          title="Settings for this Pocket Cut"
          onCloseComplete={() => setState({
            ...state,
            isShown:false,
            showAdvanced: false,
            dogboneTemp: store.getState().defaultParameters.dogbone,
          })}
          onConfirm={() => {

            let valid = state.nameValid &&
                        state.cutDepthValid &&
                        state.toolDiameterValid &&
                        state.stepoverPercentageValid &&
                        state.toleranceValid &&
                        state.jogHeightValid &&
                        state.jogRateValid &&
                        state.feedRateValid;
            if (valid) {

              let name = utils.helpExtract("name");
              let cutDepth = Number(utils.helpExtract("cutDepth"));
              let toolDiameter = Number(utils.helpExtract("toolDiameter"));
              let stepoverPercentage = Number(utils.helpExtract("stepoverPercentage")); //must be between 1 and 100%
              let tolerance = Number(utils.helpExtract("tolerance"));
              let jogHeight = Number(utils.helpExtract("jogHeight"));
              let jogRate = Number(utils.helpExtract("jogRate"));
              let feedRate = Number(utils.helpExtract("feedRate"));

              if (utils.helpExtract("name") === "") name = store.getState().defaultParameters.name;
              if (utils.helpExtract("cutDepth") === "") cutDepth = store.getState().defaultParameters.cutDepth;
              if (utils.helpExtract("toolDiameter") === "") toolDiameter = store.getState().defaultParameters.toolDiameter;
              if (utils.helpExtract("stepoverPercentage") === "") stepoverPercentage = store.getState().defaultParameters.stepoverPercentage; //must be between 1 and 100%
              if (utils.helpExtract("tolerance") === "") tolerance = store.getState().defaultParameters.tolerance;
              if (utils.helpExtract("jogHeight") === "") jogHeight = store.getState().defaultParameters.jogHeight;
              if (utils.helpExtract("jogRate") === "") jogRate = store.getState().defaultParameters.jogRate;
              if (utils.helpExtract("feedRate") === "") feedRate = store.getState().defaultParameters.feedRate;

              if (isNaN(cutDepth)) cutDepth = store.getState().defaultParameters.cutDepth;
              if (isNaN(toolDiameter)) toolDiameter = store.getState().defaultParameters.toolDiameter;
              if (isNaN(stepoverPercentage)) stepoverPercentage = store.getState().defaultParameters.stepoverPercentage; //must be between 1 and 100%
              if (isNaN(tolerance)) tolerance = store.getState().defaultParameters.tolerance;
              if (isNaN(jogHeight)) jogHeight = store.getState().defaultParameters.jogHeight;
              if (isNaN(jogRate)) jogRate = store.getState().defaultParameters.jogRate;
              if (isNaN(feedRate)) feedRate = store.getState().defaultParameters.feedRate;

              let dogbone = state.dogboneTemp;

              //derived parameters
              let passDepth = toolDiameter/2;
              let toolRadius = toolDiameter/2;
              let compensatedRadius = toolRadius + tolerance;
              let tempFloor = Math.ceil(cutDepth/passDepth); //should this be ceiling or floor, I think ceil
              let actualPassDepth = cutDepth/tempFloor;
              let depthOfPasses = utils.makeSeries(actualPassDepth, actualPassDepth, tempFloor).map(n => -n);

              //settings will be compiled to a single object here
              let parameters = utils.deepcopy(store.getState().defaultParameters);

              parameters["dogbone"] = dogbone;

              if (!isNaN(tolerance)) { parameters["tolerance"] = tolerance; }

              if (!isNaN(toolDiameter)) {
                parameters["toolDiameter"] = toolDiameter;
                parameters["compensatedRadius"] = compensatedRadius;

              }
              if (!isNaN(cutDepth)) {
                parameters["cutDepth"] = cutDepth;
                parameters["depthOfPasses"] = depthOfPasses;
              }
              if (!isNaN(feedRate)) { parameters["feedRate"] = feedRate; }
              if (!isNaN(jogHeight)) { parameters["jogHeight"] = jogHeight; }
              if (!isNaN(jogRate)) { parameters["jogRate"] = jogRate; }

              if (!isNaN(stepoverPercentage)) {
                //stepoverPercentage = stepoverPercentage/100;
                parameters["stepoverPercentage"] = stepoverPercentage;
              }

              //console.log("parameters", parameters);

              setState({
                ...state,
                isShown:false,
              });

              //TODO: create toolpath with parameter settings here
              let oldToolpaths = store.state.toolpaths;
              let newPockets = store.state.selected.map(path => {

                return {
                  type: "pocket",
                  name: name,
                  parameters: parameters,
                  sourceGeometryID: path,
                  geometry: pocket(store.state.contours[path], parameters),
                  id: utils.makeID(),
                  cutSelected: false,
                  visible: true,
                }
              })

              let newToolpaths = [...oldToolpaths, ...newPockets];

              console.log("newToolpaths", newToolpaths);

              store.update({toolpaths:newToolpaths});

            }
          }}>

          <TextInputField
            onChange={e => {
              let valid = utils.isNum(e.target.value);
              setState({...state, cutDepthValid:valid})
            }}
            isInvalid={!state.cutDepthValid}
            name="cutDepth"
            description={(state.cutDepthValid) ? "" : "please enter a valid number"}
            label="Depth of Cut for this Pocket"
            placeholder={String(store.getState().defaultParameters.cutDepth)}/>

          <TextInputField
            marginTop={20}
            onChange={e => {
              let valid = utils.isNum(e.target.value);
              setState({...state, toolDiameterValid:valid})
            }}
            isInvalid={!state.toolDiameterValid}
            name="toolDiameter"
            description={(state.toolDiameterValid) ? "" : "please enter a valid number"}
            label="Tool Diameter"
            placeholder={String(store.getState().defaultParameters.toolDiameter)}/>

          <TextInputField
            onChange={e => {
              let valid = utils.isNum(e.target.value);
              valid = 0 < Number(e.target.value) && Number(e.target.value) <= 100;
              //process value here
              setState({...state, stepoverPercentageValid:valid})
            }}
            isInvalid={!state.stepoverPercentageValid}
            name="stepoverPercentage"
            description={(state.stepoverPercentageValid) ? "" : "please enter a valid number"}
            label="Stepover Percentage"
            placeholder={String(store.getState().defaultParameters.stepoverPercentage)}/>

            <TextInputField
              onChange={e => {
                let valid = utils.isNum(e.target.value);
                setState({...state, feedRateValid:valid})
              }}
              isInvalid={!state.feedRateValid}
              name="feedRate"
              description={(state.feedRateValid) ? "" : "please enter a valid number"}
              label="Feed Rate"
              placeholder={String(store.getState().defaultParameters.feedRate)}/>

            <TextInputField
              onChange={e => {
                let valid = utils.isNum(e.target.value);
                setState({...state, toleranceValid:valid})
              }}
              isInvalid={!state.toleranceValid}
              name="tolerance"
              description={(state.toleranceValid) ? "" : "please enter a valid number"}
              label="Tolerance"
              placeholder={String(store.getState().defaultParameters.tolerance)}/>

            <TextInputField
              onChange={e => {
                let valid = utils.isNum(e.target.value);
                setState({...state, jogRateValid:valid})
              }}
              isInvalid={!state.jogRateValid}
              name="jogRate"
              description={(state.jogRateValid) ? "" : "please enter a valid number"}
              label="Jog Rate"
              placeholder={String(store.getState().defaultParameters.jogRate)}/>

              <TextInputField
                onChange={e => {
                  let valid = utils.isNum(e.target.value);
                  setState({...state, jogHeightValid:valid})
                }}
                isInvalid={!state.jogHeightValid}
                name="jogHeight"
                description={(state.jogHeightValid) ? "" : "please enter a valid number"}
                label="Jog Height"
                placeholder={String(store.getState().defaultParameters.jogHeight)}/>

              <Heading marginTop={20} size={400} color={"rgba(67, 90, 111, .91)"}>Auto Dogbone</Heading>
              <SegmentedControl
                marginTop={4}
                options={[
                  { label: 'true', value: true },
                  { label: 'false', value: false },
                ]}
                value={state.dogboneTemp}
                onChange={value => {
                  let dogboneTemp = value;
                  setState({...state, dogboneTemp });
                }}
              />

              <TextInputField
                marginTop={20}
                onChange={e => {
                  let valid = e.target.value !== "";
                  setState({...state, nameValid:valid})
                }}
                isInvalid={!state.nameValid}
                name="name"
                description={(state.nameValid) ? "" : "please enter something"}
                label="Name for this Pocket"
                placeholder={String(store.getState().defaultParameters.name)}/>

        </Dialog>
        <Button disabled={disabled} onClick={() => setState({...state, isShown:true})}>Pocket</Button>
      </div>
    );
}

export {PocketButton};
