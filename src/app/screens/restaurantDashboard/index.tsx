import React from "react";
import { RestaurantOrdersTable } from "../../components/tables/RestaurantOrdersTable";
import { useTranslation } from "react-i18next";

export const RestaurantDashboard: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto p-8 pt-32">
      <h1 className="text-3xl font-semibold text-center mb-6">
        {t("restaurantDashboard.orderManagement")}
      </h1>
      <RestaurantOrdersTable />
    </div>
  );
};
