// these are the default settings
import * as utils from './utils.js';

//inputs
let cutDepth = 1;
let toolDiameter = 3;
let flutes = 1;

// calculate from material and bit
let feedRate = 3600;
let plungeRate = 2100;
let passDepth = .6;
//let rampAngle

// from settings
let units = "mm"

// default
let name = "anon"
let stepoverPercentage = 60;
let tolerance = 0;
let offset = "outside";
let jogHeight = 10;
let jogRate = 6000;
let tabs = false;
let tabThickness = 0;
let dogbone = false;
//let millOuterFirst = false;
//let climbDirection = false;

export const depthOfPasses = (cutDepthArg, passDepthArg) => {
  let tempFloor = Math.ceil(cutDepthArg/passDepthArg); //should this be ceiling or floor, I think ceil
  let actualPassDepth = cutDepthArg/tempFloor;

  return utils.makeSeries(actualPassDepth, actualPassDepth, tempFloor).map(n => -n);
};

export const params = {
  name, //used
  dogbone, //used
  tabThickness, //used
  tabs, //used
  compensatedRadius: toolDiameter/2 + tolerance, //used
  cutDepth, //used
  passDepth, //used
  jogHeight, //used
  stepoverPercentage, //used
  feedRate, //used
  jogRate, //used
  units, //used
  plungeRate, //used
  tolerance,
  toolDiameter,
  // toolRadius: toolDiameter/2,
  // flutes,
}
