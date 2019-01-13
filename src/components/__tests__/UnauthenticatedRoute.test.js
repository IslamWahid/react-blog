import React from 'react';
import UnauthenticatedRoute from '../UnauthenticatedRoute';
import { shallow } from 'enzyme';

describe('UnauthenticatedRoute Component', () => {
  let unauthenticatedRoute;

  beforeEach(() => {
    unauthenticatedRoute = shallow(<UnauthenticatedRoute />);
  });
  it('should match snapshot', () => {
    expect(unauthenticatedRoute).toMatchSnapshot();
  });
});
