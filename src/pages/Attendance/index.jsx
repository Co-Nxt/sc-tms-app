import ContentMain from "../../layouts/ContentMain";
import cnxtApi from "../../cn.dev/cnxt.api";
import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import utils from "../../utils/helpers";

const Attendance = () => {
  const navigate = useNavigate();

  const userInfo = JSON.parse(sessionStorage.getItem("sc_user_info"));
  const scheduleData = JSON.parse(sessionStorage.getItem("sc_user_schedule"));
  const [show, isShow] = React.useState(false);
  const [isCheckIn, setIsCheckIn] = React.useState(false);
  const attendanceData = {
    id: scheduleData.employee_id,
    name: userInfo.name,
    phone: userInfo.phone,
    email: userInfo.email,
    date: utils.dateNowFormat1,
    period: utils.monthNow,
    dutyHours: scheduleData.dutyHours,
    actualWorkHours: scheduleData.actualWorkHours,
  };

  React.useEffect(() => {
    //check if token is expired if so refresh
    //checking if naka attendance na
    const isValid = async () => {
      const accessToken = sessionStorage.getItem("x-access-token");
      const isTokenValid = await cnxtApi.validateToken(accessToken);
      !isTokenValid || !accessToken
        ? navigate("/login")
        : console.log("Valid token", isTokenValid);
    };
    isValid();
    // checkIfWithAttendance();
  }, []);

  const checkIfWithAttendance = async () => {
    const res = await cnxtApi.checkAttendance(attendanceData);
    console.log("checkIfWithAttendance", res);
    return res.isSuccess && res.data.remarks === "CMPLT"
      ? setIsCheckIn(true)
      : setIsCheckIn(false);
    //if with attendance show checkout else checkin
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("attendanceData", attendanceData);

    const res = await cnxtApi.checkedIn(attendanceData);
    console.log("res", res);
    // console.log("res", res.isSuccess);
    if (res.isSuccess) {
      isShow(true);
    }
  };
  const handleAlert = () => {
    Swal.fire({
      postion: "top-end",
      title: "Sucessfully checked in",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  if (show) {
    handleAlert();
    checkIfWithAttendance();
    isShow(false);
  }
  return (
    <ContentMain className='border d-flex justify-content-center align-items-center'>
      <div
        className='card card-outline card-primary'
        style={{ padding: "5rem" }}
      >
        <div className='card-body'>
          <h5 className='card-title text-center fs-1'>{userInfo.name}</h5>
          {!isCheckIn ? (
            <p className='card-text text-center fs-3'>Click to check in</p>
          ) : (
            <p className='card-text text-center fs-3'>Click to check out</p>
          )}
          <form onSubmit={handleSubmit} className='text-center'>
            <button type='submit' className='btn btn-primary btn-lg'>
              <i
                className='fas fa-sign-out-alt'
                style={{ fontSize: "10rem" }}
              ></i>
            </button>
          </form>
        </div>
      </div>
    </ContentMain>
  );
};

export default Attendance;
