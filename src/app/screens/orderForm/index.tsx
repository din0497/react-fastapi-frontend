import React from "react";
import { OrderForm } from "../../components/forms/OrderForm.tsx";


 const OrderFormScreen: React.FC = () => {
  return (
    <div className="container mx-auto p-8 pt-32">
      <OrderForm />
    </div>
  );
};

export default OrderFormScreen