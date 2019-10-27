import * as React from 'react';
import { Route } from 'react-router-dom';

import ConnectedPublisherDetail from './PublisherDetail';

export const path = '/publisher/:id';

export const makePublisherDetailPath = (id: string | number) => path.replace(':id', id.toString());

export default () => <Route path={path} component={ConnectedPublisherDetail} exact />;
