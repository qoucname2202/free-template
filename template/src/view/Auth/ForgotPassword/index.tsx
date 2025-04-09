import '../styles.scss';

import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { Mail } from 'react-feather';
import { useNavigate } from 'react-router-dom';

import { isCheckLoading } from '@helper/isCheckLoading';
import { useSingleAsync } from '@hook/useAsync';
import authenticationPresenter from '@modules/authentication/presenter';
import ChangeLanguage from '@shared/components/ChangeLanguage';
import { useAltaIntl } from '@shared/hook/useTranslate';

import Logo from '../components/Logo';
import { routerLogin } from '../Login/router';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { formatMessage } = useAltaIntl();
  const { forgotPassword } = authenticationPresenter;
  const [desc, setDesc] = useState(false);
  const forgotPasswordCall = useSingleAsync(forgotPassword);

  const onSubmit = (values: any) => {
    forgotPasswordCall.execute(values).then(() => setDesc(true));
  };

  return (
    <div className="main-form forgot-form">
      <div className="change_language">
        <ChangeLanguage />
      </div>
      <div className="auth-wrapper">
        <div className="content-form">
          <Logo />

          <h3 className="main-title-forgot">{formatMessage('forgot.password.title')}</h3>
          {desc ? (
            <>
              <h3 className="text-desc">{formatMessage('forgot.text.desc')}</h3>
              <div className="text-desc-back">
                <Button
                  htmlType="submit"
                  type="primary"
                  className="normal-button mb-2.5 mt-8"
                  onClick={() => navigate(routerLogin.path)}
                >
                  {formatMessage('common.button.return')}
                </Button>
              </div>
            </>
          ) : (
            <>
              <h4 className="desc">{formatMessage('forgot.desc')}</h4>
              <Form name="forgotPassword" layout="vertical" onFinish={onSubmit}>
                <Form.Item name="email" rules={[{ required: true, type: 'email' }]}>
                  <Input
                    prefix={<Mail className="site-form-item-icon" />}
                    placeholder={formatMessage('forgot.password.email')}
                  />
                </Form.Item>
                <div className="flex items-center justify-center mt-14">
                  <Button
                    htmlType="submit"
                    type="primary"
                    loading={isCheckLoading([forgotPasswordCall])}
                    className="normal-button"
                  >
                    {formatMessage('forgot.password.button.accept')}
                  </Button>
                </div>
              </Form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
