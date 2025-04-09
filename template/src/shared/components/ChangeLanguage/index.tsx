import { Select } from 'antd';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import { LANGUAGE } from '@config';
import store from '@core/store/redux';
import { RootState } from '@modules';
import settingStore from '@modules/setting/settingStore';
import { Selector } from '@reduxjs/toolkit';

interface IChangeLanguage {
  language: string;
}

const ChangeLanguageSelector: Selector<RootState, IChangeLanguage> = (state: RootState) => ({
  language: state.settingStore.language,
});

const ChangeLanguage: any = () => {
  // JUST LANGUAGE
  const { language } = useSelector(ChangeLanguageSelector);
  const changeLanguage = (pLanguage: string) => {
    const key: any = pLanguage;
    store.dispatch(settingStore.actions.updateLanguage(key));
  };

  const options = LANGUAGE.map(({ value, label, icon }) => {
    return {
      value,
      label: (
        <div className="language-wrapper">
          <img src={icon} alt="" className="language-icon" />
          <span className="language-label">{label}</span>
        </div>
      ),
    };
  });

  return (
    <div className={'select-custom select-custom__language'}>
      <Select value={language} options={options} onChange={changeLanguage}></Select>
    </div>
  );
};

export default memo(ChangeLanguage);
