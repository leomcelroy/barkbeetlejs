import { extrema } from "./extrema.js";
import tk from "./drawingToolkit/toolkit.js";

export const originPoint = ({ contours, origin }) => {
  const pls = Object.values(contours).flat();

  let { xMin, xMax, yMin, yMax } = tk.bounds(pls);

  if (xMin === Infinity || yMin === Infinity || xMax === -Infinity || yMax === -Infinity) return {
    x: 0,
    y: 0
  }

  let originX, originY;
  switch(origin) {
    case "center":
      originX = (xMin + xMax)/2;
      originY = (yMin + yMax)/2;
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