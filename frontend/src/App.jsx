import "./index.css";
import Login from "./components/Login";
import HomeScreen from "./components/Pages/HomeScreen";
import Register from "./components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HotelDetails from "./components/Pages/HotelDetailsScreen";
import UpdateRoom from "./components/Pages/Admin/UpdateRoom";
import Booking from "./components/Pages/Booking";
import Navbar from "./components/Pages/Navbar";
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
