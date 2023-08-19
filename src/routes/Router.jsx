// import React, { lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "../views/Dashboard";
import Timesheet from "../views/Timesheet";
import Attendance from "../views/Attendance";
import FullLayout from "../layouts/FullLayout";
import Login from "../views/Login";

/***** Pages ****/
// const Dashboard = lazy(() => import("../views/Dashboard"));
// const Timesheet = lazy(() => import("../views/Timesheet"));
// const Attendance = lazy(() => import("../views/Attendance"));
// const Login = lazy(() => import("../views/Login"));

const ThemeRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path='/sc' element={<FullLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='timesheet' element={<Timesheet />} />
          <Route path='attendance' element={<Attendance />} />
        </Route>
          <Route path='login' element={<Login />} />
      </Routes>
    </Router>
  );
};

export default ThemeRoutes;
