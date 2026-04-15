import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Profile from "./pages/ProfileP"; // your home after login
import Register from "./pages/Register"; // optional, if you have a registration page
import Main from "./pages/Main";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>

        {/* DEFAULT → ALWAYS LOGIN */}
        <Route path="/" element={<Navigate to="/main" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={<Main />} />

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