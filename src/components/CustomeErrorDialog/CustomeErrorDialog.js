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
import './CustomeErrorDialog.css';

const CustomeErrorDialog = ({
  fullpage,
  header,
  title,
  message,
  buttonText,
  img,
}) => {

  return (
      <>
        <Grid
          container
          direction="row"
          alignItems="stretch"
          justifyContent="center"
          spacing={0}
          className={`CustomeErrorDialog__Grid CustomeErrorDialog--${fullpage}`}
        >
          <Grid key={0} item xs={12} lg={6}>
            <DialogTitle className="CustomeErrorDialog__Header">
              <Typography variant="overline">
                <span>{header}</span>
              </Typography>
            </DialogTitle>
            <DialogTitle className="CustomeErrorDialog__Title">
              <Typography variant="button">
                <span>{title}</span>
              </Typography>
            </DialogTitle>
            <DialogContent className="CustomeErrorDialog__Content">
              <DialogContentText
                component={'div'}
                className="CustomeErrorDialog__Content__Text"
              >
                {message}
              </DialogContentText>
            </DialogContent>
          </Grid>
          <Grid key={1} item xs={12} lg={6}>
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

CustomeErrorDialog.defaultProps = {
  type: 'error',
  buttonText: 'closeLabel',
};

CustomeErrorDialog.propTypes = {
  type: PropTypes.string,
  header: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  buttonText: PropTypes.string,
  img: PropTypes.string,
};

export default CustomeErrorDialog;
