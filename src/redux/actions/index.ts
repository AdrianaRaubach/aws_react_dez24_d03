import { createAction } from '@reduxjs/toolkit'
import { CartProps, OrderSummaryProps } from '../../types/PropTypes'

export const addItem = createAction<CartProps>('cart_products/addItem')
export const removeItem = createAction<CartProps>('cart_products/removeItem')
export const incrementQtd = createAction<CartProps>('cart_products/incrementQtd')
export const decrementQtd = createAction<CartProps>('cart_products/decrementQtd')
export const addValue = createAction<OrderSummaryProps>('order_summary/addValue')
export const plusValue = createAction<OrderSummaryProps>('order_summary/plusValue')
export const minusValue = createAction<OrderSummaryProps>('order_summary/minusValue')
export const removeValue = createAction<OrderSummaryProps>('order_summary/removeValue')
