import { html } from "../../libs/lit-html.bundle.js";

const keyFilter = e => {
  console.log("keypress", e.charCode);
  if (e.charCode === 45) {
    e.preventDefault();
  }
};

const extract = name => {
  // console.log("extract", name);
  return parseFloat(document.getElementById(name).value);
};

export const pop_up_menu = state => {
  let params = state.defaultParameters;
  if (state.popUpType.edit !== "") {
    let id = state.popUpType.edit;
    // console.log(id, state.toolpaths);
    params = {...params, ...state.toolpaths[id].parameters};
  }
  return html`
    <div id="pop_up_menu">
      <b
        >${
          state.popUpType.type === "default"
            ? "Default Settings"
            : "This Toolpath's Settings"
        }</b
      >
      <br /><br />
      <div style="${!state.popUpType.default ? "" : "display:none;"}">
        Name:
        <input type="text" id="name" value="${params.name}" placeholder="${params.name}" />
        <br /><br />
      </div>

        Depth of Cut:
        <input
          type="number"
          min="0"
          @keypress=${keyFilter}
          id="cutDepth"
          value="${params.cutDepth}"
          placeholder="${params.cutDepth}"
        />
        <br /><br />
        Pass Depth:
        <input
          type="number"
          min="0"
          @keypress=${keyFilter}
          id="passDepth"
          value="${Math.round(params.passDepth * 100) / 100}"
          placeholder="${Math.round(params.passDepth * 100) /
            100}"
        />
        <br /><br />
        Tool Diameter:
        <input
          type="number"
          min="0"
          @keypress=${keyFilter}
          id="toolDiameter"
          value="${params.toolDiameter}"
          placeholder="${params.toolDiameter}"
        />
        <br /><br />
        Feed Rate:
        <input
          type="number"
          min="0"
          @keypress=${keyFilter}
          id="feedRate"
          value="${params.feedRate}"
          placeholder="${params.feedRate}"
        />
        <br /><br />
        Tolerance:
        <input
          type="number"
          min="0"
          @keypress=${keyFilter}
          id="tolerance"
          value="${params.tolerance}"
          placeholder="${params.tolerance}"
        />
        <br /><br />
        Jog Rate:
        <input
          type="number"
          min="0"
          @keypress=${keyFilter}
          id="jogRate"
          value="${params.jogRate}"
          placeholder="${params.jogRate}"
        />
        <br /><br />
        Jog Height:
        <input
          type="number"
          min="0"
          @keypress=${keyFilter}
          id="jogHeight"
          value="${params.jogHeight}"
          placeholder="${params.jogHeight}"
        />
        <br /><br />
        <div
        style="${state.popUpType.type !== "drill" ? "" : "display:none;"}"
        >
          Auto Dogbone (WIP!):
          <input
            type="checkbox"
            id="autoDogbones"
            ?checked="${params.dogbone}"
          />
          <br /><br />
        </div>

        <div
          style="${
            state.popUpType.default || state.popUpType.type === "profile"
              ? ""
              : "display:none;"
          }"
        >
          Offset Direction (for profiles):
          <select id="offsetDirection">
            <option
              value="outside"
              ?selected="${params.offsetDirection ===
                "outside"}"
              >outside</option
            >
            <option
              value="inside"
              ?selected="${params.offsetDirection ===
                "inside"}"
              >inside</option
            >
            <option
              value="none"
              ?selected="${params.offsetDirection === "none"}"
              >none</option
            >
          </select>
          <br /><br />
        </div>
          <div
            style="${
              state.popUpType.default || state.popUpType.type === "profile"
                ? ""
                : "display:none;"
            }"
          >
            Auto Tabs (for profiles) (WIP!):
            <input
              type="checkbox"
              id="autoTabs"
              ?checked="${params.tabs}"
            />
            <br /><br />
            
            Tab Thickness:
            <input
              type="number"
              min="0"
              @keypress=${keyFilter}
              id="tabThickness"
              value="${params.tabThickness}"
              placeholder="${params.tabThickness}"
            />
            <br /><br />
            </div>
            <div
              style="${
                state.popUpType.default || state.popUpType.type === "pocket"
                  ? ""
                  : "display:none;"
              }"
            >
              Stepover Percentage (for pockets):
              <input
                type="number"
                min="0"
                @keypress=${keyFilter}
                id="stepoverPercentage"
                value="${params.stepoverPercentage}"
                placeholder="${params.stepoverPercentage}"
              />
              <br /><br />
            </div>

            <button @click=${() => dispatch("CLOSE_POP_UP_MENU")}>
              cancel
            </button>
            <button
              @click=${() => {
                let toolDiameter = extract("toolDiameter");
                let cutDepth = extract("cutDepth");
                let tolerance = extract("tolerance");
                let passDepth = extract("passDepth");
                let toolRadius = toolDiameter / 2;
                let compensatedRadius = toolRadius + tolerance;

                let dogbone = document.getElementById("autoDogbones").checked;
                let tabs = document.getElementById("autoTabs").checked;

                let offsetDirection = document.getElementById("offsetDirection")
                  .value;

                let name = document.getElementById("name").value;

                dispatch("SAVE_PARAMETERS", {
                  params: {
                    name, //used
                    dogbone, //not used
                    offsetDirection, //used
                    tabs, //not used
                    tabThickness: extract("tabThickness"), //not used
                    jogHeight: extract("jogHeight"), //used
                    stepoverPercentage: extract("stepoverPercentage"), //used
                    jogRate: extract("jogRate"), //used
                    tolerance,
                    cutDepth, //used
                    feedRate: extract("feedRate"), //used
                    toolDiameter,
                    compensatedRadius,
                    passDepth
                  }
                });
              }}
            >
              ${state.popUpType.type === "default" ? "save" : "create"}
            </button>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  `;
};
