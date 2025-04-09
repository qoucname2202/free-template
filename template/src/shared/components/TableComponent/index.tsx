/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-statements */
import { Table } from 'antd';
import lodash from 'lodash';
import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';

import { PaginationEntity } from '@core/pagination/entity';

import Pagination from './Component/Pagination';
import { IBEPaginationTable } from './interface';

const TableComponent: React.FC<IBEPaginationTable> = (props: IBEPaginationTable) => {
  const {
    columns = [],
    register,
    defaultOption = {},
    defaultPagination = {},
    disableFirstCallApi = false,
    dataSource = [],
    hasStt = false,
    disableSelectRowKey = false,
  } = props;

  const intl = useIntl();

  const rowSelection = {
    preserveSelectedRowKeys: true,
    selectedRowKeys: register.selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      register.setSelectedRowKeys(selectedRowKeys);
    },
  };

  const handleClickOnRow = (record: any) => {
    if (typeof props.rowKey !== 'function') {
      return;
    }
    const newRowKey = props.rowKey(record);
    const isInArr = register.selectedRowKeys.some(key => key === newRowKey);
    let newSelectedRowKeys = register.selectedRowKeys;
    if (isInArr === false) {
      newSelectedRowKeys = [...register.selectedRowKeys, newRowKey];
      // setSelectedRow(selectedRows);
      // props.onRowSelectDetail && props.onRowSelectDetail(selectedRows);
    } else {
      newSelectedRowKeys = register.selectedRowKeys.filter(k => k !== newRowKey);
    }
    register.setSelectedRowKeys(newSelectedRowKeys);
    props.onRowSelect && props.onRowSelect(newSelectedRowKeys);
  };

  useEffect(() => {
    if (!disableFirstCallApi) {
      register?.fetchData({
        pagination: defaultPagination,
        option: defaultOption,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disableFirstCallApi]);

  const handleChangePage = (newPagination: PaginationEntity, _filter?: any, _sorter?: any) => {
    let newCurrent = newPagination?.current;
    if (newPagination.pageSize !== register.pagination.pageSize) {
      newCurrent = 1;
    }
    register.fetchData({
      pagination: { ...newPagination, current: newCurrent },
      option: {
        sorter: _sorter,
      },
    });
  };
  // fix lỗi xóa hết dữ liệu trong các trang lớn hơn 1
  useEffect(() => {
    if (register.repository?.value?.data == null) {
      return;
    }
    if (
      lodash.isEmpty(register.repository.value?.data) &&
      register.pagination.current &&
      register.pagination.current > 1
    ) {
      register.fetchData({
        pagination: {
          current: register.pagination.current - 1,
        },
      });
    }
  }, [register.repository.value?.data]);

  const thisColumns = React.useMemo(() => {
    // translate title
    const col = columns.map(ite => {
      if (
        ite.sorter !== false &&
        JSON.stringify(ite.dataIndex) === JSON.stringify(register.option.sorter?.field)
      ) {
        return { ...ite, sortOrder: register.option.sorter?.order };
      }
      return { ...ite };
    });

    const columnTranslate = col.map(item => {
      const newItem = { ...item };
      const key =
        item?.title ||
        `${register.tableKey}.${
          lodash.isArray(item?.dataIndex) ? item?.dataIndex.join('.') : item?.dataIndex
        }`;
      // ưu tiên nếu dev truyền vào title trước nha
      newItem.title =
        item?.title === '' ? (
          ''
        ) : (
          <div className="column__title">
            {newItem?.noFormatMessage ? key : intl.formatMessage({ id: key, defaultMessage: key })}
          </div>
        );
      newItem.sorter = item.sorter == null ? true : item.sorter;
      newItem.ellipsis = item.ellipsis == null ? true : item.ellipsis;
      return newItem;
    });
    //xét có nên thêm stt
    if (hasStt) {
      const hasSttColumn = {
        title: intl.formatMessage({
          id: 'common.stt',
          defaultMessage: 'STT',
        }),
        width: '5.9rem',
        className: 'text-center',
        dataIndex: 'tableComponentStt',
        render: (_text: any, _record: any, index: any) => {
          const num = register.pagination?.current || 1;
          const pageSize = register.pagination?.pageSize || 1;
          return (num - 1) * pageSize + (index + 1);
        },
      };
      return [hasSttColumn, ...columnTranslate];
    }
    //dịch mỗi thằng
    return columnTranslate;
  }, [columns, hasStt, register.tableKey, intl, register.pagination, register.option]);

  const onRow = (record: any) => ({
    onClick: () => {
      handleClickOnRow(record);
    },
  });

  return (
    <div className={`card-main-table ${props?.className}`}>
      <Table
        rowSelection={disableSelectRowKey ? undefined : rowSelection}
        onRow={disableSelectRowKey ? undefined : onRow}
        {...props}
        className="main-table"
        dataSource={register.repository.value?.data || dataSource}
        loading={props?.loading || register.repository.status === 'loading'}
        pagination={props.pagination !== false && register?.pagination}
        onChange={handleChangePage}
        columns={thisColumns}
      />
      {props.pagination !== false && (
        <Pagination
          pagination={register.pagination}
          dataSource={dataSource}
          onChange={handleChangePage}
          tableKey={register.tableKey}
        />
      )}
    </div>
  );
};

export default React.memo(TableComponent);
