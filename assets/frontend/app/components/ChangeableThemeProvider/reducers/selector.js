import { shallowEqual, useSelector } from 'react-redux'

export const useThemeType = () => {
	return useSelector(state => state.theme.type, shallowEqual)
}