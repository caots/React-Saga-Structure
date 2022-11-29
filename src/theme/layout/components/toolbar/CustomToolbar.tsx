import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Languages, PageUrl } from '../../../../app/utils/common/constants';
import { useAppSelector } from '../../../../setup/redux/Hooks';

type Props = {

  title?: string,

}

const CustomToolbar: React.FC<Props> = ({ title }) => {
  // const language = useAppSelector(selectLanguage);
  const { t } = useTranslation();
  
  return <div className='row toolbar-b8ak my-6'>
    <div className='col-lg-6 col-sm-12'>
      <div className='title'>{title}</div>
    </div>
    <div className='col-lg-6 col-sm-12 d-lg-flex d-sm-block head-breadcrumb'>
      <Link to={PageUrl.HOME}>{t('HOME')}</Link>
      <i className="fas fa-chevron-right mx-5"></i>
      <span>{title}</span>
    </div>
  </div>
}

export { CustomToolbar }
