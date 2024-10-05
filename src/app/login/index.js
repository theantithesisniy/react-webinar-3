import { memo } from 'react';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import UserLayout from '../../components/user-layout';
import LocaleSelect from '../../containers/locale-select';
import LoginButtonContainer from '../../containers/login-button';
import LoginFormContainer from '../../containers/login-form-container';
import Navigation from '../../containers/navigation';
import UserProfileLinkContainer from '../../containers/user-profile-link-container';
import useTranslate from '../../hooks/use-translate';
function Login() {
	const { t } = useTranslate();

	return (
		<PageLayout>
			<UserLayout>
				<UserProfileLinkContainer />
				<LoginButtonContainer />
			</UserLayout>

			<Head title={t('title')}>
				<LocaleSelect />
			</Head>

			<Navigation />
			<LoginFormContainer />
		</PageLayout>
	);
}

export default memo(Login);
