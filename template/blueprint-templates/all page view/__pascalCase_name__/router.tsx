import React from 'react';

import { UserOutlined } from '@ant-design/icons';
import { IRouter } from '@routers/interface';

const router{{pascalCase name}}: IRouter = {
  path: '/{{kebabCase name}}',
  loader: React.lazy(() => import('./index')),
  exact: true,
  name: '{{camelCase name}}.name', //translate here for breadcrumb and sidebar
  masterLayout: true,
  menu: {
    icon: <UserOutlined />,
  },
};

export default router{{pascalCase name}};