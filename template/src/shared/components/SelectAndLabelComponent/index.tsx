import { Select, SelectProps } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import ISelect from '@core/select';
import { useAltaIntl } from '@shared/hook/useTranslate';

const { Option } = Select;

export interface ISelectAndLabel extends SelectProps {
  disabled?: boolean;
  textLabel?: any;
  defaultValue?: any;
  dataString?: Array<ISelect>;
  onChange?: any;
  placeholder?: string;
  value?: any;
  className?: string;
  classNameSelect?: string;
  dropdownClassName?: string;
  name?: string;
  keyLabel?: string;
  translate?: boolean;
}

const SelectAndLabelComponent: React.FC<ISelectAndLabel> = (props: ISelectAndLabel) => {
  const { keyLabel, dataString, translate } = props;
  const { formatMessage } = useAltaIntl();

  const className = props.className ? props.className : '';
  // const all = intl.formatMessage({ id: 'common.all' });

  const renderUIOption = React.useMemo(() => {
    if (dataString == null) {
      return undefined;
    }
    return dataString.map((item: ISelect, index: number) => {
      if (translate === false) {
        return (
          <Option value={item.value} key={index}>
            {item?.label}
          </Option>
        );
      }
      return (
        <Option value={item.value} key={index}>
          {keyLabel != null && item.value != null ? (
            <FormattedMessage id={item?.label} values={{ [keyLabel]: item.value }} />
          ) : (
            <FormattedMessage id={item?.label} />
          )}
        </Option>
      );
    });
  }, [dataString, keyLabel, translate]);

  const renderUILabel = React.useMemo(() => {
    if (props?.textLabel == null) {
      return undefined;
    }
    return (
      <div className="mb-3">
        <FormattedMessage id={props.textLabel} defaultMessage={props.textLabel} />
      </div>
    );
  }, [props.textLabel]);

  return (
    <div className={`select-label-component ${className}`}>
      <div className="label-select">
        {renderUILabel}
        <Select
          {...props}
          className={'select-custom ' + (props.classNameSelect || '')}
          // defaultValue={props?.defaultValue ? props?.defaultValue : all}
          disabled={props.disabled}
          popupClassName={props?.dropdownClassName}
          placeholder={props?.placeholder || formatMessage('common.all')}
          getPopupContainer={trigger => trigger.parentElement}
        >
          {renderUIOption}
        </Select>
      </div>
    </div>
  );
};

export default React.memo(SelectAndLabelComponent);
