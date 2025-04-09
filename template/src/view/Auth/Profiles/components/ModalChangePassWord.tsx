import { Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';

import { useAltaIntl } from '@hook/useTranslate';
import authenticationPresenter from '@modules/authentication/presenter';
import ButtonForm from '@shared/components/ButtonForm';
import { useSingleAsync } from '@shared/hook/useAsync';
import { isCheckLoading } from '@helper/isCheckLoading';

interface IChangePassWord {
  isModalVisible: boolean;
  setIsModalVisible: (arg: any) => void;
}

const ModalChangePassWord = (props: IChangePassWord) => {
  const { isModalVisible, setIsModalVisible } = props;
  const { formatMessage } = useAltaIntl();
  const [form] = useForm();
  const updateProfileChangePassword = useSingleAsync(
    authenticationPresenter.updateProfileChangePassword,
  );

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const onFinish = (values: any) => {
    delete values.confirmPassword;
    if (values) {
      updateProfileChangePassword?.execute(values).then(() => {
        authenticationPresenter.getProfile().then(() => {
          handleCancel();
        });
      });
    }
  };

  return (
    <Modal
      title={formatMessage('profile.change.password.title')}
      className="main-modal change-password-modal"
      open={isModalVisible}
      destroyOnClose={true}
      onCancel={handleCancel}
      closable={false}
      footer={
        <ButtonForm
          formName="form-change-pass"
          nameButtonSubmit={'common.save'}
          onCancelForm={() => handleCancel()}
          onOkForm={() => form.submit()}
          isLoading={isCheckLoading([updateProfileChangePassword])}
        />
      }
    >
      <Form
        className="main-form"
        layout="vertical"
        name="formChangePassword"
        form={form}
        onFinish={onFinish}
        requiredMark={false}
      >
        <Form.Item
          label={formatMessage('profile.oldPassword')}
          name="oldPassword"
          rules={[
            {
              required: true,
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              min: 8,
            },
          ]}
        >
          <Input.Password placeholder={formatMessage('profile.oldPassword')} />
        </Form.Item>

        <Form.Item
          label={formatMessage('profile.newPassword')}
          name="password"
          rules={[
            {
              required: true,
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              min: 8,
            },
          ]}
        >
          <Input.Password placeholder={formatMessage('profile.newPassword')} />
        </Form.Item>

        <Form.Item
          label={formatMessage('profile.confirm.newPassword')}
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(formatMessage('password.not.match')));
              },
            }),
          ]}
        >
          <Input.Password placeholder={formatMessage('profile.confirm.newPassword')} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalChangePassWord;
