import {clipOffsetContour} from '../unmakerjs/clipper.js'
import {depthOfPasses} from '../parameters.js'


const offsetFunc = (offset) => {
  if (offset === "outside") {
    return false;
  } else if (offset === "inside") {
    return true;
  } else if (offset === "none") {
    return "none";
  }
}

const createToolpaths = (contour, params) => {
  let outline;
  let offset = offsetFunc(params.offset);
  if (offset === "none") {
    outline = [contour];
  } else {
    //outline = mjs.model.outline(p, params.compensatedRadius, 0, offset); //third parameter is what type of corners, 0 (rounded) by default
    offset = (offset === true) ? -1 : 1;

    outline = clipOffsetContour(contour, offset * params.compensatedRadius);
  }

  // outline = outline.flat(); //TODO: BUG this is a hack to deal with not raising the bit yet

  return outline;
}

export const profileGcode = (toolpaths, params) => {
  toolpaths = toolpaths.flat(); //TODO: BUG this is a hack to deal with not raising the bit yet

  let keyPoints = toolpaths.map(line => [line.origin[0], line.origin[1]]);

  let gcodePoints = keyPoints.map(p => `G1 X${p[0]} Y${p[1]} F${params.feedRate}`)
  //let gcode = JSON.parse(JSON.stringify(gcodePoints));

  let firstPoint = keyPoints[0]; //TODO: BUG what if there are no key points

  let passDepths = depthOfPasses(params.cutDepth, params.passDepth);

  let paths = passDepths.map((p,i) => [
    `G1 Z${passDepths[i]} F${params.plungeRate}`, //plunge rate
    ...gcodePoints,
    `G1 X${firstPoint[0]} Y${firstPoint[1]} F${params.feedRate}`
  ])

  paths = paths.flat(1);

  let units;
  if (params.units === "in") units = "G20";
  if (params.units === "mm") units = "G21";

  let preamble = [units, "G90"];

  let gcode = [
    ...preamble,
    "(end of preamble)",
    `G1 Z${params.jogHeight} F${params.jogRate}`,
    `G0 X${firstPoint[0]} Y${firstPoint[1]}`,
    ...paths,
    `G1 Z${params.jogHeight} F${params.jogRate}`,
  ]

  let text = gcode.join('\n');

  return text
}

export const profile = (contour, params) => {

  let toolpaths = createToolpaths(contour, params);
  // let gcode = profileGcode(toolpaths, params);

  return {drawing: toolpaths, geometry: toolpaths};
};
