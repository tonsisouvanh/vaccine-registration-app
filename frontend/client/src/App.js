import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home/Home";
import VaccinesList from "./pages/VaccinesList/VaccinesList";
import VaccineDetail from "./pages/VaccineDetail/VaccineDetail";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Cart from "./pages/cart/Cart";
import VaccineRegistration from "./pages/VaccineRegistration/VaccineRegistration";
import Test from "./Test";
import VaccineHistory from "./pages/VaccineHistory/VaccineHistory";
import Checkout from "./pages/checkout/Checkout";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/vaccines-list" element={<VaccinesList />}></Route>
          <Route path="/vaccine-detail/:id" element={<VaccineDetail />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route
            path="/vaccine-registration"
            element={<VaccineRegistration />}
          ></Route>
          <Route path="/vaccine-history" element={<VaccineHistory />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/test" element={<Test />}></Route>
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
