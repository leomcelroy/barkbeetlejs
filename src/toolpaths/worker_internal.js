onmessage = (e) => {
  let { contour, offset, joints, tolerance, href } = e.data;

  if (href.includes("leomcelroy.com")) href = "https://leomcelroy.com/barkbeetlejs/";

  self.importScripts(`${href}workerLibs/ClipperLibWorker.js`);

  const EndTypes = {
    etOpenSquare: 0,
    etOpenRound: 1,
    etOpenButt: 2,
    etClosedPolygon: 3,
    etClosedLine: 4,
  };

  const JoinTypes = [
    ClipperLib.JoinType.jtSquare,
    ClipperLib.JoinType.jtRound,
    ClipperLib.JoinType.jtMiter,
  ];

  const connect_points = (pointsArray) => {
    let lines = [];
    let lastPoint;

    pointsArray.forEach((point, index) => {
      if (index === 0) {
        lastPoint = point;
        return;
      } else {
        lines.push(line(lastPoint, point));
        lastPoint = point;
      }
    });

    return lines;
  };

  const line = (origin, end) => ({
    type: "line",
    origin,
    end,
  });

  const scale = 1000;
  let start = contour[0].origin;
  let end = contour[contour.length - 1].end;
  let endless = end.every((entry, i) => entry === start[i]);

  // console.log("contour", contour);

  let keyPoints = contour.map((line) => {
    return {
      X: Math.round(line.origin[0] * scale),
      Y: Math.round(line.origin[1] * scale),
    };
  });

  if (endless) {
    keyPoints.push(keyPoints[0]);
  } else {
    end = { X: Math.round(end[0] * scale), Y: Math.round(end[1] * scale) };
    keyPoints.push(end);
  }

  let paths = [keyPoints];

  // console.log("paths", paths);

  const co = new ClipperLib.ClipperOffset();
  const offsetted = new ClipperLib.Paths();
  co.Clear();
  co.AddPaths(
    paths,
    JoinTypes[joints],
    endless ? EndTypes.etClosedLine : EndTypes.etOpenButt,
  ); //chain.endless ? EndTypes.etClosedLine : EndTypes.etOpenButt
  co.MiterLimit = 2;
  co.ArcTolerance = 0.25;
  co.Execute(offsetted, offset * scale);

  // console.log("offsetted", offsetted)

  // console.log("endless",endless)

  let newContours = []; //what should I return a list or a js object

  // console.log("offsetted", offsetted)

  offsetted.forEach((points) => {
    // console.log("points", points)
    if (points.length === 0) return;
    let result = [];
    points.forEach((point) => {
      result.push([point.X / scale, point.Y / scale]);
    });

    if (endless) result.push(result[0]); //to close it
    // console.log("result", result);
    // console.log("connected", connectPoints(result))

    newContours.push(connect_points(result));
  });

  // remove all internal features from new contours

  let message = newContours;

  // console.log("newContours", message);

  self.postMessage(message);

  self.close();
};
