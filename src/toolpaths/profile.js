import { clipperOffsetContour, clipperOffsetContourWorker } from './clipper_offset.js'
import { depth_of_passes } from '../depth_of_passes.js'
import { findLineCircleInts } from "./findLineCircleInts.js";
import { isPointInsideCircle } from "./isPointInsideCircle.js";
import { orderPointsAlongLine } from "./orderPointsAlongLine.js";
import tk from "../drawingToolkit/toolkit.js";

const createToolpaths = async (contour, params) => {
  let outline;

  let offset = {
    "outside": () => false,
    "inside": () => true,
    "none": () => "none",
    "auto": () => {
      //
      return false;
    }
  }[params.offsetDirection]();

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

  let keyPoints = toolpaths;

  let l = toolpaths.length;
  let xMatch = toolpaths[0][0] === toolpaths.at(-1)[0];
  let yMatch = toolpaths[0][1] === toolpaths.at(-1)[1];
  let closed = xMatch && yMatch;
  if (!closed) {
    let last = toolpaths.at(-1);
    keyPoints.push(last);
  } else {
    let first = toolpaths[0];
    keyPoints.push(first);
  }


  // let gcodePoints = keyPoints.map(p => `G1 X${p[0]} Y${p[1]} F${params.feedRate}`)
  //let gcode = JSON.parse(JSON.stringify(gcodePoints));

  let firstPoint = keyPoints[0]; //TODO: BUG what if there are no key points

  let passDepths = depth_of_passes(params.cutDepth, params.passDepth);

  let paths = [];

  const tabPoints = [
    tk.getPoint([keyPoints], 0),
    tk.getPoint([keyPoints], .33),
    tk.getPoint([keyPoints], .66),
  ];

  console.log({ params, passDepths, keyPoints, tabPoints });

  passDepths.forEach((depth, passIndex) => {

    let lastPoint = [...keyPoints[0]];

    keyPoints.forEach((pt, i) => {

      const [x, y] = pt;

      const TAB_RADIUS = params.tabWidth/2 + params.toolDiameter/2;
      const TAB_THICKNESS = -params.cutDepth + params.tabThickness;

      const tabIntersections = [];
      
      let lastPointInside = false;
      let nextPointInside = false;

      tabPoints.forEach(tab => {
        if (params.tabs === false) return; 

        const intersections = findLineCircleInts(
          [ lastPoint, pt ],
          tab,
          TAB_RADIUS
        );

        tabIntersections.push(...intersections);

        lastPointInside ||= isPointInsideCircle(lastPoint, tab, TAB_RADIUS);
        nextPointInside ||= isPointInsideCircle(pt, tab, TAB_RADIUS);
      });


      orderPointsAlongLine(tabIntersections, lastPoint, pt);

      tabIntersections.forEach((intersection, i) => {

        const [x0, y0] = intersection;

        const leave = ((lastPointInside ? 1 : 0) + (i+1)) % 2 === 0;
        const enter = ((lastPointInside ? 1 : 0) + (i+1)) % 2 === 1;

        if (enter) {
          paths.push(`G1 X${x0} Y${y0} Z${depth}`);
          paths.push(`F${params.plungeRate}`);
          paths.push(`G1 X${x0} Y${y0} Z${Math.max(TAB_THICKNESS, depth)}`);
        }

        if (leave) {
          paths.push(`G1 X${x0} Y${y0} Z${Math.max(TAB_THICKNESS, depth)}`);
          paths.push(`F${params.plungeRate}`);
          paths.push(`G1 X${x0} Y${y0} Z${depth}`);
        }

      })

      if (passIndex === 0) {
        paths.push(`F${params.plungeRate}`);
        paths.push(`G1 Z${nextPointInside ? Math.max(TAB_THICKNESS, depth) : depth}`);
      }

      paths.push(`F${params.feedRate}`);
      paths.push(`G1 X${x} Y${y} Z${nextPointInside ? Math.max(TAB_THICKNESS, depth) : depth}`);

      lastPoint = pt;

    });
  });

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
