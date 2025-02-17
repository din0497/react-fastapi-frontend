import { apiUrl } from "../libs/config.ts";
import { Order, OrderStatus } from "../libs/types/Order.ts";


class OrederService {
    private readonly path: string;

    constructor() {
        this.path = apiUrl;
    }

    public async createOrder(order: any) : Promise<any>{
        const url = this.path + "/order"

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(order),
            });

            return response
        } catch (err) {
            console.log("Error, login:", err);
            throw err;
        }
    }
    public async updateOrder(orderId: string, newStatus: OrderStatus) : Promise<any>{
        const url = `${this.path}/order/${orderId}/status`

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus }),
            });

            return response
        } catch (err) {
            console.log("Error, login:", err);
            throw err;
        }
    }
}

export default OrederService