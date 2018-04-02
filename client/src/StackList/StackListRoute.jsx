import React from 'react';
import { Route } from 'react-router-dom';

import StackList from './StackList';

export const path = '/list';

export default () => <Route path={path} component={StackList} exact />;
