import {flattenSVG} from '../libs/flattenSVG.js';

import * as utils from './utils.js';
import {connect_points} from './connect_points.js';


const uploadSVG = (file) => {

  var reader = new FileReader();

  reader.onload = (event) => {
    let text = event.target.result;

    let hmm = document.getElementById('thisIsDumb');
    hmm.innerHTML = text;
    
    let paths = flattenSVG(hmm);

    let contours = {};

    Object.values(paths).forEach(path => {
      let lines = connect_points(path.points);
      contours[utils.makeID()] = lines;
    })


    dispatch("UPLOAD_SVG", {contours})

  };

  reader.readAsText(file);
}

const uploadBBJS = (file) => {

  var reader = new FileReader();

  reader.onload = (event) => {
    let text = event.target.result;
    let state = JSON.parse(text);

    dispatch("UPLOAD_BBJS", {state})

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
