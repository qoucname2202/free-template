import { PaginationEntity } from 'src/core/pagination/entity';
import httpRepository from 'src/core/repository/http';
import { OptionEntity, TableEntity } from 'src/core/table';

import PermissionsEntity from './entity';
import { ConsoleSqlOutlined } from '@ant-design/icons';

// API GET
export const getListPermissions = (pagination?: PaginationEntity, options?: OptionEntity) => {
  const params = new TableEntity(pagination, options);
  return httpRepository.execute({
    path: '/api/Permissions',
    showSuccess: false,
    showError: false,
    params,
    convert: res => {
      // console.debug('getListPermissions', res);
      return {
        data: PermissionsEntity.createListPermissions(res),
      };
    },
  });
};
