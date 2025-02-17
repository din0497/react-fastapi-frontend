import React from "react";
import { RestaurantOrdersTable } from "../../components/tables/RestaurantOrdersTable.tsx";

export const RestaurantDashboard: React.FC = () => {
  return (
    <div className="container mx-auto p-8 pt-32">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Order Management
      </h1>
      <RestaurantOrdersTable />
    </div>
  );
};
