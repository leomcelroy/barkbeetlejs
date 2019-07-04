const contour = (primitives) => {

  let closed;
  let length;
  let direction;

  return {
    type: "contour",
    strokes: [primitives],
    closed,
    length,
    direction
  }
}
