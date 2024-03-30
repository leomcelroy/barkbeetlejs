import { isPolylineInside } from "./isPolylineInside.js";
import tk from "./drawingToolkit/toolkit.js";
import { offset } from "./geogram/index.js";

const copy = json => JSON.parse(JSON.stringify(json));

export function makeProfile(state, params) {
  const geometryToOffset = state.selected.map(id => state.contours[id][0]);

  const insidePls = [];

  for (const insideId of state.selected) {

    const geoToCheckAgainst = state.selected
      .filter(id => id !== insideId)
      .map(id => state.contours[id][0])
      ;

    
    const pls = state.contours[insideId];

    const isInside = isPolylineInside(pls, geoToCheckAgainst);

    if (isInside) {
      insidePls.push(insideId);
    }

  }

  const offsetDir = {
    "outside": (id) => {
      return insidePls.includes(id) ? -1 : 1;
    },
    "inside": (id) => {
      return insidePls.includes(id) ? 1 : -1;
    },
    "none": () => 0
  }[params.offsetDirection];

  const offsetGeo = [];
  geometryToOffset.forEach((pl, i) => {
    const id = state.selected[i];
    offsetGeo.push(...offset(
      [ pl ],
      offsetDir(id)*params.compensatedRadius, // sign of this is inside or outside
      { 
        arcTolerance: 0.001,
        endType: "etClosedPolygon" 
      }
    ));
  });

  return {
    type: "profile",
    sourceGeometryIds: copy(state.selected),
    geometry: offsetGeo,
    parameters: { ...state.defaultParameters, ...params },
  };
}