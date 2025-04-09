import { Button, Form } from 'antd';
import React from 'react';

import { useAltaIntl } from '@shared/hook/useTranslate';

import { ISearch } from './interface';

const SidePanel = (props: ISearch) => {
  // console.debug('SidePanel');
  const { classNames, onFinish, formItems, name } = props;
  const [form] = Form.useForm();
  const { formatMessage, intl } = useAltaIntl();

  const handleClearFilter = (v: any) => {
    form.resetFields();
    onFinish?.(form.getFieldsValue());
  };
  const handleFormValuesChange = (value, values) => {
    // console.debug('handleFormValuesChange,', values);
    // console.debug('handleFormValuesChange123123', value.numberRange);
    onFinish?.(values);
  };
  return (
    <div className="side-panel">
      <div className="title">{name}</div>
      <div
      // className="wrap_box intro-y"
      >
        <Form
          form={form}
          onValuesChange={handleFormValuesChange}
          layout="vertical"
          // className="cus_form"
        >
          <div className="content">
            {formItems?.map((it, idx) => (
              <Form.Item
                name={it.name}
                label={intl.formatMessage({
                  id: it.label,
                  defaultMessage: it.label,
                })}
                className={it.width || ''}
                key={idx}
              >
                {it.element}
              </Form.Item>
            ))}
          </div>
          <div className="footer_btn">
            <Button onClick={handleClearFilter} htmlType="submit" className="btn-search">
              {formatMessage('common.clear-filter')}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

// export default React.memo(SidePanel);
export default React.memo(SidePanel);
