import { svg } from "../../libs/lit-html.bundle.js";
import { upload } from "../uploads.js";
import {extrema} from "../extrema.js";
import {originPoint} from "../originPoint.js";

const getSVGpoint = e => {
  var el = document.getElementById("inner_svg_viewer");
  var pt = el.createSVGPoint();
  pt.x = e.clientX;
  pt.y = e.clientY;

  return pt.matrixTransform(el.getScreenCTM().inverse());
};

const makePath = lines => {
  let path = [];

  lines.forEach((line, i) => {
    path.push({ x: line.origin[0], y: line.origin[1] });
    if (i === lines.length - 1) path.push({ x: line.end[0], y: line.end[1] });
  });

  return path;
};

const makePolyline = path =>
  path.reduce((acc, point) => acc + ` ${point.x},${point.y}`, " ");

export const svg_viewer = state => {
  let inner_svg_viewer = document.getElementById("inner_svg_viewer");
  let scaleWithViewer = 0;
  if (inner_svg_viewer !== null) {
    let w = Number(inner_svg_viewer.getAttribute("width").replace("px", ""));
    let viewBox = inner_svg_viewer.getAttribute("viewBox").split(" ");
    let vw = Number(viewBox[2]);
    scaleWithViewer = vw / w;
  };


  let origin = originPoint(state);

  const rens = [
    svg`
      <circle 
        class="scaleWithViewer" 
        transform="scale(${scaleWithViewer})" 
        transform-origin="${origin.x} ${origin.y}"
        cx="${origin.x}" 
        cy="${origin.y}" 
        r="7" 
        style="fill:orange;" 
      />
    `
  ];

  Object.entries(state.contours).forEach(([k, v]) => {
    // console.log(k, v);
    let path = makePath(v);
    let points = makePolyline(path);

    let classes = ["polyline"];
    if (state.selected.includes(k)) classes.push("selected");

    let polyline = svg`<polyline class="${classes.join(
      " "
    )}" id="${k}:polyline" points="${points}" vector-effect="non-scaling-stroke" stroke="black" fill="none">`;

    rens.push(polyline);
  });

  state.toolpaths.forEach(toolpath => {
    let k = toolpath.id;
    let v = toolpath;

    if (!v.selected) return;
    if (v.type !== "drill") {
      v.geometry.forEach(geo => {
        let path = makePath(geo);
        let points = makePolyline(path);

        let polyline = svg`<polyline id="${k}:polyline:toolpath" points="${points}" vector-effect="non-scaling-stroke" stroke="red" fill="none"/>`;

        rens.push(polyline);
      });
    } else {
      let [x, y] = v.geometry[0][0].origin;
      let crossSize = 10;
      let cross = svg`
        <g  
          id="${k}:polyline:toolpath"
          vector-effect="non-scaling-stroke" 
          stroke="red"
          stroke-width="3px"
          fill="none"
        >
          <polyline points="${x},${y + crossSize} ${x},${y - crossSize}"/>
          <polyline points="${x - crossSize},${y} ${x + crossSize},${y}"/>
        </g>`;

      rens.push(cross);
    }
  });

  return svg`
    <svg
      id="inner_svg_viewer"
      preserveAspectRatio="xMidYMid meet"
      width=10000px
      height=10000px
      viewBox=${`${state.viewBox.v0} ${state.viewBox.v1} ${state.viewBox.v2} ${state.viewBox.v3}`}
      @mousedown=${e => {
        state.mouse_down = true;
        console.log("svgPoint", getSVGpoint(e));
        // console.log("corner", getSVGcorners(e));
        var el = document.getElementById("inner_svg_viewer");
        let w = el.clientWidth;
        let h = el.clientHeight;

        let xFactor, yFactor;
        if (w > h) {
          xFactor = state.viewBox.v2 / w;
          yFactor = state.viewBox.v3 / h;
        } else {
          // h > w or equal
          xFactor = state.viewBox.v2 / w;
          yFactor = state.viewBox.v3 / h;
        }

        if (e.target.id.includes("polyline")) {
          dispatch("SELECT", { id: e.target.id.split(":")[0] });
        }

        if (e.target.id.includes("polyline") && e.detail === 2) {
          dispatch("UNSELECT", { id: e.target.id.split(":")[0] });
        }

        if (e.target.id.includes("inner_svg_viewer") && e.detail === 2) {
          dispatch("CLEAR_SELECTED");
        }

        if (e.target.id.includes("inner_svg_viewer") && e.shiftKey) {
          dispatch("START_BOX", { start: getSVGpoint(e) });
        }

        // console.log("ctm", el.getScreenCTM(), xFactor, yFactor);
      }}
      @mousemove=${e => {
        state.mouse_pos = getSVGpoint(e);
        if (state.mouse_down && e.shiftKey) {
          dispatch("END_BOX", { end: state.mouse_pos });
        } else if (state.mouse_down) {
          // svg pan, translate
          var el = document.getElementById("inner_svg_viewer");

          let xFactor = state.viewBox.v2 / (el.clientWidth - 6);
          let yFactor = state.viewBox.v3 / (el.clientHeight - 6);

          let scale = xFactor > yFactor ? xFactor : yFactor;

          state.viewBox.v0 -= e.movementX * scale;
          state.viewBox.v1 -= e.movementY * scale;

          el.setAttribute(
            "viewBox",
            `${state.viewBox.v0} ${state.viewBox.v1} ${state.viewBox.v2} ${state.viewBox.v3}`
          );
        }
      }}
      @mouseup=${e => {
        state.mouse_down = false;
        window.dispatch("CLEAR_BOX");
      }}
      @wheel=${e => {
        // scroll svg viewbox
        e.preventDefault();

        let scaleFactor = 1;
        if (e.deltaY > 0) {
          scaleFactor = 1.03;
        } else {
          scaleFactor = 0.97;
        }

        state.viewBox.v2 *= scaleFactor;
        state.viewBox.v3 *= scaleFactor;

        var el = document.getElementById("inner_svg_viewer");
        let w = el.clientWidth;
        let h = el.clientHeight;

        let xFactor, yFactor, s;

        var rect = el.getBoundingClientRect();
        var x = e.clientX - rect.left; //x position within the element.
        var y = e.clientY - rect.top; //y position within the element.

        // console.log("% of screen", "x", x/w, "y", y/h);
        if (w > h) {
          s = Math.abs(0.5 - x / w); //*Math.abs(1 - aspectRatio);
          xFactor = state.viewBox.v2 / w;
          yFactor = state.viewBox.v3 / h;
        } else {
          // h > w or equal
          s = Math.abs(0.5 - y / h); //*Math.abs(1 - 1/aspectRatio);
          xFactor = state.viewBox.v2 / w;
          yFactor = state.viewBox.v3 / h;
        }

        let svgPoint = getSVGpoint(e);

        state.viewBox.v0 = svgPoint.x - x * xFactor; // this is affected by the aspect ratio of svg
        state.viewBox.v1 = svgPoint.y - y * yFactor; // this is affected by the aspect ratio of svg

        el.setAttribute(
          "viewBox",
          `${state.viewBox.v0} ${state.viewBox.v1} ${state.viewBox.v2} ${state.viewBox.v3}`
        );

        let w2 = Number(el.getAttribute("width").replace("px", ""));
        let vw = state.viewBox.v2;
        let headScale = vw / w2;

        let els = document.getElementsByClassName("scaleWithViewer");
        for (let i = 0; i < els.length; i++) {
          let current = els[i].getAttribute("transform");
          current = current.replace(
            /scale\([0-9]*.*[0-9]*\)/,
            `scale(${headScale})`
          );
          els[i].setAttribute("transform", current);
        }
      }}
      @dragenter=${e => {
        e.preventDefault();
        e.stopPropagation();
      }}
      @dragover=${e => {
        e.preventDefault();
        e.stopPropagation();
      }}
      @dragleave=${e => {
        e.preventDefault();
        e.stopPropagation();
      }}
      @drop=${e => {
        e.preventDefault();
        e.stopPropagation();

        let dt = e.dataTransfer;
        let files = dt.files;

        let file = files[0];
        upload(file);
      }} 
    >
      ${rens}
      <path 
        id="selectBox"
        d="
          M ${state.selectBox.start.x} ${state.selectBox.start.y} 
          L ${state.selectBox.end.x} ${state.selectBox.start.y} 
          L ${state.selectBox.end.x} ${state.selectBox.end.y}     
          L ${state.selectBox.start.x} ${state.selectBox.end.y}
        "
      />
    </svg>
  `;
};
