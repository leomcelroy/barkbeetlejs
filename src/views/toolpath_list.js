import { html } from "../../libs/lit-html.bundle.js";

export const toolpath_list = state => {
  let rows = Object.entries(state.toolpaths).map(([k, toolpath], i) => {

    let c = "rTableRow";
    if (state.toolpath_drag.target === k) {
      c += " hoveredRow";
    }

    if (toolpath.id !== toolpath.group) return "";

    return html`
      <div class="${c}" id="tablerow:${k}" data-tablerow=${k} toolpath >
        <div class="rTableCell">${toolpath.parameters.name}</div>
        <div class="rTableCell">${toolpath.type}</div>
        <div class="rTableCell">
          <button
            @click=${() =>
              dispatch(`EDIT_${toolpath.type.toUpperCase()}`, { id: k })}
          >
            edit
          </button>
        </div class="rTableCell">
        <div class="rTableCell">
          <input
            id="checkbox:${k}"
            @click=${() => dispatch("SELECT_TOOLPATH", { id: k })}
            type="checkbox"
            .checked="${state.selectedToolpaths.has(k)}"
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
        @dragstart=${e => {
          if (e.target.hasAttribute('data-tablerow')) {
            dispatch("DRAG_START", { dragged: e.target.getAttribute('data-tablerow') });
          }
        }}
        @dragover=${e => {
          e.preventDefault();
          const targetRow = e.target.closest('[data-tablerow]');
          if (targetRow) {
            dispatch("DRAG_OVER", { target: targetRow.getAttribute('data-tablerow') });
          }
        }}
        @drop=${e => {
          e.preventDefault();
          const targetRow = e.target.closest('[data-tablerow]');
          if (targetRow) {
            dispatch("DROP", { target: targetRow.getAttribute('data-tablerow') });
          }
        }}
        @dragstart=${e => {
          if (e.target.hasAttribute('data-tablerow')) {
            dispatch("DRAG_START", { dragged: e.target.getAttribute('data-tablerow') });
          }
        }}
        @dragover=${e => {
          e.preventDefault();
          const targetRow = e.target.closest('[data-tablerow]');
          if (targetRow) {
            dispatch("DRAG_OVER", { target: targetRow.getAttribute('data-tablerow') });
          }
        }}
        @drop=${e => {
          e.preventDefault();
          const targetRow = e.target.closest('[data-tablerow]');
          if (targetRow) {
            dispatch("DROP", { target: targetRow.getAttribute('data-tablerow') });
          }
        }}
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
