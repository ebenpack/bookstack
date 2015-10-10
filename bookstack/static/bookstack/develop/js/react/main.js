var Router = require('./router.jsx');

window.MyApp = {
    init: function(opts) {
        var staticPath = opts.staticPath;
        var el = opts.el;
        Router.start(staticPath, el);
    }
};