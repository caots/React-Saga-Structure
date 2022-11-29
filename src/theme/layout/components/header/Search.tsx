import React, { FC } from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap-v5';
import { useTranslation } from 'react-i18next';

const Search: FC = () => {
	const { t } = useTranslation();

	return (
		<Form className="d-flex align-items-center header-search">
			<InputGroup>

				<FormControl
					className='bg-secondary'
					placeholder={t('HEADER.SEARCH.PLACEHOLDER')}
					aria-label='search'
					aria-describedby='basic-addon1'
				/>
				<Form.Select className='input-font-region'>
					<option >{t('HEADER.SEARCH.ORDER')}</option>
				</Form.Select>
				<button className="btn-dark btn input-group-text">
					<img src='/assets/images/icons/search.svg' alt='search'></img>
				</button>
			</InputGroup>
		</Form>
	)
}

export { Search }
