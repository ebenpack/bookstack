import { sagaTest } from '../../utils/testUtils';
import { watchLoadPublisher } from '../publisherDetailSagas';
import {
    initialState,
    PUBLISHER,
    publisher,
} from '../publisherDetailModule';

sagaTest(
    'loadPublisher',
    { addBookStore: initialState },
    watchLoadPublisher,
    {
        method: 'GET',
        url: 'http://foo.bar.baz/api/publisher/foobarbaz/',
    },
    { data: 'foo' },
    publisher.request('foobarbaz'),
    publisher.success('foo'),
    publisher.failure('Error message'),
    PUBLISHER.SUCCESS,
    PUBLISHER.FAILURE,
);
