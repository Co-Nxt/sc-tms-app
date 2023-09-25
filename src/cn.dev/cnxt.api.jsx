import axios from "axios";
import api from '../utils/axiosWithInterceptors'
import utils from "../utils/helpers.js";

const fetchAttendances = async () => {
  try {
    const response = await api.post(
      "http://localhost:50002/api/attendances/getAll",
      {
        collection: "timesheet-data",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data. Please try again later.");
  }
};



const getSchedule = async (data) => {
  console.log("getSched data", data);
  try {
    const response = await api.post(
      "http://localhost:50002/api/attendances/getSchedule",
      {
        _id: data._id,
        collection: "schedule-data",
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data. Please try again later.");
  }
};
// auth api

const login = async (data) => {
  try {
    const response = await axios.post("http://localhost:50002/api/auth/login", {
      username: data.username,
      password: data.password,
    });
    console.log("login", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data. Please try again later.");
  }
};
const logout = async () => {
  sessionStorage.removeItem("sc_user_info");
  sessionStorage.removeItem("sc_user_schedule");
  sessionStorage.removeItem("x-access-token");
  localStorage.removeItem("sc_username");
  localStorage.removeItem("refresh_token");
};

const getUser = async () => {
  try {
    const response = await api.get("http://localhost:50002/api/auth/getUser");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data. Please try again later.");
  }
};

const validateToken = async (token) => {
  if (!token) return false;

  try {
    const response = await axios.post(
      "http://localhost:50002/api/auth/validate",
      {
        accessToken: token,
      }
    );
    if (response.data) return true;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data. Please try again later.");
  }
};

const getTimesheet = async (data) => {
  console.log("getTimesheet", data);
  try {
    const response = await api.post(
      "http://localhost:50002/api/attendances/getTimesheet",
      {
        id: data.id,
        dateFilter: data.dateFilter,
      }
    );
    console.log("res", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data. Please try again later.");
  }
};

const setUserInfo = (userInfo) => {
  sessionStorage.setItem("sc_user_info", JSON.stringify(userInfo));
};

const setSchedule = (userSchedule) => {
  sessionStorage.setItem("sc_user_schedule", JSON.stringify(userSchedule));
};

const checkedIn = async (data) => {
  //retrieve the lastest checkin today and check if is true
  try {
    const response = await api.post(
      "http://localhost:50002/api/attendances/checkedIn",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data. Please try again later.");
  }
};
const checkAttendance = async (data) => {
  try {
    const endpoint = "http://localhost:50002/api/attendances/checkAttandance";
    const res = await api.post(endpoint, {
      id: data.id,
      date: data.date,
    });
    return res.data;
  } catch (err) {
    console.error("msg", err);
    throw err;
  }
};

const generateTimesheet = async (data) => {
  console.log("generateTimesheet", data);
  try {
    const endpoint = "http://localhost:50002/api/timesheet/generate";
    const res = await api.post(endpoint, {
      id: data.id,
      period: data.period,
    });
    return res.data;
  } catch (err) {
    console.error("msg", err);
    throw err;
  }
};
export default {
  fetchAttendances,
  checkedIn,
  login,
  getUser,
  getSchedule,
  validateToken,
  getTimesheet,
  setUserInfo,
  setSchedule,
  checkAttendance,
  logout,
  generateTimesheet,
};
