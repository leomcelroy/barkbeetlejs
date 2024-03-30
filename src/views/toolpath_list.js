import { html } from "../../libs/lit-html.bundle.js";

export const toolpath_list = state => {
  const rows = Object
    .entries(state.toolpaths)
    .sort((a, b) => {
      const i = state.toolpathOrder.indexOf(a[0]);
      const j = state.toolpathOrder.indexOf(b[0]);

      return i - j;
    })
    .map((...args) => drawRow(args, state));

  return html`
    <style>
     .toolpath-table {
        display: flex;
        flex-direction: column;
        padding: .3rem;
        padding-top: 5px; 
        padding-bottom: 5px; 
        border-radius: 5px;
        background: #eaebec;
        margin-top: 5px;
        margin-bottom: 5px;
      }

      .toolpath-header {
        display: grid;
        align-items: center;
        justify-items: start;
        grid-template-columns: 20px 1fr 1fr 1fr 1fr;
        background: #eaebec; 
        border-radius: .3rem;
        padding-bottom: .25rem;
      }

      .toolpath-row {
        display: grid;
        align-items: center;
        justify-items: start;
        grid-template-columns: 20px 1fr 1fr 1fr 1fr;
        background: #eaebec; 
        border-radius: .25rem;
        padding: .15rem;
      }

      .toolpath-row:nth-child(odd) {
        background-color: #eaebec;
      }

      .toolpath-row:nth-child(even) {
        background-color: #d7d4d4;
      }

      .toolpath-table-cell {
        padding: 2px; 
      }

      .toolpath-table-headers {
        font-weight: bold; 
      }

      [toolpath-handle]:hover {
        cursor: grab;
      }

      .hovered-toolpath {
        border-bottom: 2px solid black;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
      }


    </style>
    <div class="toolpath-table">
      <div class="toolpath-header">
        <div class="toolpath-table-headers"></div>
        <div class="toolpath-table-headers">name</div>
        <div class="toolpath-table-headers">type</div>
        <div class="toolpath-table-headers">modify</div>
        <div class="toolpath-table-headers">select/view</div>
      </div>

      <div style="max-height: 200px; overflow: auto;">
        <div style="height: 5px;" class="toolpath-row" data-toolpath-index=${-1} toolpath></div>
        ${rows}
      </div>

    </div>
  `;
};

function drawRow([ [k, toolpath], i ], state) {

  return html`
    <div class="toolpath-row" data-toolpath-id=${k} data-toolpath-index=${i} toolpath>
      <div class="toolpath-table-cell" toolpath-handle>⠿</div>
      
      <div class="toolpath-table-cell">${toolpath.parameters.name}</div>

      <div class="toolpath-table-cell">${toolpath.type}</div>
      
      <div class="toolpath-table-cell">
        <button @click=${() => dispatch(`EDIT_${toolpath.type.toUpperCase()}`, { id: k })}>
          Edit
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
