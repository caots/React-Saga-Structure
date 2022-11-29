/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../setup/redux/Hooks';
import { authActions, selectUser } from '../../../../app/modules/auth/redux/AuthSlice';
import { toAbsoluteUrl } from '../../../../app/utils/helpers';

const HeaderUserMenu: FC = () => {
  const user = useAppSelector(selectUser);

  const dispatch = useDispatch()
  const logout = () => {
    dispatch(authActions.logout())
  }

  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='d-flex flex-column'>
            <div className='fw-bolder d-flex align-items-center fs-5'>
              Your name
            </div>
            <a href='#' className='fw-bold text-muted text-hover-primary fs-7'>
              {user?.userType === '200' ? 'Service Provider' : 'Service Provider Admin'}
            </a>
          </div>
        </div>
      </div>
      <div className='separator my-2'></div>
      <div className='separator my-2'></div>
      <div className='menu-item px-5'>
        <a onClick={logout} className='menu-link px-5'>
          Sign Out
        </a>
      </div>
    </div>
  )
}

export { HeaderUserMenu }