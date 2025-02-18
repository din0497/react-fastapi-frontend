import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../App.css";
import { ClientDashboard } from "./screens/clientDashboard/index.tsx";
import Navbar from "./components/Navbar.tsx";
import { RestaurantDashboard } from "./screens/restaurantDashboard/index.tsx";
import OrderFormScreen from "./screens/orderForm/index.tsx";


function App() {
  
  return (
    <Router>
    <Navbar/>
      <Routes>
        <Route path="/client" element={<ClientDashboard />} />
        <Route path="/order/create" element={<OrderFormScreen />} />
        <Route path="/restaurant/dashboard" element={<RestaurantDashboard />} />
  
      </Routes>
    </Router>
  );
}

export default App;
