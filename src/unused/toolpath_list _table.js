import { html } from "https://cdn.pika.dev/lit-html@^1.1.2";

export const toolpath_list = state => {
  let rows = state.toolpaths.map(toolpath => {
    let k = toolpath.id;
    
    return html`
      <tr>
        <td>${toolpath.parameters.name}</td>
        <td>${toolpath.type}</td>
        <td>
          <button
            @click=${() => dispatch(`EDIT_${toolpath.type.toUpperCase()}`, { id: k })}
          >
            edit
          </button>
        </td>
        <td>^v</td>
        <td>
          <input
            id="checkbox:${k}"
            @click=${() => dispatch("SELECT_TOOLPATH", { id: k })}
            type="checkbox"
            ?checked="${toolpath.selected}"
          />
        </td>
      </tr>
    `;
  });
  return html`
    <table class="tableBodyScroll fixed">
      <thead>
        <tr id="tableHead">
          <th>name</th>
          <th>type</th>
          <th>modify</th>
          <th>reorder</th>
          <th>select/view</th>
        </tr>
      </thead>
      <tbody @wheel=${() => console.log("scroll body")}>
        ${rows}
      </tbody>
    </table>
  `;
};

{
  /* <thead>
<tr>
    <th colspan="5">The table header</th>
</tr>
</thead> */
}
