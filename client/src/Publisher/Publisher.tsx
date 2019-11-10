import * as React from 'react';
import { Link } from 'react-router-dom';

import { makePublisherDetailPath } from '../PublisherDetail/PublisherDetailRoute';
import { IPublisher } from '../PublisherDetail/types';

interface PublisherProps {
    publisher: IPublisher;
}

const Publisher = ({ publisher }: PublisherProps) => (
    <div className="publisher">
        {publisher.id ? (
            <Link to={makePublisherDetailPath(publisher.id)}>
                {publisher.name}
            </Link>
        ) : (
            publisher.name
        )}
    </div>
);

export default Publisher;
