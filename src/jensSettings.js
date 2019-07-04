let exampleInput = {
  materialToCut: "wood",
  millingBitDiameter: 4,
  numberOfFlutes: 1,
}

let presets6mm = {
  foam_or_wax: {
    chiploads: 0.3,
    passdepths: 19,
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

  let passDepth = presets6mm[materialToCut].passdepths/presetDiameter*millingBitDiameter;
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
