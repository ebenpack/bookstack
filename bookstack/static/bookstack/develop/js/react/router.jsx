var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var App = require('./components/App.jsx');
var StackList = require('./components/StackList.jsx');
var StackDetail = require('./components/StackDetail.jsx');

function routes(staticPath){
    return (
        <Router>
            <Route
                path="/"
                component={App}
                staticPath={staticPath}
            >
                <Route 
                    path="list"
                    component={StackList}
                />
                <Route
                    path="list/:id"
                    component={StackDetail}
                    staticPath={staticPath}
                />
            </Route>
        </Router>
    );
}

exports.start = function(staticPath, el) {
    React.render(routes(staticPath), document.querySelector(el));
};