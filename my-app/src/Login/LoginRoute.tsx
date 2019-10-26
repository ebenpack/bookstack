import * as React from 'react';
import { Route } from 'react-router-dom';

import ConnectedLogin from './Login';

export const path = '/login';

export default () => <Route path={path} component={ConnectedLogin} exact />;
