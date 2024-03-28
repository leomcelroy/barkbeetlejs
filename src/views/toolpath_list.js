import { html } from "../../libs/lit-html.bundle.js";

export const toolpath_list = state => {
  const rows = Object.entries(state.toolpaths).map((...args) => drawRow(args, state));

  return html`
    <style>
     .toolpath-table {
        display: flex;
        flex-direction: column;
        gap: 10px; 
        padding: 5px;
        padding-top: 5px; 
        padding-bottom: 5px; 
        border-radius: 5px;
        background: #eaebec;
        margin-top: 5px;
        margin-bottom: 5px;
        max-height: 200px;
        overflow: auto;
      }

      .toolpath-row {
        display: grid;
        grid-template-columns: repeat(4, 1fr); 
      }

      .toolpath-table-cell {
        padding: 2px; 
      }

      .toolpath-table-headers {
        font-weight: bold; 
      }
    </style>
    <div class="toolpath-table">
      <div class="toolpath-row">
        <div class="toolpath-table-headers">name</div>
        <div class="toolpath-table-headers">type</div>
        <div class="toolpath-table-headers">modify</div>
        <div class="toolpath-table-headers">select/view</div>
      </div>
      ${rows}
    </div>
  `;
};

function drawRow([ [k, toolpath], i ], state) {

  return html`
    <div class="toolpath-row" data-toolpath-id=${k} data-toolpath-index=${i} toolpath>
      <div class="toolpath-table-cell">${toolpath.parameters.name}</div>

      <div class="toolpath-table-cell">${toolpath.type}</div>
      
      <div class="toolpath-table-cell">
        <button 
          @click=${() => dispatch(`EDIT_${toolpath.type.toUpperCase()}`, { id: k })}
          >
          edit
        </button>
      </div>

      <div class="toolpath-table-cell">
        <input
          id="checkbox:${k}"
          @click=${() => dispatch("SELECT_TOOLPATH", { id: k })}
          type="checkbox"
          .checked="${state.selectedToolpaths.has(k)}"
          />
      </div>
    </div>
  `;
}


  /* <thead>
<tr>
    <th colspan="5">The table header</th>
</tr>
</thead> */


// @dragover=${e => {
//   let row = e.target;
//   let id = row.id;
//   if (id.includes("tablerow")) {
//     row.classList.add("hoveredRow");
//   }
// }}
// @dragleave=${e => {
//   let row = e.target;
//   let id = row.id;
//   if (id.includes("tablerow")) {
//     row.classList.remove("hoveredRow");
//   }
// }}
// @drop=${e => {
//   let id = e.target.id;
//   console.log("dropped on", id);
// }}

/*

  let endClass = "rTableRow endstop";
  if (state.toolpath_drag.target === "LAST") {
    endClass += " hoveredRow";
  }

  <div
    class="${endClass}"
    id="tablerow:LAST"
    @dragover=${e => {
      e.preventDefault();
      dispatch("DRAG_TARGET", {target: "LAST"});
    }}
    @dragend=${e => {
      dispatch("REORDER");
    }}
  ></div>

  */
