export interface Order {
    id: string;
    foodName: string;
    quantity: number;
    status: OrderStatus;
    timestamp: string;
}

export type OrderStatus = "received" | "preparing" | "completed";





export interface OrderState {
    orders: Order[];
    loading: boolean;
    error: string | null;
    status: {
        success: boolean;
        error: boolean;
        message: string;
    };
}

export const initialState: OrderState = {
    orders: [],
    loading: false,
    error: null,
    status: {
        success: false,
        error: false,
        message: '',
    },
};