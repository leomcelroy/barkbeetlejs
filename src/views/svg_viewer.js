import { svg } from "../../libs/lit-html.bundle.js";
import { upload } from "../uploads.js";
import { originPoint } from "../originPoint.js";
import { getSVGCorners } from "../utils.js";

const getSVGpoint = e => {
  var el = document.getElementById("inner_svg_viewer");
  var pt = el.createSVGPoint();
  pt.x = e.clientX;
  pt.y = e.clientY;

  return pt.matrixTransform(el.getScreenCTM().inverse());
};

const drawOrigin = state => {
  const origin = originPoint(state);

  return svg`
    <circle 
      class="transform-group-no-scale"
      cx="${origin.x}" 
      cy="${origin.y}" 
      r=${7} 
      style="fill:orange;" 
    />
  `
}

export const svg_viewer = state => {

  const rens = [];

  Object.entries(state.contours).forEach(([k, v]) => {
    // console.log(k, v);
    
    let classes = ["polyline"];
    if (state.selected.includes(k)) classes.push("selected");

    let d = "";
    v[0].forEach((pt, i) => {
      const [ x, y ] = pt;
      if (i === 0) d += `M ${x},${y} `;
      else d += `L ${x},${y} `
    });

    let polyline = svg`<path d=${d} class="${classes.join(" ")}" id="${k}:polyline" vector-effect="non-scaling-stroke" stroke="black" fill="none">`;

    rens.push(polyline);
  });

  Object.entries(state.toolpaths).forEach(([ k, toolpath ]) => {
    
    if (!state.selectedToolpaths.has(k)) return;

    if (toolpath.type !== "drill") {
      toolpath.geometry.forEach(pl => {

        let d = "";
        pl.forEach((pt, i) => {
          const [ x, y ] = pt;
          if (i === 0) d += `M ${x},${y} `;
          else d += `L ${x},${y} `
        });

        let polyline = svg`<path d=${d} id="${k}:polyline:toolpath" vector-effect="non-scaling-stroke" stroke="red" fill="none"/>`;

        rens.push(polyline);
      });
    } else {
      toolpath.geometry.forEach(pl => {
        let [x, y] = pl[0];
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
      })
    }
  });

  return svg`
    <svg
      id="inner_svg_viewer"
      preserveAspectRatio="xMidYMid meet"
      width="100%"
      height="100%"
      @mousedown=${e => {
        state.mouse_down = true;

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
      }}
      @mousemove=${e => {
        state.mouse_pos = getSVGpoint(e);
        if (state.mouse_down && e.shiftKey) {
          dispatch("END_BOX", { end: state.mouse_pos });
        } 
      }}
      @mouseup=${e => {
        state.mouse_down = false;
        window.dispatch("CLEAR_BOX");
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
      <g class="transform-group">
        ${rens}
        ${drawOrigin(state)}
      </g>
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
