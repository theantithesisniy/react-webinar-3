import { memo, useCallback, useMemo } from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';
import useInit from '../../hooks/use-init';

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {
  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category, 
    categories: state.catalog.categories,
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({ sort }), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
    onCategoryChange: useCallback(category => {
      store.actions.catalog.setParams({ category, page: 1 });
    }, [store]),
  };

  const options = {
    sort: useMemo(
      () => [
        { value: 'order', title: 'По порядку' },
        { value: 'title.ru', title: 'По именованию' },
        { value: '-price', title: 'Сначала дорогие' },
        { value: 'edition', title: 'Древние' },
      ],
      [],
    ),
    categories: useMemo(() => {
      const createCategoryOptions = (categories, prefix = '') => {
        return categories.flatMap(category => {
          const option = {
            value: category._id,
            title: `${prefix}${category.title}`,
          };

          const childrenOptions = category.children && category.children.length > 0
            ? createCategoryOptions(category.children, `${prefix}- `)
            : [];

          return [option, ...childrenOptions];
        });
      };

      const categoryOptions = createCategoryOptions(select.categories);
      return [{ value: '', title: 'Все' }, ...categoryOptions];
    }, [select.categories]),
  };

  const { t } = useTranslate();

  return (
    <SideLayout padding="medium">
      <Select options={options.categories} value={select.category} onChange={callbacks.onCategoryChange} />
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort} />
      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder={'Поиск'}
        delay={1000}
      />
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);
