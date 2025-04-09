import { Badge } from 'antd';
import { PresetStatusColorType } from 'antd/lib/_util/colors';
import React from 'react';
import { FormattedMessage } from 'react-intl';

interface IBadge {
  status: number;
  id: string;
  listState?: PresetStatusColorType[];
  style?: any;
}
const UIBadge: React.FC<IBadge> = props => {
  const color = {
    success: 'rgba(52, 205, 38, 1)',
    processing: '#1890ff',
    error: 'rgba(255, 68, 68, 1)',
    warning: 'rgba(254, 183, 0, 1)',
    default: 'rgba(102, 102, 102, 1)',
  };
  const backgroundColor = {
    success: '#E3FFE1',
    processing: '#C1DAFF',
    error: '#FFE6DB',
    warning: '#FFF5E1',
    default: '#E0E0E0',
  };
  const status = React.useMemo<PresetStatusColorType>(() => {
    if (props.listState) {
      return props.listState[props.status || 0] || 'default';
    }
    if (props.status === 0) {
      return 'error';
    }
    if (props.status === 1) {
      return 'success';
    }
    if (props.status === 2) {
      return 'processing';
    }
    if (props.status === 3) {
      return 'default';
    }
    return 'warning';
  }, [props.listState, props.status]);

  if (props.status == null) {
    return <span>--</span>;
  }
  return (
    <Badge
      status={status}
      style={{
        backgroundColor: backgroundColor[status],
        border: `1px solid ${color[status]}`,
        borderRadius: '2rem',
        // padding: `${props.padding || '0.5rem 1rem'}`,
        padding: '0.5rem 1rem',
        color: color[status],
        ...props.style,
      }}
      text={
        <FormattedMessage
          id={props.id || 'common.status.param'}
          values={{ status: props.status }}
        />
      }
    />
  );
};

export default React.memo(UIBadge);
