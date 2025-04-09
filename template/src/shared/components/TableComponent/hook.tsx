import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { PaginationEntity } from '@core/pagination/entity';
import { IFilter, OptionEntity } from '@core/table';
import { sessionStorageGetItem, sessionStorageSetItem } from '@helper/functions';
import { IState, useAsync } from '@shared/hook/useAsync';

import { InitOption, InitPagination } from './interface';

export interface IUseTable<T> {
  fetchData: (obj?: { pagination?: PaginationEntity; option?: OptionEntity }) => void;
  fetchDataOption: (obj: OptionEntity) => void;
  repository: IState<T>;
  pagination: PaginationEntity;
  option: OptionEntity;
  search: string;
  filter: IFilter;
  tableKey: string;
  selectedRowKeys: React.Key[];
  setSelectedRowKeys: (value: React.Key[]) => void;
  setPagination: (value: PaginationEntity) => void;
}

const useTable: <RecordType>(obj: {
  tableKey: string;
  apiServices?: (...params: any) => Promise<RecordType>;
}) => IUseTable<RecordType> = ({ tableKey, apiServices }) => {
  const location = useLocation();

  const [repository] = useAsync(apiServices || Promise.resolve);
  const [pagination, setPagination] = useState<PaginationEntity>(InitPagination);
  const [option, setOption] = useState<OptionEntity>({
    ...InitOption,
    ...sessionStorageGetItem(`${location.pathname}${tableKey}`)?.option,
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const fetchData = (_state?: { pagination?: PaginationEntity; option?: OptionEntity }) => {
    const oldState = sessionStorageGetItem(`${location.pathname}${tableKey}`);

    const newOption = Object.assign({}, option, oldState?.option, _state?.option);
    newOption.filter = Object.assign({}, oldState?.option?.filter, _state?.option?.filter);
    const newPagination = Object.assign({}, pagination, oldState?.pagination, _state?.pagination);

    if (apiServices) {
      repository.execute(newPagination, newOption).then((res: any) => {
        sessionStorageSetItem(`${location.pathname}${tableKey}`, {
          pagination: {
            ...newPagination,
            ...res?.info,
          },
          option: {
            ...newOption,
            sorter: {
              field: newOption.sorter?.field,
              order: newOption.sorter?.order,
            },
          },
        });
        setOption(newOption);
        setPagination({
          ...newPagination,
          ...res?.info,
        });
        // setSelectedRowKeys([]);
      });
    } else {
      setOption(newOption);
      setPagination({
        ...newPagination,
      });
      // setSelectedRowKeys([]);
      sessionStorageSetItem(`${location.pathname}${tableKey}`, {
        pagination: newPagination,
        option: newOption,
      });
    }
  };

  const fetchDataOption = (_option: OptionEntity) => {
    fetchData({ pagination: { current: 1 }, option: _option });
  };

  return {
    fetchData,
    fetchDataOption,
    repository,
    pagination,
    setPagination,
    option,
    tableKey,
    search: option.search ? option.search : '',
    filter: option.filter ? option.filter : {},
    setSelectedRowKeys,
    selectedRowKeys,
  };
};

export default useTable;
