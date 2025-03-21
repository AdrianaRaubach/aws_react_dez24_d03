import { combineReducers } from 'redux'
import cartProducts from './cartProducts'
import orderSummary from './orderSummary'
import  filterProducts  from './filterProducts'

const rootReducer = combineReducers({
	cartProducts,
	orderSummary,
	filterProducts
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer