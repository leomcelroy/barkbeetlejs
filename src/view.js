import { html } from "../libs/lit-html.bundle.js";
import { svg_viewer } from "./views/svg_viewer.js";
import { viewer_menu } from "./views/viewer_menu.js";
import { calculator } from "./views/calculator.js";
import { pop_up_menu } from "./views/pop_up_menu.js";
import { toolpath_list } from "./views/toolpath_list.js";

export const view = state => {
  
  return html`
    <div class="noselect" id="grid_container">
      <div id="viewer">
        <div id="viewer_menu">${viewer_menu(state)}</div>
        <div id="svg_viewer">${svg_viewer(state)}</div>
      </div>
      <div id="right_menu">
        <div id="settings">
          ${calculator(state)}
          <br />
          Origin:
          <select id="origin" @change=${(e) => dispatch("CHANGE_ORIGIN", {origin: e.target.value})}>
            <option value="center" ?selected="${state.origin === "center"}">center</option>
            <option value="top_left" ?selected="${state.origin === "top_left"}">top_left</option>
            <option value="bottom_left" ?selected="${state.origin === "bottom_left"}">bottom_left</option>
            <option value="top_right" ?selected="${state.origin === "top_right"}">top_right</option>
            <option value="bottom_right" ?selected="${state.origin === "bottom_right"}">bottom_right</option>
          </select>
          <br /><br />
          ${state.initialized
            ? html`
                <button
                  @click=${() => window.dispatch("EDIT_DEFAULT_SETTINGS")}
                >
                  edit default settings
                </button>
              `
            : html`
                <b class="alert">Initialize to Create Toolpaths!</b>
              `}
        </div>
        <div id="toolpaths">
          <b>Create Toolpath: </b>

          <button
            @click=${() => window.dispatch("CREATE_PROFILE")}
            ?disabled="${!state.initialized}"
          >
            profile
          </button>
          <button
            @click=${() => window.dispatch("CREATE_POCKET")}
            ?disabled="${!state.initialized}"
          >
            pocket
          </button>
          <button
            @click=${() => window.dispatch("CREATE_DRILL")}
            ?disabled=${!state.initialized}
          >
            drill
          </button>
          <br /><br />

          <b>Toolpaths</b>
          <br />
          ${toolpath_list(state)}
          <button @click=${() => window.dispatch("DOWNLOAD_GCODE")}>export</button>
          <button @click=${() => window.dispatch("DELETE_TOOLPATHS")}>
            delete
          </button>
          <button @click=${() => window.dispatch("SELECT_ALL_TOOLPATHS")}>
            select/view all
          </button>
        </div>
        <svg width="0" height="0" id="thisIsDumb"></svg>
      </div>
    </div>
    ${state.showPopUpMenu && pop_up_menu(state)}
  `;
};
