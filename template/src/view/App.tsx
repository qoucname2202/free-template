import '@shared/assets/css/animation.css';
import '@styles/styles.scss';

import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/vi';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import localeData from 'dayjs/plugin/localeData';
import utc from 'dayjs/plugin/utc';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';
import weekday from 'dayjs/plugin/weekday';
import React, { memo, useMemo } from 'react';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';

import locale from '@locale/index';
import { TokenSelector } from '@modules/authentication/profileStore';
import { LanguageSelector } from '@modules/setting/settingStore';
import PrivatePage from '@routers/component/PrivatePage';
import PublicPage from '@routers/component/PublicPage';
import ThemeContext, { ThemeColors } from '@shared/hook/ThemeContext';

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(utc);
dayjs.extend(isBetween);
const MainView = memo(({ statusLogin }: { statusLogin: boolean }) => {
  return <>{statusLogin ? <PrivatePage /> : <PublicPage />}</>;
});

export const initStyle: ThemeColors = {
  colorPrimary: '#5783C6',
  colorPrimaryLight: 'rgba(223, 236, 255, 0.8)',
  colorPrimaryBg: '#F0F0F0',
  colorText: '#666666',
  colorTextSecondary: '#4D4D4D',
  colorLink: '#fff',
  colorBgContainer: '#fff',
  colorBgLayout: '#f5f5f5',
  fontFamily: 'Roboto',
  colorError: 'red',
  colorTextBase: '#000',
  colorTextLightSolid: '#fff',
  colorTextBlue: '#001DB8',
  colorErrorBg: '#ff4d4f',
  colorPrimaryGradient:
    'linear-gradient(184.26deg, rgba(87, 131, 198, 0.8) 32.21%, rgba(87, 131, 198, 0.8) 70.97%)',
};

const App: React.FC = () => {
  const token = useSelector(TokenSelector);
  const { language } = useSelector(LanguageSelector);

  const memoLangData = useMemo(() => {
    return locale[language];
  }, [language]);

  return (
    <IntlProvider locale={language} messages={memoLangData}>
      <ThemeContext token={initStyle}>
        <MainView statusLogin={token !== ''} />
      </ThemeContext>
    </IntlProvider>
  );
};

export default App;
