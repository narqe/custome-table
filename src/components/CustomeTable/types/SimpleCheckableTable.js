import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';
import DragNDropIcon from '@material-ui/icons/DragIndicator';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { reorderItems } from '../helpers/Methods.helpers';
import EnhancedTableToolbar from '../helpers/EnhancedTableToolbar';
import Paginator from '../helpers/Paginator';
import TableLoading from '../helpers/TableLoading';

const SimpleCheckableTable = ({
  title,
  subtitle,
  massiveActions,
  rowsData,
  columnsData,
  isLoading,
  pageNo,
  pageSize,
  resultsPerPage,
  frontPagination,
  onChangePage,
  onChangeSizePage,
  totalPages,
  actionsButtons,
  actionsByRow: ActionComponent,
  massiveActionOnSelect,
  isDragNDrop,
  onDragNDrop = () => {},
  onDragNDropCancel = () => {},
  onDragNDropConfirm = () => {},
}) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState([]);
  const [page] = useState(pageNo);
  const [rowsPerPage] = useState(pageSize);
  const [changed, setChanged] = useState(false);

  const EnhancedTableHead = (props) => {
    const { onSelectAllClick, numSelected, rowCount } = props;

    return (
      <TableHead>
        <TableRow>
          {!!isDragNDrop && (
            <TableCell
              className="CustomTable__Cell__DraggingIndicator"
              align="center"
            ></TableCell>
          )}
          <TableCell align="center" padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columnsData.map(({ headerName }, indexCol) => (
            <TableCell align="center" key={indexCol}>{t(headerName)}</TableCell>
          ))}
          {!!actionsButtons && (
            <TableCell align="center">{t('actionsLabel')}</TableCell>
          )}
        </TableRow>
      </TableHead>
    );
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rowsData.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const onDragEnd = ({ draggableId, source, destination }) => {
    const newTableRows = reorderItems(
      rowsData,
      source.index,
      destination.index
    );

    onDragNDrop(newTableRows);
    setChanged(true);
  };

  if (!!isLoading) {
    return <TableLoading />;
  }

  return (
    <>
      <EnhancedTableToolbar
        title={title}
        subtitle={subtitle}
        numSelected={selected.length}
        massiveActions={massiveActions}
        massiveActionOnSelect={massiveActionOnSelect}
        onDragNDropConfirm={onDragNDropConfirm}
        onDragNDropCancel={onDragNDropCancel}
        hasChanged={changed}
      />
      <TableContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          <Table size="small" aria-labelledby="tableTitle" aria-label="enhanced table">
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rowsData.length}
            />
            <Droppable droppableId="custom-table-body-id">
              {(provided) => (
                <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                  {!!frontPagination ? 
                    rowsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) :
                    rowsData.map((row, indexRow) => {
                      const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${indexRow}`;

                      return (
                        <Draggable
                          key={indexRow}
                          draggableId={indexRow.toString()}
                          index={indexRow}
                          isDragDisabled={!isDragNDrop}
                        >
                          {(provided) => {
                            return (
                              <TableRow
                                key={row.id}
                                innerRef={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                hover
                                onClick={(event) => handleClick(event, row.id)}
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                selected={isItemSelected}
                              >
                                {!!isDragNDrop && (
                                  <TableCell
                                    className="CustomTable__Cell__DraggingIndicator"
                                    align="center"
                                  >
                                    <DragNDropIcon />
                                  </TableCell>
                                )}
                                <TableCell padding="checkbox">
                                  <Checkbox
                                    checked={isItemSelected}
                                    inputProps={{ 'aria-labelledby': labelId }}
                                  />
                                </TableCell>
                                {columnsData.map(({
                                  label,
                                  valueFixed = null,
                                  translationsLabel = null,
                                }) => {
                                  let translation = !!translationsLabel
                                    ? t(translationsLabel[`${row[label]}`])
                                    : '';
                                    return (
                                      <TableCell
                                        key={`${row[indexRow]}-${label}`}
                                        align="center"
                                      >
                                        {!valueFixed
                                          ? row[label]
                                          : valueFixed(row[label], translation)}
                                      </TableCell>
                                    );
                                  }
                                )}
                                {!!actionsButtons && (
                                  <TableCell align="center">
                                    <ActionComponent row={row} indexRow={2} />
                                  </TableCell>
                                )}
                              </TableRow>
                            );
                          }}
                        </Draggable>
                      );
                    })}
                  {provided.placeholder}
                </TableBody>
              )}
            </Droppable>
          </Table>
        </DragDropContext>
      </TableContainer>
      <Paginator
        onChangePage={onChangePage}
        onChangeSizePage={onChangeSizePage}
        pageNo={page}
        pageSize={rowsPerPage}
        totalPages={!!frontPagination ? rowsData.length : totalPages}
        resultsPerPage={resultsPerPage}
      />
    </>
  );
};

SimpleCheckableTable.propTypes = {
  actionsByRow:
    PropTypes.actionsButtons === true
      ? PropTypes.func.isRequired
      : PropTypes.func,
};

SimpleCheckableTable.defaultProps = {
  actionsByRow: () => {},
};

export default SimpleCheckableTable;
