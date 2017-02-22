import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { Test } from '../../src/components/Test';

describe('Test Component', () => {
  it('should render self and subcomponents', () => {
    expect(renderer.create(
      <Test
        buttonPush={jest.fn}
      />
    )).toMatchSnapshot();
  });
});
