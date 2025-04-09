// import React from 'react';

import { InputProps } from 'antd';

export interface ISearch<T> extends InputProps {
  defaultValue: string | number | readonly string[] | undefined;
  onChange?: (value: any) => void;
  onClick?: (value: any) => void;
  className?: string;
  placeholder?: string;
  onSearch?: (value: any) => void;
  name: string;
}
