/* eslint-disable import/default */

import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from './routes'
import { authLoginUserSuccess } from './actions/authActions'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

require('./favicon.ico') // Tell webpack to load favicon.ico
import './styles/styles.scss' // Yep, that's right. You can import SASS/CSS files too! Webpack
                               // will run the associated loader and plug this into the page.

// Required by material-ui
import injectTapEventPlugin from 'react-tap-event-plugin'
// Needed for onTouchTap
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

const store = configureStore(window.INITIAL_STATE)

const token = sessionStorage.getItem('token')
if (token !== null) {
  store.dispatch(authLoginUserSuccess(token))
}

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Router history={history} routes={routes} />
    </MuiThemeProvider>
  </Provider>, document.getElementById('app')
)
