import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Profile from "./pages/ProfileP"; // your home after login
import Register from "./pages/Register"; // optional, if you have a registration page
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>

        {/* DEFAULT → ALWAYS LOGIN */}
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />

        {/* LOGIN PAGE */}
        <Route path="/login" element={<Login />} />

        {/* AFTER LOGIN (HOME / PROFILE) */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;