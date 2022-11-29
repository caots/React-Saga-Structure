/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { PageUrl } from '../../../../app/utils/common/constants';

import { KTSVG, toAbsoluteUrl } from '../../../../app/utils/helpers';
import { useLayout } from '../../core';
import { AsideMenu } from './AsideMenu';

const AsideDefault: FC = () => {
  const { config, classes } = useLayout()
  const { aside } = config

  return (
    <div
      id='kt_aside'
      className={clsx('aside', classes.aside.join(' '))}
      data-kt-drawer='true'
      data-kt-drawer-name='aside'
      data-kt-drawer-activate='{default: true, lg: false}'
      data-kt-drawer-overlay='true'
      data-kt-drawer-width="{default:'200px', '300px': '250px'}"
      data-kt-drawer-direction='start'
      data-kt-drawer-toggle='#kt_aside_mobile_toggle'
    >
      {/* begin::Brand */}
      <div className='aside-logo flex-column-auto justify-content-center' id='kt_aside_logo'>
        {/* begin::Logo */}
        {aside.theme === 'dark' && (
          <Link to={PageUrl.HOME}>
            <img
              height={37}
              alt='Logo'
              className='logo'
              src="/assets/images/common/logo-light.png"
            />
          </Link>
        )}
        {aside.theme === 'light' && (
          <Link to={PageUrl.HOME}>
            <img
              alt='Logo'
              className='h-25px logo'
              src={toAbsoluteUrl('/media/logos/logo-1.svg')}
            />
          </Link>
        )}
        {/* end::Logo */}

        {/* begin::Aside toggler */}
        {aside.minimize && (
          <div
            id='kt_aside_toggle'
            className='d-none'
            data-kt-toggle='true'
            data-kt-toggle-state='active'
            data-kt-toggle-target='body'
            data-kt-toggle-name='aside-minimize'
          >
          </div>
        )}
        {/* end::Aside toggler */}
      </div>
      {/* end::Brand */}

      {/* begin::Aside menu */}
      <div className='aside-menu flex-column-fluid'>
        <AsideMenu asideMenuCSSClasses={classes.asideMenu} />
      </div>
      {/* end::Aside menu */}

      {/* begin::Footer */}
      <div className='aside-footer my-10 d-flex justify-content-center' id='kt_aside_footer'>
        <div className="btn-custom">

          <a
            target='_blank'
            className='menu-link m-1 btn-label'
            href="https://play.google.com/store/apps/details?id=com.b8ak.b8akapp"

          >
            <img src='/assets/images/common/ch-play.png' alt='ch-play' width={110} />
          </a>
          <a
            target='_blank'
            className='menu-link m-1 btn-label'
            href="https://apps.apple.com/us/app/b8ak-%D8%A8%D9%8A%D8%AA%D9%83-home-services-app/id1017413686"

          >
            <img src='/assets/images/common/app-store.png' alt='app-store' width={110} />
          </a>
        </div>

      </div>
      {/* end::Footer */}
    </div>
  )
}

export { AsideDefault }
