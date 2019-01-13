import React from 'react';
import NewPost from '../NewPost';
import { shallow } from 'enzyme';

describe('NewPost Component', () => {
  let newPost;

  beforeEach(() => {
    newPost = shallow(<NewPost />);
  });
  it('should match snapshot', () => {
    expect(newPost).toMatchSnapshot();
  });
});
