import clsx from 'clsx';
import { FC } from 'react';

import { selectUser } from '../../../../app/modules/auth';
import { useAppDispatch, useAppSelector } from '../../../../setup/redux/Hooks';
import { HeaderNotificationsMenu } from './HeaderNotificationsMenu';
import { HeaderUserMenu } from './HeaderUserMenu';

const
	toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px',
	toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px'

const Topbar: FC = () => {
	const user = useAppSelector(selectUser);
	const dispatch = useAppDispatch();

	return (
		<div className='d-flex align-items-stretch flex-shrink-0'>

			{/* BANK */}
			<div className='d-flex align-items-center border-start px-2'>
				{/* begin::Menu wrapper */}
				<div
					className={clsx(
						'btn btn-active-light-primary position-relative justify-content-center d-flex align-items-center',
						toolbarButtonHeightClass
					)}
					id='kt_drawer_chat_toggle'
				>
					<img src='/assets/images/icons/bank.svg' alt='back'></img>
				</div>
				{/* end::Menu wrapper */}
			</div>

			{/* NOTIFICATIONS */}
			<div className='d-flex align-items-center border-start px-2'>
				{/* begin::Menu- wrapper */}
				<div
					className={clsx(
						'btn btn-active-light-primary position-relative justify-content-center d-flex align-items-center',
						toolbarButtonHeightClass
					)}
					data-kt-menu-trigger='click'
					data-kt-menu-attach='parent'
					data-kt-menu-placement='bottom-end'
					data-kt-menu-flip='bottom'
				>
					<img src='/assets/images/icons/notification.svg' alt='notification'></img>
				</div>
				<HeaderNotificationsMenu />
				{/* end::Menu wrapper */}
			</div>

			{/* begin::User */}
			<div
				className='d-flex align-items-center border-start ps-4'
				id='kt_header_user_menu_toggle'
			>

				{/* begin::Toggle */}
				<div
					className={clsx('cursor-pointer symbol', toolbarUserAvatarHeightClass)}
					data-kt-menu-trigger='click'
					data-kt-menu-attach='parent'
					data-kt-menu-placement='bottom-end'
					data-kt-menu-flip='bottom'
				>
					<div className='d-flex align-items-center'>

						<div className="d-flex flex-column me-3">
							<strong>Your name</strong>
							<span className='small'>{user?.userType === '200' ? 'Service Provider' : 'Service Provider Admin'}</span>
						</div>
						<i className="fas fa-chevron-down small px-1"></i>

					</div>


				</div>
				<HeaderUserMenu />
				{/* end::Toggle */}
			</div>
			{/* end::User */}
		</div>
	)
}

export { Topbar };

