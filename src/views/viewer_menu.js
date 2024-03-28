import { html } from "../../libs/lit-html.bundle.js";
import { upload } from "../uploads.js";
import tk from "../drawingToolkit/toolkit.js";
import { getSVGCorners } from "../utils.js";

// outline

export const viewer_menu = state => {
  return html`
    <!--
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
    -->

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
        const svgViewer = document.getElementById("svg_viewer");

        const pls = Object.values(state.contours).flat();

        const { xMin, xMax, yMin, yMax } = tk.bounds(pls);

        svgViewer.panZoomMethods.setScaleXY({
          x: [xMin, xMax],
          y: [yMin, yMax]
        })
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
