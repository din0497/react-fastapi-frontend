import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateOrderStatus } from "../../store/slices/orderSlice";
import type { RootState } from "../../store/store";
import OrderService from "../../../services/Order.service.ts";
import { Order, OrderStatus } from "../../../libs/types/Order.ts";
import { getStatusColor } from "../../../libs/config.ts";


export const RestaurantOrdersTable: React.FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.orders.orders);
  const orderService = new OrderService();

  const handleStatusUpdate = async (
    orderId: string,
    newStatus: OrderStatus
  ) => {
    try {
      const response = await orderService.updateOrder(orderId, newStatus);
      if (!response.ok) throw new Error("Failed to update status");

      dispatch(updateOrderStatus({ id: orderId, status: newStatus }));
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto text-gray-800">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="p-4 text-left font-medium text-gray-700">
              Order ID
            </th>
            <th className="p-4 text-left font-medium text-gray-700">Food</th>
            <th className="p-4 text-left font-medium text-gray-700">
              Quantity
            </th>
            <th className="p-4 text-left font-medium text-gray-700">Status</th>
            <th className="p-4 text-left font-medium text-gray-700">Time</th>
            <th className="p-4 text-left font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: Order) => (
            <tr key={order.id} className="border-b hover:bg-gray-50 transition">
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
                    handleStatusUpdate(order.id, e.target.value as OrderStatus)
                  }
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  <option value="pending">Pending</option>
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
  );
};
