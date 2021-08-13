import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { stateWithChip } from '../CustomeTable/helpers/StateWithChip';

export const COLUMN_DATA = [
  // headerName always should be the tag for translation
  { label: 'title', headerName: 'nameLabel' },
  {
    label: 'condition',
    headerName: 'conditionLabel',
    valueFixed: (value, label) => stateWithChip(value, label),
    translationsLabel: {
      // properties should be the response recived 
      // value should be the tag for translation
      new: 'newLabel',
      used: 'usedLabel',
    },
  },
  { label: 'price', headerName: 'priceLabel', valueFixed: (value) => `$ ${value}` },
];

export const MASSIVE_ACTION_ON_SELECT = {
  title: 'deleteLabel',
  method: () => alert('Delete'),
  description: 'synchronizeDescription',
  icon: <DeleteIcon />,
};
