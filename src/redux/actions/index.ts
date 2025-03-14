import { createAction } from '@reduxjs/toolkit'
import { CartProps } from '../../types/PropTypes'

export const addItem = createAction<CartProps>('cart_products/addItem')
export const removeItem = createAction<CartProps>('cart_products/removeItem')
export const incrementQtd = createAction<CartProps>('cart_products/incrementQtd')
export const decrementQtd = createAction<CartProps>('cart_products/decrementQtd')
