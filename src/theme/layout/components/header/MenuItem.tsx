import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';

import { KTSVG } from '../../../../app/utils/helpers';

type Props = {
  to: string
  title: string
  icon?: string
  fontIcon?: string
  hasArrow?: boolean
  hasBullet?: boolean
}

const MenuItem: React.FC<Props> = ({
  to,
  title,
  icon,
  fontIcon,
  hasArrow = false,
  hasBullet = false,
}) => {

  return (
    <div className='menu-item me-lg-1'>
      <Link
        className='btn btn-dark btn-sm header-button'
        to={to}
      >
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}

        {icon && (
          <span className='menu-icon'>
            <KTSVG path={icon} className='svg-icon-2' />
          </span>
        )}

        {fontIcon && (
          <span className='menu-icon'>
            <i className={clsx('bi fs-3', fontIcon)}></i>
          </span>
        )}

        <span className='menu-title'>{title}</span>

        {hasArrow && <span className='menu-arrow'></span>}
      </Link>
    </div>
  )
}

export {MenuItem}
