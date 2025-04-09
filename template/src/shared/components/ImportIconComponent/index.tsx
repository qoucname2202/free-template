import { useAltaIntl } from '@shared/hook/useTranslate';
import { Tooltip } from 'antd';
import React from 'react';
import * as Icon from 'react-feather';
interface IProps {
  onClick?: () => void;
  disable?: boolean;
  name?: string;
}
const ImportIconComponent = (props: IProps) => {
  const { formatMessage } = useAltaIntl();
  const onClick = (e: any) => {
    if (props?.onClick) {
      props?.onClick();
    }
    e.stopPropagation();
  };

  if (props?.disable) {
    return <></>;
  }
  return (
    <Tooltip
      title={formatMessage(props.name || 'common.import')}
      overlayStyle={{ width: 'fit-content' }}
    >
      <Icon.FilePlus
        className={`icon-edit ${props?.disable ? 'icon-disable' : ''}`}
        size={19}
        onClick={onClick}
      />
    </Tooltip>
  );
};

export default ImportIconComponent;
