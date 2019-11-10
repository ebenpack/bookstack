import { sagaTest } from '../../utils/testUtils';
import { watchLoadStacklist } from '../stackListSagas';
import { initialState, stack, STACK } from '../stackListModule';

sagaTest(
    'loadStacklist',
    { addBookStore: initialState },
    watchLoadStacklist,
    {
        url: 'http://foo.bar.baz/api/stack/',
        method: 'GET',
    },
    { data: 'foo' },
    stack.request('foobarbaz'),
    stack.success('foo'),
    stack.failure('Error message'),
    STACK.SUCCESS,
    STACK.FAILURE
);
