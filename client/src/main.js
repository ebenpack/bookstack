import "babel-polyfill";
import { start } from './router.jsx';

window.MyApp = {
    init: function(opts) {
        start(
        	opts.el,
            opts.apiUrl
        );
    }
};