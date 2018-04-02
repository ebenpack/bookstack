import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import {
    login,
    updateUser as updateUserAction,
    updatePass as updatePassAction,
    updateSave as updateSaveAction,
} from '../App/appModule';

const mapStateToProps = state => ({
    user: state.appStore.get('user'),
    pass: state.appStore.get('pass'),
    save: state.appStore.get('save'),
});

const mapDispatchToProps = {
    submitLogin: login,
    updateUser: updateUserAction,
    updatePass: updatePassAction,
    updateSave: updateSaveAction,
};

const Login = ({
    user,
    pass,
    save,
    submitLogin,
    updateUser,
    updatePass,
    updateSave,
}) => (
    <div>
        <div>Username:
            <input
                onChange={e => (
                    e.target.value ? updateUser(e.target.value) : updateUser('')
                )}
                type="text"
                value={user}
            />
        </div>
        <div>Password:
            <input
                onChange={e => (
                    e.target.value ? updatePass(e.target.value) : updatePass('')
                )}
                type="password"
                value={pass}
            />
        </div>
        <div>Stay logged in:
            <input
                onChange={e => (
                    e.target.checked ? updateSave(e.target.checked) : updateSave(false)
                )}
                type="checkbox"
                checked={save}
            />
        </div>
        <button
            onClick={() => submitLogin(user, pass, save)}
        >
            Login
        </button>
    </div>
);

Login.propTypes = {
    user: propTypes.string.isRequired,
    pass: propTypes.string.isRequired,
    save: propTypes.bool.isRequired,
    submitLogin: propTypes.func.isRequired,
    updateUser: propTypes.func.isRequired,
    updatePass: propTypes.func.isRequired,
    updateSave: propTypes.func.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);
