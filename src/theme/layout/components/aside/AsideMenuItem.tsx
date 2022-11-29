import React from 'react'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router'
import { useLayout } from '../../core'
import { checkIsActive, KTSVG } from '../../../../app/utils/helpers'

type Props = {
  to: string
  title: string
  icon?: string
  svgClass?: string
  fontIcon?: string
  hasBullet?: boolean
  hide?: boolean,
  badgeCount?: number,
}

const AsideMenuItem: React.FC<Props> = ({
  children,
  to,
  title,
  icon,
  svgClass,
  fontIcon,
  hasBullet = false,
  hide = false,
  badgeCount
}) => {
  const { pathname } = useLocation()
  const isActive = checkIsActive(pathname, to)
  const { config } = useLayout()
  const { aside } = config

  if (hide) return <></>;

  return (
    <div className='menu-item'>
      <Link className={clsx('menu-link without-sub', { active: isActive })} to={to}>
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot h-7px  w-7px'></span>
          </span>
        )}
        {icon && aside.menuIcon === 'svg' && (
          <span className='menu-icon'>
            <KTSVG path={icon} className='svg-icon-2' svgClassName={svgClass} />
          </span>
        )}
        {fontIcon && aside.menuIcon === 'font' && <i className={clsx('bi fs-3', fontIcon)}></i>}
        <span className='menu-title'>{title}</span>
        {badgeCount ? <span className="badge badge-sm badge-circle badge-primary">{badgeCount}</span> : null}
      </Link>
      {children}
    </div>
  )
}

export { AsideMenuItem }
