(function (global, undefined) {

  function createStore(reducer) {
    if (typeof reducer === 'undefined' || typeof reducer !== 'function' ) {
      throw new Error('Invariant Violation: Expected the reducer to be a function.')
    }
    let state = undefined
    const listeners = []
    const getState = () => state
    const dispatch = (action) => { 
      state = reducer(state, action)
      listeners.forEach((listener) => listener())
    }
    const subscribe = (listener) => {
      listeners.push(listener)
    } 
    dispatch({ type: '@@simple-redux-init' }) // init
    return { getState, dispatch, subscribe }
  }

  function combineReducers(reducers) {
    const finalReducers = Object.assign({}, reducers)
    const finalReducerKeys = Object.keys(finalReducers)
    return function combination(state = {}, action) {
      let hasChanged = false
      const nextState = {}
      for (let i = 0; i < finalReducerKeys.length; i ++) {
        const key = finalReducerKeys[i]
        const reducer = finalReducers[key]
        const previousStateForKey = state[key]
        const nextStateForKey = reducer(previousStateForKey, action)
        nextState[key] = nextStateForKey
        hasChanged = hasChanged || nextStateForKey !== previousStateForKey
      }
      return hasChanged ? nextState : state
    }
  }

  exports.createStore = createStore
  exports.combineReducers = combineReducers

})(this);