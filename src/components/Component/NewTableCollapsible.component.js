import React from 'react';
import PropTypes from 'prop-types';

const NewTableCollapsible = ({ row, indexRow }) => {
  return (
    <React.Fragment>
      <div className="Content"> This is the component of collapsible for {indexRow} row </div>
    </React.Fragment>
  );
};

NewTableCollapsible.propTypes = {
  row: PropTypes.object.isRequired,
  indexRow: PropTypes.number,
};

export default NewTableCollapsible;
