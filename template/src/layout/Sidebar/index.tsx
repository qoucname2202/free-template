import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { imgAvatar, logo, LogoutIcon } from '@assets/images';
import store from '@core/store/redux';
import { UilAngleLeft, UilAngleRight } from '@iconscout/react-unicons';
import { RootState } from '@modules';
import { removeProfile } from '@modules/authentication/profileStore';
import { Selector } from '@reduxjs/toolkit';
import { privatePage } from '@routers/mainRouter';
import { DeleteConfirm } from '@shared/components/ConfirmDelete';
import { useAltaIntl } from '@shared/hook/useTranslate';

import MenuCustom from './ItemMenu';

interface IHeaderComponent {
  profile?: any;
}
const HeaderComponentSelector: Selector<RootState, IHeaderComponent> = (state: RootState) => {
  return {
    profile: state.profile.user,
  };
};

const SiderComponent: React.FC<{
  className: string;
  setClassName: (className: string) => void;
}> = props => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formatMessage } = useAltaIntl();

  const { className, setClassName } = props;
  const [width, setWidth] = useState<string | number>();
  const [collapse, setCollapse] = useState<boolean>(false);
  const onClick = (e: any) => {
    setClassName('sider-component big');
    e.preventDefault();
    e.stopPropagation();
    setCollapse(false);
  };
  const { profile } = useSelector(HeaderComponentSelector);

  const handleOnlick = () => {
    setClassName('sider-component');
  };

  useEffect(() => {
    if (className === 'sider-component') {
      setWidth('30rem');
      setCollapse(true);
    } else {
      setWidth('100%');
    }
  }, [className]);

  return (
    <div className={className} onClick={onClick} onMouseEnter={onClick}>
      {
        <div className="icon" onClick={handleOnlick}>
          {collapse ? <UilAngleRight /> : <UilAngleLeft />}
        </div>
      }

      <div className="mask" style={{ width }}>
        <div className="wrapper-logo">
          <div className={`logo ${collapse ? 'logo-small' : ''}`}>
            <img src={logo} alt="logo" onClick={() => navigate('/')} />
          </div>
        </div>
        <div className="wrapper-sidebar">
          <MenuCustom listNav={privatePage} location={location.pathname} collapse={collapse} />
        </div>

        <div className="wrapper-footer">
          <div className="footer__container">
            <div
              className="item__left"
              onClick={() => {
                navigate('/profile');
              }}
            >
              <div className="dropdown__profile__img">
                <img alt="img-avatar" className="img-avatar" src={profile?.avatar || imgAvatar} />
              </div>

              <div className="text-avatar">
                <div className="name-avatar text">{profile?.name || '--'}</div>
                <div className="address-avatar text">{profile?.address || '--'}</div>
                <div className="role-avatar text">{profile?.role?.name || '--'}</div>
              </div>
            </div>

            <div className="item__right">
              <img
                src={LogoutIcon}
                alt=""
                className="icon-logout"
                onClick={() => {
                  return DeleteConfirm({
                    title: formatMessage('common.logout.title'),
                    content: formatMessage('common.logout.content'),
                    handleOk: () => {
                      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                      store.dispatch(removeProfile()), navigate('/login');
                    },
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiderComponent;
