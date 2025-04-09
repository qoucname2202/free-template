import React from 'react';

export interface ISearch {
  onClick?: (value: any) => void;
  classNames?: string;
  title: string;
  formItems?: {
    label: string;
    element: React.ReactNode;
    width?: 'w-50' | 'w-full';
  }[];
}
