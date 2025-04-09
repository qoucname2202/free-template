/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Input } from 'antd';
import lodash from 'lodash';
import React from 'react';
import * as Icon from 'react-feather';

import { useAltaIntl } from '@shared/hook/useTranslate';

import { ISearch } from './interface';

const SearchComponent = function <T>(props: ISearch<T>) {
  const { className } = props;
  const { intl } = useAltaIntl();

  const onSearch = React.useMemo(() => {
    return lodash.debounce(text => {
      props.onSearch && props.onSearch(text);
    }, 800);
  }, [props.onSearch]);

  const onChange = (e: any) => {
    const text = e.target.value;
    onSearch(text);
    props.onChange && props.onChange(e);
  };

  return (
    <div className={`search-bar ${className || ''}`}>
      <Input
        {...props}
        type="text"
        onChange={onChange}
        prefix={<Icon.Search />}
        placeholder={intl.formatMessage({
          id: props.placeholder,
          defaultMessage: props.placeholder,
        })}
      />
    </div>
  );
};

export default SearchComponent;
