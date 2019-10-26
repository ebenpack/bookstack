export interface LoginProps {
    user: string,
    pass: string,
    save: boolean,
    loginError: boolean,
    submitLogin: (user: string, pass: string, save: boolean) => void,
    updateUser: (user: string) => void,
    updatePass: (pass: string) => void,
    updateSave: (save: boolean) => void,
};
