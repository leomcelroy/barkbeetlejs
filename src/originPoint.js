import {extrema} from "./extrema.js";

export const originPoint = ({contours, origin}) => {
  let { xMin, xMax, yMin, yMax } = extrema(contours);

  let originX, originY;
  switch(origin) {
    case "center":
      originX = (xMin + xMax)/2;
      originY = (yMin + yMax)/2;
      console.log("center", originX, originY);
      break;
    case "top_left":
      originX = xMin;
      originY = yMin;
      break;
    case "bottom_left":
      originX = xMin;
      originY = yMax;
      break;
    case "top_right":
      originX = xMax;
      originY = yMin;
      break;
    case "bottom_right":
      originX = xMax;
      originY = yMax;
      break;
  }

  return {x: originX, y: originY}
}