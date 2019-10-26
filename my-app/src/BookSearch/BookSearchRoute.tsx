import * as React from 'react';
import { Route } from 'react-router-dom';

import ConnectedBookSearch from './BookSearch';

export const path = '/booksearch';

export default () => <Route path={path} component={ConnectedBookSearch} exact />;
