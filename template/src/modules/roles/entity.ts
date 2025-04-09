class RoleEntity {
  id?: string;

  code?: string;

  name?: string;

  resource: string = '';

  permissions: string[] = [];

  value: string = '';

  label: string = '';

  constructor(role?: any) {
    if (!role) {
      return;
    }
    Object.assign(this, role);
  }

  static createListRole(listRole: Array<any>) {
    if (!Array.isArray(listRole)) {
      return [];
    }
    return listRole.map((Role: RoleEntity) => {
      Role.value = Role.id || '';
      Role.label = Role.name || '';
      return new RoleEntity(Role);
    });
  }
}

export default RoleEntity;
