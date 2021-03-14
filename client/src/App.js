import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Styling
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Components
import TopNav from './components/layout/TopNav';

// Routes
import PrivateRoute from './components/routing/PrivateRoute';
import Home from './components/pages/Home';
import Current from './components/pages/Current';
import Library from './components/pages/Library';
import Retrieve from './components/pages/Retrieve';
import Login from './components/auth/Login';
import { About } from './components/pages/About';

// Remove prior to deployment
import Testing from './components/pages/Testing';

// Redux
import { Provider } from 'react-redux';
import store from './flux/store';
import { loadUser } from './flux/actions/authActions';
import AlertHandler from './components/layout/AlertHandler';

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<TopNav />
				<div className='alert-anchor position-relative'>
					<AlertHandler />
				</div>
				<Switch>
					<PrivateRoute exact path='/' component={Home} />
					<PrivateRoute exact path='/current' component={Current} />
					<PrivateRoute exact path='/retrieve' component={Retrieve} />
					<PrivateRoute exact path='/library' component={Library} />
					<Route exact path='/testing' component={Testing} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/about' component={About} />
				</Switch>
			</Router>
		</Provider>
	);
};

export default App;
