import React from 'react';

// const isPrimitive = (stroke) => {
//   if (stroke.hasOwnProperty("type")) {
//
//     if (stroke.type === "line" ||
//         stroke.type === "arc" ||
//         stroke.type === "circle" ||
//         stroke.type === "bezier") {
//           return true;
//         } else {
//           return false;
//         }
//
//   } else {
//     return false;
//   }
// }

export const line = (origin, end) => {
  return {
    type: "line",
    origin,
    end,
  }
}

export const connectPoints = (pointsArray) => {
  let lines = [];
  let lastPoint;

  pointsArray.forEach((point, index) => {
    if (index === 0) {
      lastPoint = point;
      return
    } else {
      lines.push(line(lastPoint, point));
      lastPoint = point;
    }
  })

  return lines;
}

export const renderLine = (line, id, options = {} ) => {
  let defaultOptions = {selected: false, highlighted: false, toolpath: false};
  Object.keys(defaultOptions).forEach(key => {
    if (!Object.keys(options).includes(key)) {
      options[key] = defaultOptions[key];
    }
  })

  let points = [line.origin, line.end];

  let pathData = "M " + points.map(([x, y]) => `${x} ${y}`);

  let color = "black";

  if (options.selected) color = "blue";
  if (options.highlighted) color = "yellow";
  if (options.toolpath) color = "red";

  let style = {
        fill: "none",
        strokeWidth: "2px",
        stroke: color,
        strokeLinejoin: "round",
        strokeLinecap: "round",
        opacity: "1",
        vectorEffect: "non-scaling-stroke"
      }

  let path = <path d={pathData} style={style} key={id}/>;

  return path;

}

// const arc = (origin, radius, startAngle, endAngle) => {
//   return {
//     type: "arc",
//     origin,
//     radius,
//     startAngle,
//     endAngle,
//   }
// }
//
// const circle = (origin, radius) => {
//   return {
//     type: "circle",
//     origin,
//     radius,
//   }
// }
//
// const bezier = (origin, cOrigin, end, cEnd) => {
//   return {
//     type: "bezier",
//     origin,
//     cOrigin,
//     end,
//     cEnd
//   }
// }
