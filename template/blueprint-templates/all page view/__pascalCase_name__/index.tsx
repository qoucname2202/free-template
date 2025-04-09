import './style.scss';

import { Space } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import lodash from 'lodash';
import React, { useState } from 'react';

import ISelect from '@core/select';
import RightMenu, { IArrayAction } from '@layout/RightMenu';
import CircleLabel from '@shared/components/CircleLabel';
import { DeleteConfirm } from '@shared/components/ConfirmDelete';
import EditIconComponent from '@shared/components/EditIconComponent';
import InformationIconComponent from '@shared/components/InformationIcon';
import MainTitleComponent from '@shared/components/MainTitleComponent';
import TitleComponent from '@shared/components/MainTitleComponent/TitleComponent';
import SearchComponent from '@shared/components/SearchComponent/SearchComponent';
import SelectAndLabelComponent, { ISelectAndLabel } from '@shared/components/SelectAndLabelComponent';
import TableComponent from '@shared/components/TableComponent';
import useTable from '@shared/components/TableComponent/hook';
import { useAltaIntl } from '@shared/hook/useTranslate';

import ModalComponents from './component/MainModal/Modal{{pascalCase name}}';
import { IModal } from './interface';

import  router{{pascalCase name}}  from './router';
const dataTable = require('./data.json');


const {{ pascalCase name }} = () => {
  const { formatMessage } = useAltaIntl();
  const table = useTable({ tableKey: '{{camelCase name}}',
  //  apiServices: 
 });

  const [modal, setModal] = useState<IModal>({
    isVisible: false,
    dataEdit: null,
    isReadOnly: false,
  });


  const idChooses = 'id'; //get your id here. Ex: accountId, userId,...
  const columns: ColumnsType = [
    {
      dataIndex: 'tagName',
    },
    {
      dataIndex: 'lastUpdate',
    },
    {
      dataIndex: 'group',
    },
    {
      dataIndex: 'group',
      render: () => <CircleLabel text={formatMessage('common.statusActive')} colorCode='blue'/>,
    },
    {
      dataIndex: 'action',
      render: (_item:any, record: any) => (
        <Space>
          <EditIconComponent
            onClick={() => {
              setModal({
                dataEdit: record,
                isVisible: true,
                isReadOnly: false,
              });
            }}
          />
          <InformationIconComponent
            onClick={() => {
              setModal({
                dataEdit: record,
                isVisible: true,
                isReadOnly: true,
              });
            }}
          />
        </Space>
      ),
    },
  ];
 
  const handleRefresh = () => {
    table.fetchData();
  };

    const arrayAction: IArrayAction[] = [
    {
      iconType: 'add', handleAction: () => {
        setModal({ dataEdit: null, isVisible: true });
      },
    },
    {
      iconType: 'delete',
      handleAction: () => {
        DeleteConfirm({
          okText: formatMessage('common.ok'),
          content: formatMessage('common.delete'),
          handleOk: () => {
            // call Api Delete here
            handleRefresh();
          },
          handleCancel: () => { },
        });
      },
    },
  ];

  const handleSearch = (searchKey: string) => {
    table.fetchDataOption({ search: searchKey } );
  };

  const dataString: ISelect[] = [{ label: 'common.all', value: undefined }];
  const arraySelectFilter: ISelectAndLabel[] = [
    { textLabel: 'Lĩnh vực', dataString },
    { textLabel: 'Địa bàn quản lý', dataString },
    { textLabel: 'Trạng thái', dataString },
  ];

  const onChangeSelectStatus = (name: string | undefined) => (status: any) => {
    if (name) {
      table.fetchDataOption({ filter: { [name]: { value: status, op: '$eq' } }  });
    }
  };

  return (
    <div className='{{kebabCase name}}'>
      <MainTitleComponent breadcrumbs={router{{pascalCase name}} } />
      <div className='main-card'>
        <TitleComponent title={{{camelCase title}}}/>
        <div className="flex flex-row justify-between mb-4">
          <div className="flex flex-row intro-y items-end justify-between w-full">
            <div className="flex flex-row ">
              {arraySelectFilter.map(item => (
                <SelectAndLabelComponent
                  onChange={onChangeSelectStatus(item.name)}
                  key={item.name}
                  className="margin-select"
                  dataString={item.dataString}
                  textLabel={item.textLabel}
                  defaultValue={lodash.get(table.filter, String(item.name))?.value}
                />
              ))}
            </div>
            <SearchComponent
              name='{{camelCase name}}'
              onSearch={handleSearch}
              placeholder={'common.keyword'}
              className="mb-0 search-table"
              defaultValue={table.option.search}
            />
          </div>
          

        </div>
        <TableComponent
          rowKey={(res) => res[idChooses]}
          register={table}
          columns={columns}
          dataSource={dataTable}
          rowClassName="zoom-in"
        />
      </div>
      <RightMenu arrayAction={arrayAction} />
      <ModalComponents
        modal={modal}
        handleRefresh={handleRefresh}
        setModal={setModal}
      />
    </div>
  );
};

export default {{ pascalCase name }};

