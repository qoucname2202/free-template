import { routerForgotPassword } from '@view/Auth/ForgotPassword/router';
import { routerLogin } from '@view/Auth/Login/router';
import { routerViewProfile } from '@view/Auth/Profiles/router';
import { routerResetPassword } from '@view/Auth/ResetPassword/router';
import { routerHome } from '@view/Home/router';
import { routerPageError } from '@view/PageError/router';

import { IRouter } from './interface';

export const privatePage: IRouter[] = [routerHome, routerViewProfile, routerPageError];

export const publicPage: IRouter[] = [
  routerForgotPassword,
  routerResetPassword,
  routerLogin,
  routerPageError,
];
