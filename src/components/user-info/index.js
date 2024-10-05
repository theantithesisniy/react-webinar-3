import { cn as bem } from '@bem-react/classname';
import React from 'react';
import './index.css';
export default function UserInfo({ name, email, phone, t }) {
	const cn = bem('UserInfo');


	return (
		<div className={cn('')}>
			<h4 className={cn('header')}>{t('user.profile')}: </h4>
			<p className={cn('name')}>{t('user.name')}: <strong>{name}</strong> </p>
			<p className={cn('phone')}>{t('user.phone')}: <strong>{phone}</strong> </p>
			<p className={cn('email')}>{t('user.email')}: <strong>{email}</strong> </p>
		</div>
	)
}
