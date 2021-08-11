import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import EnhancedTableToolbar from '../helpers/EnhancedTableToolbar';
import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';
import { Checkbox } from '@material-ui/core';
import Paginator from '../helpers/Paginator';
import TableLoading from '../helpers/TableLoading';

const MultiCheckableCollapsibleTable = ({
  title,
  subtitle,
  massiveActions,
  rowsData,
  columnsData,
  actionsButtons,
  pageNo,
  pageSize,
  isLoading,
  resultsPerPage,
  onChangePage,
  onChangeSizePage,
  totalPages,
  massiveActionOnSelect,
  actionsByRow: ActionComponent,
  collapsibleComponent: CollapsibleComponent,
}) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState([]);
  const EnhancedTableHead = (props) => {
    const { onSelectAllClick, numSelected, rowCount } = props;

    return (
      <TableHead>
        <TableRow>
          <TableCell align="center" />
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
      const newSelecteds = rowsData.map((n) => (!!n.id ? n.id : n.code));
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

  if (!!isLoading) {
    return <TableLoading />;
  }

  return (
    <>
      <TableContainer component={Paper}>
        <EnhancedTableToolbar
          title={title}
          subtitle={subtitle}
          massiveActions={massiveActions}
          numSelected={selected.length}
          onSelectAllClick={handleSelectAllClick}
          rowCount={rowsData.length}
          massiveActionOnSelect={massiveActionOnSelect}
        />
        <Table size="small" aria-label="collapsible table">
          <EnhancedTableHead
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={rowsData.length}
          />
          <TableBody>
            {rowsData.map((row, rowIndex) => {
              const isItemSelected = isSelected(!!row.id ? row.id : row.code);

              return (
                <RowLoop
                  key={Math.random()}
                  index={Math.random()}
                  row={row}
                  columnsData={columnsData}
                  collapsibleComponent={
                    <CollapsibleComponent row={row} indexRow={rowIndex} />
                  }
                  actionsButtons={actionsButtons}
                  actionsByRow={
                    <ActionComponent row={row} indexRow={rowIndex} />
                  }
                  actionEvent={(event) =>
                    handleClick(event, !!row.id ? row.id : row.code)
                  }
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  selected={isItemSelected}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Paginator
        onChangePage={onChangePage}
        onChangeSizePage={onChangeSizePage}
        pageNo={pageNo}
        pageSize={pageSize}
        totalPages={totalPages}
        resultsPerPage={resultsPerPage}
      />
    </>
  );
};

const RowLoop = (props) => {
  const {
    row,
    collapsibleComponent,
    columnsData,
    actionsButtons,
    actionsByRow,
    selected,
    actionEvent,
  } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell padding="checkbox" onClick={() => actionEvent()}>
          <Checkbox checked={selected} />
        </TableCell>
        {columnsData.map(({ label }, colIndex) => (
          <TableCell
            key={`${row}-${label}-${colIndex}${Math.random()}`}
            align="center"
          >
            {row[label]}
          </TableCell>
        ))}
        {!!actionsButtons && (
          <TableCell align="center">{actionsByRow}</TableCell>
        )}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {collapsibleComponent}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

MultiCheckableCollapsibleTable.propTypes = {
  CollapsibleComponent: PropTypes.func.isRequired,
  massiveActionOnSelect: PropTypes.object.isRequired,
};

MultiCheckableCollapsibleTable.defaultProps = {
  CollapsibleComponent: () => {},
  onUpdate: () => {},
};

export default MultiCheckableCollapsibleTable;
