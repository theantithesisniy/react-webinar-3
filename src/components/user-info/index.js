import React from 'react'
import useSelector from '../../hooks/use-selector';
import { cn as bem } from '@bem-react/classname';
import useTranslate from '../../hooks/use-translate';
import './index.css';
export default function UserInfo() {
	const {t} = useTranslate();
	const cn = bem('UserInfo');
	const select = useSelector(state => ({
		name: state.user.profile.name,
		email: state.user.profile.email,
		phone: state.user.profile.phone,
	}));

	return (
		<div className={cn('')}>
			<h4 className={cn('header')}>{t('user.profile')}: </h4>
			<p className={cn('name')}>{t('user.name')}: <strong>{select.name}</strong> </p>
			<p className={cn('phone')}>{t('user.phone')}: <strong>{select.phone}</strong> </p>
			<p className={cn('email')}>{t('user.email')}: <strong>{select.email}</strong> </p>
		</div>
	)
}
