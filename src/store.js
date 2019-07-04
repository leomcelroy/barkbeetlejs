import createStore from 'pure-store';
import * as utils from './utils.js';

import {params} from './parameters.js';
import {profile} from './toolpaths/profile.js';
import {pocket} from './toolpaths/pocket.js';
import {drill} from './toolpaths/drill.js';

import {line} from './unmakerjs/primitives.js'

let testContour = [line([0,0],[40,40]), line([40,40],[20,40]), line([20,40],[0,0])];
let profileCut = profile(testContour, params);
let pocketCut = pocket(testContour, params);
let drillCut = drill(testContour, params);


let defaultParameters = params;


const store = createStore({
  contours: {
    3: testContour,
  },
  toolpaths:[
    {
      type: "profile",
      name: "Profile 1",
      parameters: defaultParameters,
      sourceGeometryID: "3",
      geometry: profileCut,
      id: utils.makeID(),
      cutSelected: false,
      visible: true,
    },
    {
      type: "pocket",
      name: "Pocket 1",
      parameters: defaultParameters,
      sourceGeometryID: "3",
      geometry: pocketCut,
      id: utils.makeID(),
      cutSelected: false,
      visible: true,
    },
    {
      type: "drill",
      name: "Drill 1",
      parameters: defaultParameters,
      sourceGeometryID: "3",
      geometry: drillCut,
      id: utils.makeID(),
      cutSelected: false,
      visible: true,
    },
  ],
  selected: [],
  hovered: [],
  material: "wood",
  thickness: 34,
  units: "mm",
  zero: "bottomleft",
  defaultParameters: defaultParameters, //need to generate these from material, thickness, units
});

export default store;
