import React, { useState, useEffect } from 'react';
import NewTableActions from './NewTableActions.component';
import NewTableCollapsible from './NewTableCollapsible.component';
import {
  COLUMN_DATA,
  MASSIVE_ACTION_ON_SELECT,
} from './NewTableConstants.constants';
import CachedIcon from '@material-ui/icons/Cached';
import CustomeTable from '../CustomeTable/CustomeTable.component';
import API from '../../api/Api';
import './NewTable.css'

const NewTable = () => {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(false);
  const [statusCode, setStatusCode] = useState(null);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(false);

  const MASSIVE_ACTIONS = [
    {
      title: 'synchronize',
      method: () => getData(),
      description: 'synchronizeDescription',
      icon: <CachedIcon />,
    },
  ];

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNo, pageSize]);

  const getData = async () => {
    setLoading(true);
    try {
      const apiData = await API.getInfo(pageNo, pageSize);
      setRows(apiData);

      //that is for simulate await/async callback
      setTimeout(() => {
        setLoading(false);
      }, 1500);

    } catch (e) {
      setStatusCode(e.response.status);
      setError(true);
      setLoading(false);
    }
  };

  const onDragNDropConfirm = () => {
      alert('save changes fx')
  }

  const onDragNDropCancel = () => {
      alert('cancel changes fx')
  }

  const CollapsibleComponent = (props) => {
    return <NewTableCollapsible {...props} />;
  };

  const ActionComponent = (props) => {
    return <NewTableActions {...props} />;
  };

