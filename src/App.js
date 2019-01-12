import React, { Component, Fragment } from 'react';
import Routes from './Routes';
import { Link, withRouter } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      user: null
    };
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) this.userHasAuthenticated(user);
    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = user => {
    if (user) {
      this.setState({ user });
      this.setState({ isAuthenticated: true });
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      this.setState({ user: null });
      this.setState({ isAuthenticated: false });
      localStorage.removeItem('user');
    }
  };

  handleLogout = () => {
    this.userHasAuthenticated(false);
    this.props.history.push('/login');
  };

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      user: this.state.user
    };

    return (
      !this.state.isAuthenticating && (
        <div className="App container">
          <Navbar fluid collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">Blog</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                {this.state.isAuthenticated ? (
                  <Fragment>
                    <Navbar.Text>{this.state.user.name}</Navbar.Text>
                    <NavItem onClick={this.handleLogout}>Logout</NavItem>
                  </Fragment>
                ) : (
                  <Fragment>
                    <LinkContainer to="/signup">
                      <NavItem>Signup</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/login">
                      <NavItem>Login</NavItem>
                    </LinkContainer>
                  </Fragment>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Routes childProps={childProps} />
        </div>
      )
    );
  }
}

export default withRouter(App);
