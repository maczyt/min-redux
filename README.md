# simple-redux

[![npm](https://img.shields.io/npm/dw/localeval.svg)](https://github.com/maczyt/min-redux)
[![GitHub stars](https://img.shields.io/github/stars/maczyt/min-redux.svg)](https://github.com/maczyt/min-redux/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/maczyt/min-redux.svg)](https://github.com/maczyt/min-redux/issues)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/maczyt/min-redux/master/LICENSE)

> You will get how to write a redux-like by yourself

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
- ~~`actionCreator`~~

## 说明

1. `actionCreator`

``` js
export const increment = () => ({
  type: 'INCREMENT'
})
```


