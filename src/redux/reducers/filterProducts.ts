
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
	page: 0
}

const filterProducts = createSlice({
	name: 'filter_products',
	initialState,
	reducers: {
        activePage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        }
	}
})

export const { activePage } = filterProducts.actions

export default filterProducts.reducer;