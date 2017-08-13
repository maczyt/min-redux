// simple redux的作用
// =========
// 1）存放应用程序状态的容器
// 2）一种把 action 分发到状态修改器的机制，也就是 reducer 函数
// 3）监听状态变化的机制


// 我们使用 reducer 函数修改数据（在传统的 Flux 中我们称之为 store）。
//      Reducer 函数是 action 的订阅者。
//      Reducer 函数只是一个纯函数，它接收应用程序的当前状态以及发生的 action，然后返回修改后的新状态（或者有人称之为归并后的状态）。
// 如何把数据变更传播到整个应用程序？
//      使用订阅者来监听状态的变更情况。
// function reducer(state = {}, action) {
//   switch(action.type) {
//     default:
//       return state
//   }
// }

/**
 * 必须接收一个能够修改应用状态的函数
 * @param {*} reducer 
 */
export function createStore(reducer) {
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

export function combineReducers(reducers) {
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
