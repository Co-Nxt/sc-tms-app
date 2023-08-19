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

const checkedIn = async (data, schedule) => {
  //retrieve the lastest checkin today and check if is true

  console.log("userInfo", data);
  console.log("scheduleInfo", schedule);

  const timesheet = {
    _id: data._id,
    date: utils.dateNowFormat1,
    dutyHours: schedule.dutyHours,
    scheduleHours: schedule.scheduleHours,
    department:schedule.department,
    workingSchedule:schedule.workingSchedule,
    workHours: {
      from: utils.dateNow,
      to: utils.dateNow,
    },
    isCheckIn: true,
  };
  console.log("timesheet", timesheet);
  try {
    const response = await api.post(
      "http://localhost:50002/api/attendances/checkedIn",
      timesheet
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data. Please try again later.");
  }
};
const getCheckInDate = async() => {}

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
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data. Please try again later.");
  }
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

const validateToken = async(token) => {  
  if(!token) return false;

  try{
     const response = await axios.post("http://localhost:50002/api/auth/validate",{
      accessToken:token
     });
     if(response.data) return true
  }catch(error){
     console.error("Error fetching data:", error);
     throw new Error("Failed to fetch data. Please try again later.");
  }
}

const getTimesheet = async(data)=>{
  console.log("getTimesheet", data);
   try {
     const response = await api.post(
       "http://localhost:50002/api/attendances/getTimesheet",
       {
         id: data.id,
         dateFilter: data.dateFilter,
       }
     );
     console.log('res',response.data)
     return response.data;
   } catch (error) {
     console.error("Error fetching data:", error);
     throw new Error("Failed to fetch data. Please try again later.");
   }
}
export default {
  fetchAttendances,
  checkedIn,
  login,
  getUser,
  getSchedule,
  getCheckInDate,
  validateToken,
  getTimesheet,
};
