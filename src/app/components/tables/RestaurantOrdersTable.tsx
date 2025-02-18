import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateOrderStatus } from "../../store/slices/orderSlice";
import type { RootState } from "../../store/store";
import OrderService from "../../../services/Order.service";
import { Order, OrderStatus } from "../../../libs/types/Order";
import { getStatusColor } from "../../../libs/config";
import { useTranslation } from "react-i18next";

export const RestaurantOrdersTable: React.FC = () => {
  const { t } = useTranslation();
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
              {t("restaurantOrdersTable.orderId")}
            </th>
            <th className="p-4 text-left font-medium text-gray-700">
              {t("restaurantOrdersTable.food")}
            </th>
            <th className="p-4 text-left font-medium text-gray-700">
              {t("restaurantOrdersTable.quantity")}
            </th>
            <th className="p-4 text-left font-medium text-gray-700">
              {t("restaurantOrdersTable.status")}
            </th>
            <th className="p-4 text-left font-medium text-gray-700">
              {t("restaurantOrdersTable.time")}
            </th>
            <th className="p-4 text-left font-medium text-gray-700">
              {t("restaurantOrdersTable.actions")}
            </th>
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
                  {t(
                    `restaurantOrdersTable.statusOptions.${order.status}`,
                    order.status
                  )}
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
                  <option value="pending">
                    {t("restaurantOrdersTable.statusOptions.pending")}
                  </option>
                  <option value="received">
                    {t("restaurantOrdersTable.statusOptions.received")}
                  </option>
                  <option value="preparing">
                    {t("restaurantOrdersTable.statusOptions.preparing")}
                  </option>
                  <option value="completed">
                    {t("restaurantOrdersTable.statusOptions.completed")}
                  </option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
