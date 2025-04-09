import './styles.scss';

import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAltaIntl } from '@shared/hook/useTranslate';
import Logo from '@view/Auth/components/Logo';

const PageError = () => {
  const navigate = useNavigate();
  const { formatMessage } = useAltaIntl();

  return (
    <div className="page-error">
      <div className="auth-wrapper">
        <div className="content-form">
          <Logo />
          <h3 className="main-title">{formatMessage('common.404error')}</h3>
          <h3 className="sub-title">{formatMessage('common.page.notfound')}</h3>
          <h3 className="text-desc mb-2.5">{formatMessage('common.404note')}</h3>
          <Button
            htmlType="submit"
            type="primary"
            className="normal-button mb-2.5 mt-8"
            onClick={() => navigate(-1)}
          >
            {formatMessage('common.button.accept')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PageError;
