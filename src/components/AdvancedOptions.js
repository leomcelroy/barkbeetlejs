import React, { useState } from 'react';
import {Dialog, TextInputField, SegmentedControl, Heading, Link} from 'evergreen-ui';
import * as utils from '../utils.js';
import store from '../store.js';
import {profile} from '../toolpaths/profile.js';
import {pocket} from '../toolpaths/pocket.js';
import {drill} from '../toolpaths/drill.js';

const AdvancedOptions = ({params, setDefault, name, disabled, index}) => {

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
    tabThicknessValid: true,
    offsetTemp: params.offset,
    tabsTemp: params.tabs,
    dogboneTemp: params.dogbone,
  });

  const validateSubmit = () => {

    let valid = state.nameValid &&
                state.cutDepthValid &&
                state.toolDiameterValid &&
                state.stepoverPercentageValid &&
                state.toleranceValid &&
                state.jogHeightValid &&
                state.jogRateValid &&
                state.feedRateValid;
    if (valid) {

      let name = !setDefault ? utils.helpExtract("name") : "";
      let cutDepth = Number(utils.helpExtract("cutDepth"));
      let toolDiameter = Number(utils.helpExtract("toolDiameter"));
      let stepoverPercentage = Number(utils.helpExtract("stepoverPercentage")); //must be between 1 and 100%
      let tolerance = Number(utils.helpExtract("tolerance"));
      let jogHeight = Number(utils.helpExtract("jogHeight"));
      let jogRate = Number(utils.helpExtract("jogRate"));
      let feedRate = Number(utils.helpExtract("feedRate"));
      let tabThickness = Number(utils.helpExtract("tabThickness"));


      if (!setDefault) {
        if (utils.helpExtract("name") === "") name = false;
      }
      if (utils.helpExtract("cutDepth") === "") cutDepth = params.cutDepth;
      if (utils.helpExtract("toolDiameter") === "") toolDiameter = params.toolDiameter;
      if (utils.helpExtract("stepoverPercentage") === "") stepoverPercentage = params.stepoverPercentage; //must be between 1 and 100%
      if (utils.helpExtract("tolerance") === "") tolerance = params.tolerance;
      if (utils.helpExtract("jogHeight") === "") jogHeight = params.jogHeight;
      if (utils.helpExtract("jogRate") === "") jogRate = params.jogRate;
      if (utils.helpExtract("feedRate") === "") feedRate = params.feedRate;
      if (utils.helpExtract("tabThickness") === "") tabThickness = params.tabThickness;

      let dogbone = state.dogboneTemp;
      let tabs = state.tabsTemp;
      let offset = state.offsetTemp;

      //derived parameters
      let passDepth = cutDepth/2;
      let toolRadius = toolDiameter/2;
      let compensatedRadius = toolRadius + tolerance;
      let tempFloor = Math.ceil(cutDepth/passDepth); //should this be ceiling or floor, I think ceil
      let actualPassDepth = cutDepth/tempFloor;
      let depthOfPasses = utils.makeSeries(actualPassDepth, actualPassDepth, tempFloor).map(n => -n);

      //settings will be compiled to a single object here
      let parameters = utils.deepcopy(params);

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
      parameters["stepoverPercentage"] = stepoverPercentage;

      //console.log("parameters", parameters);

      setState({
        ...state,
        isShown:false,
      });

      //update app state here
      // if default === true then update defaultParameters state, if false then update parameters of toolpath id
      if (setDefault) {
        console.log("update default parameters", parameters)
        store.update({defaultParameters:parameters});
      } else {
        let state = store.getState();
        let toolpaths = state.toolpaths;
        let path = toolpaths[index];

        if (name) path.name = name;
        path.parameters = parameters;
        let sourceID = path.sourceGeometryID;
        let sourceGeo = state.contours[sourceID];

        if (path.type === "profile") {
          let cutGeo = profile(sourceGeo, parameters);
          path.geometry = cutGeo;
        }

        if (path.type === "pocket") {
          let cutGeo = pocket(sourceGeo, parameters);
          path.geometry = cutGeo;
        }

        if (path.type === "drill") {
          let cutGeo = drill(sourceGeo, parameters);
          path.geometry = cutGeo;
        }

        store.update({toolpaths});
      }
    }
  }

  return (
    <div>
      <Dialog
        isShown={state.isShown}
        title={setDefault ? "Advanced Default Settings" : "Specific Toolpath Settings"}
        onCloseComplete={() => {
          setState({
            ...state,
            isShown:false,
            dogboneTemp: params.dogbone,
            tabsTemp: params.tabs,
            offsetTemp: params.offset,
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
          placeholder={String(params.cutDepth)}/>

        <TextInputField
          onChange={e => {
            let valid = utils.isNum(e.target.value);
            setState({...state, toolDiameterValid:valid})
          }}
          isInvalid={!state.toolDiameterValid}
          name="toolDiameter"
          description={(state.toolDiameterValid) ? "" : "please enter a valid number"}
          label="Tool Diameter"
          placeholder={String(params.toolDiameter)}/>

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
          label="Stepover Percentage (this is only relevant for pocket cuts)"
          placeholder={String(params.stepoverPercentage)}/>

          <TextInputField
            onChange={e => {
              let valid = utils.isNum(e.target.value);
              setState({...state, feedRateValid:valid})
            }}
            isInvalid={!state.feedRateValid}
            name="feedRate"
            description={(state.feedRateValid) ? "" : "please enter a valid number"}
            label="Feed Rate"
            placeholder={String(params.feedRate)}/>

            <TextInputField
              onChange={e => {
                let valid = utils.isNum(e.target.value);
                setState({...state, toleranceValid:valid})
              }}
              isInvalid={!state.toleranceValid}
              name="tolerance"
              description={(state.toleranceValid) ? "" : "please enter a valid number"}
              label="Tolerance"
              placeholder={String(params.tolerance)}/>

          <TextInputField
            onChange={e => {
              let valid = utils.isNum(e.target.value);
              setState({...state, jogRateValid:valid})
            }}
            isInvalid={!state.jogRateValid}
            name="jogRate"
            description={(state.jogRateValid) ? "" : "please enter a valid number"}
            label="Jog Rate"
            placeholder={String(params.jogRate)}/>

            <TextInputField
              onChange={e => {
                let valid = utils.isNum(e.target.value);
                setState({...state, jogHeightValid:valid})
              }}
              isInvalid={!state.jogHeightValid}
              name="jogHeight"
              description={(state.jogHeightValid) ? "" : "please enter a valid number"}
              label="Jog Height"
              placeholder={String(params.jogHeight)}/>

            <Heading marginTop={8} size={400} color={"rgba(67, 90, 111, .91)"}>Offset Direction (this is only relevant for profile cuts)</Heading>
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
                setState({ ...state, offsetTemp });
              }}
            />

            <Heading marginTop={20} size={400} color={"rgba(67, 90, 111, .91)"}>Auto Tabs (this is only relevant for profile cuts)</Heading>
            <SegmentedControl
              marginTop={4}
              options={[
                { label: 'true', value: true },
                { label: 'false', value: false },
              ]}
              value={state.tabsTemp}
              onChange={value => {
                let tabsTemp = value;
                setState({ ...state, tabsTemp });
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
              placeholder={String(params.tabThickness)}/>

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
                setState({ ...state, dogboneTemp });
              }}
            />

            {!setDefault &&
            <TextInputField
              marginTop={20}
              onChange={e => {
                let valid = e.target.value !== "";
                setState({...state, nameValid:valid})
              }}
              isInvalid={!state.nameValid}
              name="name"
              description={(state.nameValid) ? "" : "please enter something"}
              label="Name for this Path"
              placeholder={name}/>}

      </Dialog>
      <Link onClick={() => setState({...state, isShown:!disabled})}>{setDefault ? "Advanced Default Options" : "edit"}</Link>
    </div>
  );
}

export {AdvancedOptions};
