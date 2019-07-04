import * as utils from './utils.js';
import {flattenSVG} from 'flatten-svg';

import {connectPoints} from './unmakerjs/primitives.js';

import store from "./store.js"; //this is my global state library, this is the only file that will getState() it will pass that to all sub components or should i import store in respective components


const uploadSVG = (e) => {

  //main event
  let files = e.target.files;
  let file = files[0];

  var reader = new FileReader();

  reader.onload = (event) => {
    let text = event.target.result;

    let hmm = document.getElementById('thisIsDumb');
    hmm.innerHTML = text;

    let paths = flattenSVG(hmm);

    let contours = {};

    Object.values(paths).forEach(path => {
      let lines = connectPoints(path.points);
      contours[utils.makeID()] = lines;
    })

    contours = {...store.state.contours, ...contours}

    store.update({contours});

  };

  reader.readAsText(file);
}

const uploadBBJS = (e) => {

  //main event
  let files = e.target.files;
  let file = files[0];

  var reader = new FileReader();

  reader.onload = (event) => {
    let text = event.target.result;
    let state = JSON.parse(text);

    store.update(state);

  };

  reader.readAsText(file);
}

export {uploadSVG, uploadBBJS};
