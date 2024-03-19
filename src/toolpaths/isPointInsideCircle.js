export function isPointInsideCircle(point, circleXY, radius) {
  const [px, py] = point;
  const [cx, cy] = circleXY;

  const distanceSquared = (px - cx) * (px - cx) + (py - cy) * (py - cy);
  return distanceSquared <= radius * radius;
}