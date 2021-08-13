import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import '../../translations/i18n';

const NewTableActions = ({ row, indexRow }) => {
  const { t } = useTranslation() 
  return (
    <React.Fragment>
      <Tooltip TransitionComponent={Zoom} title={t('editLabel')}>
        <IconButton id={'Edit' + indexRow} component={Link} to={''} size='small' >
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip TransitionComponent={Zoom} title={t('deleteLabel')}>
        <IconButton id={'Delete' + indexRow} component={Link} to={''} size='small'>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
};

NewTableActions.propTypes = {
  row: PropTypes.object.isRequired,
  indexRow: PropTypes.number,
};

export default NewTableActions;
