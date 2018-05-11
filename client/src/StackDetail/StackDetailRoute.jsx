import React from 'react';
import { Route } from 'react-router-dom';

import ConnectedStackDetail from './StackDetail';

export const path = '/list/:id';

export const makeStackDetailPath = id => path.replace(':id', id);

export default () => <Route path={path} component={ConnectedStackDetail} exact />;
