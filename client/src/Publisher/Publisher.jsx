import React from 'react';
import { Link } from 'react-router-dom';
import immutablePropTypes from 'react-immutable-proptypes';

import { makePublisherDetailPath } from '../PublisherDetail/PublisherDetailRoute';

const Publisher = ({ publisher }) => (
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
