import { memo, useEffect } from 'react';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import UserInfo from '../../components/user-info';
import UserLayout from '../../components/user-layout';
import LocaleSelect from '../../containers/locale-select';
import LoginButtonContainer from '../../containers/login-button-container';
import Navigation from '../../containers/navigation';
import UserProfileLinkContainer from '../../containers/user-profile-link-container';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
function UserProfile() {
	const store = useStore();
	const { t } = useTranslate();
	const select = useSelector(state => ({
		name: state.userProfile.profile.name,
		email: state.userProfile.profile.email,
		phone: state.userProfile.profile.phone,
		loading: state.userProfile.loading,
		id: state.user.id,
		errorMessage: state.userProfile.errorMessage,
	}));

	useEffect(() => {
		const fetchProfile = async () => {
			if (select.id) {
				await store.actions.userProfile.fetchProfileById(select.id);
			}
		};
		fetchProfile();
	}, [store.actions.userProfile, select.id]);

	if (select.loading) {
		return <div></div>;
	}

	if (select.errorMessage) {
		return <div className="error">{select.errorMessage}</div>;
	}

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
