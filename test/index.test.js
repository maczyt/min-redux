'use strict'

const expect = require('chai').expect
const simpleRedux  = require('../index.node')

function counter(state = 0, action) {
  switch(action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

describe('createStore', function() {
  const store = simpleRedux.createStore(counter)
  it('init store: state should be equal 0', function () {
    expect(store.getState()).to.be.equal(0)
  })
  it('dispatch action:INCREMENT', function () {
    store.dispatch({ type: 'INCREMENT' })
    expect(store.getState()).to.be.equal(1)
  })
  it('dispatch action:DECREMENT', function () {
    store.dispatch({ type: 'DECREMENT' })
    expect(store.getState()).to.be.equal(0)
  })
  it('subscribe, when state change, subscribe event listener will be called', function () {
    store.subscribe(() => { store.getState() })
    store.dispatch({ type: 'INCREMENT' })
  })
})

describe('combineReducers', function () {
  const store = simpleRedux.createStore(simpleRedux.combineReducers({ data1: (state = 0, action) => {}, data2: (state = [], action) => {} }))
  it('init store: state should be equal Object', function () {
    expect(store.getState()).to.be.an('Object')
  })
})
