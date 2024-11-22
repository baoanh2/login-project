import "./index.css";
import Login from "./Pages/Login/Login";
import HomeScreen from "./Pages/Home/HomeScreen";
import Register from "./Pages/Register/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HotelDetails from "./Pages/User/HotelDetailsScreen";
import UpdateRoom from "./Pages/Admin/UpdateRoom";
import Booking from "./Pages/User/Booking";
import Navbar from "./Pages/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<HomeScreen />} />
            <Route path="/getdetail/:id" element={<HotelDetails />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/update-hotel/:id" element={<UpdateRoom />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
