import * as React from 'react';
import { connect } from 'react-redux';
import * as propTypes from 'prop-types';

import { LoginProps } from './types';
import {
    login,
    updateUser as updateUserAction,
    updatePass as updatePassAction,
    updateSave as updateSaveAction,
} from '../App/appModule';

export const Login = ({
    user,
    pass,
    save,
    loginError,
    submitLogin,
    updateUser,
    updatePass,
    updateSave,
}: LoginProps) => (
    <div>
        <div>Username:
            <input
                onChange={e => (
                    e.target.value ? updateUser(e.target.value) : updateUser('')
                )}
                type="text"
                className={`input${loginError ? ' error' : ''}`}
                value={user}
            />
        </div>
        <div>Password:
            <input
                onChange={e => (
                    e.target.value ? updatePass(e.target.value) : updatePass('')
                )}
                type="password"
                className={`input${loginError ? ' error' : ''}`}
                value={pass}
            />
        </div>
        <div>Stay logged in:
            <input
                onChange={e => (
                    e.target.checked ? updateSave(e.target.checked) : updateSave(false)
                )}
                type="checkbox"
                className="checkbox"
                checked={save}
            />
        </div>
        <button
            className="button"
            onClick={() => submitLogin(user, pass, save)}
        >
            Login
        </button>
    </div>
);

Login.propTypes = {
    user: propTypes.string.isRequired,
    pass: propTypes.string.isRequired,
    loginError: propTypes.bool.isRequired,
    save: propTypes.bool.isRequired,
    submitLogin: propTypes.func.isRequired,
    updateUser: propTypes.func.isRequired,
    updatePass: propTypes.func.isRequired,
    updateSave: propTypes.func.isRequired,
};

const mapStateToProps = state => ({
    user: state.appStore.get('user'),
    pass: state.appStore.get('pass'),
    save: state.appStore.get('save'),
    loginError: state.appStore.get('loginError'),
});

const mapDispatchToProps = {
    submitLogin: login.request,
    updateUser: updateUserAction,
    updatePass: updatePassAction,
    updateSave: updateSaveAction,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);
