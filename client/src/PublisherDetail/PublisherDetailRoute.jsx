import React from 'react';
import { Route } from 'react-router-dom';

import PublisherDetail from './PublisherDetail';

export const path = '/publisher/:id';

export const makePublisherDetailPath = id => path.replace(':id', id);

export default () => <Route path={path} component={PublisherDetail} exact />;
