import React, { Component } from 'react';
import axios from 'axios';
import {
  PageHeader,
  Button,
  PanelGroup,
  Panel,
  ListGroupItem
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './Home.css';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      posts: []
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) return;
    try {
      const { id: userId } = this.props.user;
      const { data: posts } = await axios.get(`/posts?userId=${userId}`);
      this.setState({
        posts: posts.sort((a, b) => b.createdAt - a.createdAt)
      });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  renderPostsList(posts) {
    return posts.map(post => (
      <Panel key={post.id} bsStyle="info">
        <Panel.Heading>
          <Panel.Title>
            <b>{post.title}</b>
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          {post.body}
          <hr />
          <LinkContainer to={`/posts/${post.id}`}>
            <Button bsStyle="link">show comments</Button>
          </LinkContainer>
        </Panel.Body>
        <Panel.Footer>
          {new Date(post.createdAt).toLocaleString()} &nbsp;&nbsp;
          <b>{post.comments.length} comments</b> &nbsp;&nbsp;
        </Panel.Footer>
      </Panel>
    ));
  }

  renderLander() {
    return (
      <div className="lander">
        <h1>Welcome to Blog</h1>
        <p>A simple blog app</p>
      </div>
    );
  }

  renderPosts() {
    return (
      <div className="posts">
        <PageHeader>
          Posts <small>({this.state.posts.length})</small>
        </PageHeader>
        <LinkContainer to="/posts/new">
          <h4>
            <Button bsStyle="link">
              <b>{'\uFF0B'}</b> Create a new post
            </Button>
          </h4>
        </LinkContainer>
        <br />
        <PanelGroup id="postsPanelGroup">
          {!this.state.isLoading && this.renderPostsList(this.state.posts)}
        </PanelGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderPosts() : this.renderLander()}
      </div>
    );
  }
}
