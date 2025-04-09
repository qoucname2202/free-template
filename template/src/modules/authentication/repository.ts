import httpRepository from '@core/repository/http';
import User from '@modules/user/entity';

const register = (payload: any) => {
  return httpRepository.execute({
    path: '/auth/register',
    method: 'post',
    payload,
  });
};

const forgotPassword = (payload: any) => {
  return httpRepository.execute({
    path: '/api/Users/PasswordRecovery',
    method: 'post',
    payload,
    showSuccess: false,
  });
};

const VerifyPasswordRecoveryCode = (payload: string) => {
  return httpRepository.execute({
    path: '/api/Users/VerifyPasswordRecoveryCode',
    method: 'post',
    payload,
    showSuccess: false,
    showError: false,
  });
};

const updatePassword = (payload: any) => {
  return httpRepository.execute({
    path: '/api/Users/ChangePassword',
    method: 'put',
    payload,
    showSuccess: false,
    showError: false,
  });
};

export interface ILoginDTO {
  userName: string;
  password: string;
}

const login = (payload: ILoginDTO) => {
  return httpRepository.execute({
    path: '/api/Users/LogIn',
    method: 'post',
    payload,
    showError: false,
    showSuccess: false,
  });
};

const logout = () => {
  return httpRepository.execute({
    path: '/api/Users/logout',
    method: 'get',
    showSuccess: false,
  });
};

const resetPassword = (payload: any) => {
  return httpRepository.execute({
    path: '/api/Users/ResetPassword',
    method: 'post',
    payload,
  });
};

const getProfile = () => {
  return httpRepository.execute({
    path: '/api/Users/me',
    showSuccess: false,
    convert: res => {
      return new User(res);
    },
  });
};

const updateProfile = (payload: any) => {
  return httpRepository.execute({
    path: '/api/Users/me',
    method: 'put',
    payload,
    config: {
      isFormData: true,
    },
    convert: res => {
      return new User(res);
    },
  });
};

const updateProfileChangePassword = (payload: any) => {
  return httpRepository.execute({
    path: '/api/Users/me/ChangePassword',
    method: 'put',
    payload,
  });
};

const uploadAvatar = (payload: any) => {
  return httpRepository.execute({
    path: 'api/Users',
    method: 'put',
    payload,
  });
};

const updateProfileUser = (id: any, payload: any) => {
  return httpRepository.execute({
    path: `api/Users/${id}`,
    method: 'put',
    payload,
    config: { isFormData: true },
  });
};

export default {
  register,
  login,
  logout,
  resetPassword,
  forgotPassword,
  VerifyPasswordRecoveryCode,
  updatePassword,
  getProfile,
  uploadAvatar,
  updateProfile,
  updateProfileUser,
  updateProfileChangePassword,
};
