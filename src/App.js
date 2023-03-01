import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

const AppStyled = styled.div`
background-color: #000000;
`;

class App extends React.Component {
  render() {
    return (
      <AppStyled>
        <Switch>
          <Route
            exact
            path="/"
            component={ Login }
          />
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route component={ NotFound } />
        </Switch>
      </AppStyled>
    );
  }
}

export default App;
