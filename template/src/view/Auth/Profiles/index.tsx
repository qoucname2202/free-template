import RightMenu, { IArrayAction } from '@layout/RightMenu';
import { RootState } from '@modules';
import authenticationPresenter from '@modules/authentication/presenter';
import ButtonForm from '@shared/components/ButtonForm';
import MainTitleComponent from '@shared/components/MainTitleComponent';
import { useSingleAsync } from '@shared/hook/useAsync';
import { useAltaIntl } from '@shared/hook/useTranslate';
import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AvatarUser from './components/AvatarUser';
import ModalChangePassWord from './components/ModalChangePassWord';
import { routerViewProfile } from './router';
import './style.scss';
import { removeNullFields } from '@helper/functions';
import NumericInput from '@shared/components/InputNumber';
import dayjs from 'dayjs';

const Profile = () => {
  const [form] = Form.useForm();
  const { formatMessage } = useAltaIntl();
  const [isDisableForm, setIsDisableForm] = useState(true);
  const { user } = useSelector((state: RootState) => state.profile);
  const navigate = useNavigate();
  const updateProfile = useSingleAsync(authenticationPresenter.updateProfile);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }
    form.setFieldsValue({
      ...user,
    });
  }, [form, user]);

  const chooseFile = (file: any) => {
    form.setFieldsValue({ avatar: file });
  };

  const arrayAction: IArrayAction[] = [
    {
      iconType: 'edit',
      name: 'profile.edit',
      handleAction: () => setIsDisableForm(false),
    },
    {
      iconType: 'key',
      name: 'common.change.password',
      handleAction: () => setIsVisible(true),
    },
  ];

  const onUpdateProfile = (values: any) => {
    removeNullFields(values);
    values.avatarPicture = typeof values.avatar === 'string' ? undefined : values.avatar;
    values.dayOfBirth = values.dayOfBirth && dayjs(values.dayOfBirth).utc().format();
    delete values.avatar;
    updateProfile.execute(values).then(() => {
      authenticationPresenter.getProfile().then(() => {
        setIsDisableForm(true);
      });
    });
  };

  return (
    <div className="profile-page">
      <div className="main-component">
        <MainTitleComponent breadcrumbs={routerViewProfile} />
        <div className="profile-user__box">
          <Form
            className="main-form"
            name="userProfileForm"
            initialValues={user}
            layout="vertical"
            requiredMark={false}
            form={form}
            onFinish={onUpdateProfile}
            onResetCapture={() => {
              setIsDisableForm(true);
            }}
            id="userProfileForm"
            disabled={isDisableForm}
          >
            <div className="profile-avatar">
              <AvatarUser chooseFile={chooseFile} disabled={isDisableForm} />
            </div>
            <Row className="profile-form__box" justify="center">
              <Col span={8}>
                <div className="main-form">
                  <Form.Item
                    label={formatMessage('users.userName')}
                    name="username"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder={formatMessage('users.userName')} disabled />
                  </Form.Item>
                  <Form.Item
                    label={formatMessage('users.phoneNumber')}
                    name="phoneNumber"
                    rules={[
                      {
                        pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                        message: formatMessage('customer.validate-phone'),
                      },
                    ]}
                  >
                    <NumericInput placeholder={formatMessage('users.phoneNumber')} />
                  </Form.Item>

                  <Form.Item label={formatMessage('users.citizenId')} name="identifierNumber">
                    <NumericInput placeholder={formatMessage('users.citizenId')} maxLength={256} />
                  </Form.Item>
                  {/* <Form.Item label={formatMessage('users.countryName')} name="countryName">
                    <Input placeholder={formatMessage('users.countryName')} maxLength={256} />
                  </Form.Item> */}
                </div>
              </Col>
              <Col span={8}>
                <div className="main-form">
                  <Form.Item
                    label={formatMessage('users.email')}
                    name="email"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder={formatMessage('users.email')} />
                  </Form.Item>
                  <Form.Item label={formatMessage('users.birthday')} name="dayOfBirth">
                    <DatePicker
                      placeholder={formatMessage('users.birthday')}
                      format={'DD/MM/YYYY'}
                    />
                  </Form.Item>
                  <Form.Item label={formatMessage('device.status')} name="status">
                    <Select
                      placeholder={formatMessage('device.status')}
                      disabled
                      options={[
                        { label: formatMessage('common.statusActive'), value: 1 },
                        { label: formatMessage('common.statusDeactive'), value: 2 },
                      ]}
                    />
                  </Form.Item>
                  {/* <Form.Item label={formatMessage('users.address')} name="address">
                    <Input placeholder={formatMessage('users.address')} maxLength={256} />
                  </Form.Item> */}
                </div>
              </Col>
            </Row>
          </Form>
        </div>
        {isDisableForm ? (
          <div className="wrap_btn">
            <Button type="primary" onClick={() => navigate(-1)}>
              {formatMessage('common.back')}
            </Button>
          </div>
        ) : (
          <ButtonForm
            formName="profile-form"
            nameButtonSubmit={'common.update'}
            onCancelForm={() => {
              setIsDisableForm(true);
              form.setFieldsValue(user);
            }}
            onOkForm={() => form.submit()}
          />
        )}
      </div>

      <RightMenu arrayAction={arrayAction} />
      <ModalChangePassWord isModalVisible={isVisible} setIsModalVisible={setIsVisible} />
    </div>
  );
};

export default Profile;
