/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import { Row, Col } from 'react-bootstrap-v5';
import { useTranslation } from 'react-i18next';
import { selectUser } from '../../../../app/modules/auth';

import { PageUrl } from '../../../../app/utils/common/constants';
import { toAbsoluteUrl } from '../../../../app/utils/helpers';
import { useAppSelector } from '../../../../setup/redux/Hooks';
import { AsideMenuItem } from './AsideMenuItem';
import { AsideMenuItemWithSub } from './AsideMenuItemWithSub';

export function AsideMenuMain() {
	const { t } = useTranslation()
	const user = useAppSelector(selectUser);

	return (
		<>
			<div className='menu-item mb-5'>
				<div className='menu-content'>
					<Row>
						<Col sm={4}>
							<img width={60} height={60} className='rounded-circle me-3' src={user?.companyLogo} alt='b8ak' />
						</Col>
						<Col sm={8}>
							<div className="d-flex flex-column me-3">
								<strong className='text-light'>{user?.companyNameEn}</strong>
								<span className='small text-light'>{t('ASIDE_MENU.EDIT_ACCOUNT')}</span>
							</div>
						</Col>
					</Row>
				</div>
			</div>

			<AsideMenuItem
				title={t('ASIDE_MENU.HOME')}
				to={PageUrl.HOME}
				icon='/assets/images/icons/home.svg'
			/>
		</>
	)
}
