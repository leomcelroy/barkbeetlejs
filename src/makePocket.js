import { isPolylineInside } from "./isPolylineInside.js";
import tk from "./drawingToolkit/toolkit.js";
import { offset } from "./geogram/index.js";

const copy = json => JSON.parse(JSON.stringify(json));

export function makePocket(state, params) {
  const geometryToOffset = state.selected.map(id => state.contours[id][0]);

  // const firstPass = copy(offset(
  //   geometryToOffset,
  //   -params.compensatedRadius, 
  //   { 
  //     arcTolerance: 0.001,
  //     endType: "etClosedPolygon" 
  //   }
  // ));
  // const offsetGeo = [...firstPass];
  // let currentPass = firstPass;
  // while (currentPass.length > 0) {
  //   currentPass = copy(offset(
  //     geometryToOffset,
  //     -params.compensatedRadius * params.stepoverPercentage/100, 
  //     { 
  //       arcTolerance: 0.001,
  //       endType: "etClosedPolygon" 
  //     }
  //   ));
  //   offsetGeo.push(...currentPass);
  // }

  const offsetGeo = [];
  let count = 1;
  let currentPass = geometryToOffset;
  while (currentPass.length > 0) {
    currentPass = offset(
      copy(geometryToOffset),
      -params.compensatedRadius * (count === 1 ? 1 : params.stepoverPercentage/100) * count, 
      { 
        arcTolerance: 0.001,
        endType: "etClosedPolygon" 
      }
    );
    offsetGeo.push(...currentPass);
    count++;
  }



  // feel this shouldn't be neccessary but oh well
  const insidePlsIds = [];

  for (const insideId of state.selected) {

    const geoToCheckAgainst = state.selected
      .filter(id => id !== insideId)
      .map(id => state.contours[id][0])
      ;

    const pls = state.contours[insideId];

    const isInside = isPolylineInside(pls, geoToCheckAgainst);

    if (isInside) {
      insidePlsIds.push(insideId);
    }

  }

  const offsetIslands = [];
  insidePlsIds.forEach(id => {
    const offsetIslandPls = tk.copy(state.contours[id]);
    offset(
      offsetIslandPls, 
      params.compensatedRadius,
      { 
        arcTolerance: 0.001,
        endType: "etClosedPolygon" 
      }
    )

    tk.union(offsetIslands, offsetIslandPls);
  });

  tk.union(offsetGeo, offsetIslands);


  return {
    type: "pocket",
    sourceGeometryIds: copy(state.selected),
    geometry: offsetGeo,
    parameters: { ...state.defaultParameters, ...params },
  };
}