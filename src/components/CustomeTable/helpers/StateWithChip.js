import { Chip } from '@material-ui/core';
import React from 'react';

export const stateWithChip = (value, label) => {
  if (value === 'new') {
    return <Chip size="small" label={label} color="primary" />;
  } else {
    return <Chip size="small" label={label} color="secondary" />;
  }
};
