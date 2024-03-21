import {line} from '../line.js';

const linesToPolylinePoints = (lines, lastIndex) => lines.map((line, i) => { //should import this instead
  if (i === lastIndex-1) return [{x:line.origin[0], y:line.origin[1]}, {x:line.end[0], y:line.end[1]}];

  return {x:line.origin[0], y:line.origin[1]}
}).flat()

// let sum = (a, b) => a + b;

const getCenter = (contour) => {
  let polyline = linesToPolylinePoints(contour);

  let xS = polyline.map(point => point.x);
  let medianX = (Math.max(...xS) + Math.min(...xS))/2
  // let averageX = xS.reduce(sum, 0)/xS.length;

  let yS = polyline.map(point => point.y);
  let medianY = (Math.max(...yS) + Math.min(...yS))/2
  // let averageY = yS.reduce(sum, 0)/yS.length;

  // return [averageX, averageY];
  return [medianX, medianY];

}

export const drillGcode = (center, params) => {
  let units = "G21";
  // if (params.units === "in") units = "G20";
  // if (params.units === "mm") units = "G21";

  let preamble = [units, "G90"];

  let gcode = [
    ...preamble,
    "(end of preamble)",
    `G1 Z${params.jogHeight} F${params.jogRate}`,
    `G0 X${center[0]} Y${center[1]}`,
    `G1 Z-${params.cutDepth} F${params.plungeRate}`, //plunge rate
    `G1 Z${params.jogHeight} F${params.jogRate}`,
  ]

  let text = gcode.join('\n');

  return text;
}

export const drill = (contour, params) => {
  if (contour === []) return [];
  
  let center = getCenter(contour);

  // let gcode = drillGcode(center, params);

  // let drawing = [
  //   [line([center[0] - params.compensatedRadius, center[1]], [center[0] + params.compensatedRadius, center[1]])],
  //   [line([center[0], center[1] - params.compensatedRadius], [center[0], center[1] + params.compensatedRadius])]
  // ]

  return [[line(center, center)]];
};
