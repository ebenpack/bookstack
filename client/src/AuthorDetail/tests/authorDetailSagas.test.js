import { sagaTest } from '../../utils/testUtils';
import { watchLoadAuthor } from '../authorDetailSagas';
import {
    initialState,
    AUTHOR,
    author,
} from '../authorDetailModule';

sagaTest(
    'loadAuthor',
    { addBookStore: initialState },
    watchLoadAuthor,
    {
        method: 'GET',
        url: 'http://foo.bar.baz/api/author/foobarbaz/',
    },
    { data: 'foo' },
    author.request('foobarbaz'),
    author.success('foo'),
    author.failure('Error message'),
    AUTHOR.SUCCESS,
    AUTHOR.FAILURE,
);
