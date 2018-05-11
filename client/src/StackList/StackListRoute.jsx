import React from 'react';
import { Route } from 'react-router-dom';

import ConnectedStackList from './StackList';

export const path = '/list';

export default () => <Route path={path} component={ConnectedStackList} exact />;
