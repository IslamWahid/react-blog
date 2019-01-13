import React from 'react';
import Login from '../Login';
import { shallow } from 'enzyme';

describe('Login Component', () => {
  let login;

  beforeEach(() => {
    login = shallow(<Login />);
  });
  it('should match snapshot', () => {
    expect(login).toMatchSnapshot();
  });
});
