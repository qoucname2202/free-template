import { Select, SelectProps } from 'antd';
import React, { memo, useEffect, useState } from 'react';

import { PaginationEntity } from '@core/pagination/entity';
import { useAltaIntl } from '@shared/hook/useTranslate';

interface IOption {
  value: string | null;
  label: string;
}

interface ISelectApiComponent extends SelectProps {
  apiServices?: (...params: any) => Promise<{ data: Array<IOption>; info?: PaginationEntity }>;
  isHaveAll?: boolean;
}

const SelectApiComponent: React.FC<ISelectApiComponent> = (props: ISelectApiComponent) => {
  const [option, setOption] = useState<IOption[]>([]);
  const { formatMessage } = useAltaIntl();
  useEffect(() => {
    if (!props.apiServices) {
      return;
    }
    props.apiServices({}, {}).then(res => {
      if (props.isHaveAll) {
        const newOption = [{ label: formatMessage('common.all'), value: null }, ...res.data];
        setOption(newOption);
      } else {
        setOption(res.data);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.apiServices]);

  return (
    <Select
      options={option}
      {...props}
      defaultValue={props.defaultValue ? props.defaultValue : props.isHaveAll ? null : undefined}
      getPopupContainer={trigger => trigger.parentElement}
    />
  );
};

export default memo(SelectApiComponent);
