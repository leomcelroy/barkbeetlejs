import {line} from './line.js';

export const connect_points = (pointsArray) => {
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