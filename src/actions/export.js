import { drillGcode } from "../toolpaths/drill.js";
import { pocketGcode } from "../toolpaths/pocket.js";
import { profileGcode } from "../toolpaths/profile.js";

import { transformations } from "../gcodeManipulations.js";
import * as utils from "../utils.js";

const download_gcode = ({ toolpaths, filename }) => {
  let text = [];
  toolpaths.forEach(path => {
    if (path.selected) {
      // if(path.cutSelected) {
      let geometry = path.geometry;

      geometry = transformations.reflect(geometry, false, true);
      // geometry = transformations.scale(geometry, 0.5, 0.5);

      let gcode;
      if (path.type === "profile")
        gcode = profileGcode(geometry, path.parameters);
      if (path.type === "pocket")
        gcode = pocketGcode(geometry, path.parameters);
      if (path.type === "drill") {
        gcode = drillGcode(geometry, path.parameters);
      };

      //       if (path.type === "drill") gcode = drillGcode(geometry, path.parameters);
      //       else {
      //         //now I can mutate geometry
      // \
      //       }

      text.push(gcode);
    }
  });

  utils.download(`${filename}.gcode`, text.join("\n"));
};
