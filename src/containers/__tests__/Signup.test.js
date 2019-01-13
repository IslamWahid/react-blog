import React from 'react';
import Signup from '../Signup';
import { shallow } from 'enzyme';

describe('Signup Component', () => {
  let signup;

  beforeEach(() => {
    signup = shallow(<Signup />);
  });
  it('should match snapshot', () => {
    expect(signup).toMatchSnapshot();
  });
});
