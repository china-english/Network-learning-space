import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
import {browserHistory} from 'react-router'
import {routerMiddleware} from 'react-router-redux'

export default function configureStore (initialState) {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        thunk,
        routerMiddleware(browserHistory))
    )
  )
}
