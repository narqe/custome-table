import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NewTableActions = ({ row, indexRow }) => {
  return (
    <React.Fragment>
      <Tooltip TransitionComponent={Zoom} title="">
        <IconButton id={'Clone' + indexRow} component={Link} to={''}>
          <FileCopyIcon />
        </IconButton>
      </Tooltip>
      <Tooltip TransitionComponent={Zoom} title="">
        <IconButton id={'Clone' + indexRow} component={Link} to={''}>
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
