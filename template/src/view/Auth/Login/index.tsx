import '../styles.scss';

import { Button, Checkbox, Form, Input } from 'antd';
import React, { useState } from 'react';
import { Lock, User } from 'react-feather';
import { useNavigate } from 'react-router-dom';

import { isCheckLoading } from '@helper/isCheckLoading';
import { useSingleAsync } from '@hook/useAsync';
import { useAltaIntl } from '@hook/useTranslate';
import authenticationPresenter from '@modules/authentication/presenter';
import ChangeLanguage from '@shared/components/ChangeLanguage';

import Logo from '../components/Logo';
import RenderError from '../components/RenderError';
import { routerForgotPassword } from '../ForgotPassword/router';

const Login = () => {
  const navigate = useNavigate();
  const { formatMessage, intl } = useAltaIntl();
  const { login } = authenticationPresenter;
  const loginByAccount = useSingleAsync(login);
  const [errorStatus, setErrorStatus] = useState('');

  const onSubmitAccount = (values: any) => {
    if (values.remember) {
      window.localStorage.setItem('remember-me', '1');
    } else {
      window.localStorage.removeItem('remember-me');
      window.sessionStorage.setItem('remember-me', '1');
    }
    document.cookie = `remember_me=${true}; SameSite=None; Secure`;
    loginByAccount
      ?.execute(values)
      ?.then(() => {
        navigate('/');
      })
      .catch(err => {
        setErrorStatus(intl.formatMessage({ id: err?.response?.data?.message }));
      });
  };

  return (
    <>
      <div className="main-form auth-form">
        <div className="change_language">
          <ChangeLanguage />
        </div>
        <div className="auth-wrapper">
          <div className="content-form">
            <Logo />
            <h3 className="main-title">{formatMessage('login.title')}</h3>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onSubmitAccount}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: formatMessage('login.required.username') }]}
              >
                <Input
                  prefix={<User className="site-form-item-icon" />}
                  placeholder={formatMessage('login.userName')}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: formatMessage('login.required.password') }]}
              >
                <Input.Password
                  prefix={<Lock className="site-form-item-icon" />}
                  type="password"
                  placeholder={formatMessage('login.password')}
                />
              </Form.Item>
              {errorStatus && <RenderError errorStatus={errorStatus} />}
              <Form.Item className="form-buttons">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>{formatMessage('login.remember')}</Checkbox>
                </Form.Item>
                <div className="forgot__pass">
                  <a onClick={() => navigate(routerForgotPassword.path)}>
                    {formatMessage('login.forgot.password')}
                  </a>
                </div>
              </Form.Item>

              <div className="flex items-center justify-center mt-8">
                <Button
                  htmlType="submit"
                  type="primary"
                  className="normal-button"
                  loading={isCheckLoading([loginByAccount])}
                >
                  {formatMessage('login.button.account')}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
