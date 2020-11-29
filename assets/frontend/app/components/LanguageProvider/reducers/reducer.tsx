import produce from 'immer'

import {CHANGE_LOCALE, LocaleActionTypes, LocaleState} from './types'
import { DEFAULT_LOCALE } from '../../../i18n'

export const initialState : LocaleState = {
	locale: DEFAULT_LOCALE,
}

/* eslint-disable default-case, no-param-reassign */
const languageProviderReducer = (state : LocaleState = initialState, action : LocaleActionTypes) =>
	produce(state, draft => {
		switch (action.type) {
			case CHANGE_LOCALE:
				draft.locale = action.locale
				break
		}
	})

export default languageProviderReducer
