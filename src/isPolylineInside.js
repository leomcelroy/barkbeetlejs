import tk from "./drawingToolkit/toolkit.js";

export function isPolylineInside(polylines1, polylines2) {
    
    let result = true;

    polylines1.forEach(pl => pl.forEach(pt => {
        result = result && tk.pointInside(polylines2, pt);
    }))

    return result;
}