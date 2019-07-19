import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, Route, Switch, Redirect
} from 'react-router-dom'
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import './index.css';
import App from './components/App';
import Signin from './components/Auth/signin';
import Signup from './components/Auth/signup';
import withSession from './components/withSession';
import Navbar from './components/Navbar';
import Search from './components/Recipe/Search';
import AddRecipe from './components/Recipe/AddRecipe';
import Profile from './components/Profile/Profile';

const client = new ApolloClient({
  uri: 'http://localhost:4444/graphql',
  fetchOptions: {
    credentials: 'include'
  },
  request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token
      }
    })
  },
  onError: ({ networkError }) => {
    if (networkError) {
      console.log('Network Error', networkError);
    }
  }
});

const Root = ({ refetch, session }) => (
  <Router>
    <Navbar session={session} />
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/search" component={Search} />
      <Route path="/recipe/add" component={AddRecipe} />
      <Route path="/profile" component={Profile} />
      <Route path="/signin" render={() => <Signin refetch={refetch} />} />
      <Route path="/signup" render={() => <Signup refetch={refetch} />} />
      <Redirect to="/" />
    </Switch>
  </Router>
);

const RootWithSession = withSession(Root);

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>,
document.getElementById('root'));
