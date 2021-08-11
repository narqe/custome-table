import React from 'react';
import { Chip } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';

export const COLUMN_DATA = [
  // headerName always should be the tag for translation
  { label: 'id', headerName: 'idLabel' },
  { label: 'name', headerName: 'nameLabel' },
  {
    label: 'state',
    headerName: 'statusLabel',
    valueFixed: (value) => {
      if (value === 'ACTIVE') {
        return (
          <Chip
            size="small"
            label={'ACTIVE'}
            clickable
            color="primary"
            deleteIcon={<DoneIcon />}
          />
        )
      } else {
        return (
          <Chip
          size="small"
          label={'INACTIVE'}
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
