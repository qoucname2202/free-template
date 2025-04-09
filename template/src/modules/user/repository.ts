import { PaginationEntity } from '@core/pagination/entity';
import httpRepository from '@core/repository/http';
import { OptionEntity, TableEntity } from '@core/table';

import UserEntity from './entity';

const addUser = (payload: any) => {
  return httpRepository.execute({
    path: '/api/Users',
    method: 'post',
    payload,
    config: { isFormData: true },
  });
};
const updateUser = (id: string, payload: any) => {
  return httpRepository.execute({
    path: `/api/Users/${id}`,
    method: 'put',
    payload,
    config: { isFormData: true },
  });
};

const deleteUser = (id: any) => {
  return httpRepository.execute({
    path: `/api/users/${id}`,
    method: 'delete',
  });
};

const deleteManyUser = (ids: any) => {
  return httpRepository.execute({
    path: '/api/Users/DeleteMany',
    method: 'post',
    payload: {
      ids,
    },
  });
};

const getUser = (pagination: PaginationEntity, options?: OptionEntity) => {
  const params = new TableEntity(pagination, options);
  return httpRepository.execute({
    path: '/api/Users',
    params,
    showError: false,
    showSuccess: false,
    convert: dataListGroup => {
      return {
        data: UserEntity.createArrayUser(dataListGroup.pagedData),
        info: new PaginationEntity(dataListGroup.pageInfo),
      };
    },
  });
};

const getDetailUser = (params: any) => {
  return httpRepository.execute({
    path: `/api/Accounts/${params}`,
    showError: false,
    showSuccess: false,
    convert: res => {
      new UserEntity(res);
    },
  });
};

// const getPermission = () => {
//   return httpRepository.execute({
//     path: '/api/Permissions',
//     showSuccess: false,
//     convert: res => UserPermissionEntity.createlistPermisison(res),
//   });
// };

export default {
  getDetailUser,
  addUser,
  updateUser,
  deleteUser,
  // getPermission,
  getUser,
  deleteManyUser,
};
