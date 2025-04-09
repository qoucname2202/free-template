import React from 'react';
import { useNavigate } from 'react-router-dom';

import { logo } from '@assets/images';
import { routerLogin } from '@view/Auth/Login/router';

const Logo: React.FC<any> = () => {
  const navigate = useNavigate();
  return (
    <div className="logo">
      <img
        src={logo}
        className="logo__img"
        onClick={() => {
          navigate(routerLogin.path);
        }}
      />
      {/* <h2 className="logo__text">Alta payment gateway</h2> */}
    </div>
  );
};
export default Logo;
