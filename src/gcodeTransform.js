import {line} from './line.js';

//gocode: string -> {points: list, preamble: list} :object
const getPoints = (gcode) => {
  let gcodeList = gcode.split('\n');
  let preamble = [];
  let points = [];

  let sawPreamble = false;
  gcodeList.forEach(e => {
    if (sawPreamble) {
      let xIndex = e.indexOf("X");
      let yIndex = e.indexOf("Y");
      let fIndex = e.indexOf("F");

      if (e.includes("X")) {
        //console.log("full", e);

        let x = e.substring(xIndex + 1, yIndex - 1);
        //console.log("x", x)
        x = parseFloat(x);

        let y = (fIndex === -1) ? e.substring(yIndex + 1, e.length) : e.substring(yIndex + 1, fIndex - 1);
        //console.log("y", y, "f", fIndex)
        y = parseFloat(y);

        points.push([x, y]);
      }

    } else {
      preamble.push(e);
    }

    if (e === "(end of preamble)") sawPreamble = true;
  })

  return {points, preamble};
}

// finds center of a list of contours
const center = (contours) => {
  let points = contours.flat(1);
  points = points.map(line => [line.origin, line.end]).flat();

  let xS = points.map(point => point[0]);
  let medianX = (Math.max(...xS) + Math.min(...xS))/2
  // let averageX = xS.reduce(sum, 0)/xS.length;

  let yS = points.map(point => point[1]);
  let medianY = (Math.max(...yS) + Math.min(...yS))/2
  // let averageY = yS.reduce(sum, 0)/yS.length;

  // return [averageX, averageY];
  return [medianX, medianY];
}

// mirrors a list of contours
const mirror = (contours, line) => {};

const scale = (contours, xFactor, yFactor) => {
  contours = contours.map(contour => {
    return contour.map(l => {
      let [originX, originY] = l.origin;
      let [endX, endY] = l.end;

      let newOrigin = [originX * xFactor, originY * yFactor];
      let newEnd = [endX * xFactor, endY * yFactor];

      return line(newOrigin, newEnd);
    })
  })

  return contours
};

//offsets a list of contours
const offset = (contours, xOffset, yOffset) => {
  contours = contours.map(contour => {
    return contour.map(l => {
      let [originX, originY] = l.origin;
      let [endX, endY] = l.end;

      let newOrigin = [originX + xOffset, originY + yOffset];
      let newEnd = [endX + xOffset, endY + yOffset];

      return line(newOrigin, newEnd);
    })
  })

  return contours
}

//contours: list of lists, x: boolean, y: boolean -> new contours: list of lists
const reflect = (contours, x, y) => {
  x = (x) ? -1 : 1;
  y = (y) ? -1 : 1;

  contours = contours.map(contour => {
    return contour.map(l => {
      let [originX, originY] = l.origin;
      let [endX, endY] = l.end;

      let newOrigin = [originX * x, originY * y];
      let newEnd = [endX * x, endY * y];

      return line(newOrigin, newEnd);
    })
  })

  return contours
}

export const gcodeTransform = {
  offset,
  mirror,
  reflect,
  scale
}
