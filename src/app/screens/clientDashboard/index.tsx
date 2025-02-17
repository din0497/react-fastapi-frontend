import React from "react";
import { ClientOrdersTable } from "../../components/tables/ClientOrdersTable.tsx";


export const ClientDashboard: React.FC = () => {
  return (
    <div className="container mx-auto p-8 pt-32">
      <h1 className="text-3xl font-semibold text-center mb-6">Order Dashboard</h1>
      <ClientOrdersTable/>
    </div>
  );
};
