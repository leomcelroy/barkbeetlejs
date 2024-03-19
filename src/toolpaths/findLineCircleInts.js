export function findLineCircleInts(segment, circleXY, radius) {
  const [[x1, y1], [x2, y2]] = segment;
  const [cx, cy] = circleXY;

  const dx = x2 - x1;
  const dy = y2 - y1;
  const A = dx * dx + dy * dy;
  const B = 2 * (dx * (x1 - cx) + dy * (y1 - cy));
  const C = (x1 - cx) * (x1 - cx) + (y1 - cy) * (y1 - cy) - radius * radius;

  const det = B * B - 4 * A * C;
  if (A <= 0.0000001 || det < 0) {
    return []; // No intersections
  }

  const intersections = [];
  const addIntersection = (t) => {
    if (t >= 0 && t <= 1) {
      const ix = x1 + t * dx;
      const iy = y1 + t * dy;
      // Ensure unique points are added
      if (!intersections.some(([x, y]) => x === ix && y === iy)) {
        intersections.push([ix, iy]);
      }
    }
  };

  if (det === 0) {
    // One intersection
    const t = -B / (2 * A);
    addIntersection(t);
  } else {
    // Two intersections
    const t1 = (-B + Math.sqrt(det)) / (2 * A);
    const t2 = (-B - Math.sqrt(det)) / (2 * A);
    addIntersection(t1);
    addIntersection(t2);
  }

  return intersections;
}
