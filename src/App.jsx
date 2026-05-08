import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/Main";

import Home from "./pages/Home";

import Explore from "./pages/Explore";
import Slots from "./pages/Slots";
import Profile from "./pages/ProfileP";

// OPTIONAL
// import MyBooking from "./pages/MyBooking";

import PrivateRoute from "./utils/PrivateRoute";

function App() {

  return (

    <Router>

      <Routes>

        {/* ================================= */}
        {/* PUBLIC ROUTES */}
        {/* ================================= */}

        <Route
          path="/"
          element={
            <Navigate to="/main" />
          }
        />

        <Route
          path="/main"
          element={<Main />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ================================= */}
        {/* PROTECTED DASHBOARD */}
        {/* ================================= */}

        <Route
          path="/home"
          element={
            <PrivateRoute>

              {/* MAIN LAYOUT */}
              <Home />

            </PrivateRoute>
          }
        >

          {/* DEFAULT */}

          <Route
            index
            element={
              <Navigate
                to="explore"
              />
            }
          />

          {/* ================================= */}
          {/* EXPLORE */}
          {/* ================================= */}

          <Route
            path="explore"
            element={<Explore />}
          />

          {/* ================================= */}
          {/* SLOTS */}
          {/* ================================= */}

          {/* SEARCH PAGE */}
          {/* NO STATIC TENANT */}

          <Route
            path="slots"
            element={<Slots />}
          />

          {/* ================================= */}
          {/* PROFILE */}
          {/* ================================= */}

          <Route
            path="profile"
            element={<Profile />}
          />

          {/* ================================= */}
          {/* MY BOOKINGS */}
          {/* ================================= */}

          <Route
            path="mybooking"
            element={
              <div>

                My Booking

              </div>
            }
          />

        </Route>

        {/* ================================= */}
        {/* 404 */}
        {/* ================================= */}

        <Route
          path="*"
          element={
            <Navigate to="/main" />
          }
        />

      </Routes>

    </Router>

  );

}

export default App;