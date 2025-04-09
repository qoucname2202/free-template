import React from 'react';
import { ISearch } from './interface';
import { Button, Form } from 'antd';
import { useAltaIntl } from '@shared/hook/useTranslate';

const SidePanelInfo = (props: ISearch) => {
  // console.debug('SidePanel');
  const { classNames, onClick, formItems, title } = props;
  const { formatMessage, intl } = useAltaIntl();
  return (
    <div className="side-panel-info">
      <div className="title">{title}</div>
      <div>
        <div className="content">
          {formItems?.map((it, idx) => (
            <div>
              <div className="content__label">{it.label}</div>
              <div className="content__element">{it.element}</div>
            </div>
          ))}
        </div>
        <div className="footer_btn">
          <Button onClick={onClick} htmlType="submit" className="btn-search">
            {formatMessage('common.clear-filter')}
          </Button>
        </div>
      </div>
    </div>
  );
};

// export default React.memo(SidePanel);
export default React.memo(SidePanelInfo);
