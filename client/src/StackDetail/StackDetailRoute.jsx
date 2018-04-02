import React from 'react';
import { Route } from 'react-router-dom';

import StackDetail from './StackDetail';

export const path = '/list/:id';

export const makeStackDetailPath = id => path.replace(':id', id);

export default () => <Route path={path} component={StackDetail} exact />;
