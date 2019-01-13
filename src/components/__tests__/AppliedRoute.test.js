import React from 'react';
import AppliedRoute from '../AppliedRoute';
import { shallow } from 'enzyme';

describe('AppliedRoute Component', () => {
  let appliedRoute;

  beforeEach(() => {
    appliedRoute = shallow(<AppliedRoute />);
  });
  it('should match snapshot', () => {
    expect(appliedRoute).toMatchSnapshot();
  });
});
