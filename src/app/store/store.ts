import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './slices/orderSlice';
import websocketReducer from './slices/websocketSlice';

export const store = configureStore({
    reducer: {
        orders: orderReducer,
        websocket: websocketReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;