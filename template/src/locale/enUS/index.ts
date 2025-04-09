import enUS from 'antd/lib/locale/en_US';

import auth from './auth';

import common from './common';

import pageError from './pageError';

import roles from './roles';
import server from './server';
import user from './user';
import device from './device';
import customer from './customer';
import settings from './settings';
import item from './item';
import collection from './collection';
import gift from './gift';
import events from './events';
import rankings from './rankings';
import voucher from './voucher';

export default {
  ...enUS,
  ...common,
  ...server,
  ...auth,
  ...pageError,
  ...roles,
  ...user,
  ...device,
  ...customer,
  ...settings,
  ...item,
  ...collection,
  ...gift,
  ...events,
  ...rankings,
  ...voucher,
};
