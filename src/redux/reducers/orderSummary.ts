import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { OrderSummaryProps } from "../../types/PropTypes"

const initialState: OrderSummaryProps = {
    subtotal: 0,
    shipping: '',
    tax: 20,
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
                }
            } 
		},
        plusValue: (state, action: PayloadAction<OrderSummaryProps>) => {
            if (state.subtotal !== undefined) state.subtotal += (action.payload.price/action.payload.qtd)
            if (state.total !== undefined) state.total += (action.payload.price/action.payload.qtd)
            if (state.tax !== undefined && state.total !== undefined) {
                if(state.total >= 100) {
                    state.tax = 0
                } else {
                    state.tax = 20
                }
            } 
        },
        minusValue: (state, action: PayloadAction<OrderSummaryProps>) => {
            if (state.subtotal !== undefined) state.subtotal -= (action.payload.price/action.payload.qtd)
            if (state.total !== undefined) state.total -= (action.payload.price/action.payload.qtd)
            if (state.tax !== undefined && state.total !== undefined) {
                if(state.total >= 100) {
                    state.tax = 0
                } else {
                    state.tax = 20
                }
            } 
        },
        removeValue: (state, action: PayloadAction<OrderSummaryProps>) => {
            console.log('state' + state.price)
            console.log('action' + action.payload.price)
            if (state.subtotal !== undefined) state.subtotal -= action.payload.price
            if (state.total !== undefined) state.total -= action.payload.price
            if (state.tax !== undefined && state.total !== undefined) {
                if(state.total >= 100) {
                    state.tax = 0
                } else {
                    state.tax = 20
                }
            } 
        }
	}
})

export const { addValue, plusValue, minusValue, removeValue } = orderSummary.actions

export default orderSummary.reducer;