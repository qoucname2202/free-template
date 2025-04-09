/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/lines-between-class-members */
import { message } from 'antd';
import axios, { AxiosInstance, CancelToken } from 'axios';
import lodash from 'lodash';

import CONFIG from '@config/index';
import store from '@core/store/redux';
import { delay } from '@helper/functions';
import locale, { Locale } from '@locale/index';
import { RootState } from '@modules';
import { removeProfile, setToken } from '@modules/authentication/profileStore';

declare const window: Window & {
  grecaptcha?: {
    execute: (key: string, config?: { action?: string }) => Promise<string>;
  };
};

const handleReCaptchaVerify = (key: any) => {
  if (window.grecaptcha != undefined) {
    return window.grecaptcha.execute(key, {
      action: 'submit',
    });
  } else {
    return Promise.reject('Google recaptcha null');
  }
};

export interface IParamsHTTP<T> {
  method?: 'get' | 'post' | 'delete' | 'put';
  path: string;
  payload?: any;
  params?: any;
  config?: {
    responseType?: 'arraybuffer';
    isFormData?: boolean;
    recaptcha?: boolean;
    cancelToken?: CancelToken;
  };
  showSuccess?: boolean;
  showError?: boolean;
  convert?: (res: any) => T;
}

export class HTTPRepository {
  private service: AxiosInstance;
  private token?: any;
  private refreshToken?: any;

  private language: keyof Locale = 'en';
  private refreshUrl: string = '/api/Users/Refresh';
  private refreshTokenController?: AbortController;
  // private isRefresh:

  constructor(baseURL?: string, refreshUrl?: string) {
    this.service = axios.create({
      baseURL: baseURL || CONFIG.API_BASE_URL,
      withCredentials: false,
    });
    if (refreshUrl != null) {
      this.refreshUrl = refreshUrl;
    }
    const state: RootState = store.getState();
    this.token = state?.profile?.token;
    this.refreshToken = state?.profile?.refreshToken;
    this.language = state.settingStore.language;

    store.subscribe(() => {
      const newState: RootState = store.getState();
      this.token = newState.profile.token;
      this.refreshToken = newState?.profile?.refreshToken;
      this.language = newState.settingStore.language;
    });
  }

  private handleSuccess(response: any, convert: any, showSuccess: any) {
    if (showSuccess) {
      message.success(locale[this.language][response?.data?.message] || response?.data?.message);
    }
    if (convert != undefined) {
      return Promise.resolve(convert(response.data?.data));
    }
    return Promise.resolve(response);
  }

  refreshTokenFunction = (): Promise<{ token: string; refreshToken: string }> => {
    this.refreshTokenController = new AbortController();
    return this.execute({
      path: this.refreshUrl,
      method: 'post',
      payload: { refreshToken: this.refreshToken },
      showSuccess: false,
      convert: rs => {
        return {
          token: rs.accessToken,
          refreshToken: rs.refreshToken,
        };
      },
    });
  };

  private handleError(error: any, showError: any, arr: any) {
    let status = error.response?.status;
    if (axios.isCancel(error)) {
      console.log('Request đã được bãi bỏ', error.message);
      return Promise.reject(error);
    }
    switch (status) {
      case 400: {
        if (showError) {
          message.error(
            locale[this.language][error.response?.data?.message] || error.response?.data?.message,
          );
        }
        break;
      }
      case 401: {
        if (this.token == null || this.refreshToken == null) {
          break;
        }
        if (this.refreshTokenController != null) {
          return delay(1000).then(() => this.execute(arr));
        }
        return this.refreshTokenFunction()
          .then(rs => {
            this.refreshTokenController = undefined;
            store.dispatch(setToken(rs));
            return this.execute(arr);
          })
          .catch(() => {
            this.refreshTokenController = undefined;
            store.dispatch(removeProfile());
            window.location.href = CONFIG.LOGIN_PAGE;
          });
      }
      case 500: {
        message.error(
          locale[this.language][error.response?.data?.message] || error.response?.data?.message,
        );
        break;
      }
      case undefined: {
        if (showError) {
          message.error(locale[this.language]['server.networkError']);
        }
        break;
      }
      default: {
        if (showError) {
          message.error('HTTP CODE ' + status);
        }
        break;
      }
    }
    return Promise.reject(error);
  }

