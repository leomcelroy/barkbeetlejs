import { html } from "../../libs/lit-html.bundle.js";
import { upload } from "../uploads.js";
import {extrema} from "../extrema.js";

// outline

export const viewer_menu = state => {
  return html`
    <span>
      Filename: 
        <input 
          type="text"
          placeholder="${state.filename}"
          @keyup=${e => {
            dispatch("EDIT_FILENAME", { filename: e.target.value });
          }}>
        </input>
    </span>

    <button 
      @mousedown=${() => {
        dispatch("SAVE");
      }}
    >
      save
    </button>

    <input
      id="contentFile"
      style="
        display:none;
      "
      type="file"
      @change=${e => {
        let files = e.target.files;
        let file = files[0];
        upload(file);
      }}
    />
    <button 
      @mousedown=${() => document.getElementById("contentFile").click()}
    >
      upload (bbjs or svg)
    </button>

    <button 
      id="recenter"
      @click=${() => {

        var svg = document.getElementById("inner_svg_viewer");
        let viewer = document.getElementById("svg_viewer");

        let { xMin, xMax, yMin, yMax } = extrema(state.contours);

        let margin = 100;

        let newWidth =
          Math.abs(xMax - xMin) /
          (viewer.clientWidth / svg.width.baseVal.value);
        let newHeight =
          Math.abs(yMax - yMin) /
          (viewer.clientHeight / svg.height.baseVal.value);
        let v2v3 = newWidth > newHeight ? newWidth : newHeight;

        state.viewBox.v0 = xMin;
        state.viewBox.v1 = yMin;
        // console.log(xMax, yMax);
        state.viewBox.v2 = v2v3;
        state.viewBox.v3 = v2v3;

        svg.setAttribute(
          "viewBox",
          `${state.viewBox.v0} ${state.viewBox.v1} ${state.viewBox.v2} ${state.viewBox.v3}`
        );

        let w2 = Number(svg.getAttribute("width").replace("px", ""));
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
    >
      recenter
    </button>

    Selected: ${state.selected.length}
    <button @mousedown=${() => dispatch("DELETE_SELECTED")}>delete</button>
    ${state.debug ?
      html`
        Debug:
        <button @mousedown=${() => console.log(state)}>log state</button>
        <button @mousedown=${() => dispatch("UPDATE")}>update view</button>
      ` : ""}
  `;
};
