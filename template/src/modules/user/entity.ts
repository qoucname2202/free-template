import dayjs from 'dayjs';

import RoleEntity from '@modules/roles/entity';
import PermissionsEntity from '@modules/permissions/entity';

class UserEntity {
  username?: string;

  id?: string;

  email?: string;

  name?: string;

  phoneNumber?: string;

  dayOfBirth?: string;

  status?: number;

  roleId?: string;

  role?: RoleEntity;

  updatedAt?: dayjs.Dayjs;

  createdAt?: dayjs.Dayjs;

  identifierNumber?: string;

  avatarPicture?: string;

  permissions?: PermissionsEntity;

  avatar?: string;

  constructor(user?: Partial<UserEntity>) {
    if (!user) {
      return;
    }
    Object.assign(this, user);
    this.dayOfBirth = user.dayOfBirth ? dayjs(user.dayOfBirth).format('DD/MM/YYYY') : '';
    this.avatar = user.avatarPicture;
  }

  static createArrayUser(arrUser: Array<Partial<UserEntity>>): Array<UserEntity> {
    if (!arrUser) {
      return [];
    }
    return arrUser.map(x => new UserEntity(x));
  }
}

export default UserEntity;
