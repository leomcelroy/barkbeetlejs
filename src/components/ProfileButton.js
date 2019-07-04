import React, { useState } from 'react';
import {Button, Dialog, TextInputField, SegmentedControl, Heading} from 'evergreen-ui';
import * as utils from '../utils.js';
import {profile} from '../toolpaths/profile.js';

import store from '../store.js';

const ProfileButton = ({disabled}) => {

  const [state, setState] = useState({
    isShown: false,
    nameValid: true,
    cutDepthValid: true,
    toolDiameterValid: true,
    toleranceValid: true,
    jogHeightValid: true,
    jogRateValid: true,
    feedRateValid: true,
    tabThicknessValid: true,
    offsetTemp: store.state.defaultParameters.offset,
    tabsTemp: store.state.defaultParameters.tabs,
    dogboneTemp: store.state.defaultParameters.dogbone,
  });

  if (((state.offsetTemp !== store.getState().defaultParameters.offset) ||
      (state.tabsTemp !== store.getState().defaultParameters.tabs) ||
      (state.dogboneTemp !== store.getState().defaultParameters.dogbone)) &&
      !state.isShown) {
    console.log("bug fixin time")
    setState({
      ...state,
      offsetTemp: store.state.defaultParameters.offset,
      tabsTemp: store.state.defaultParameters.tabs,
      dogboneTemp: store.state.defaultParameters.dogbone,
    })
  }

  const validateSubmit = () => {

    let valid = state.nameValid &&
                state.cutDepthValid &&
                state.toolDiameterValid &&
                state.toleranceValid &&
                state.jogHeightValid &&
                state.jogRateValid &&
                state.feedRateValid;
    if (valid) {

      let name = utils.helpExtract("name");
      let cutDepth = Number(utils.helpExtract("cutDepth"));
      let toolDiameter = Number(utils.helpExtract("toolDiameter"));
      let tolerance = Number(utils.helpExtract("tolerance"));
      let jogHeight = Number(utils.helpExtract("jogHeight"));
      let jogRate = Number(utils.helpExtract("jogRate"));
      let feedRate = Number(utils.helpExtract("feedRate"));
      let tabThickness = Number(utils.helpExtract("tabThickness"));

      if (utils.helpExtract("name") === "") name = store.getState().defaultParameters.name;
      if (utils.helpExtract("cutDepth") === "") cutDepth = store.getState().defaultParameters.cutDepth;
      if (utils.helpExtract("toolDiameter") === "") toolDiameter = store.getState().defaultParameters.toolDiameter;
      if (utils.helpExtract("tolerance") === "") tolerance = store.getState().defaultParameters.tolerance;
      if (utils.helpExtract("jogHeight") === "") jogHeight = store.getState().defaultParameters.jogHeight;
      if (utils.helpExtract("jogRate") === "") jogRate = store.getState().defaultParameters.jogRate;
      if (utils.helpExtract("feedRate") === "") feedRate = store.getState().defaultParameters.feedRate;
      if (utils.helpExtract("tabThickness") === "") tabThickness = store.getState().defaultParameters.tabThickness;

      if (isNaN(cutDepth)) cutDepth = store.getState().defaultParameters.cutDepth;
      if (isNaN(toolDiameter)) toolDiameter = store.getState().defaultParameters.toolDiameter;
      if (isNaN(tolerance)) tolerance = store.getState().defaultParameters.tolerance;
      if (isNaN(jogHeight)) jogHeight = store.getState().defaultParameters.jogHeight;
      if (isNaN(jogRate)) jogRate = store.getState().defaultParameters.jogRate;
      if (isNaN(feedRate)) feedRate = store.getState().defaultParameters.feedRate;
      if (isNaN(tabThickness)) tabThickness = store.getState().defaultParameters.tabThickness;

      let dogbone = state.dogboneTemp;
      let tabs = state.tabsTemp;
      let offset = state.offsetTemp;

      //derived parameters
      let passDepth = toolDiameter/2;
      let toolRadius = toolDiameter/2;
      let compensatedRadius = toolRadius + tolerance;
      let tempFloor = Math.ceil(cutDepth/passDepth); //should this be ceiling or floor, I think ceil
      let actualPassDepth = cutDepth/tempFloor;
      let depthOfPasses = utils.makeSeries(actualPassDepth, actualPassDepth, tempFloor).map(n => -n);

      //settings will be compiled to a single object here
      let parameters = utils.deepcopy(store.state.defaultParameters);

      parameters["dogbone"] = dogbone;
      parameters["tabs"] = tabs;
      parameters["offset"] = offset;
      parameters["tolerance"] = tolerance;
      parameters["tabThickness"] = tabThickness;
      parameters["toolDiameter"] = toolDiameter;
      parameters["compensatedRadius"] = compensatedRadius;
      parameters["cutDepth"] = cutDepth;
      parameters["depthOfPasses"] = depthOfPasses;
      parameters["feedRate"] = feedRate;
      parameters["jogHeight"] = jogHeight;
      parameters["jogRate"] = jogRate;
      // parameters["insideCutting"] = insideCutting;

      //console.log("parameters", parameters);

      setState({
        ...state,
        isShown:false,
      });

      //update app state here
      let oldToolpaths = store.state.toolpaths;
      let newProfiles = store.state.selected.map(path => {

        return {
          type: "profile",
          name: name,
          parameters: parameters,
          sourceGeometryID: path,
          geometry: profile(store.state.contours[path], parameters),
          id: utils.makeID(),
          cutSelected: false,
          visible: true,
        }
      })

      let newToolpaths = [...oldToolpaths, ...newProfiles];

      // console.log("newToolpaths", newToolpaths);

      store.update({toolpaths:newToolpaths});

    }
  }

  return (
    <div>
      <Dialog
        isShown={state.isShown}
        title={"Settings for this Profile Cut"}
        onCloseComplete={() => {
          setState({
            ...state,
            isShown:false,
            dogboneTemp: store.getState().defaultParameters.dogbone,
            tabsTemp: store.getState().defaultParameters.tabs,
            offsetTemp: store.getState().defaultParameters.offset,
          })
        }}
        onConfirm={validateSubmit}>

        <TextInputField
          onChange={e => {
            let valid = utils.isNum(e.target.value);
            setState({...state, cutDepthValid:valid})
          }}
          isInvalid={!state.cutDepthValid}
          name="cutDepth"
          description={(state.cutDepthValid) ? "" : "please enter a valid number"}
          label="Depth of Cut"
          placeholder={String(store.getState().defaultParameters.cutDepth)}/>

        <TextInputField
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

            <Heading marginTop={8} size={400} color={"rgba(67, 90, 111, .91)"}>Offset Direction</Heading>
            <SegmentedControl
              marginTop={4}
              options={[
                { label: 'outside', value: "outside" },
                { label: 'inside', value: "inside" },
                { label: 'none', value: "none"}
              ]}
              value={state.offsetTemp}
              onChange={value => {
                let offsetTemp = value;
                setState({...state, offsetTemp });
              }}
            />

            <Heading marginTop={20} size={400} color={"rgba(67, 90, 111, .91)"}>Auto Tabs</Heading>
            <SegmentedControl
              marginTop={4}
              options={[
                { label: 'true', value: true },
                { label: 'false', value: false },
              ]}
              value={state.tabsTemp}
              onChange={value => {
                let tabsTemp = value;
                setState({...state, tabsTemp });
              }}
            />

            <TextInputField
              marginTop={20}
              onChange={e => {
                let valid = utils.isNum(e.target.value);
                setState({...state, tabThicknessValid:valid})
              }}
              isInvalid={!state.tabThicknessValid}
              name="tabThickness"
              description={(state.tabThicknessValid) ? "" : "please enter a valid number"}
              label="Tab Thickness"
              placeholder={String(store.getState().defaultParameters.tabThickness)}/>

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
              label="Name for this Profile"
              placeholder={String(store.getState().defaultParameters.name)}/>

      </Dialog>
      <Button disabled={disabled} onClick={() => setState({...state, isShown:true})}>Profile</Button>
    </div>
  );

}

export {ProfileButton};
