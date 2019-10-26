import { sagaTest } from '../../utils/testUtils';
import {
    watchAddCategory,
    watchSetAutoSuggestCategories,
} from '../addCategorySagas';
import {
    initialState,
    addCategory,
    categorySearch,
    ADD,
    SEARCH,
} from '../addCategoryModule';

sagaTest(
    'addCategory',
    { addBookStore: initialState },
    watchAddCategory,
    {
        url: 'http://foo.bar.baz/api/category/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token token',
        },
        data: { category: 'foobarbaz' },
    },
    { data: 'foo' },
    addCategory.request('foobarbaz'),
    addCategory.success('foo'),
    addCategory.failure('Error message'),
    ADD.SUCCESS,
    ADD.FAILURE,
);

sagaTest(
    'setAutoSuggestCategories',
    { addBookStore: initialState },
    watchSetAutoSuggestCategories,
    {
        url: 'http://foo.bar.baz/api/category/?search=foobarbaz',
        method: 'GET',
    },
    { data: 'foo' },
    categorySearch.request('foobarbaz'),
    categorySearch.success('foo'),
    categorySearch.failure('Error message'),
    SEARCH.SUCCESS,
    SEARCH.FAILURE,
);
