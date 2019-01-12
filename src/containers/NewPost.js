import React, { Component } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import LoaderButton from '../components/LoaderButton';
import './NewPost.css';

export default class NewPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
      title: '',
      body: ''
    };
  }

  validateForm() {
    return this.state.title.length > 0 && this.state.body.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });
    const { title, body } = this.state;
    try {
      const { id: userId } = this.props.user;
      await axios.post('/posts', {
        title,
        body,
        userId,
        comments: [],
        createdAt: Date.now()
      });
      this.setState({ isLoading: false });
      this.props.history.push('/');
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  };

  render() {
    return (
      <div className="NewPost">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="title">
            <FormControl
              onChange={this.handleChange}
              value={this.state.title}
            />
          </FormGroup>
          <FormGroup controlId="body">
            <FormControl
              onChange={this.handleChange}
              value={this.state.body}
              componentClass="textarea"
            />
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating…"
          />
        </form>
      </div>
    );
  }
}
