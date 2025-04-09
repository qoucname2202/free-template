import RoleEntity from '@modules/roles/entity';

class PermissionsEntity {
  resource = '';

  permissions: RoleEntity[] = [];

  constructor(permissions: Partial<PermissionsEntity>) {
    if (!permissions) {
      return;
    }
    Object.assign(this, permissions);
  }

  static createListPermissions(listPermissions: Array<Partial<PermissionsEntity>>) {
    if (!Array.isArray(listPermissions)) {
      return [];
    }
    return listPermissions.map((permissions: Partial<PermissionsEntity>) => {
      return new PermissionsEntity(permissions);
    });
  }
}

export enum PermissionEnum {
  UsersView = 'UsersView',
  UsersViewDetail = 'UsersViewDetail',
  UsersCreate = 'UsersCreate',
  UsersUpdate = 'UsersUpdate',
  UsersDelete = 'UsersDelete',
  RolesView = 'RolesView',
  RolesViewDetail = 'RolesViewDetail',
  RolesCreate = 'RolesCreate',
  RolesUpdate = 'RolesUpdate',
  RolesDelete = 'RolesDelete',
  CollectionsCreate = 'CollectionsCreate',
  CollectionsDelete = 'CollectionsDelete',
  CollectionsView = 'CollectionsView',
  CollectionsViewDetail = 'CollectionsViewDetail',
  CollectionsUpdate = 'CollectionsUpdate',
  CustomersCreate = 'CustomersCreate',
  CustomersDelete = 'CustomersDelete',
  CustomersView = 'CustomersView',
  CustomersViewDetail = 'CustomersViewDetail',
  CustomersUpdate = 'CustomersUpdate',
  DevicesCreate = 'DevicesCreate',
  DevicesDelete = 'DevicesDelete',
  DevicesView = 'DevicesView',
  DevicesViewDetail = 'DevicesViewDetail',
  DevicesUpdate = 'DevicesUpdate',
  EventsCreate = 'EventsCreate',
  EventsDelete = 'EventsDelete',
  EventsView = 'EventsView',
  EventsViewDetail = 'EventsViewDetail',
  EventsUpdate = 'EventsUpdate',
  ItemGroupsCreate = 'ItemGroupsCreate',
  ItemGroupsDelete = 'ItemGroupsDelete',
  ItemGroupsView = 'ItemGroupsView',
  ItemGroupsViewDetail = 'ItemGroupsViewDetail',
  ItemGroupsUpdate = 'ItemGroupsUpdate',
  ItemsCreate = 'ItemsCreate',
  ItemsDelete = 'ItemsDelete',
  ItemsView = 'ItemsView',
  ItemsViewDetail = 'ItemsViewDetail',
  ItemsUpdate = 'ItemsUpdate',
  OtherGiftsCreate = 'OtherGiftsCreate',
  OtherGiftsDelete = 'OtherGiftsDelete',
  OtherGiftsView = 'OtherGiftsView',
  OtherGiftsViewDetail = 'OtherGiftsViewDetail',
  OtherGiftsUpdate = 'OtherGiftsUpdate',
  RankingGiftsCreate = 'RankingGiftsCreate',
  RankingGiftsDelete = 'RankingGiftsDelete',
  RankingGiftsView = 'RankingGiftsView',
  RankingGiftsViewDetail = 'RankingGiftsViewDetail',
  RankingGiftsUpdate = 'RankingGiftsUpdate',
  SettingsUpdate = 'SettingsUpdate',
  SettingsView = 'SettingsView',
  CustomerCollectionHistoriesView = 'CustomerCollectionHistoriesView',
  DevicesCollectionHistoryCreate = 'DevicesCollectionHistoryCreate',
  DevicesCollectionHistoryView = 'DevicesCollectionHistoryView',
  ItemPurchaseHistoriesView = 'ItemPurchaseHistoriesView',
  ItemsChangeStatus = 'ItemsChangeStatus',
  ErrorsUpdate = 'ErrorsUpdate',
  ErrorsView = 'ErrorsView',
  ErrorsViewDetail = 'ErrorsViewDetail',
  OtherGiftVouchersCreate = 'OtherGiftVouchersCreate',
  OtherGiftVouchersDelete = 'OtherGiftVouchersDelete',
  OtherGiftVouchersView = 'OtherGiftVouchersView',
  OtherGiftVouchersUpdate = 'OtherGiftVouchersUpdate',
  RankingGiftVouchersCreate = 'RankingGiftVouchersCreate',
  RankingGiftVouchersDelete = 'RankingGiftVouchersDelete',
  RankingGiftVouchersView = 'RankingGiftVouchersView',
  RankingGiftVouchersUpdate = 'RankingGiftVouchersUpdate',
}

export default PermissionsEntity;
