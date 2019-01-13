import React from 'react';
import LoaderButton from '../LoaderButton';
import { shallow } from 'enzyme';

describe('LoaderButton Component', () => {
  let loaderButton;

  beforeEach(() => {
    loaderButton = shallow(
      <LoaderButton
        block
        bsStyle="primary"
        bsSize="large"
        type="submit"
        isLoading={false}
        text="Create"
        loadingText="Creating…"
      />
    );
  });
  it('should match snapshot', () => {
    expect(loaderButton).toMatchSnapshot();
  });
});
