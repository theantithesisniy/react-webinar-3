import { memo } from 'react';
import Head from '../../components/head';
import LoginButton from '../../components/login-button';
import LoginForm from '../../components/login-form';
import PageLayout from '../../components/page-layout';
import UserLayout from '../../components/user-layout';
import UserProfileLink from '../../components/user-profile-link';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import useTranslate from '../../hooks/use-translate';

function Login() {
	const { t } = useTranslate();

	return (
		<PageLayout>
			<UserLayout>
				<UserProfileLink />
				<LoginButton />
			</UserLayout>

			<Head title={t('title')}>
				<LocaleSelect />
			</Head>

			<Navigation />
			<LoginForm />
		</PageLayout>
	);
}

export default memo(Login);
