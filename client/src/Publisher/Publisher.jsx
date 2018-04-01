import React from 'react';
import { Link } from 'react-router';
import immutablePropTypes from 'react-immutable-proptypes';

const Publisher = ({ publisher }) => {
    const id = publisher.get('id');
    const name = publisher.get('name');
    return (
        <div className="publisher">
            <Link to={`/publisher/${id}`}>
                {name}
            </Link>
        </div>
    );
};

Publisher.propTypes = {
    publisher: immutablePropTypes.map.isRequired,
};

export default Publisher;
