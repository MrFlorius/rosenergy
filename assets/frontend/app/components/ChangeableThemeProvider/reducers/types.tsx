export const CHANGE_THEME = 'ThemeToggle/CHANGE_Theme'
//export type CHANGE_THEME = 'ThemeToggle/CHANGE_Theme'
/*
export const THEME_TYPES = Object.freeze({
	LIGHT: 'light',
	DARK: 'dark',
})*/

export enum THEME_TYPES {
	LIGHT = 'light',
	DARK = 'dark'
}

interface ChangeThemeAction {
	type: typeof CHANGE_THEME
	themeType: string
}

export interface ThemeState {
	type: string
}

//export interface ThemeType { string }

export type ThemeActionTypes = ChangeThemeAction