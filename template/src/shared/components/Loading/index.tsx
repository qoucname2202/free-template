import { LoadingOutlined } from '@ant-design/icons';
import './loading.scss';

import { Spin } from 'antd';
import * as React from 'react';

const Loading = () => {
  return (
    <div className="vertical-centered-box flex items-center justify-center">
      <div className="content-wrapper-loading">
        <div className="loader-circle" />
        <div className="loader-line-mask">
          <div className="loader-line" />
        </div>
        <span className="icon-Unilever-Converted icon-loading-font" />
      </div>
    </div>
  );
};

export const LoadingChild = () => {
  return (
    <div className="content-wrapper-loading">
      <div className="loader-circle" />
      <div className="loader-line-mask">
        <div className="loader-line" />
      </div>
      <span className="icon-Unilever-Converted icon-loading-font" />
    </div>
  );
};

export const LoadingSpin = (props: any) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;
  return (
    <div className={`flex items-center justify-center h-[80vh] ${props?.className}`}>
      <Spin size="large" indicator={antIcon} />
    </div>
  );
};

export default React.memo(Loading);
