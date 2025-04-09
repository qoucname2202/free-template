import { PresetColorType } from 'antd/lib/_util/colors';

import { english, vietnam } from '@assets/images';
import ISelect from '@core/select';

export const LANGUAGE: ISelect<string>[] = [
  { value: 'vi', label: 'VNM', icon: vietnam },
  { value: 'en', label: 'ENG', icon: english },
];

export const allSelect: ISelect = { label: 'common.all', value: undefined };

const CONFIG = {
  API_BASE_URL: process.env.API_BASE_URL,
  APP_NAME: process.env.APP_NAME || 'CMS-SSO',
  LOGIN_PAGE: '/#/login',
  SSO_PAGE: '/#',
  SITEKEY: process.env.NEXT_PUBLIC_RECAPTCHA_KEY || '6LdfDBMmAAAAAMrYoJlCIDyKYMJ6qnVrreOSbBUh',
};

export const colors: PresetColorType[] = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime',
];

export default CONFIG;
