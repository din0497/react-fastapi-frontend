import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import { setOrders, updateSingleOrder } from './orderSlice';
import { Order } from '../../../libs/types/Order.ts';
import { wsUrl } from '../../../libs/config.ts';


interface WebSocketMessage {
    type?: string;
    data: Order | Order[];
}

interface WebSocketState {
    connected: boolean;
}

const initialState: WebSocketState = {
    connected: false,
};

const websocketSlice = createSlice({
    name: 'websocket',
    initialState,
    reducers: {
        setConnected: (state, action) => {
            state.connected = action.payload;
        },
    },
});

export const { setConnected } = websocketSlice.actions;

export const initializeWebSocket = () => (dispatch: AppDispatch) => {
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
        dispatch(setConnected(true));
        console.log("Connected to WebSocket");
    };

    ws.onmessage = (event) => {
        try {
            const message: WebSocketMessage = JSON.parse(event.data);
            console.log("Received WebSocket message:", message);

            if (message.type === "initial_orders" && Array.isArray(message.data)) {
                dispatch(setOrders(message.data));
            } else if (!Array.isArray(message.data)) {
                dispatch(updateSingleOrder(message.data));
            }
        } catch (error) {
            console.error("Error processing WebSocket message:", error);
        }
    };

    ws.onclose = () => {
        dispatch(setConnected(false));
        console.log("WebSocket disconnected. Attempting to reconnect...");
        setTimeout(() => dispatch(initializeWebSocket()), 3000);
    };

    ws.onerror = (error) => {
        console.error("WebSocket error:", error);
    };

    return ws;
};

export default websocketSlice.reducer;