// Needed for redux-saga es6 generator support
// import '@babel/polyfill'

// Import all the third party stuff
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import history from './utils/history'
import * as OfflinePluginRuntime from 'offline-plugin/runtime';

import ChangeableThemeProvider from './components/ChangeableThemeProvider'

// Import root app
import App from 'containers/App'

// Import Language Provider
import LanguageProvider from 'components/LanguageProvider'

// Load the favicon file
import '!file-loader?name=[name].[ext]!./images/favicon.ico'

import configureStore from './configureStore'

// Import i18n messages
import { translationMessages } from './i18n'

// Create redux store with history
const initialState = {}
const store = configureStore(initialState, history)

const MOUNT_NODE = document.getElementById('app')

const render = messages => {
	ReactDOM.render(
		<Provider store={store}>
			<LanguageProvider messages={messages}>
				<ConnectedRouter history={history}>
					<ChangeableThemeProvider>
						<App/>
					</ChangeableThemeProvider>
				</ConnectedRouter>
			</LanguageProvider>
		</Provider>,
		MOUNT_NODE,
	)
}

if (module.hot) {
	// Hot reloadable React components and translation json files
	// modules.hot.accept does not accept dynamic dependencies,
	// have to be constants at compile-time
	module.hot.accept(['./i18n', 'containers/MyProjects'], () => {
		ReactDOM.unmountComponentAtNode(MOUNT_NODE)
		render(translationMessages)
	})
}

// Chunked polyfill for browsers without Intl support
/*if (!window.Intl) {
	new Promise(resolve => {
		resolve(import('intl'))
	})
		.then(() =>
			Promise.all([
				import('intl/locale-data/jsonp/en.js'),
				import('intl/locale-data/jsonp/ru.js'),
			]),
		) // eslint-disable-line prettier/prettier
		.then(() => render(translationMessages))
		.catch(err => {
			throw err
		})
} else {
	render(translationMessages)
}*/
render(translationMessages)

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
/*if (process.env.NODE_ENV === 'production') {
	require('offline-plugin/runtime').install() // eslint-disable-line global-require
}*/

if (process.env.NODE_ENV === 'production') {
	//console.log('1223')
/*	OfflinePluginRuntime.install({
		onUpdateReady: () => OfflinePluginRuntime.applyUpdate(),
		onUpdated: () => location.reload(),
	}) // eslint-disable-line global-require*/
}

