import React from 'react';
import NotFound from '../NotFound';
import { shallow } from 'enzyme';

describe('NotFound Component', () => {
  let notFound;

  beforeEach(() => {
    notFound = shallow(<NotFound />);
  });
  it('should match snapshot', () => {
    expect(notFound).toMatchSnapshot();
  });
});
