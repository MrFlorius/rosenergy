/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import themeReducer from 'components/ChangeableThemeProvider/reducers/reducer'
import history from './utils/history'
import languageProviderReducer from 'components/LanguageProvider/reducers/reducer'

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
	const rootReducer = combineReducers({
		theme: themeReducer,
		language: languageProviderReducer,
		router: connectRouter(history),
		...injectedReducers,
	})

	return rootReducer
}
