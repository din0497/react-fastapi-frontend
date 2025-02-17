import React, { useState, useEffect, FormEvent } from "react";
import OrederService from "./services/Order.service.ts";
import { Order, OrderStatus } from "./libs/types/Order.ts";
import { getStatusColor } from "./libs/config.ts";



const orderService = new OrederService()

interface WebSocketMessage {
  type?: string;
  data: Order | Order[];
}

const RestaurantPage: React.FC = () => {
  const [order, setOrder] = useState<{ foodName: string; quantity: number }>({
    foodName: "",
    quantity: 1,
  });
  const [orders, setOrders] = useState<Order[]>([]);

  const [status, setStatus] = useState<{
    success: boolean;
    error: boolean;
    message: string;
  }>({ success: false, error: false, message: "" });

  const [socket, setSocket] = useState<WebSocket | null>(null);
  
  const [loading, setLoading] = useState(false);

  const createWebSocket = () => {
    const ws = new WebSocket("ws://localhost:8000/ws");

    ws.onopen = () => {
      console.log("Connected to WebSocket");
    };

    ws.onmessage = (event) => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data);
        console.log("Received WebSocket message:", message);

        if (message.type === "initial_orders" && Array.isArray(message.data)) {
          setOrders(message.data as Order[]);
        } else {
          const orderData = message.data as Order;
          setOrders((prevOrders) => {
            const orderIndex = prevOrders.findIndex(
              (order) => order.id === orderData.id
            );
            if (orderIndex !== -1) {
              const newOrders = [...prevOrders];
              newOrders[orderIndex] = orderData;
              return newOrders;
            }
            return [...prevOrders, orderData];
          });
        }
      } catch (error) {
        console.error("Error processing WebSocket message:", error);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected. Attempting to reconnect...");
      setTimeout(() => {
        setSocket(createWebSocket());
      }, 3000);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return ws;
  };

  useEffect(() => {
    const ws = createWebSocket();
    setSocket(ws);

    return () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await orderService.createOrder(order)

      if (!response?.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newOrder = await response.json();
      console.log("Order created successfully:", response);

      setStatus({
        success: true,
        error: false,
        message: "Order placed successfully!",
      });
      setOrder({ foodName: "", quantity: 1 });

      setTimeout(() => {
        setStatus({ success: false, error: false, message: "" });
      }, 3000);
    } catch (error) {
      console.error("Error creating order:", error);
      setStatus({
        success: false,
        error: true,
        message: "Failed to place order. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const response = await orderService.updateOrder(orderId, newStatus)

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.detail || `Status update failed: ${response.status}`
        );
      }

      const updatedOrder = await response.json();
      console.log(
        `Status updated for order ${orderId} to ${newStatus}:`,
        updatedOrder
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Failed to update order status:", error);
      alert(`Failed to update order status: ${error}`);
    }
  };



  return (
    <div className="container mx-auto p-8 space-y-12">
      <div className="w-full max-w-lg mx-auto bg-white shadow-xl rounded-lg p-8">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Place Your Order
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Food Name"
              value={order.foodName}
              onChange={(e) => setOrder({ ...order, foodName: e.target.value })}
              required
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div>
            <input
              type="number"
              min="1"
              value={order.quantity}
              onChange={(e) =>
                setOrder({ ...order, quantity: parseInt(e.target.value) })
              }
              required
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <button
            type="submit"
            className="w-full p-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none transition"
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Submit Order"}
          </button>
        </form>

        {status.success && (
          <div className="mt-4 p-4 bg-green-100 border border-green-300 text-green-700 rounded-md">
            <p className="font-semibold">Success</p>
            <p>{status.message}</p>
          </div>
        )}

        {status.error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-300 text-red-700 rounded-md">
            <p className="font-semibold">Error</p>
            <p>{status.message}</p>
          </div>
        )}
      </div>

      <div className="w-full max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-8">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Order Dashboard
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-gray-800">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="p-4 text-left font-medium text-gray-700">
                  Order ID
                </th>
                <th className="p-4 text-left font-medium text-gray-700">
                  Food
                </th>
                <th className="p-4 text-left font-medium text-gray-700">
                  Quantity
                </th>
                <th className="p-4 text-left font-medium text-gray-700">
                  Status
                </th>
                <th className="p-4 text-left font-medium text-gray-700">
                  Time
                </th>
                <th className="p-4 text-left font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4">{order.id}</td>
                  <td className="p-4">{order.foodName}</td>
                  <td className="p-4">{order.quantity}</td>
                  <td className="p-4">
                    <span
                      className={`p-2 text-white rounded-md ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {new Date(order.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(
                          order.id,
                          e.target.value as OrderStatus
                        )
                      }
                      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                      <option value="received">Received</option>
                      <option value="preparing">Preparing</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;
