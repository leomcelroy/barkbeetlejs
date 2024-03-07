const makeSeries = (s, n, c) => {
  let l = [];
  l.push(s);

  for (let i = 0; i < c - 1; i++) {
    l.push(l[i] + n);
  }

  return l;
}

//const editSVG  = (svg) => `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ${svg.slice(4)}`;
const editSVG  = (svg) => {
  // console.log(svg);
  //let path = `${svg.slice(226, svg.length-10)}`;
  let group = `${svg.slice(52, svg.length-6)}`;

  //console.log(group);
  return group;
}

const download = (filename, text) => {
  var pom = document.createElement('a');

  pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  pom.setAttribute('download', `${filename}`);

  if (document.createEvent) {
      var event = document.createEvent('MouseEvents');
      event.initEvent('click', true, true);
      pom.dispatchEvent(event);
  }
  else {
      pom.click();
  }
}

const getSVGpoint = (evt, v0, v1, v2, v3, width, height) => { //should this be a method on Workplane in Workplane.js
  var svg = document.querySelector('svg');
  var pt = {x: 0, y: 0};

  let svgBox = svg.getBoundingClientRect();
  let boxWidth = svgBox.width;
  let boxHeight = svgBox.height;
  let xOffset = svgBox.x;
  let yOffset = svgBox.y;
  let xScale = v2/boxWidth;
  let yScale = v3/boxHeight;

  //console.log(xScale, yScale)

  pt.x = (evt.clientX - xOffset)/boxWidth * width * xScale + v0;
  pt.y = (evt.clientY - yOffset)/boxHeight * height * yScale + v1;

  return pt;
  //return pt.matrixTransform(svg.getScreenCTM().inverse());
}

const deepcopy = (thing) => JSON.parse(JSON.stringify(thing));

const flattenDeep = (arr1) => {
   return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
}

//align curve directions

//detect curves inside curves

//generate uuid
const makeID = () => Math.random().toString(36).substr(2, 9); //id

//check if number
const isNum = (str) => {
  let regex = /[0-9.]+$/;
  let found = str.match(regex);

  if (found === null || found.length !== 1) {
    return false
  }

  return str.match(regex)[0].length === str.length;
}

const helpExtract = (p) => document.getElementsByName(p)[0].value;


export {
  makeSeries,
  editSVG,
  download,
  getSVGpoint,
  deepcopy,
  makeID,
  isNum,
  helpExtract,
  flattenDeep
}
