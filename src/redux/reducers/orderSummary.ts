import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { OrderSummaryProps } from "../../types/PropTypes"

const initialState: OrderSummaryProps = {
    subtotal: 0,
    shipping: 'Over $100 Free',
    tax: 5,
    total: 0,
    price: 0,
    qtd: 0
}

const orderSummary = createSlice({
	name: 'order_summary',
	initialState,
	reducers: {
		addValue: (state, action: PayloadAction<OrderSummaryProps>) => {
            if (state.subtotal !== undefined) state.subtotal += (action.payload.price*action.payload.qtd)
            if (state.total !== undefined) state.total += (action.payload.price*action.payload.qtd)
            if (state.tax !== undefined && state.total !== undefined) {
                if(state.total >= 100) {
                    state.tax = 0
                    state.shipping = 'Free'
                }
            } 
		},
        plusValue: (state, action: PayloadAction<OrderSummaryProps>) => {
            if (state.subtotal !== undefined) state.subtotal += (action.payload.price/action.payload.qtd)
            if (state.total !== undefined) state.total += (action.payload.price/action.payload.qtd)
            if (state.tax !== undefined && state.total !== undefined) {
                if(state.total >= 100) {
                    state.tax = 0
                    state.shipping = 'Free'
                } else {
                    state.tax = 5
                    state.shipping = 'Over $100 Free'
                }
            } 
        },
        minusValue: (state, action: PayloadAction<OrderSummaryProps>) => {
            if (state.subtotal !== undefined) state.subtotal -= (action.payload.price/action.payload.qtd)
            if (state.total !== undefined) state.total -= (action.payload.price/action.payload.qtd)
            if (state.tax !== undefined && state.total !== undefined) {
                if(state.total >= 100) {
                    state.tax = 0
                    state.shipping = 'Free'
                } else {
                    state.tax = 5
                    state.shipping = 'Over $100 Free'
                }
            } 
        },
        removeValue: (state, action: PayloadAction<OrderSummaryProps>) => {
            if (state.subtotal !== undefined) state.subtotal -= action.payload.price
            if (state.total !== undefined) state.total -= action.payload.price
            if (state.tax !== undefined && state.total !== undefined) {
                if(state.total >= 100) {
                    state.tax = 0
                    state.shipping = 'Free'
                } else {
                    state.tax = 5
                    state.shipping = 'Over $100 Free'
                }
            } 
        },
        localStorageInfos: (state, action: PayloadAction<OrderSummaryProps>) => {
            state.shipping = action.payload.shipping
            state.tax = action.payload.tax
            state.subtotal = action.payload.subtotal
            state.total = action.payload.total
        }
	}
})

export const { addValue, plusValue, minusValue, removeValue, localStorageInfos } = orderSummary.actions

export default orderSummary.reducer;