export function isPolylineInside(polyline1, polyline2) {
    // Helper function to check if a point is inside a polygon
    function isPointInsidePolygon(point, polygon) {
        let x = point[0], y = point[1];
        let inside = false;
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            let xi = polygon[i][0], yi = polygon[i][1];
            let xj = polygon[j][0], yj = polygon[j][1];

            let intersect = ((yi > y) != (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    }

    // Flatten the first polyline set for simplicity
    // Assuming the first polyline set forms a single closed polygon
    let flattenedPolyline1 = [].concat(...polyline1);

    // Check every point in the second polyline set to be inside the first set
    for (let polyline of polyline2) {
        for (let point of polyline) {
            if (!isPointInsidePolygon(point, flattenedPolyline1)) {
                return false; // Early return if any point is outside
            }
        }
    }
    return true;
}