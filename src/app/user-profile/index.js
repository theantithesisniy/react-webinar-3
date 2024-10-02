import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Head from '../../components/head';
import LoginButton from '../../components/login-button';
import PageLayout from '../../components/page-layout';
import UserInfo from '../../components/user-info';
import UserLayout from '../../components/user-layout';
import UserProfileLink from '../../components/user-profile-link';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';

function UserProfile() {
	const { t } = useTranslate();
	const navigate = useNavigate();
	const select = useSelector(state => ({
		loged: state.user.loged,
	}));

	useEffect(() => {
		if (!select.loged) {
			navigate('/login')
		}
	}, [select.loged, navigate])

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

			<UserInfo />
		</PageLayout>
	);
}

export default memo(UserProfile);
