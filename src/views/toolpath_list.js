import { html } from "../../libs/lit-html.bundle.js";

export const toolpath_list = state => {
  let rows = state.toolpaths.map((toolpath, i) => {
    let k = toolpath.id;

    let c = "rTableRow";
    if (state.toolpath_drag.target === k) {
      c += " hoveredRow";
    }

    if (toolpath.id !== toolpath.group) return "";

    return html`
      <div 
        class="${c}" 
        id="tablerow:${k}"
        draggable="true" 
        @dragstart=${(e) => {
          let id = e.target.id.split(":")[1];
          dispatch("DRAGGED", {dragged: id});
        }}
        @dragover=${e => {
          e.preventDefault();

          let row = e.target.parentElement;
          let id = row.id;
          if (id.includes("tablerow")) {
            // row.classList.add("hoveredRow");
            // should maybe add drag target state
            id = id.split(":")[1];
            dispatch("DRAG_TARGET", {target: id});
          }
        }}
        @dragend=${e => {
          dispatch("REORDER");
        }}
      >
        <div class="rTableCell">${toolpath.parameters.name}</div>
        <div class="rTableCell">${toolpath.type}</div>
        <div class="rTableCell">
          <button
            @click=${() =>
              dispatch(`EDIT_${toolpath.type.toUpperCase()}`, { id: i })}
          >
            edit
          </button>
        </div class="rTableCell">
        <div class="rTableCell">
          <input
            id="checkbox:${k}"
            @click=${() => dispatch("SELECT_TOOLPATH", { id: i })}
            type="checkbox"
            ?checked="${toolpath.selected}"
          />
        </div>
      </div>
    `;
  });

  let endClass = "rTableRow endstop";
  if (state.toolpath_drag.target === "LAST") {
    endClass += " hoveredRow";
  }

  return html`
    <div class="rTable">
      <div class="rTableRow">
        <div class="rTableHead">name</div>
        <div class="rTableHead">type</div>
        <div class="rTableHead">modify</div>
        <div class="rTableHead">select/view</div>
      </div>
      <div
        class="rTableBody"
        id="rTableBody"
        @wheel=${e => {
          // console.log("why aren't you scrolling");
          // TODO: Why do I need this hack?
          let el = document.getElementById("rTableBody");

          // console.log(el.scrollTop, e.movementY, e);
          el.scroll(0, el.scrollTop + e.deltaY);
        }}
      >
        ${rows}
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
      </div>
    </div>
  `;
};


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
