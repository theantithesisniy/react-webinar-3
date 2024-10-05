import { memo } from 'react';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import UserInfo from '../../components/user-info';
import UserLayout from '../../components/user-layout';
import LocaleSelect from '../../containers/locale-select';
import LoginButtonContainer from '../../containers/login-button';
import Navigation from '../../containers/navigation';
import UserProfileLinkContainer from '../../containers/user-profile-link-container';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';

function UserProfile() {
	const { t } = useTranslate();
	const select = useSelector(state => ({
		name: state.user.profile.name,
		email: state.user.profile.email,
		phone: state.user.profile.phone,
	}));
	
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

			<UserInfo
				email={select.email}
				name={select.name}
				phone={select.phone}
				t={t} />
		</PageLayout>
	);
}

export default memo(UserProfile);
