import { useAltaIntl } from '@shared/hook/useTranslate';
import { Typography } from 'antd';
import lodash from 'lodash';
import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import { ITitle } from '../interface';

const TitleComponent: React.FC<ITitle> = props => {
  const { formatMessage } = useAltaIntl();
  const tooltip: string | undefined = React.useMemo<string | undefined>(() => {
    if (!lodash.isEmpty(tooltip)) {
      return formatMessage(tooltip || '');
    }
    if (typeof props.title === 'string') {
      return props.translate === true ? formatMessage(props.title) : props.title;
    }
    return undefined;
  }, [props.title, formatMessage]);
  return (
    <Typography.Title
      className={`defaultTitle ${props.className}`}
      level={props.level}
      title={props.tooltip}
    >
      {props.translate === true ? <FormattedMessage id={String(props.title)} /> : props.title}
    </Typography.Title>
  );
};

export default memo(TitleComponent);
