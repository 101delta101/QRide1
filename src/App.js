import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
// import Qr from "./components/QR/Qr";
import Scan from "./components/Scannow/Scan";
import RequireAuth from "./components/RequireAuth";
import Missing from "./components/Missing";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import QRCodeScanner from "./components/QR/QRCodeScanner";
import Dashboard from "./components/Dashboard/dashboard";
import VerificationPage from "./components/Verify";
import ResetPwd from "./components/ResetPwd/ResetPwd";
import Table from "./components/Table/table";
import Booking from "./components/Booking/booking";
import Map from "./components/Map/Map";
import Favourites from "./components/Favourite/favourite";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Scan />} />
      <Route path="/activate/:uid/:token" element={<VerificationPage />} />
      <Route path="/table" element={<Table />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/map" element={<Map />} />
      <Route path="/fav" element={<Favourites />} />

      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="resetpassword" element={<ResetPwd />} />
      </Route>

      {/* we want to protect these routes */}
      <Route element={<RequireAuth />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/QR" element={<QRCodeScanner />} />

      </Route>

      {/* <Route path="/QR" element={<QRCodeScanner />} /> */}

      {/* catch all */}
      <Route path="*" element={<Missing />} />
    </Routes>
  );
}

export default App;
