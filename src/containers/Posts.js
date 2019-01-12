import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import axios from 'axios';
import './Posts.css';

export default class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
      isDeleting: null,
      post: null,
      title: '',
      body: ''
    };
  }

  async componentDidMount() {
    try {
      const { data: post } = await axios.get(
        `/posts/${this.props.match.params.id}`
      );
      const { title, body } = post;

      this.setState({
        post,
        title,
        body
      });
    } catch (e) {
      alert(e);
    }
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
  };

  handleDelete = async event => {
    event.preventDefault();

    const confirmed = window.confirm(
      'Are you sure you want to delete this post?'
    );

    if (!confirmed) {
      return;
    }

    this.setState({ isDeleting: true });
  };

  render() {
    return (
      <div className="Posts">
        {this.state.post && (
          <Panel>
            <Panel.Heading>
              <Panel.Title componentClass="h3">{this.state.title}</Panel.Title>
            </Panel.Heading>
            <Panel.Body>{this.state.body}</Panel.Body>
          </Panel>
        )}
      </div>
    );
  }
}
