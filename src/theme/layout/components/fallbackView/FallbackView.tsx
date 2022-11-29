import { toAbsoluteUrl } from "app/utils/helpers";

export function FallbackView() {
  return (
    <div className='splash-screen'>
      <img src={toAbsoluteUrl('/assets/images/common/logo.png')} alt='Start logo' />
    </div>
  )
}