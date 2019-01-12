import React, { Component } from 'react';
import axios from 'axios';
import { PageHeader, ListGroup, ListGroupItem, Badge } from 'react-bootstrap';
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
    console.log('Home isAuthenticated', this.props.isAuthenticated);

    try {
      const { id: userId } = JSON.parse(localStorage.getItem('user'));
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
      <LinkContainer key={post.id} to={`/posts/${post.id}`}>
        <ListGroupItem header={post.title}>
          {`CreatedAt: ${new Date(post.createdAt).toLocaleString()}`}
        </ListGroupItem>
      </LinkContainer>
    ));
  }

  renderLander() {
    return (
      <div className="lander">
        <h1>Blog</h1>
        <p>A simple blog app</p>
      </div>
    );
  }

  renderPosts() {
    return (
      <div className="posts">
        <PageHeader>
          Your Posts <Badge>{this.state.posts.length}</Badge>
        </PageHeader>
        <ListGroup>
          <LinkContainer key="new" to="/posts/new">
            <ListGroupItem>
              <h4>
                <b>{'\uFF0B'}</b> Create a new post
              </h4>
            </ListGroupItem>
          </LinkContainer>
          {!this.state.isLoading && this.renderPostsList(this.state.posts)}
        </ListGroup>
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
