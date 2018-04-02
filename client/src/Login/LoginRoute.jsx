import React from 'react';
import { Route } from 'react-router-dom';

import Login from './Login';

export const path = '/login';

export default () => <Route path={path} component={Login} exact />;
