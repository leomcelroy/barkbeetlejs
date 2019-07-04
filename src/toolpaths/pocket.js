import {clipOffsetContour} from '../unmakerjs/clipper.js'
import {depthOfPasses} from '../parameters.js'


const len = (toolpath) => Object.keys(toolpath).length;

const isToolpath = (toolpath) => {
  // console.log("toolpath", toolpath);

  if (len(toolpath) >= 1) {
    return true;
  } else {
    return false;
  }
}

const createToolpaths = (geo, params) => {
  let contours = [];
  let count = 0;

  let pass = clipOffsetContour(geo, -params.compensatedRadius); //returns array of contours

  if (isToolpath(pass) !== true) {
    return contours;
  }

  while (isToolpath(pass)) {
    contours.push(pass);
    count++;
    let lastPass = contours[count - 1];
    // console.log("lastPass", lastPass)
    pass = lastPass.map(contour => clipOffsetContour(contour, -params.compensatedRadius * params.stepoverPercentage/100)).flat();

  }

  return contours.flat();
}

export const pocketGcode = (toolpaths, params) => {
  let keyPoints = toolpaths.map(outline => outline.map(line => [line.origin[0], line.origin[1]]));

  // toolpaths = Object.values(toolpaths).flat(2);
  // console.log("toolpaths", toolpaths);

  // console.log("keyPoints", keyPoints);

  let gcodePoints = keyPoints.map(points => {
    let raise = points.length > 1;
    let firstPoint = points[0];

    firstPoint = `G1 X${firstPoint[0]} Y${firstPoint[1]} F${params.feedRate}`;

    if (raise) {
      return [
        `G1 Z${params.jogHeight} F${params.jogRate}`,
        firstPoint, //want to jog to this one
        "plunge",
        ...points.map(point => `G1 X${point[0]} Y${point[1]} F${params.feedRate}`),
        firstPoint,
        `G1 Z${params.jogHeight} F${params.jogRate}`,
      ]
    } else {
      return [
        firstPoint,
        "plunge",
        ...points.map(point => `G1 X${point[0]} Y${point[1]} F${params.feedRate}`),
        firstPoint
      ]
    }
  });

  let paths = gcodePoints.flat();

  // let firstPoint = keyPoints[0][0][0];

  let passDepths = depthOfPasses(params.cutDepth, params.passDepth);

  let paths2 = passDepths.map((p,i) => [
    ...paths.map(x => (x === "plunge") ? `G1 Z${passDepths[i]} F${params.plungeRate}` : x), //plunge rate
  ])

  // console.log(paths2)

  paths2 = paths2.flat();

  let units;
  if (params.units === "in") units = "G20";
  if (params.units === "mm") units = "G21";

  let preamble = [units, "G90"];

  let gcode = [
    ...preamble,
    "(end of preamble)",
    `G1 Z${params.jogHeight} F${params.jogRate}`,
    // `G0 X${firstPoint[0]} Y${firstPoint[1]}`,
    ...paths2,
    `G1 Z${params.jogHeight} F${params.jogRate}`,
  ]


  let text = gcode.join('\n');

  return text;
}

export const pocket = (contour, params) => {

  let toolpaths = createToolpaths(contour, params);
  //let gcode = pocketGcode(toolpaths, params)

  return {drawing: toolpaths, geometry: toolpaths};
};
