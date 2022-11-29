/* eslint-disable jsx-a11y/anchor-is-valid */
import './login.scss';

import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap-v5';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { useAppSelector } from '../../../../setup/redux/Hooks';
import { PageTitle } from '../../../../theme/layout/components/HeadTitle';
import { authActions, selectLoading } from '../redux/AuthSlice';
import { KTSVG } from '../../../utils/helpers';


/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
	PageTitle("Login");
	
	const dispatch = useDispatch();
	// const language = useAppSelector(selectLanguage);
	const { i18n } = useTranslation();

	const loading = useAppSelector(selectLoading);

	const [isRegister, setIsRegister] = useState(false);

	const { t } = useTranslation();
	const phoneRegion = [
		{
			value: "00966",
			label: "+966"
		},
		{
			value: "00",
			label: "+20"
		},
		{
			value: "09",
			label: "+86"
		},
	]

	const loginSchema = Yup.object().shape({
		email: Yup.string()
			.email(t('AUTH_PAGE.EMAIL_ERROR'))
			.min(3, t('AUTH_PAGE.MIN_SYMBOLS', {number: 3}))
			.max(50, t('AUTH_PAGE.MAX_SYMBOLS', {number: 50}))
			.required(t('AUTH_PAGE.EMAIL_REQUIRED')),
		password: Yup.string()
			.min(1, t('AUTH_PAGE.MIN_SYMBOLS', {number: 3}))
			.max(50, t('AUTH_PAGE.MAX_SYMBOLS', {number: 50}))
			.required(t('AUTH_PAGE.PASSWORD_REQUIRED')),
	})

	const initialValues = {
		email: '',
		password: '',
	}


	const formik = useFormik({
		initialValues,
		validationSchema: loginSchema,
		onSubmit: (values, { setStatus, setSubmitting }) => {
			dispatch(authActions.login({
				...values
			}));
		},
	});

	// useEffect(() => {
	// 	i18n.changeLanguage(language);
    // }, []);

	return (
		<form
			className='form w-100'
			onSubmit={formik.handleSubmit}
			noValidate
			id='kt_login_signin_form'
		>
			<img src='/assets/images/common/b8ak logo.png' alt='logo'></img>

			<div className='page-title text-uppercase'>{isRegister ? t('AUTH_PAGE.REGISTER_TITLE') : t('AUTH_PAGE.LOGIN_TITLE')}</div>
			<div className='page-sub'>{isRegister ? t('AUTH_PAGE.REGISTER_SUB') : t('AUTH_PAGE.LOGIN_SUB')}</div>

			{/* login */}
			<div className={isRegister ? 'hidden' : 'box'}>
				<InputGroup className='h-50px'>
					<InputGroup.Text id='username'>
						<KTSVG defaultColor={true} path="/assets/images/icons/mail.svg" />
					</InputGroup.Text>
					<FormControl
						placeholder={t('AUTH_PAGE.EMAIL')}
						aria-labelledby='username'
						required
						name="email"
						value={formik.values.email}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
				</InputGroup>
				{formik.touched.email && formik.errors.email ? (
					<div className="text-danger small mt-3">{t(formik.errors.email)}</div>
				) : null}

				<InputGroup className='h-50px mt-5'>
					<InputGroup.Text id='password'>
						<KTSVG defaultColor={true} path="/assets/images/icons/lock.svg" />
					</InputGroup.Text>
					<FormControl
						placeholder={t('AUTH_PAGE.PASSWORD')}
						aria-labelledby='password'
						required
						type="password"
						name="password"
						value={formik.values.password}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
				</InputGroup>
				{formik.touched.password && formik.errors.password ? (
					<div className="text-danger small mt-3">{formik.errors.password}</div>
				) : null}
			</div>

			{/* register */}
			<div className={isRegister ? 'box row' : 'hidden'}>
				<div className='col-12'>
					<InputGroup className='h-50px mt-5'>
						<InputGroup.Text id='provider-name'>
							<img src="/assets/images/icons/user.svg" alt="user" />
						</InputGroup.Text>
						<FormControl
							placeholder={t('AUTH_PAGE.PROVIDER_NAME_EN')}
							aria-labelledby='provider-name'
							required
						/>
					</InputGroup>
				</div>

				<div className='col-12'>
					<InputGroup className='h-50px mt-5'>
						<InputGroup.Text id='provider-name-ar'>
							<img src="/assets/images/icons/user.svg" alt="user" />
						</InputGroup.Text>
						<FormControl
							placeholder={t('AUTH_PAGE.PROVIDER_NAME_AR')}
							aria-labelledby='provider-name-ar'
							required
						/>
					</InputGroup>
				</div>

				<div className='col-sm-12 col-md-6'>
					<InputGroup className='h-50px mt-5'>
						<InputGroup.Text id='basic-addon1'>
							<KTSVG defaultColor={true} path="/assets/images/icons/globe.svg" />
						</InputGroup.Text>
						<Form.Select>
							<option>{t('AUTH_PAGE.COUNTRY')}</option>
						</Form.Select>
					</InputGroup>
				</div>


				<div className='col-sm-12 col-md-6'>
					<InputGroup className='h-50px mt-5'>
						<InputGroup.Text id='basic-addon1'>
							<KTSVG defaultColor={true} path="/assets/images/icons/globe.svg" />
						</InputGroup.Text>
						<Form.Select>
							<option>{t('AUTH_PAGE.CITY')}</option>
						</Form.Select>
					</InputGroup>
				</div>

				<div className='col-12'>
					<InputGroup className='h-50px mt-5'>
						<InputGroup.Text id='cr'>
							<KTSVG defaultColor={true} path="/assets/images/icons/file.svg" />
						</InputGroup.Text>
						<FormControl
							placeholder={t('AUTH_PAGE.COMMERCIAL_REGISTER')}
							aria-labelledby='cr'
						/>
					</InputGroup>
				</div>

				<div className='col-12'>
					<InputGroup className='h-50px mt-5'>
						<InputGroup.Text id='tax'>
							<KTSVG defaultColor={true} path="/assets/images/icons/file.svg" />
						</InputGroup.Text>
						<FormControl
							placeholder={t('AUTH_PAGE.TAX_NUMBER')}
							aria-labelledby='tax'
						/>
					</InputGroup>
				</div>

				<div className='col-12'>
					<InputGroup className='h-50px mt-5'>
						<InputGroup.Text id='email'>
							<KTSVG defaultColor={true} path="/assets/images/icons/mail.svg" />
						</InputGroup.Text>
						<FormControl
							placeholder={t('AUTH_PAGE.EMAIL')}
							aria-labelledby='email'
						/>
					</InputGroup>
				</div>

				<div className='col-12'>
					<InputGroup className='h-50px mt-5'>
						<InputGroup.Text id='phone'>
							<img src="/assets/images/icons/phone.svg" alt="phone" />

						</InputGroup.Text>
						<FormControl className='border-right-0'
							placeholder={t('AUTH_PAGE.PHONE')}
							aria-labelledby='phone'
							pattern="[0-9]*"
						/>
						<Form.Select className='border-left-0 input-font-region'>
							{
								phoneRegion.map(x => <option key={x.value} value={x.value}>{x.label}</option>)
							}
						</Form.Select>
					</InputGroup>
				</div>


				<div className='col-sm-12 col-md-6'>
					<InputGroup className='h-50px mt-5'>
						<InputGroup.Text id='reg-password'>
							<KTSVG defaultColor={true} path="/assets/images/icons/lock.svg" />
						</InputGroup.Text>
						<FormControl
							placeholder={t('AUTH_PAGE.PASSWORD')}
							aria-labelledby='reg-password'
							type='password'
						/>
					</InputGroup>
				</div>


				<div className='col-sm-12 col-md-6'>
					<InputGroup className='h-50px mt-5'>
						<InputGroup.Text id='reg-re-Password'>
							<KTSVG defaultColor={true} path="/assets/images/icons/lock.svg" />
						</InputGroup.Text>
						<FormControl
							placeholder={t('AUTH_PAGE.CONFIRM_PASSWORD')}
							aria-labelledby='reg-re-Password'
							type='password'
						/>
					</InputGroup>
				</div>

			</div>

			{
				isRegister ? null :
					<div className='text-end'>
						<Link to={'/'} className='text-dark'>{t('AUTH_PAGE.LOST_PASSWORD')}</Link>
					</div>
			}

			<Button variant='dark' className="shadow btn-action btn-icon-invert text-uppercase" type='submit' disabled={loading}>
				{loading && <span className="spinner-border w-20px h-20px me-5" role="status" aria-hidden="true"></span>}
				{isRegister && <KTSVG defaultColor={true} path="/assets/images/icons/user-plus.svg" />}
				{isRegister ? t('AUTH_PAGE.REGISTER') : t('AUTH_PAGE.LOGIN')}
			</Button>

			{
				isRegister ? null :
					<div className='line-text'>
						<span className='text'>{t('AUTH_PAGE.NEW_USER')}</span>
					</div>
			}

			<button className='btn btn-outline-dark btn-back btn-icon text-uppercase' onClick={() => setIsRegister(!isRegister)} type='button' data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
				<KTSVG defaultColor={true} path={isRegister ? '/assets/images/icons/chevron-right.svg' : '/assets/images/icons/user-plus.svg'} className='mx-3'/>
				{isRegister ? t('AUTH_PAGE.GOTO_LOGIN') : t('AUTH_PAGE.GOTO_REGISTER')}
			</button>
		</form>
	)
}
