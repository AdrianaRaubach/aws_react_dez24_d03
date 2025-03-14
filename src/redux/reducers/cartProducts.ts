import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CartProps, CartListProps } from "../../types/PropTypes"


const initialState: CartListProps = []
const cartProducts = createSlice({
	name: 'cart_products',
	initialState,
	reducers: {
		addItem: (state, action: PayloadAction<CartProps>) => {
			const indexProd = state.findIndex(item => item.id === action.payload.id && item.color === action.payload.color && item.size === action.payload.size)
			
			if (indexProd !== -1) {
				const newState =  state.map((item, index) =>
					index === indexProd ? { ...item, qtd: item.qtd + 1 , price: ((item.qtd+1) * action.payload.price)} : item)
				return newState	  
			}
			state.push({
				id: action.payload.id,
				title: action.payload.title,
				image: action.payload.image,
				color: action.payload.color,
				size: action.payload.size,
				qtd: action.payload.qtd,
				price: action.payload.price * action.payload.qtd,
			})
		},
		removeItem:(state, action: PayloadAction<CartProps>) => {
			const indexProd = state.findIndex(item => item.id === action.payload.id && item.color === action.payload.color && item.size === action.payload.size)
			return state.filter((item, index) => index !== indexProd)
		},
		incrementQtd:(state, action: PayloadAction<CartProps>) => {
			const indexProd = state.findIndex(item => item.id === action.payload.id && item.color === action.payload.color && item.size === action.payload.size)
			const newState = state.map((item, index) => 
				index === indexProd ? { ...item, qtd: item.qtd + 1, price: item.price + action.payload.price / item.qtd} : item
			)
			return newState;	
		},
		decrementQtd:(state, action: PayloadAction<CartProps>) => {
			const indexProd = state.findIndex(item => item.id === action.payload.id && item.color === action.payload.color && item.size === action.payload.size)
			
			if(action.payload.qtd <= 1) {
				return state.filter((item, index) => index !== indexProd)
			}
			const newState = state.map((item, index) => 
				index === indexProd ? { ...item, qtd: item.qtd - 1, price: item.price - action.payload.price / item.qtd} : item
			)
			return newState;	
		}
		
	}
})

export const { addItem , removeItem} = cartProducts.actions

export default cartProducts.reducer;