var React = require('react');

// var StackList = require('./dispatcher/AppDispatcher.js');
var StackList = require('./components/StackList.jsx');
var StackDetail = require('./components/StackDetail.jsx');
var StackListActions = require('./actions/StackListActions.js');
var StackDetailActions = require('./actions/StackDetailActions.js');

window.MyApp = {

    init: function(opts) {
        var mountPoint = document.querySelector(opts.el);
        this.mountPoint = mountPoint;
        var staticPath = opts.staticPath;
        this.staticPath = staticPath;

        React.render(<StackList staticPath={staticPath} />, mountPoint);

        StackListActions.loadStackList();
    }

};