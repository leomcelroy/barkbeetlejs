import React, { useState } from 'react';
import {SelectMenu, Button} from 'evergreen-ui';
import store from '../store.js';

const Origin = ({firstSubmit}) => {

  const [state, setState] = useState({
    selected: null
  });


  return (
    <SelectMenu
      title="Select Material"
      options={
        ['Top Left', 'Top Right', 'Center', 'Bottom Left', 'Bottom Right']
          .map(label => ({ label, value: label }))
      }
      selected={state.selected}
      onSelect={item => {
        if (state.selected === null) {
          firstSubmit("originSubmit");
        }
        setState({ ...state, selected: item.value })
        //update app state here
        store.update({ zero: item.value })
      }}
    >
      <Button>Origin: {state.selected || '...'}</Button>
  </SelectMenu>
  );
}

export {Origin}
