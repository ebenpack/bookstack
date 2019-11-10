import * as React from 'react';
import { Route } from 'react-router-dom';

export const path = '/login';

export default () => (
    <Route path={path} component={React.lazy(() => import('./Login'))} exact />
);
