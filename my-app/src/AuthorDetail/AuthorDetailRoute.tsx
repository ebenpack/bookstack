import * as React from 'react';
import { Route } from 'react-router-dom';

import ConnectedAuthorDetail from './AuthorDetail';

export const path = '/author/:id';

export const makeAuthorDetailPath = (id: number) => path.replace(':id', String(id));

export default () => <Route path={path} component={ConnectedAuthorDetail} exact />;
