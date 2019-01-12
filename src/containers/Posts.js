import React, { Component } from 'react';
import { Panel, PanelGroup } from 'react-bootstrap';
import axios from 'axios';
import './Posts.css';

export default class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
      post: null
    };
  }

  async componentDidMount() {
    try {
      const { data: post } = await axios.get(
        `/posts/${this.props.match.params.id}`
      );

      this.setState({
        post
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

  renderComments = () => {
    return this.state.post.comments.map((comment, i) => (
      <Panel key={i}>
        <Panel.Heading>
          Author: &nbsp;&nbsp;
          <b>
            {comment.author.name} &nbsp;&nbsp;
            {comment.author.email}
          </b>
        </Panel.Heading>
        <Panel.Body>{comment.body}</Panel.Body>
        <Panel.Footer>
          {new Date(comment.createdAt).toLocaleString()} &nbsp;&nbsp;
        </Panel.Footer>
      </Panel>
    ));
  };

  render() {
    return (
      this.state.post && (
        <div className="Posts">
          <Panel bsStyle="info">
            <Panel.Heading>
              <Panel.Title>
                <b>{this.state.post.title}</b>
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body>{this.state.post.body}</Panel.Body>
            <Panel.Footer>
              {new Date(this.state.post.createdAt).toLocaleString()}{' '}
              &nbsp;&nbsp;
              <b>{this.state.post.comments.length} comments</b> &nbsp;&nbsp;
            </Panel.Footer>
          </Panel>
          <hr />
          <h3>Comments</h3>
          <PanelGroup id="commentsPanelGroup">
            {this.renderComments()}
          </PanelGroup>
        </div>
      )
    );
  }
}
