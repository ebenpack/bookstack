import React from 'react';
import { Route } from 'react-router-dom';

import AuthorDetail from './AuthorDetail';

export const path = '/author/:id';

export const makeAuthorDetailPath = id => path.replace(':id', id);

export default () => <Route path={path} component={AuthorDetail} exact />;
