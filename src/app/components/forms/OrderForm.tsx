import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setStatus } from "../../store/slices/orderSlice";
import type { AppDispatch, RootState } from "../../store/store";
import OrderService from "../../../services/Order.service";
import { useTranslation } from "react-i18next";

export const OrderForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, status } = useSelector((state: RootState) => state.orders);
  const { t } = useTranslation();
  const [order, setOrder] = useState({ foodName: "", quantity: 1 });
  const orderService = new OrderService();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const response = await orderService.createOrder(order);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      dispatch(
        setStatus({
          success: true,
          error: false,
          message: t("orderForm.successMessage"),
        })
      );
      setOrder({ foodName: "", quantity: 1 });
    } catch (error) {
      dispatch(
        setStatus({
          success: false,
          error: true,
          message: t("orderForm.errorMessage"),
        })
      );
    } finally {
      dispatch(setLoading(false));
      setTimeout(() => {
        dispatch(
          setStatus({
            success: false,
            error: false,
            message: "",
          })
        );
      }, 1000);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white shadow-xl rounded-lg p-8">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        {t("orderForm.placeYourOrder")}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            placeholder={t("orderForm.foodNamePlaceholder")}
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
          {loading ? t("orderForm.placingOrder") : t("orderForm.submitOrder")}
        </button>
      </form>

      {status.success && (
        <div className="mt-4 p-4 bg-green-100 border border-green-300 text-green-700 rounded-md">
          <p className="font-semibold">{t("orderForm.successTitle")}</p>
          <p>{status.message}</p>
        </div>
      )}

      {status.error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-300 text-red-700 rounded-md">
          <p className="font-semibold">{t("orderForm.errorTitle")}</p>
          <p>{status.message}</p>
        </div>
      )}
    </div>
  );
};
