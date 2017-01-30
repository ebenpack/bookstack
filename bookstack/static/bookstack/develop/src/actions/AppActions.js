import reqwest from 'reqwest';

function getCookieToken() {
    let cookies = document.cookie.split(';');
    let token = '';
    for (let i = 0, len = cookies.length; i < len; i++) {
        let currentCookie = cookies[i].split('=');
        if (currentCookie[0].trim() === 'token') {
            token = currentCookie[1].trim();
            break;
        }
    }
    return token;
}

function setCookieToken(token) {
    let thirtyDays = 30 * 24 * 60 * 60 * 1000;
    document.cookie = (
    	'token=' + token +
		'; path=/;' +
		'expires=' + new Date(Date.now() + thirtyDays).toUTCString()
	);
}

function clearCookieToken() {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export function initialize() {
    return dispatch =>
        dispatch({type: 'APP_SET_TOKEN', token: getCookieToken()});
}

export function login(apiUrl, user, pass, save) {
    return dispatch =>
        reqwest({
            url: apiUrl + '/api-token-auth/',
            data: JSON.stringify({
                username: user,
                password: pass,
            }),
			method: 'POST',
            contentType: 'application/json',
            type: 'json'
        }).then(
        	resp => {
        		if (save) {
                    setCookieToken(resp.token);
				}
                return dispatch({type: 'APP_SET_TOKEN', token: resp.token})
            }
		)
}

export function logoff(){
    return dispatch => {
        clearCookieToken();
        dispatch({type: 'APP_DELETE_TOKEN'});
    }
}