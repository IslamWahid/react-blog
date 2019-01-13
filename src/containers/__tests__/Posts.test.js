import React from 'react';
import Posts from '../Posts';
import { render } from 'enzyme';

describe('Posts Component', () => {
  let posts;

  beforeEach(() => {
    posts = render(<Posts path="/posts/:id" exact />);
  });
  it('should match snapshot', () => {
    expect(posts).toMatchSnapshot();
  });
});
