export function orderPointsAlongLine(points, linePoint1, linePoint2) {
  // Calculate direction vector of the line
  const dx = linePoint2[0] - linePoint1[0];
  const dy = linePoint2[1] - linePoint1[1];

  // Function to calculate dot product
  function dotProduct(v1, v2) {
    return v1[0] * v2[0] + v1[1] * v2[1];
  }

  // Function to project point onto the line and calculate distance from linePoint1
  function projectAndDistance(point) {
    const pointVector = [point[0] - linePoint1[0], point[1] - linePoint1[1]];
    const dot = dotProduct(pointVector, [dx, dy]);
    const lengthSquared = dx * dx + dy * dy;
    const projection = dot / lengthSquared;
    return projection; // This represents the "distance" along the line
  }

  // Sort points based on their projection's distance from linePoint1
  return points.sort((a, b) => projectAndDistance(a) - projectAndDistance(b));
}