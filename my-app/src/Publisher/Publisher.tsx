import * as React from 'react';
import { Link } from 'react-router-dom';
import * as immutablePropTypes from 'react-immutable-proptypes';
import { Record } from 'immutable';

import { makePublisherDetailPath } from '../PublisherDetail/PublisherDetailRoute';
import { IPublisher } from '../PublisherDetail/types';

interface CategoryProps {
    publisher: IPublisher
}

const Publisher = ({ publisher }: CategoryProps) => (
    <div className="publisher">
        {publisher.id ? (
            <Link to={makePublisherDetailPath(publisher.id)}>
                {publisher.name}
            </Link>) :
            publisher.name
        }
    </div>
);

Publisher.propTypes = {
    publisher: immutablePropTypes.map.isRequired,
};

export default Publisher;
