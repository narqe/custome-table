import React from 'react';
import PropTypes from 'prop-types';
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
  Grid,
  Fab,
} from '@material-ui/core';
import './CustomErrorDialog.css';
import '../../translations/i18n';

const CustomErrorDialog = ({
  fullpage,
  header,
  title,
  message,
  buttonText,
  img,
  errorMessage,
}) => {

  return (
      <>
        <Grid
          container
          direction="row"
          alignItems="stretch"
          justifyContent="center"
          spacing={0}
          className={`CustomErrorDialog__Grid CustomErrorDialog--${fullpage}`}
        >
          <Grid key={0} item xs={7}>
            <DialogTitle className="CustomErrorDialog__Header">
              <Typography variant="overline">
                <span>{header}</span>
              </Typography>
            </DialogTitle>
            <DialogTitle className="CustomErrorDialog__Title">
              <Typography variant="button">
                <span>{title}</span>
              </Typography>
            </DialogTitle>
            <DialogContent className="CustomErrorDialog__Content">
              <DialogContentText
                component={'div'}
                className="CustomErrorDialog__Content__Text"
              >
                {message}
              </DialogContentText>
            </DialogContent>
          </Grid>
          <Grid key={1} item xs={5}>
            <DialogContent>
              <img className="CustomErrorPage__Gif" src={img} alt={title} />
            </DialogContent>
          </Grid>
        </Grid>

        <div className="DiscountsDetails__Data__Actions">
          <div
            className={`DiscountstDetails__Data__Actions__Button Error_Button--${fullpage}`}
          >
            <Fab variant="extended" color="secondary">
              {buttonText}
            </Fab>
          </div>
        </div>
      </>
  );
};

CustomErrorDialog.defaultProps = {
  type: 'error',
  buttonText: 'closeLabel',
};

CustomErrorDialog.propTypes = {
  type: PropTypes.string,
  header: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  buttonText: PropTypes.string,
  img: PropTypes.string,
};

export default CustomErrorDialog;
