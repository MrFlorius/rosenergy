import { CHANGE_LOCALE } from './types'

export const changeLocale = (languageLocale : string) => {
	return {
		type: CHANGE_LOCALE,
		locale: languageLocale,
	}
}