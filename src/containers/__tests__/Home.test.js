import React from 'react';
import Home from '../Home';
import { shallow } from 'enzyme';

describe('Home Component', () => {
  let home;

  beforeEach(() => {
    home = shallow(<Home />);
  });
  it('should match snapshot', () => {
    expect(home).toMatchSnapshot();
  });
});
