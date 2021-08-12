import React from 'react';
import { Chip } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';

export const COLUMN_DATA = [
  // headerName always should be the tag for translation
  { label: 'id', headerName: 'idLabel' },
  { label: 'title', headerName: 'nameLabel' },
  {
    label: 'condition',
    headerName: 'Condition',
    valueFixed: (value) => {
      if (value === 'new') {
        return (
          <Chip
            size="small"
            label={'New'}
            clickable
            color="primary"
            deleteIcon={<DoneIcon />}
          />
        )
      } else {
        return (
          <Chip
          size="small"
          label={'Used'}
          clickable
          color="secondary"
          />
        )
      }
    },
  },
];

export const MASSIVE_ACTION_ON_SELECT = {
  title: 'deleteLabel',
  method: () => alert('Delete'),
  description: 'synchronizeDescription',
  icon: <DeleteIcon />,
};
