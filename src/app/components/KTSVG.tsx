import React from 'react'
import SVG from 'react-inlinesvg'
import { toAbsoluteUrl } from '../utils/helpers/AssetHelpers'
type Props = {
  className?: string
  path: string
  svgClassName?: string
  defaultColor?: boolean
}

const KTSVG: React.FC<Props> = ({ className = '', path, defaultColor, svgClassName = 'mh-100px' }) => {
  if (defaultColor) return (<SVG src={toAbsoluteUrl(path)} className={className} />)
  return (
    <span className={`svg-icon ${className}`}>
      <SVG src={toAbsoluteUrl(path)} className={svgClassName} />
    </span>
  )
}

export { KTSVG }
