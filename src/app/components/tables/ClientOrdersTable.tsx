import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { Order } from "../../../libs/types/Order.ts";
import { getStatusColor } from "../../../libs/config.ts";


export const ClientOrdersTable: React.FC = () => {
  const orders = useSelector((state: RootState) => state.orders.orders);

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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
