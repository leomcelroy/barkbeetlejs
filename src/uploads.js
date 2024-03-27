import {flattenSVG} from '../libs/flattenSVG.js';

import * as utils from './utils.js';
import {connect_points} from './connect_points.js';
import { width, scale, originate } from "./geogram/index.js";

const uploadSVG = (file) => {

  var reader = new FileReader();

  reader.onload = (event) => {
    let text = event.target.result;

    let hmm = document.getElementById('thisIsDumb');
    hmm.innerHTML = text;
    
    let paths = flattenSVG(hmm);

    const pls = paths.map(x => x.points);

    const defaultWidth = width(pls);

    const targetWidth = prompt("Please input desired width in millimeters.\nDefault value is default width.", defaultWidth);

    scale(pls, targetWidth/defaultWidth);
    originate(pls);

    let contours = {};

    pls.forEach(pl => {
      contours[utils.makeID()] = [ pl ];
    })


    dispatch("UPLOAD_SVG", { contours })

  };

  reader.readAsText(file);
}

const uploadBBJS = (file) => {

  var reader = new FileReader();

  reader.onload = (event) => {
    let text = event.target.result;
    let state = JSON.parse(text);

    dispatch("UPLOAD_BBJS", { state });

  };

  reader.readAsText(file);
}

const upload = (file) => {

  let filetype = file.name.split(".");
  filetype = filetype[filetype.length - 1];

  if (filetype === "bbjs") return uploadBBJS(file);
  if (filetype === "svg") return uploadSVG(file);
 
}

export {uploadSVG, uploadBBJS, upload};
