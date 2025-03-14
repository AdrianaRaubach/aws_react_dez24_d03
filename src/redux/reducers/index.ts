import { combineReducers } from 'redux'
import cartProducts from './cartProducts'

const rootReducer = combineReducers({
	cartProducts
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer