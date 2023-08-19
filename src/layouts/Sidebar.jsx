// import React from "react";
import { Link, NavLink } from "react-router-dom";
function Sidebar() {
  return (
    <nav>
      <nav className='mt-2'>
        <ul
          className='nav nav-pills nav-sidebar flex-column'
          data-widget='treeview'
          role='menu'
          data-accordion='false'
        >
          <li className='nav-item'>
            <Link to='/sc/dashboard' className='nav-link'>
              <i className='nav-icon fas fa-tachometer-alt'></i>
              <p>Dashboard</p>
            </Link>
          </li>
          <li className='nav-item'>
            <NavLink
              to='/sc/timesheet'
              className={({ isActive }) => {
                return isActive ? "nav-link active" : "nav-link";
              }}
            >
              <i className='nav-icon fas fa-th'></i>
              <p>Timesheet</p>
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink
              to='/sc/attendance'
              className={({ isActive }) => {
                return isActive ? "nav-link active" : "nav-link";
              }}
            >
              <i className='nav-icon fas fa-receipt'></i>
              <p>Attendance</p>
            </NavLink>
          </li>
        </ul>
      </nav>
    </nav>
  );
}

export default Sidebar;
