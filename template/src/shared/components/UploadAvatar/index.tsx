import './style.scss';

import { Upload } from 'antd';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import React, { useEffect, useState } from 'react';
import UilCloudUpload from '@iconscout/react-unicons/icons/uil-cloud-upload';

import { LoadingOutlined } from '@ant-design/icons';
import { useAltaIntl } from '@shared/hook/useTranslate';

interface IUploadAvatar {
  value?: any;
  onChange?: (value: any) => void;
  disabled?: boolean;
}

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export const UploadAvatar: React.FC<IUploadAvatar> = (props: IUploadAvatar) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const { formatMessage } = useAltaIntl();

  useEffect(() => {
    if (props.value instanceof File) {
      getBase64(props.value as RcFile, url => {
        setImageUrl(url);
        return;
      });
    }
    setImageUrl(props.value);
  }, [props.value]);

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    getBase64(info.file as RcFile, url => {
      setLoading(false);
      setImageUrl(url);
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    props?.onChange && props.onChange(info.file);
  };

  const uploadButton = (
    <div className="upload">
      {loading ? (
        <LoadingOutlined />
      ) : (
        <div className="icon">
          <UilCloudUpload />
        </div>
      )}
      <div className="btn">{formatMessage('common.choose-file')}</div>
    </div>
  );
  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      beforeUpload={() => false}
      onChange={handleChange}
      disabled={props.disabled}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="avatar" className="w-full h-full object-contain" />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};
