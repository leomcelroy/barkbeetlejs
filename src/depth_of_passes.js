import * as utils from "./utils.js";

export const depth_of_passes = (cutDepthArg, passDepthArg) => {
  let tempFloor = Math.ceil(cutDepthArg/passDepthArg); //should this be ceiling or floor, I think ceil
  let actualPassDepth = cutDepthArg/tempFloor;

  return utils.makeSeries(actualPassDepth, actualPassDepth, tempFloor).map(n => -n);
};