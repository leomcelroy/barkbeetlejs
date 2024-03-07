import {clipperOffsetContour, clipperOffsetContourWorker} from './clipper_offset.js'
import {depth_of_passes} from '../depth_of_passes.js'


const offsetFunc = (offset) => {
  if (offset === "outside") {
    return false;
  } else if (offset === "inside") {
    return true;
  } else if (offset === "none") {
    return "none";
  }
}

const createToolpaths = async (contour, params) => {
  let outline;
  let offset = offsetFunc(params.offsetDirection);
  if (offset === "none") {
    outline = [contour];
  } else {
    //outline = mjs.model.outline(p, params.compensatedRadius, 0, offset); //third parameter is what type of corners, 0 (rounded) by default
    offset = (offset === true) ? -1 : 1;

    outline = await clipperOffsetContourWorker(contour, offset * params.compensatedRadius);
  }

  // console.log("outline", outline);
  // outline = outline.flat(); //TODO: BUG this is a hack to deal with not raising the bit yet

  return outline;
}

export const profileGcode = (toolpaths, params) => {
  toolpaths = toolpaths.flat(); //TODO: BUG this is a hack to deal with not raising the bit yet

  // let keyPoints = toolpaths.map(line => [line.origin[0], line.origin[1]]); 
  let keyPoints = toolpaths.map(line => line.origin);
  //TODO: if toolpath doesn't close I need to take the end point too
  let l = toolpaths.length;
  let xMatch = toolpaths[0].origin[0] === toolpaths[l - 1].end[0];
  let yMatch = toolpaths[0].origin[1] === toolpaths[l - 1].end[1];
  let closed = xMatch && yMatch;
  if (!closed) {
    let last = toolpaths[l - 1].end;
    keyPoints.push(last);
  } else {
    let first = toolpaths[0].origin;
    keyPoints.push(first);
  }

  let gcodePoints = keyPoints.map(p => `G1 X${p[0]} Y${p[1]} F${params.feedRate}`)
  //let gcode = JSON.parse(JSON.stringify(gcodePoints));

  let firstPoint = keyPoints[0]; //TODO: BUG what if there are no key points

  let passDepths = depth_of_passes(params.cutDepth, params.passDepth);

  let paths = passDepths.map((p,i) => [
    `G1 Z${passDepths[i]} F${params.plungeRate}`, //plunge rate
    ...gcodePoints,
    // `G1 X${firstPoint[0]} Y${firstPoint[1]} F${params.feedRate}`
  ])

  paths = paths.flat(1);

  let units = "G21";
  // if (params.units === "in") units = "G20";
  // if (params.units === "mm") units = "G21";

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
  if (contour === []) return [];

  let toolpaths = createToolpaths(contour, params);
  // let gcode = profileGcode(toolpaths, params);

  return toolpaths;
};
