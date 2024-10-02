import { memo } from 'react';
import Head from '../../components/head';
import LoginButton from '../../components/login-button';
import PageLayout from '../../components/page-layout';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import useInit from '../../hooks/use-init';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import UserLayout from '../../components/user-layout';
import UserProfileLink from '../../components/user-profile-link';
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
        <UserProfileLink />
        <LoginButton />
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
