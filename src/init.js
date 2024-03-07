// initial state
export const init = (options = {}) => {
  return {
    debug: true,
    contours: {},
    toolpaths: [],
    selected: [],
    material: "wood",
    thickness: 0,
    flutes: 0,
    rpm: 0,
    units: "mm",
    origin: "top_left",
    initialized: false,
    defaultParameters: {
      name: "anon", //used
      dogbone: false, //not used
      offsetDirection: "outside", //used
      tabs: false, //not used
      tabThickness: 0, //not used
      jogHeight: 5, //used
      stepoverPercentage: 60, //used
      jogRate: 6000, //used
      // units: "mm", //used
      tolerance: 0,
      // derived values
      // need to generate these from material, thickness, units
      plungeRate: 0, //used
      cutDepth: 0, //used
      passDepth: 0, //used
      feedRate: 0, //used
      toolDiameter: 0,
      rampAngle: 0,
      compensatedRadius: 0 //toolDiameter/2 + tolerance, //used
    },
    filename: "untitled",
    mouse_down: false,
    mouse_pos: {x: 0, y:0},
    viewBox: {
      v0: 0,
      v1: 0,
      v2: 500,
      v3: 500
    },
    selectBox: {
      start: {x: 0, y: 0},
      end: {x: 0, y: 0}
    },
    showPopUpMenu: false,
    popUpType: {
      type: "",
      default: true
    },
    toolpath_drag: {
      dragged: undefined,
      target: undefined
    },
    ...options
  }
};
