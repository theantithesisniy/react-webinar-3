import { memo } from 'react';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import UserLayout from '../../components/user-layout';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import LoginButtonContainer from '../../containers/login-button';
import Navigation from '../../containers/navigation';
import UserProfileLinkContainer from '../../containers/user-profile-link-container';
import useInit from '../../hooks/use-init';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();

  useInit(
    () => {
      store.actions.catalog.initParams();
    },
    [],
    true,
  );

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
      <CatalogFilter />
      <CatalogList />
    </PageLayout>
  );
}

export default memo(Main);
