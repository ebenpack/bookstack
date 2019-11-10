import * as React from 'react';
import { Route } from 'react-router-dom';

export const path = '/author/:id';

export const makeAuthorDetailPath = (id: number) =>
    path.replace(':id', String(id));

export default () => (
    <Route
        path={path}
        component={React.lazy(() => import('./AuthorDetail'))}
        exact
    />
);
