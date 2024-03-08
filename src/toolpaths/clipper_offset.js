import { ClipperLib } from "../../libs/ClipperLib.js";
import { connect_points } from "../connect_points.js";

const EndTypes = {
  etOpenSquare: 0,
  etOpenRound: 1,
  etOpenButt: 2,
  etClosedPolygon: 3,
  etClosedLine: 4
};

const JoinTypes = [
  ClipperLib.JoinType.jtSquare,
  ClipperLib.JoinType.jtRound,
  ClipperLib.JoinType.jtMiter
];

// single contour -> list of offset contours
export const clipperOffsetContour = (
  contour,
  offset,
  joints = 1,
  tolerance = 0.01
) => {
  const scale = 1000;
  let start = contour[0].origin;
  let end = contour[contour.length - 1].end;
  let endless = end.every((entry, i) => entry === start[i]);

  // console.log("contour", contour);

  let keyPoints = contour.map(line => {
    return {
      X: Math.round(line.origin[0] * scale),
      Y: Math.round(line.origin[1] * scale)
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
    endless ? EndTypes.etClosedLine : EndTypes.etOpenButt
  ); //chain.endless ? EndTypes.etClosedLine : EndTypes.etOpenButt
  co.MiterLimit = 2;
  co.ArcTolerance = 0.25;
  co.Execute(offsetted, offset * scale);

  // console.log("offsetted", offsetted)

  // console.log("endless",endless)

  let newContours = []; //what should I return a list or a js object

  // console.log("offsetted", offsetted)

  offsetted.forEach(points => {
    // console.log("points", points)
    if (points.length === 0) return;
    let result = [];
    points.forEach(point => {
      result.push([point.X / scale, point.Y / scale]);
    });

    if (endless) result.push(result[0]); //to close it
    // console.log("result", result);
    // console.log("connected", connectPoints(result))

    newContours.push(connect_points(result));
  });

  // console.log("newContours", newContours)

  return newContours;
};

// list of contours -> list of offset contours
export const clipperOffsetContours = (
  contours,
  offset,
  joints = 1,
  tolerance = 0.01
) => {
  const scale = 1000;
  const newContours = contours.reduce((memo, contour, i) => {
    let start = contour[0].origin;
    let end = contour[contour.length - 1].end;
    let endless = end.every((entry, i) => entry === start[i]);

    let keyPoints = contour.map(line => {
      return {
        X: Math.round(line.origin[0] * scale),
        Y: Math.round(line.origin[1] * scale)
      };
    });

    if (endless) {
      keyPoints.push(keyPoints[0]);
    }

    let paths = [keyPoints];

    const co = new ClipperLib.ClipperOffset();
    const offsetted = new ClipperLib.Paths();
    co.Clear();
    co.AddPaths(
      paths,
      JoinTypes[joints],
      endless ? EndTypes.etClosedLine : EndTypes.etOpenButt
    );
    co.MiterLimit = 2;
    co.ArcTolerance = 0.25;
    co.Execute(offsetted, offset * scale);
    offsetted.forEach((points, j) => {
      if (points.length === 0) return;
      let result = [];
      points.forEach(point => {
        result.push([point.X / scale, point.Y / scale]);
      });

      if (endless) result.push(result[0]); //to close it
      const newModel = connect_points(result);

      memo.push(newModel);
    });
    return memo;
  }, []);
  return newContours;
};

export function clipperOffsetContourWorker(
  contour,
  offset,
  joints = 1,
  tolerance = 0.01
) {
  return new Promise(async (resolve) => {
    
    const href = window.location.host.includes("leomcelroy") 
      ? "https://leomcelroy.com/barkbeetlejs/src/toolpaths/worker_internal.js"
      : "./src/toolpaths/worker_internal.js";

    const scriptContent = await fetch(href)
      .then(response => response.text())
      .catch(error => console.error('Error fetching worker script:', error));

    // const blob = new Blob(["(" + workerInternal.toString() + "())"]);
    const blob = new Blob([scriptContent]);
    const url = window.URL.createObjectURL(blob);
    const worker = new Worker(url);

    worker.postMessage({
      contour,
      offset,
      joints,
      tolerance,
      href: window.location.href
    });

    worker.onmessage = e => {
      const message = e.data;
      resolve(message);
    };

    worker.onerror = e => {
      console.error(e);
    }
  });
}
