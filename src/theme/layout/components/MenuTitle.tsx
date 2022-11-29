/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { KTSVG } from '../../../app/utils/helpers'

type Props = {
  className?: string,
  iconUrl?: string,
  title?: string,
  showNav?: boolean,
}

const MenuTitle: React.FC<Props> = ({ className, iconUrl, title, showNav }) => {
  return (
    <div className={className}>
      {iconUrl && <KTSVG path={iconUrl} className='me-5' />}<span className='me-5'>{title}</span>{showNav && <i className="fas fa-angle-right"></i>}
    </div>
  )
}

export { MenuTitle }
