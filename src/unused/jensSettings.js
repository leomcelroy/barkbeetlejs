const bitChoice = {
  mdf: {
    2: {
      diameter: 2,
      type: "down-cut",
    },
    3: {
      diameter: 2,
      type: "down-cut",
    },
    4: {
      diameter: 3,
      type: "down-cut",
    },
    6: {
      diameter: 3,
      type: "up-cut",
    },
    7: {
      diameter: 3,
      type: "up-cut",
    },
    8: {
      diameter: 3,
      type: "up-cut",
    },
    10: {
      diameter: 3,
      type: "up-cut",
    },
    12: {
      diameter: 4,
      type: "up-cut",
    },
    15: {
      diameter: 4,
      type: "up-cut",
    },
    16: {
      diameter: 6,
      type: "up-cut",
    },
    18: {
      diameter: 6,
      type: "up-cut",
    },
    20: {
      diameter: 8,
      type: "up-cut",
    },
    25: {
      diameter: 8,
      type: "up-cut",
    },
    30: {
      diameter: 10,
      type: "up-cut",
    },
    40: {
      diameter: 12,
      type: "up-cut",
    },
  },
  plywood: {
    2: {
      diameter: 2,
      type: "up-cut",
    },
    3: {
      diameter: 2,
      type: "up-cut",
    },
    4: {
      diameter: 3,
      type: "compression",
    },
    6: {
      diameter: 3,
      type: "compression",
    },
    8: {
      diameter: 3,
      type: "compression",
    },
    10: {
      diameter: 3,
      type: "compression",
    },
    12: {
      diameter: 4,
      type: "compression",
    },
    15: {
      diameter: 4,
      type: "compression",
    },
    16: {
      diameter: 6,
      type: "compression",
    },
    18: {
      diameter: 6,
      type: "compression",
    },
    20: {
      diameter: 8,
      type: "compression",
    },
    25: {
      diameter: 8,
      type: "compression",
    },
    30: {
      diameter: 10,
      type: "compression",
    },
    40: {
      diameter: 12,
      type: "compression",
    },
  },
  plastic: {
    2: {
      diameter: 2,
      type: "down-cut",
    },
    3: {
      diameter: 2,
      type: "up-cut",
    },
    4: {
      diameter: 3,
      type: "up-cut",
    },
    6: {
      diameter: 4,
      type: "up-cut",
    },
    8: {
      diameter: 4,
      type: "up-cut",
    },
    10: {
      diameter: 4,
      type: "up-cut",
    },
    12: {
      diameter: 6,
      type: "up-cut",
    },
    15: {
      diameter: 6,
      type: "up-cut",
    },
    16: {
      diameter: 8,
      type: "up-cut",
    },
    18: {
      diameter: 8,
      type: "up-cut",
    },
    20: {
      diameter: 10,
      type: "up-cut",
    },
    25: {
      diameter: 12,
      type: "up-cut",
    },
    30: {
      diameter: 14,
      type: "up-cut",
    },
    40: {
      diameter: 16,
      type: "up-cut",
    },
  },
  aluminum: {
    2: {
      diameter: 2,
      type: "up-cut",
    },
    3: {
      diameter: 2,
      type: "up-cut",
    },
    4: {
      diameter: 3,
      type: "up-cut",
    },
    6: {
      diameter: 4,
      type: "up-cut",
    },
    8: {
      diameter: 6,
      type: "up-cut",
    },
    10: {
      diameter: 6,
      type: "up-cut",
    },
    12: {
      diameter: 8,
      type: "up-cut",
    },
    15: {
      diameter: 10,
      type: "up-cut",
    },
    16: {
      diameter: 12,
      type: "up-cut",
    },
    18: {
      diameter: 16,
      type: "up-cut",
    },
    20: {
      diameter: 16,
      type: "up-cut",
    },
    25: {
      diameter: 20,
      type: "up-cut",
    },
    30: {
      diameter: 20,
      type: "up-cut",
    },
    40: {
      diameter: 25,
      type: "up-cut",
    },
  },
  steel: {
    2: {
      diameter: 3,
      type: "up-cut",
    },
    3: {
      diameter: 4,
      type: "up-cut",
    },
    4: {
      diameter: 4,
      type: "up-cut",
    },
    6: {
      diameter: 6,
      type: "up-cut",
    },
    8: {
      diameter: 8,
      type: "up-cut",
    },
    10: {
      diameter: 10,
      type: "up-cut",
    },
    12: {
      diameter: 12,
      type: "up-cut",
    },
    15: {
      diameter: 16,
      type: "up-cut",
    },
    16: {
      diameter: 16,
      type: "up-cut",
    },
    18: {
      diameter: 20,
      type: "up-cut",
    },
    20: {
      diameter: 20,
      type: "up-cut",
    },
    25: {
      diameter: 25,
      type: "up-cut",
    },
    30: {
      diameter: 30,
      type: "up-cut",
    },
    40: {
      diameter: 40,
      type: "up-cut",
    },
  },
};

let presets6mm = {
  mdf: {
    chiploads: 0.25,
    passdepths: 17,
    rampAngle: 90,
  },
  wood: {
    chiploads: 0.2,
    passdepths: 16,
    rampAngle: 90,
  },
  hardwood: {
    chiploads: 0.133,
    passdepths: 12,
    rampAngle: 45,
  },
  foam_or_wax: {
    chiploads: 0.3,
    passdepths: 19,
    rampAngle: 90,
  },
  plastic_roughing: {
    chiploads: 0.15,
    passdepths: 8,
    rampAngle: 18,
  },
  plastic_finishing: {
    chiploads: 0.073,
    passdepths: 8,
    rampAngle: 18,
  },
  aluminum_roughing: {
    chiploads: 0.12,
    passdepths: 1.8,
    rampAngle: 12,
  },
  aluminum_finishing: {
    chiploads: 0.06,
    passdepths: 1.8,
    rampAngle: 12,
  },
  steel_roughing: {
    chiploads: 0.08,
    passdepths: 0.6,
    rampAngle: 5,
  },
  steel_finishing: {
    chiploads: 0.04,
    passdepths: 0.6,
    rampAngle: 5,
  },
}

const output = (input, rpm, presets6mm, presetDiameter, plungRateReductionFactor) => {
  let {materialToCut, millingBitDiameter, numberOfFlutes} = input;

  let feedrate = (presets6mm[materialToCut].chiploads * rpm * numberOfFlutes * millingBitDiameter)/presetDiameter;
  let plungerate = feedrate * plungRateReductionFactor;

  let fluteReduction = 1-numberOfFlutes*.15;

  let passDepth = presets6mm[materialToCut].passdepths/presetDiameter*millingBitDiameter*(fluteReduction);
  let rampAngle = presets6mm[materialToCut].rampAngle;

  return {
    feedrate,
    plungerate,
    passDepth,
    rampAngle,
  };
}

export const calculateSettings = (material, bitDiameter, numberOfFlutes, rpm, plungRateReductionFactor = 0.6) => {
  let input = {
    materialToCut: material,
    millingBitDiameter: bitDiameter,
    numberOfFlutes: numberOfFlutes,
  };

  return output(input, rpm, presets6mm, 6, plungRateReductionFactor);
}
