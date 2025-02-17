import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState, Order, OrderStatus } from '../../../libs/types/Order.ts';




const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setOrders: (state, action: PayloadAction<Order[]>) => {
            state.orders = action.payload;
        },
        updateSingleOrder: (state, action: PayloadAction<Order>) => {
            const orderIndex = state.orders.findIndex(order => order.id === action.payload.id);
            if (orderIndex !== -1) {
                state.orders[orderIndex] = action.payload;
            } else {
                state.orders.push(action.payload);
            }
        },
        updateOrderStatus: (state, action: PayloadAction<{ id: string; status: OrderStatus }>) => {
            const orderIndex = state.orders.findIndex(order => order.id === action.payload.id);
            if (orderIndex !== -1) {
                state.orders[orderIndex].status = action.payload.status;
            }
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setStatus: (state, action: PayloadAction<typeof initialState.status>) => {
            state.status = action.payload;
        },
    },
});

export const {
    setOrders,
    updateSingleOrder,
    updateOrderStatus,
    setLoading,
    setStatus
} = orderSlice.actions;
export default orderSlice.reducer;