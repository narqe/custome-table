import React from 'react';
import PropTypes from 'prop-types';
import SimpleTable from './types/SimpleTable';
import './CustomeTable.css';
import SimpleCheckableTable from './types/SimpleCheckableTable';
import CollapsibleTable from './types/CollapsibleTable';
import errors from '../Errors/errors';
import CustomeErrorDialog from '../CustomeErrorDialog';
import EmptyState from '../CustomeEmptyState';
import MultiCheckableCollapsibleTable from './types/MultiCheckableCollapsibleTable';
import TableLoading from './helpers/TableLoading';
import { useTranslation } from 'react-i18next';
import '../../translations/i18n';

const CustomeTable = (props) => {
  const { t } = useTranslation()
  const {
    title,
    subtitle,
    massiveActions,
    type,
    emptyTitle,
    emptySubtitle,
    errorTitle,
    errorSubtitle,
    isLoading,
    rowsData,
    columnsData,
    error,
    statusCode,
    pageNo,
    pageSize,
    resultsPerPage,
    totalPages,
    frontPagination,
    onChangePage,
    onChangeSizePage,
    actionsByRow,
    actionsButtons,
    checkable,
    massiveActionOnSelect,
    isDragNDrop,
    onDragNDrop,
    onDragNDropCancel,
    onDragNDropConfirm,
    collapsibleComponent = () => {},
  } = props;

  const errorData = errors[statusCode];

  if (!!isLoading) {
    return <TableLoading />;
  }

  if (!!error) {
    return (
      <CustomeErrorDialog
        open
        fullpage={false}
        header={errorData.header}
        img={errorData.svg}
        title={errorTitle}
        message={errorSubtitle}
        buttonText={t(errorData.buttonText)}
      />
    );
  } else {
    if (!rowsData || !rowsData.length) {
      return <EmptyState title={emptyTitle} subtitle={emptySubtitle} />;
    } else {
      switch (type) {
        case 'collapsible':
          const collapsibleProps = {
            title,
            subtitle,
            emptyTitle,
            emptySubtitle,
            errorTitle,
            errorSubtitle,
            rowsData,
            columnsData,
            isLoading,
            pageNo,
            pageSize,
            totalPages,
            frontPagination,
            onChangePage,
            onChangeSizePage,
            resultsPerPage,
            actionsByRow,
            massiveActions,
            actionsButtons,
            collapsibleComponent,
          };
          return <CollapsibleTable {...collapsibleProps} />;

        case 'multi-collapsible':
          const multiCollapsibleProps = {
            title,
            subtitle,
            emptyTitle,
            emptySubtitle,
            errorTitle,
            errorSubtitle,
            rowsData,
            columnsData,
            isLoading,
            pageNo,
            pageSize,
            totalPages,
            frontPagination,
            resultsPerPage,
            onChangePage,
            onChangeSizePage,
            actionsByRow,
            massiveActions,
            actionsButtons,
            collapsibleComponent,
            massiveActionOnSelect,
          };
          return <MultiCheckableCollapsibleTable {...multiCollapsibleProps} />;

        default:
          const simpleProps = {
            title,
            subtitle,
            emptyTitle,
            emptySubtitle,
            errorTitle,
            errorSubtitle,
            rowsData,
            columnsData,
            isLoading,
            pageNo,
            pageSize,
            totalPages,
            frontPagination,
            onChangePage,
            onChangeSizePage,
            resultsPerPage,
            actionsByRow,
            massiveActions,
            actionsButtons,
            massiveActionOnSelect,
            isDragNDrop,
            onDragNDrop,
            onDragNDropCancel,
            onDragNDropConfirm,
          };
          return !!checkable ? (
            <SimpleCheckableTable {...simpleProps} />
          ) : (
            <SimpleTable {...simpleProps} />
          );
      }
    }
  }
};

CustomeTable.propTypes = {
  type: PropTypes.string.isRequired,
  emptyTitle: PropTypes.string.isRequired,
  emptySubtitle: PropTypes.string,
  errorTitle: PropTypes.string.isRequired,
  errorSubtitle: PropTypes.string,
  rowsData: PropTypes.arrayOf(PropTypes.object),
  columnsData: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool,
  statusCode:
    PropTypes.error === true ? PropTypes.number.isRequired : PropTypes.number,
  pageNo: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  frontPagination: PropTypes.bool.isRequired,
  resultsPerPage: PropTypes.arrayOf(PropTypes.number),
  massiveActions: PropTypes.arrayOf(PropTypes.object),
  actionsByRow:
    PropTypes.actionsButtons === true
      ? PropTypes.func.isRequired
      : PropTypes.func,
  isDragNDrop: PropTypes.bool,
  onDragNDrop:
    PropTypes.isDragNDrop === true ? PropTypes.func.isRequired : PropTypes.func,
  onDragNDropCancel:
    PropTypes.isDragNDrop === true ? PropTypes.func.isRequired : PropTypes.func,
  onDragNDropConfirm:
    PropTypes.isDragNDrop === true ? PropTypes.func.isRequired : PropTypes.func,
  collapsibleComponent: PropTypes.func,
};

CustomeTable.defaultProps = {
  emptyTitle: 'Title for Empty State',
  emptySubtitle: 'Subtitle for Empty State',
  errorTitle: 'Title for Error',
  errorSubtitle: 'Subitle for Error',
  statusCode: 404,
  error: false,
  isLoading: false,
  pageNo: 0,
  pageSize: 10,
  totalPages: 0,
  resultsPerPage: [10, 25, 100],
  frontPagination: false,
};

export default CustomeTable;
