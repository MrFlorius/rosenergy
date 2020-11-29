import produce from 'immer'

import {CHANGE_THEME, ThemeState, THEME_TYPES, ThemeActionTypes} from './types'


export const initialState : ThemeState = {
	type: THEME_TYPES.LIGHT,
}

/* eslint-disable default-case, no-param-reassign */
const themeProviderReducer = (state : ThemeState = initialState, action: ThemeActionTypes) =>
	produce(state, draft => {
		switch (action.type) {
			case CHANGE_THEME:
				draft.type = action.themeType
				break
		}
	})

export default themeProviderReducer
