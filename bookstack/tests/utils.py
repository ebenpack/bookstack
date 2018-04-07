import pytest
from contextlib import contextmanager

# https://github.com/pytest-dev/pytest-django/blob/master/pytest_django/fixtures.py
@pytest.fixture(scope='function')
def django_assert_num_queries(pytestconfig):
    from django.db import connection
    from django.test.utils import CaptureQueriesContext

    @contextmanager
    def _assert_num_queries(num):
        with CaptureQueriesContext(connection) as context:
            yield
            if num != len(context):
                msg = "Expected to perform %s queries but %s were done" % (num, len(context))
                if pytestconfig.getoption('verbose') > 0:
                    sqls = (q['sql'] for q in context.captured_queries)
                    msg += '\n\nQueries:\n========\n\n%s' % '\n\n'.join(sqls)
                else:
                    msg += " (add -v option to show queries)"
                pytest.fail(msg)

    return _assert_num_queries