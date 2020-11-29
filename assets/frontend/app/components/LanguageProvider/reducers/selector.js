import { shallowEqual, useSelector } from 'react-redux'

export const useLocale = () => {
	return useSelector(state => state.language.locale, shallowEqual)
}