import React, { useState } from 'react';
import {Button, SelectMenu} from 'evergreen-ui';
import store from '../store.js';

const MaterialType = ({firstSubmit}) => {

  const [state, setState] = useState({
    selected: null
  });

  return (
      <SelectMenu
        title="Select Material"
        options={
          ['Oak', 'Plywood', 'Cherry', 'HDF', 'MDF', 'Aluminum', 'Steel']
            .map(label => ({ label, value: label }))
        }
        selected={state.selected}
        onSelect={item => {
          if (state.selected === null) {
            firstSubmit("materialSubmit");
          }
          setState({
            ...state,
            selected: item.value,
          })
          //update app state here
          store.update({material:item.value});
        }}
      >
        <Button>Material: {state.selected || '...'}</Button>
    </SelectMenu>
  );
}

export {MaterialType};
