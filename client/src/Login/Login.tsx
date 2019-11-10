import * as React from 'react';
import { connect } from 'react-redux';

import {
    appLoginRequest,
    updateUser as updateUserAction,
    updatePass as updatePassAction,
    updateSave as updateSaveAction,
} from '../App/appModule';
import { AppState } from '../store';

interface PropsFromDispatch {
    submitLogin: typeof appLoginRequest;
    updateUser: typeof updateUserAction;
    updatePass: typeof updatePassAction;
    updateSave: typeof updateSaveAction;
}

interface PropsFromState {
    user: string;
    pass: string;
    save: boolean;
    loginError: boolean;
}

type LoginProps = PropsFromDispatch & PropsFromState;

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
        <div>
            Username:
            <input
                onChange={e =>
                    e.target.value ? updateUser(e.target.value) : updateUser('')
                }
                type="text"
                className={`input${loginError ? ' error' : ''}`}
                value={user}
            />
        </div>
        <div>
            Password:
            <input
                onChange={e =>
                    e.target.value ? updatePass(e.target.value) : updatePass('')
                }
                type="password"
                className={`input${loginError ? ' error' : ''}`}
                value={pass}
            />
        </div>
        <div>
            Stay logged in:
            <input
                onChange={e =>
                    e.target.checked
                        ? updateSave(e.target.checked)
                        : updateSave(false)
                }
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

const mapStateToProps = (state: AppState) => ({
    user: state.appStore.get('user'),
    pass: state.appStore.get('pass'),
    save: state.appStore.get('save'),
    loginError: state.appStore.get('loginError'),
});

const mapDispatchToProps = {
    submitLogin: appLoginRequest,
    updateUser: updateUserAction,
    updatePass: updatePassAction,
    updateSave: updateSaveAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
