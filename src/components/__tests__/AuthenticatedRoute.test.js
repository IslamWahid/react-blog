import React from 'react';
import AuthenticatedRoute from '../AuthenticatedRoute';
import { shallow } from 'enzyme';

describe('AuthenticatedRoute Component', () => {
  let authenticatedRoute;

  beforeEach(() => {
    authenticatedRoute = shallow(<AuthenticatedRoute />);
  });
  it('should match snapshot', () => {
    expect(authenticatedRoute).toMatchSnapshot();
  });
});