return (
      <div className="Container">
      <div>
        <CustomeTable
          title="Simple Component"
          subtitle="With checkable option abled"
          type="simple"
          isLoading={loading}
          error={error}
          statusCode={statusCode}
          rowsData={rows.results}
          checkable={true}
          columnsData={COLUMN_DATA}
          pageNo={rows.results ? rows.paging.offset : pageNo}
          pageSize={rows.results ? rows.paging.limit: pageSize}
          totalPages={rows.results ? rows.paging.total : 0}
          resultsPerPage={[5, 10, 15]}
          onChangePage={setPageNo}
          onChangeSizePage={setPageSize}
          actionsByRow={ActionComponent}
          actionsButtons={true}
          isDragNDrop={true}
          onDragNDropCancel={onDragNDropCancel}
          onDragNDropConfirm={onDragNDropConfirm}
          massiveActionOnSelect={MASSIVE_ACTION_ON_SELECT}
        />
      </div>
      <div>
        <CustomeTable
          title="Multicollapsable Component"
          subtitle="Multicollapsable SubTitle"
          type="multi-collapsible"
          isLoading={loading}
          error={error}
          statusCode={statusCode}
          rowsData={rows.results}
          checkable={true}
          collapsibleComponent={CollapsibleComponent}
          columnsData={COLUMN_DATA}
          pageNo={rows.results ? rows.paging.offset : pageNo}
          pageSize={rows.results ? rows.paging.limit: pageSize}
          totalPages={rows.results ?rows.paging.total : 0}
          resultsPerPage={[5, 10, 15]}
          onChangePage={setPageNo}
          onChangeSizePage={setPageSize}
          actionsByRow={ActionComponent}
          actionsButtons={true}
          massiveActionOnSelect={MASSIVE_ACTION_ON_SELECT}
          massiveActions={MASSIVE_ACTIONS}
        />
      </div>
      <div>
        <CustomeTable
          title="Collapsable Component"
          type="collapsible"
          isLoading={loading}
          error={error}
          statusCode={statusCode}
          rowsData={rows.results}
          checkable={true}
          collapsibleComponent={CollapsibleComponent}
          columnsData={COLUMN_DATA}
          pageNo={rows.results ? rows.paging.offset : pageNo}
          pageSize={rows.results ? rows.paging.limit: pageSize}
          totalPages={rows.results ?rows.paging.total : 0}
          resultsPerPage={[5, 10, 15]}
          onChangePage={setPageNo}
          onChangeSizePage={setPageSize}
          actionsByRow={ActionComponent}
          actionsButtons={true}
          massiveActions={MASSIVE_ACTIONS}
        />
      </div>
      <div>
        <CustomeTable
          title="Simple Component"
          subtitle="With dragNdrop option abled"
          type="simple"
          isLoading={loading}
          error={error}
          statusCode={statusCode}
          rowsData={rows.results}
          checkable={false}
          columnsData={COLUMN_DATA}
          pageNo={rows.results ? rows.paging.offset : pageNo}
          pageSize={rows.results ? rows.paging.limit: pageSize}
          totalPages={rows.results ?rows.paging.total : 0}
          resultsPerPage={[5, 10, 15]}
          onChangePage={setPageNo}
          onChangeSizePage={setPageSize}
          actionsByRow={ActionComponent}
          actionsButtons={true}
          massiveActions={MASSIVE_ACTIONS}
          isDragNDrop={true}
          onDragNDropCancel={onDragNDropCancel}
          onDragNDropConfirm={onDragNDropConfirm}
        />
      </div>
      <div>
        <CustomeTable
          title="Simple Component"
          type="simple"
          isLoading={loading}
          error={error}
          statusCode={statusCode}
          rowsData={rows.results}
          checkable={false}
          columnsData={COLUMN_DATA}
          
          pageNo={rows.results ? rows.paging.offset : pageNo}
          pageSize={rows.results ? rows.paging.limit: pageSize}
          totalPages={rows.results ?rows.paging.total : 0}
          resultsPerPage={[5, 10, 15]}
          onChangePage={setPageNo}
          onChangeSizePage={setPageSize}
          actionsByRow={ActionComponent}
          actionsButtons={true}
          massiveActions={MASSIVE_ACTIONS}
        />
      </div>
      <div>
        <CustomeTable
          emptyTitle="Empty component"
          emptySubtitle="That's is how it's look like an Empty State"
          type="simple"
          isLoading={loading}
          error={error}
          statusCode={statusCode}
          rowsData={[]}
          checkable={false}
          columnsData={COLUMN_DATA}
          pageNo={rows.results ? rows.paging.offset : pageNo}
          pageSize={rows.results ? rows.paging.limit: pageSize}
          totalPages={rows.results ?rows.paging.total : 0}
          resultsPerPage={[5, 10, 15]}
          onChangePage={setPageNo}
          onChangeSizePage={setPageSize}
          actionsByRow={ActionComponent}
          actionsButtons={true}
          massiveActions={MASSIVE_ACTIONS}
        />
      </div>
      <div>
        <CustomeTable
          errorTitle="Error component"
          errorSubtitle="That's is how it's look like an Error"
          type="simple"
          isLoading={loading}
          error={true}
          statusCode={403}
          rowsData={[]}
          checkable={false}
          columnsData={COLUMN_DATA}
          pageNo={rows.results ? rows.paging.offset : pageNo}
          pageSize={rows.results ? rows.paging.limit: pageSize}
          totalPages={rows.results ?rows.paging.total : 0}
          resultsPerPage={[5, 10, 15]}
          onChangePage={setPageNo}
          onChangeSizePage={setPageSize}
          actionsByRow={ActionComponent}
          actionsButtons={true}
          massiveActions={MASSIVE_ACTIONS}
        />
      </div>
      <div>
        <CustomeTable
          errorTitle="Error component"
          errorSubtitle="That's is how it's look like an Error"
          type="simple"
          isLoading={loading}
          error={true}
          statusCode={404}
          rowsData={[]}
          checkable={false}
          columnsData={COLUMN_DATA}
          pageNo={rows.results ? rows.paging.offset : pageNo}
          pageSize={rows.results ? rows.paging.limit: pageSize}
          totalPages={rows.results ?rows.paging.total : 0}
          resultsPerPage={[5, 10, 15]}
          onChangePage={setPageNo}
          onChangeSizePage={setPageSize}
          actionsByRow={ActionComponent}
          actionsButtons={true}
          massiveActions={MASSIVE_ACTIONS}
        />
      </div>
    </div>
  );
};

export default NewTable;
