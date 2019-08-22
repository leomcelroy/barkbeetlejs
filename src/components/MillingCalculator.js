import React, { useState } from 'react';
import {bitChoice, presets6mm} from './millingCalculatorConstants.js'

import store from "../store.js";

const output = (input, rpm, presets6mm, presetDiameter, plungRateReductionFactor) => {
  let {materialToCut, millingBitDiameter, numberOfFlutes} = input;

  let feedrate = (presets6mm[materialToCut].chiploads * rpm * numberOfFlutes * millingBitDiameter)/presetDiameter;
  let plungerate = feedrate * plungRateReductionFactor;

  let fluteReduction = 1-numberOfFlutes*.15;

  let passDepth = presets6mm[materialToCut].passdepths/presetDiameter*millingBitDiameter*(fluteReduction);
  let rampAngle = presets6mm[materialToCut].rampAngle;

  return {
    feedrate,
    plungerate,
    passDepth,
    rampAngle,
  };
}

const calculateSettings = (material, bitDiameter, numberOfFlutes, rpm, plungRateReductionFactor = 0.6) => {
  let input = {
    materialToCut: material,
    millingBitDiameter: bitDiameter,
    numberOfFlutes: numberOfFlutes,
  };

  return output(input, rpm, presets6mm, 6, plungRateReductionFactor);
}


export const MillingCalculator = () => {
  const [state, setState] = useState({
    feedrate: 0,
    plungerate: 0,
    passDepth: 0,
    rampAngle: 0,
    rpmDisabled: true,
    flutesDisabled: true,
    bitDiameterDisabled: true,
    submit2Disabled: true,
    submit1Text: "Submit to Enable Calculator",
  });

  const submit1 = () => {
    let material = document.getElementById("material").value;
    let materialThickness = parseFloat(document.getElementById("materialThickness").value);

    //aluminum, plastic, plywood, mdf
    if (!isNaN(materialThickness)) {
      let diameter;
      let close = (bitChoice, materialThickness) => {
        let counts = Object.keys(bitChoice).map(e => parseFloat(e));
        let goal = materialThickness;

        let found = false;
        counts.forEach((count, index) => {
          if (count >= goal && !found) {
            found = true;
            materialThickness = count;
          }

          if (goal > counts[counts.length-1]) {
            materialThickness = count;
          }
        })

        return materialThickness;
      }

      if (material === "wood") {
        materialThickness = close(bitChoice["plywood"], materialThickness);
        diameter = bitChoice["plywood"][materialThickness].diameter
      };
      if (material === "hardwood") {
        materialThickness = close(bitChoice["plywood"], materialThickness)
        diameter = bitChoice["plywood"][materialThickness].diameter
      };
      if (material === "plastic_roughing" || material === "plastic_finishing") {
        materialThickness = close(bitChoice["plastic"], materialThickness);
        diameter = bitChoice["plastic"][materialThickness].diameter
      };
      if (material === "aluminum_roughing" || material === "aluminum_finishing") {
        materialThickness = close(bitChoice["aluminum"], materialThickness)
        diameter = bitChoice["aluminum"][materialThickness].diameter
      };
      if (material === "steel_roughing" || material === "steel_finishing") {
        materialThickness = close(bitChoice["steel"], materialThickness)
        diameter = bitChoice["aluminum"][materialThickness].diameter
      };
      if (material === "foam_or_wax" || material === "mdf") {
        materialThickness = close(bitChoice["mdf"], materialThickness)
        diameter = bitChoice["mdf"][materialThickness].diameter
      };

      document.getElementById("bitDiameter").value = diameter;
      document.getElementById("flutes").value = 1;
      document.getElementById("rpm").value = 18000;

      submit2();
    }
  }

  const submit2 = () => {
    let materialThickness = parseFloat(document.getElementById("materialThickness").value);
    let material = document.getElementById("material").value;
    let bitDiameter = parseFloat(document.getElementById("bitDiameter").value);
    let flutes = parseFloat(document.getElementById("flutes").value);
    let rpm = parseFloat(document.getElementById("rpm").value);

    let set = calculateSettings(material, bitDiameter, flutes, rpm);

    setState({
      ...state,
      feedrate: set.feedrate,
      plungerate: set.plungerate,
      passDepth: set.passDepth,
      rampAngle: set.rampAngle,
      submit2Disabled: false,
      rpmDisabled: false,
      flutesDisabled: false,
      bitDiameterDisabled: false,
      submit1Text: "Suggest Bit"
    })

    let current = store.state;

    store.update({
      ...current,
      defaultParameters: {
        ...current.defaultParameters,
        feedRate: set.feedrate,
        passDepth: set.passDepth,
        plungeRate: set.plungerate,
        rampAngle: set.rampAngle,
        cutDepth: materialThickness,
        toolDiameter: bitDiameter,
      },
      initialized: true,
    })
  }

  return (
    <div>
      <b>Automill Calculator</b>
      <form id="inputs">
        Material:
        <select id="material">
          <option value="wood">wood</option>
          <option value="mdf">mdf</option>
          <option value="foam_or_wax">foam_or_wax</option>
          <option value="hardwood">hardwood</option>
          <option value="plastic_roughing">plastic_roughing</option>
          <option value="plastic_finishing">plastic_finishing</option>
          <option value="aluminum_roughing">aluminum_roughing</option>
          <option value="aluminum_finishing">aluminum_finishing</option>
          <option value="steel_roughing">steel_roughing</option>
          <option value="steel_finishing">steel_finishing</option>
        </select>
        <br/>
        Thickness: <input type="number" id="materialThickness"/> <br/>
        Unit: mm
      </form>
      <button type="submit" id="submit1" onClick={submit1}>{state.submit1Text}</button>
      <form id="inputs2">
         Bit Diameter: <input type="number" id="bitDiameter" disabled={state.bitDiameterDisabled}/> <br/>
         Flutes: <input type="number" id="flutes" disabled={state.flutesDisabled}/> <br/>
         RPM: <input type="number" id="rpm" disabled={state.rpmDisabled}/> <br/>
      </form>
      <button type="submit" id="submit2" onClick={submit2} disabled={state.submit2Disabled}>Re-calculate</button> <br/>
      <br/>
      <b>Settings</b> <br/>
      Feed Rate: {state.feedrate} mm/min <br/>
      Plunge Rate: {state.plungerate} mm/min <br/>
      Pass Depth: {Math.round(state.passDepth * 100) / 100} mm <br/>
      Ramp Angle: {state.rampAngle} degrees
    </div>
  )

};
