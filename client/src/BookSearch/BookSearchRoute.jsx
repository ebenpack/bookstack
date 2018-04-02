import React from 'react';
import { Route } from 'react-router-dom';

import BookSearch from './BookSearch';

export const path = '/booksearch';

export default () => <Route path={path} component={BookSearch} exact />;
