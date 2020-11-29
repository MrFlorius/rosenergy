import { CHANGE_PARITY } from './constants'

export const changeParity = value => {
	return {
		type: CHANGE_PARITY,
		value,
	}
}