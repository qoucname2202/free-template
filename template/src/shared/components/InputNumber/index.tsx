/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Input, InputProps } from 'antd';
import React, { useEffect, useState } from 'react';

interface NumericInputProps extends InputProps {
  value?: string;
  onChange?: (value: any) => void;
}

const NumericInput = (props: NumericInputProps) => {
  const [values, setValues] = useState(props.value || '');

  useEffect(() => {
    if (values === props.value || props.value == null) {
      return;
    }
    setValues(props.value);
  }, [props.value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      props.onChange && props.onChange(inputValue);
    }
  };
  const handleBlur = () => {
    let valueTemp = values;
    if (values.charAt(values.length - 1) === '.' || values === '-') {
      valueTemp = values.slice(0, -1);
    }
    props.onChange && props.onChange(valueTemp.replace(/(\d+)/, '$1'));
  };

  return <Input {...props} onChange={handleChange} onBlur={handleBlur} />;
};
export default NumericInput;
