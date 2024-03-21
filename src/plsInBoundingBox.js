export function plsInBoundingBox(boundingBox, polylines) {
  const checkIntersection = (lineStart, lineEnd, rect) => {
    const minX = Math.min(rect.start.x, rect.end.x);
    const maxX = Math.max(rect.start.x, rect.end.x);
    const minY = Math.min(rect.start.y, rect.end.y);
    const maxY = Math.max(rect.start.y, rect.end.y);

    const withinXBounds = x => x >= minX && x <= maxX;
    const withinYBounds = y => y >= minY && y <= maxY;

    const lineMinX = Math.min(lineStart[0], lineEnd[0]);
    const lineMaxX = Math.max(lineStart[0], lineEnd[0]);
    const lineMinY = Math.min(lineStart[1], lineEnd[1]);
    const lineMaxY = Math.max(lineStart[1], lineEnd[1]);

    // Early rejection
    if (lineMaxX < minX || lineMinX > maxX || lineMaxY < minY || lineMinY > maxY) {
      return false;
    }

    const dx = lineEnd[0] - lineStart[0];
    const dy = lineEnd[1] - lineStart[1];

    const p = (minY - lineStart[1]) / dy;
    const q = (maxY - lineStart[1]) / dy;
    const r = (minX - lineStart[0]) / dx;
    const s = (maxX - lineStart[0]) / dx;

    const intersectsVertical = (withinXBounds(lineStart[0] + p * dx) || withinXBounds(lineStart[0] + q * dx)) && Math.min(p, q) <= 1 && Math.max(p, q) >= 0;
    const intersectsHorizontal = (withinYBounds(lineStart[1] + r * dy) || withinYBounds(lineStart[1] + s * dy)) && Math.min(r, s) <= 1 && Math.max(r, s) >= 0;

    return intersectsVertical || intersectsHorizontal;
  };

  return polylines.some(polyline => polyline.some((point, index) => {
    if (index === 0) return false;
    return checkIntersection(polyline[index - 1], point, boundingBox);
  }));
}


// export function plsInBoundingBox(boundingBox, polylines) {
//   function isLineIntersectingBox(lineStart, lineEnd, box) {
//     const codeForPoint = (x, y) => (
//       (x < box.start.x) << 3 |
//       (x > box.end.x) << 2 |
//       (y < box.start.y) << 1 |
//       (y > box.end.y)
//     );
//     let code1 = codeForPoint(lineStart[0], lineStart[1]);
//     let code2 = codeForPoint(lineEnd[0], lineEnd[1]);

//     while (true) {
//       if (!(code1 | code2)) {
//         return true;
//       } else if (code1 & code2) {
//         return false;
//       } else {
//         let x, y;
//         const outcodeOut = code1 ? code1 : code2;
        
//         if (outcodeOut & 8) {
//           x = box.start.x;
//           y = lineStart[1] + (lineEnd[1] - lineStart[1]) * (box.start.x - lineStart[0]) / (lineEnd[0] - lineStart[0]);
//         } else if (outcodeOut & 4) {
//           x = box.end.x;
//           y = lineStart[1] + (lineEnd[1] - lineStart[1]) * (box.end.x - lineStart[0]) / (lineEnd[0] - lineStart[0]);
//         } else if (outcodeOut & 2) {
//           y = box.start.y;
//           x = lineStart[0] + (lineEnd[0] - lineStart[0]) * (box.start.y - lineStart[1]) / (lineEnd[1] - lineStart[1]);
//         } else if (outcodeOut & 1) {
//           y = box.end.y;
//           x = lineStart[0] + (lineEnd[0] - lineStart[0]) * (box.end.y - lineStart[1]) / (lineEnd[1] - lineStart[1]);
//         }

//         if (outcodeOut === code1) {
//           lineStart = [x, y];
//           code1 = codeForPoint(x, y);
//         } else {
//           lineEnd = [x, y];
//           code2 = codeForPoint(x, y);
//         }
//       }
//     }
//   }

//   return polylines.some(polyline => {
//     for (let i = 0; i < polyline.length - 1; i++) {
//       if (isLineIntersectingBox(polyline[i], polyline[i + 1], boundingBox)) {
//         return true;
//       }
//     }
//     return false;
//   });
// }