import React from "react";
import { ClientOrdersTable } from "../../components/tables/ClientOrdersTable";
import { useTranslation } from "react-i18next";

export const ClientDashboard: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto p-8 pt-32">
      <h1 className="text-3xl font-semibold text-center mb-6">
        {t("clientDashboard.orderDashboard")}
      </h1>
      <ClientOrdersTable />
    </div>
  );
};
