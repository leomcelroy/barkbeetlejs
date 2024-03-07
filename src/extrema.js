const minsMaxes = toRender => {
  let xMin = Number.POSITIVE_INFINITY;
  let xMax = Number.NEGATIVE_INFINITY;
  let yMin = Number.POSITIVE_INFINITY;
  let yMax = Number.NEGATIVE_INFINITY;

  toRender.forEach(contour => {
    contour.forEach(point => {
      if (point.x > xMax) {
        xMax = point.x;
      }
      if (point.x < xMin) {
        xMin = point.x;
      }
      if (point.y > yMax) {
        yMax = point.y;
      }
      if (point.y < yMin) {
        yMin = point.y;
      }
    });
  });

  if (toRender.length === 0) {
    xMin = 0;
    xMax = 0;
    yMin = 0;
    yMax = 0;
  }

  if (xMin === xMax) {
    // so we can find single points
    xMax = xMin + 5;
    xMin = xMin - 5;
  }

  if (yMin === yMax) {
    // so we can find single points
    yMax = yMin + 5;
    xMin = xMin - 5;
  }

  let extrema = { xMin, xMax, yMin, yMax };

  return extrema;
};

const lineArr = line => ({ x: line[0], y: line[1] });

export const extrema = (contours) => {
  let toRender = Object.values(contours).map(contour => {
    return contour
      .map(line => {
        // console.log(line.origin, line.end);
        return [lineArr(line.origin), lineArr(line.end)];
      })
      .flat();
  }); // need to get path points
  // console.log(toRender);
  return minsMaxes(toRender);
}