  private preparePrivateHeaderConfig() {
    if (lodash.isEmpty(this.token)) {
      return {};
    }
    return {
      Authorization: `Bearer ${this.token}`,
    };
  }

  private getDefaultConfig({ isFormData, recaptcha, cancelToken }: any = {}) {
    const config = {
      headers: {},
    };

    const privateHeaderConfig = this.preparePrivateHeaderConfig();
    Object.assign(config.headers, privateHeaderConfig);

    if (isFormData) {
      Object.assign(config.headers, {
        'Content-Type': 'multipart/form-data',
      });
    }
    if (recaptcha) {
      Object.assign(config.headers, {
        recaptcha: recaptcha,
      });
    }
    if (cancelToken) {
      Object.assign(config, {
        cancelToken: cancelToken,
      });
    }
    return config;
  }

  async execute<T>({
    method = 'get',
    path = '',
    payload,
    config = { responseType: undefined },
    params,
    showSuccess = true,
    showError = true,
    convert = res => res,
  }: IParamsHTTP<T>): Promise<T> {
    let args: Array<any>;
    const { isFormData = false, responseType, cancelToken } = config;
    let recaptcha: any = undefined;
    if (config.recaptcha) {
      recaptcha = await handleReCaptchaVerify(CONFIG.SITEKEY);
    }
    switch (method) {
      case 'get': {
        if (params) {
          const paramsData: URLSearchParams = Object.keys(params).reduce((url, key) => {
            if (Array.isArray(params[key])) {
              params[key].forEach(element => {
                if (element != undefined) {
                  url.append(key, element);
                }
              });
            } else if (params[key] != undefined) {
              url.append(key, params[key]);
            }
            return url;
          }, new URLSearchParams());
          args = [
            path,
            {
              ...this.getDefaultConfig({ recaptcha, cancelToken }),
              responseType,
              params: paramsData,
              // paramsSerializer: params => {
              //   console.debug(params);
              //   return qs.stringify(params, { arrayFormat: 'repeat' });
              // },
            },
          ];
        } else {
          args = [path, { ...this.getDefaultConfig({ recaptcha, cancelToken }), responseType }];
        }
        break;
      }
      case 'delete': {
        let data = payload || {};
        if (recaptcha) {
          data = Object.assign(data, { recaptcha });
        }
        args = [
          path,
          {
            data,
            ...this.getDefaultConfig({ recaptcha, cancelToken }),
            params: params ? params : null,
          },
        ];
        break;
      }
      case 'post':
      case 'put': {
        let data = payload;
        if (isFormData) {
          if (isFormData) {
            // data = axios.toFormData(payload);
            data = new FormData();
            const arrKey = Object.getOwnPropertyNames(payload);
            data = arrKey.reduce((form, item) => {
              if (payload[item] !== undefined) {
                const value = payload[item];
                if (Array.isArray(value)) {
                  for (let i = 0; i < value.length; i++) {
                    const it = value[i];
                    if (typeof it === 'string' || it instanceof File) {
                      form.append(`${item}`, it);
                    } else {
                      Object.keys(it).forEach((f: any) => {
                        form.append(`${item}[${i}].${f}`, it[f]);
                      });
                    }
                  }
                } else {
                  form.append(item, value);
                }
              }
              return form;
            }, new FormData());
            if (recaptcha) {
              data.append(recaptcha, recaptcha);
            }
          } else if (recaptcha) {
            data = Object.assign(data, { recaptcha });
          }

          args = [
            path,
            data,
            {
              ...this.getDefaultConfig({ isFormData, recaptcha, cancelToken }),
              responseType,
            },
          ];
          break;
        }
      }

      default:
        break;
    }

    //@ts-ignore
    return this.service[method](...args)
      .then(response => {
        return this.handleSuccess(response, convert, showSuccess);
      })
      .catch(error =>
        this.handleError(error, showError, {
          method,
          path,
          payload,
          config,
          params,
          showSuccess,
          showError,
          convert,
        }),
      );
  }
}

const httpRepository = new HTTPRepository();

export default httpRepository;
