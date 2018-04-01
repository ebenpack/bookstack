import 'babel-polyfill';
import start from './router';

window.MyApp = {
    init(opts) {
        start(
            opts.el,
            opts.apiUrl,
        );
    },
};
