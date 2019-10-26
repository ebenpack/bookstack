import * as React from 'react';
import { Link } from 'react-router-dom';
import immutablePropTypes from 'react-immutable-proptypes';
import { Record } from 'immutable';

import { makePublisherDetailPath } from '../PublisherDetail/PublisherDetailRoute';

interface IPublisher {
    id: number,
    name: string
}

interface IPublisherRecord extends Record<IPublisher>, IPublisher {}

interface CategoryProps {
    publisher: IPublisherRecord
}

const Publisher = ({ publisher }: CategoryProps) => (
    <div className="publisher">
        {publisher.get('id') ? (
            <Link to={makePublisherDetailPath(publisher.get('id'))}>
                {publisher.get('name')}
            </Link>) :
            publisher.get('name')
        }
    </div>
);

Publisher.propTypes = {
    publisher: immutablePropTypes.map.isRequired,
};

export default Publisher;
