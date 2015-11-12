var ReactDOM = require('react-dom');
var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var App = require('./components/App.jsx');
var AuthorDetail = require('./components/AuthorDetail.jsx');
var PublisherDetail = require('./components/PublisherDetail.jsx');
var StackList = require('./components/StackList.jsx');
var StackDetail = require('./components/StackDetail.jsx');
var Login = require('./components/Login.jsx');
var AddNewBook = require('./components/AddNewBook.jsx');

var Route = React.createClass({
    render: function(){
        return (
            <Router>
                <Route
                    path="/"
                    component={App}
                >
                    <Route
                        path="login"
                        component={Login}
                    />
                    <Route
                        path="list"
                        component={StackList}
                    />
                    <Route
                        path="list/:id"
                        component={StackDetail}
                        staticPath={this.props.staticPath}
                    />
                    <Route
                        path="author/:id"
                        component={AuthorDetail}
                    />
                    <Route
                        path="publisher/:id"
                        component={PublisherDetail}
                    />
                    <Route
                        path="addbook"
                        component={AddNewBook}
                    />
                </Route>
            </Router>
        );
    }
});

exports.start = function(staticPath, el) {
    ReactDOM.render(
        <Route staticPath={staticPath} />,
        document.querySelector(el)
    );
};