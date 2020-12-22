import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import login from './pages/login';
import signup from './pages/signup';
import home from './pages/home';
import account from './components/account';
import blog from './components/blog'

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#33c9dc',
			main: '#FF5722',
			dark: '#d50000',
			contrastText: '#fff'
		}
	}
});


function App() {
  return (
    <div>
      <MuiThemeProvider theme={theme}>
      <Router>
        <div>
          <Switch>
              <Route exact path="/login" component={login}/>
              <Route exact path="/signup" component={signup}/>
              <Route exact path="/" component={home}/>
              <Route exact path="/account" component={account}/>
              <Route exact path="/blog" component={blog}/>
          </Switch>
        </div>
      </Router>
      </MuiThemeProvider>
    </div>
  );
}
export default App;