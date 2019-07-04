import React, { useState } from 'react';
import {SegmentedControl} from 'evergreen-ui';
import store from '../store.js';

const Units = () => {
  const [state, setState] = useState({
    value: 'mm',
  });

  return (
      <SegmentedControl
        width={80}
        options={[
          { label: 'mm', value: 'mm' },
          { label: 'in', value: 'in' },
        ]}
        value={state.value}
        onChange={value => {
          // update app state here
          setState({...state, value });
          store.update({
            units: value,
            defaultParameters: {
              ...store.state.defaultParameters,
              units: value
            },
          });
        }}
      />
  );
}

export {Units};
