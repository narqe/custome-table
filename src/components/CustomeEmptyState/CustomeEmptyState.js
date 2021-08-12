import React from 'react';
import PropTypes from 'prop-types';
import notResultsFound from '../../assets/noResults.png';
import './CustomeEmptyState.css';

const CustomeEmptyState = ({ title, subtitle }) => {

  return (
    <div
      id="no-result-message"
      className="EmptyState__TableContainer__NoResultsMessage"
    >
      <h2>{title}</h2>
      <p>{subtitle}</p>
      <img
        src={notResultsFound}
        alt={title}
        className="EmptyState__TableContainer__NoResultsMessage__NoResultsImage"
      />
    </div>
  );
};

CustomeEmptyState.defaultProps = {
  title: '',
  subtitle: '',
  loading: false,
};

CustomeEmptyState.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

export default CustomeEmptyState;
