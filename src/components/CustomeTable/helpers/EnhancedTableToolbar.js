import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';

const EnhancedTableToolbar = (props) => {
  const { t } = useTranslation();
  const {
    title,
    subtitle,
    numSelected,
    massiveActions,
    massiveActionOnSelect,
    onDragNDropCancel,
    onDragNDropConfirm,
    hasChanged,
  } = props;
  return (
    <div className="CustomeTable__headerContainer">
      <div>
        <Typography variant="h6" id="tableTitle" component="div">
          {title}
        </Typography>
        <Typography color="inherit" variant="subtitle1" component="div">
          {subtitle}
        </Typography>
      </div>
      <div>
        {numSelected > 0 && (
          <Tooltip title={t(massiveActionOnSelect.description)}>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              className="CustomeTable__button"
              endIcon={massiveActionOnSelect.icon}
              onClick={massiveActionOnSelect.method}
            >
              {t(massiveActionOnSelect.title)}
            </Button>
          </Tooltip>
        )}
        {!!massiveActions &&
          massiveActions.map((action, i) => {
            return (
              <Tooltip title={t(action.description)} key={i}>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  className="CustomeTable__button"
                  endIcon={action.icon}
                  onClick={action.method}
                >
                  {t(action.title)}
                </Button>
              </Tooltip>
            );
          })}
        {!!hasChanged && (
          <>
            <Tooltip title={t('cancel')}>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                className="CustomeTable__button"
                onClick={onDragNDropCancel}
              >
                {t('cancel')}
              </Button>
            </Tooltip>
            <Tooltip title={t('save')}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className="CustomeTable__button"
                onClick={onDragNDropConfirm}
              >
                {t('save')}
              </Button>
            </Tooltip>
          </>
        )}
      </div>
    </div>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number,
  massiveActionOnSelect: PropTypes.object,
  onDragNDrop: PropTypes.func,
  onDragNDropCancel: PropTypes.func,
  onDragNDropConfirm: PropTypes.func,
};

export default EnhancedTableToolbar;
