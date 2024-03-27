import { createListener } from "../createListener.js";

export function addToolpathDrag(state) {
  const body = document.body;
  const listen = createListener(body);

  listen("mousedown", "[toolpath], [toolpath] > *", e => {
    // dispatch("DRAGGED", { dragged: id });
  })

  // @dragstart=${(e) => {
  //   let id = e.target.id.split(":")[1];
  //   dispatch("DRAGGED", {dragged: id});
  // }}
  // @dragover=${e => {
  //   e.preventDefault();

  //   let row = e.target.parentElement;
  //   let id = row.id;
  //   if (id.includes("tablerow")) {
  //     // row.classList.add("hoveredRow");
  //     // should maybe add drag target state
  //     id = id.split(":")[1];
  //     dispatch("DRAG_TARGET", {target: id});
  //   }
  // }}
  // @dragend=${e => {
  //   dispatch("REORDER");
  // }}
}export function addToolpathDrag(tableBody, dispatch) {
  tableBody.addEventListener('dragstart', e => {
    if (e.target.hasAttribute('data-tablerow')) {
      dispatch("DRAG_START", { dragged: e.target.getAttribute('data-tablerow') });
    }
  });

  tableBody.addEventListener('dragover', e => {
    e.preventDefault();
    const targetRow = e.target.closest('[data-tablerow]');
    if (targetRow) {
      dispatch("DRAG_OVER", { target: targetRow.getAttribute('data-tablerow') });
    }
  });

  tableBody.addEventListener('drop', e => {
    e.preventDefault();
    const targetRow = e.target.closest('[data-tablerow]');
    if (targetRow) {
      dispatch("DROP", { target: targetRow.getAttribute('data-tablerow') });
    }
  });
}
import { dispatch } from '../dispatch.js';

export function addToolpathDrag(tableBody) {
  tableBody.addEventListener('dragstart', e => {
    if (e.target.hasAttribute('data-tablerow')) {
      dispatch("DRAG_START", { dragged: e.target.getAttribute('data-tablerow') });
    }
  });

  tableBody.addEventListener('dragover', e => {
    e.preventDefault();
    const targetRow = e.target.closest('[data-tablerow]');
    if (targetRow) {
      dispatch("DRAG_OVER", { target: targetRow.getAttribute('data-tablerow') });
    }
  });

  tableBody.addEventListener('drop', e => {
    e.preventDefault();
    const targetRow = e.target.closest('[data-tablerow]');
    if (targetRow) {
      dispatch("DROP", { target: targetRow.getAttribute('data-tablerow') });
    }
  });
}
