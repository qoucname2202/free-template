import { TableProps } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React from 'react';

import { PaginationEntity } from '@core/pagination/entity';
import { OptionEntity } from '@core/table';

import { IUseTable } from './hook';

export interface IBEColumnsType<RecordType = any> extends ColumnsType<RecordType> {
  permissionCode?: string;
  dataIndex?: [keyof RecordType];
}

export interface IBEPaginationTable<RecordType = any> extends TableProps<RecordType> {
  apiServices?: (...params: any) => Promise<{ data: Array<RecordType>; info: PaginationEntity }>;
  columns?: any[];
  defaultOption?: OptionEntity;
  defaultPagination?: PaginationEntity;
  register: IUseTable<RecordType>;
  tableKey?: string;
  getDataAfter?: (data: any) => void;
  disableFirstCallApi?: boolean;
  search?: {
    placeholder: string;
    align?: 'left' | 'right';
    className?: string;
  };
  hasStt?: boolean;
  onRowSelect?: (params: React.Key[]) => void;
  summaryKey?: string;
  onRowSelectDetail?: (params: React.Key[]) => void;
  selectedRowKeys?: React.Key[];
  disableQueryParam?: boolean;
  disableSelectRowKey?: boolean;
  expandTable?: boolean;
  idRecord?: string;
}

export const InitOption: OptionEntity = {
  search: '',
  // tới dự án nào dùng tới filter sorter rồi bỏ comment ra nha
  filter: {},
  sorter: {},
};

export const InitPagination: PaginationEntity = {
  pageSize: 10,
  total: 0,
  current: 1,
};
