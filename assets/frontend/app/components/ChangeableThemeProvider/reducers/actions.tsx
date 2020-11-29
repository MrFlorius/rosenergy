import {CHANGE_THEME, ThemeActionTypes, } from './types'

export const changeTheme = (themeType : string) : ThemeActionTypes => {
	return {
		type: CHANGE_THEME,
		themeType: themeType,
	}
}