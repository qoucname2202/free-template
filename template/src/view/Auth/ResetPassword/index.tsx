import { Button, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { isCheckLoading } from '@helper/isCheckLoading';
import { useSingleAsync } from '@hook/useAsync';
import { useAltaIntl } from '@hook/useTranslate';
import authenticationPresenter from '@modules/authentication/presenter';
import ChangeLanguage from '@shared/components/ChangeLanguage';
import Logo from '../components/Logo';
import '../styles.scss';
import PageError from '@view/PageError';
import { routerForgotPassword } from '../ForgotPassword/router';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { formatMessage } = useAltaIntl();
  const { resetPassword, VerifyPasswordRecoveryCode } = authenticationPresenter;
  const [checkRecovery, setCheckRecovery] = useState(false);
  const VerifyPasswordRecoveryCodeCall = useSingleAsync(VerifyPasswordRecoveryCode);
  const resetPasswordCall = useSingleAsync(resetPassword);
  const { code } = useParams<{ code: string }>();

  useEffect(() => {
    if (!code) {
      return;
    }
    VerifyPasswordRecoveryCodeCall.execute({ recoveryCode: code })
      .then(() => {
        setCheckRecovery(true);
      })
      .catch(() => setCheckRecovery(false));
  }, [code]);

  const onSubmitResetPassword = (values: any) => {
    delete values.confirmPassword;
    const newValue = {
      ...values,
      recoveryCode: code,
    };
    resetPasswordCall?.execute(newValue).then(() => {
      navigate('/login');
    });
  };

  return (
    <div className="main-form auth-form">
      <div className="change_language">
        <ChangeLanguage />
      </div>
      <div className="auth-wrapper">
        <div className="content-form">
          <Logo />
          {!checkRecovery ? (
            <>
              <h3 className="text-desc">{formatMessage('reset.password.deadline.title')}</h3>
              <div className="text-desc-back">
                <Button
                  htmlType="submit"
                  type="primary"
                  className="normal-button mb-2.5 mt-8"
                  onClick={() => navigate(routerForgotPassword.path)}
                >
                  {formatMessage('reset.password.button.return')}
                </Button>
              </div>
            </>
          ) : (
            <>
              <h3 className="main-title">{formatMessage('reset.password.title')}</h3>
              <Form
                name="resetPassword"
                layout="vertical"
                onFinish={onSubmitResetPassword}
                requiredMark={false}
              >
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      pattern:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !@#$%^&*\(\)-_=+:";{}[\]\\\/<>.,~`]).{8,}$/g,
                      min: 8,
                    },
                  ]}
                >
                  <Input.Password placeholder={formatMessage('profile.newPassword')} />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  dependencies={['password']}
                  rules={[
                    {
                      required: true,
                    },
                    ({ getFieldValue }) => ({
                      validator(_, passwordConfirm) {
                        if (!passwordConfirm || getFieldValue('password') === passwordConfirm) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error(formatMessage('auth.password.not.match')));
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder={formatMessage('auth.password.confirm')} />
                </Form.Item>
                <div className="flex items-center justify-center mt-14">
                  <Button
                    htmlType="submit"
                    type="primary"
                    loading={isCheckLoading([resetPasswordCall])}
                  >
                    {formatMessage('common.button.accept')}
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

export default ResetPassword;
