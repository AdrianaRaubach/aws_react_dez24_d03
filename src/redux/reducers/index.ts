import { combineReducers } from 'redux'
import cartProducts from './cartProducts'
import orderSummary from './orderSummary'

const rootReducer = combineReducers({
	cartProducts,
	orderSummary,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer