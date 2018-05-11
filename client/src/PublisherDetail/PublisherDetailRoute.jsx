import React from 'react';
import { Route } from 'react-router-dom';

import ConnectedPublisherDetail from './PublisherDetail';

export const path = '/publisher/:id';

export const makePublisherDetailPath = id => path.replace(':id', id);

export default () => <Route path={path} component={ConnectedPublisherDetail} exact />;
