/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'
import Navigator from '../Navigator'
import createRouter from '../../util/createRouter'

it('renders without crashing', () => {
  const resolve = () => ''
  const router = createRouter(() => {}, resolve)
  const navigationState = { index: 0, routes: [{ key: 'test' }] }
  const tree = renderer
    .create(
      <Navigator
        navigationState={navigationState}
        router={router}
      />
    )
    .toJSON()
  expect(tree).toBe('')
})
