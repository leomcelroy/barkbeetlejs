//This code is adapted from https://github.com/makercam/makercam/blob/master/src/clipperOffset.ts

import ClipperLib from 'js-clipper';

import {connectPoints} from './primitives.js';

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
]

// single contour -> list of offset contours
export const clipOffsetContour = (contour, offset, joints = 1, tolerance = 0.01) => {
    const scale = 1000
    let start = contour[0].origin;
    let end = contour[contour.length - 1].end;
    let endless = end.every((entry, i) => entry === start[i]);

    // console.log("contour", contour);

    let keyPoints = contour.map(line => { return {X: Math.round(line.origin[0] * scale), Y: Math.round(line.origin[1] * scale)} });

    if (endless) {
        keyPoints.push(keyPoints[0]);
    } else {
        end = {X: Math.round(end[0] * scale), Y: Math.round(end[1] * scale)};
        keyPoints.push(end);
    }

    let paths = [keyPoints]

    // console.log("paths", paths);

    const co = new ClipperLib.ClipperOffset()
    const offsetted = new ClipperLib.Paths()
    co.Clear()
    co.AddPaths(paths, JoinTypes[joints], endless ? EndTypes.etClosedLine : EndTypes.etOpenButt) //chain.endless ? EndTypes.etClosedLine : EndTypes.etOpenButt
    co.MiterLimit = 2
    co.ArcTolerance = 0.25
    co.Execute(offsetted, offset * scale);

    // console.log("offsetted", offsetted)

    // console.log("endless",endless)

    let newContours = []; //what should I return a list or a js object

    // console.log("offsetted", offsetted)

    offsetted.forEach((points) => {
        // console.log("points", points)
        if (points.length === 0) return
        let result = []
        points.forEach((point) => {
            result.push([point.X / scale, point.Y / scale])
        })

        if (endless) result.push(result[0]); //to close it
        // console.log("result", result);
        // console.log("connected", connectPoints(result))

        newContours.push(connectPoints(result));
    })

    // console.log("newContours", newContours)

    return newContours;
}

// list of contours -> list of offset contours
export const clipOffsetContours = (contours, offset, joints = 1, tolerance = 0.01) => {
    const scale = 1000
    const newContours = contours.reduce((memo, contour, i) => {
        let start = contour[0].origin;
        let end = contour[contour.length - 1].end;
        let endless = end.every((entry, i) => entry === start[i]);

        let keyPoints = contour.map(line => { return {X: Math.round(line.origin[0] * scale), Y: Math.round(line.origin[1] * scale)} });

        if (endless) {
            keyPoints.push(keyPoints[0])
        }

        let paths = [keyPoints]

        const co = new ClipperLib.ClipperOffset()
        const offsetted = new ClipperLib.Paths()
        co.Clear()
        co.AddPaths(paths, JoinTypes[joints], endless ? EndTypes.etClosedLine : EndTypes.etOpenButt)
        co.MiterLimit = 2
        co.ArcTolerance = 0.25
        co.Execute(offsetted, offset * scale);
        offsetted.forEach((points, j) => {
            if (points.length === 0) return
            let result = []
            points.forEach((point) => {
                result.push([point.X / scale, point.Y / scale])
            })

            if (endless) result.push(result[0]); //to close it
            const newModel = connectPoints(result)

            memo.push(newModel);
        })
        return memo
    }, [])
    return newContours;
}
