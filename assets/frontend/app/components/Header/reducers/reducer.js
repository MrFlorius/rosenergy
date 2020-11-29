import produce from 'immer'

import { CHANGE_PARITY } from './constants'
import {getWeek} from "date-fns";

export const initialState = {
	value: getWeek(new Date(), {weekStartsOn: 1}) % 2
}


/* eslint-disable default-case, no-param-reassign */
const parityProviderReducer = (state = initialState, action) =>
	produce(state, draft => {
		switch (action.type) {
			case CHANGE_PARITY:
				draft.value = action.value
				break
		}
	})

export default parityProviderReducer
