import viVN from 'antd/lib/locale/vi_VN';

import auth from './auth';
import common from './common';
import Form from './form';
import pageError from './pageError';
import roles from './roles';
import server from './server';
import settings from './settings';
import user from './user';
import device from './device';
import customer from './customer';
import voucher from './voucher';
import item from './item';
import gift from './gift';
import collection from './collection';
import rankings from './rankings';
import events from './events';

export default {
  ...viVN,
  ...common,
  ...server,
  ...auth,
  ...pageError,
  ...roles,
  ...user,
  ...settings,
  ...device,
  ...customer,
  ...voucher,
  ...item,
  ...gift,
  ...rankings,
  ...collection,
  ...events,
  Form,
};
