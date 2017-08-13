# simple-redux

``` js

import { createStore } from './index'

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

const store = createStore(counter)

store.subscribe(() => console.log(store.getState()))

store.dispatch({ type: 'INCREMENT' })
// 1
store.dispatch({ type: 'INCREMENT' })
// 2
store.dispatch({ type: 'DECREMENT' })
// 1

```


## 参考文档

- [redux tutorial](https://github.com/react-guide/redux-tutorial-cn)

## 已支持

- `createStore`
  - `subscribe`
  - `getState`
  - `dispatch`
- `combineReducers`

## 待补充

- `bindActionCreators`
- `applyMiddleware`
- `actionCreator`


