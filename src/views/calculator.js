import { html } from "../../libs/lit-html.bundle.js";

const keyFilter = e => {
  console.log("keypress", e.charCode);
  if (e.charCode === 45) {
    e.preventDefault();
  }
};

export const calculator = state => {
  return html`
    <div>
      <b>Automill Calculator</b>
      <form id="inputs">
        Material:
        <select id="material">
          <option value="wood">wood</option>
          <option value="mdf">mdf</option>
          <option value="foam_or_wax">foam_or_wax</option>
          <option value="hardwood">hardwood</option>
          <option value="plastic_roughing">plastic_roughing</option>
          <option value="plastic_finishing">plastic_finishing</option>
          <option value="aluminum_roughing">aluminum_roughing</option>
          <option value="aluminum_finishing">aluminum_finishing</option>
          <option value="steel_roughing">steel_roughing</option>
          <option value="steel_finishing">steel_finishing</option>
        </select>
        <br />
        Thickness:
        <input
          type="number"
          min="0"
          @keypress=${keyFilter}
          id="materialThickness"
          value="${state.thickness}"
          placeholder="${state.thickness}"
        />
        <br />
        Unit: mm
      </form>
      <div class="vert-spacer"></div>
      <button
        type="submit"
        id="submit1"
        @click=${() => {
          let material = document.getElementById("material").value;
          let materialThickness = parseFloat(document.getElementById("materialThickness").value);

          dispatch("SUGGEST_BIT", {material, materialThickness});
        }}
      >
        ${state.initialized ? "suggest bit" : "initialize"}
      </button>
      <div class="vert-spacer"></div>
      <form id="inputs2">
        Bit Diameter:
        <input
          type="number"
          min="0"
          @keypress=${keyFilter}
          id="bitDiameter"
          ?disabled="${!state.initialized}"
          value="${state.defaultParameters.toolDiameter}"
          placeholder="${state.defaultParameters.toolDiameter}"
        />
        <br />
        Flutes:
        <input
          type="number"
          min="0"
          @keypress=${keyFilter}
          id="flutes"
          ?disabled="${!state.initialized}"
          value="${state.flutes}"
          placeholder="${state.flutes}"
        />
        <br />
        RPM:
        <input
          type="number"
          min="0"
          @keypress=${keyFilter}
          id="rpm"
          ?disabled="${!state.initialized}"
          value="${state.rpm}"
          placeholder="${state.rpm}"
        />
        <br />
      </form>
      <div class="vert-spacer"></div>
      <button
        type="submit"
        id="submit2"
        @click=${() => dispatch("RECALCULATE", {
          material: document.getElementById("material").value,
          thickness: parseFloat(document.getElementById("materialThickness").value),
          bitDiameter: parseFloat(document.getElementById("bitDiameter").value),
          flutes: parseFloat(document.getElementById("flutes").value),
          rpm: parseFloat(document.getElementById("rpm").value),
        })}
        ?disabled="${!state.initialized}"
      >
        re-calculate
      </button>
      <div class="vert-spacer"></div>
      <br />
      <br />
      <b>Settings</b> <br />
      Feed Rate: ${state.defaultParameters.feedRate} mm/min <br />
      Plunge Rate: ${state.defaultParameters.plungeRate} mm/min <br />
      Pass Depth: ${Math.round(state.defaultParameters.passDepth * 100) / 100}
      mm <br />
      Ramp Angle: ${state.defaultParameters.rampAngle} degrees
    </div>
  `;
};
