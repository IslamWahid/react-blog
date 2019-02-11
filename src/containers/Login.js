import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import axios from 'axios';
import './Login.css';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      username: ''
    };
  }

  validateForm() {
    return this.state.username.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    try {
      const {
        data: [user]
      } = await axios.get(
        `${process.env.REACT_APP_API_URL}/users?username=${this.state.username}`
      );
      if (!user) throw new Error('username not found');
      this.props.userHasAuthenticated(user);
    } catch (e) {
      this.setState({ isLoading: false });
      alert(e.message);
    }
  };

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Username</ControlLabel>
            <FormControl
              autoFocus
              type="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Login"
            loadingText="Logging in…"
          />
        </form>
      </div>
    );
  }
}
