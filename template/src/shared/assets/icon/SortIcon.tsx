import React from 'react';
import Icon from '@ant-design/icons';
const sortSvg = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 16H5V4H8L4 0L0 4H3V16ZM16 12H13V0H11V12H8L12 16L16 12Z" fill="currentColor" />
  </svg>
);
const SortIcon = props => <Icon component={sortSvg} {...props} />;
export default SortIcon;
