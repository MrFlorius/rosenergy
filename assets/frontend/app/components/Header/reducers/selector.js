import { shallowEqual, useSelector } from 'react-redux'

export const useParity = () => {
	return useSelector(state => state.parity.value, shallowEqual)
}