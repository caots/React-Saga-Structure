import React from 'react';
import { useTranslation } from 'react-i18next';

import { MenuItem } from './MenuItem';

export function MenuInner() {
  const { t } = useTranslation()
  return (
    <>
      <MenuItem title={ t('HEADER.SUBSCRIBES') } to='/home' />
    </>
  )
}
