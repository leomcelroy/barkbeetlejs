import React, { useState } from 'react';
import {Button, Dialog, TextInputField} from 'evergreen-ui';
import * as utils from '../utils.js';
import store from '../store.js';

const MaterialThickness = ({firstSubmit}) => {
  const [state, setState] = useState({
    isShown: false,
    value: "...",
    valid: true,
  });

  return (
      <div>
        <Dialog
          isShown={state.isShown}
          title="Material Thickness"
          onCloseComplete={() => setState({...state, isShown:false})}
          onConfirm={() => {
            if (state.valid) {
              let value = document.getElementsByName("thickness")[0].value;
              if (state.value === "...") {
                firstSubmit("thicknessSubmit");
              }
              setState({
                ...state,
                isShown:false,
                value
              });

              //update app state here
              store.update({thickness:value});
            }

          }}>

          <TextInputField
            onChange={e => {
              let valid = utils.isNum(e.target.value);
              setState({...state, valid})
            }}
            isInvalid={!state.valid}
            name="thickness"
            placeholder={state.value}
            description={(state.valid) ? "" : "please enter a valid number"}
            label=""
          />
        </Dialog>
        <Button onClick={() => setState({...state, isShown:true})}>{`Thickness: ${state.value}`}</Button>
      </div>
  );
}

export {MaterialThickness};
