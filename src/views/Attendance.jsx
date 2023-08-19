import ContentMain from "../layouts/ContentMain";
import cnxtApi from "../cn.dev/cnxt.api";
import React from "react";
import Swal from "sweetalert2";
import { useUserInfo,useScheduleData } from "../ThemeContext";
import { useNavigate } from "react-router-dom";

const Attendance = () => {
  const navigate = useNavigate();
  const userInfo = useUserInfo()
  const scheduleData = useScheduleData()

  const [show, isShow] = React.useState(false);
 

 React.useEffect(() => {
  //check if token is expired if so refresh
  const isValid = async()=>{
    const accessToken = localStorage.getItem("accessToken")
    const isTokenValid = await cnxtApi.validateToken(accessToken)
   
    !isTokenValid || !accessToken
      ? navigate("/login")
      : console.log("isTokenValid", isTokenValid);
  }
  isValid()

 }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await cnxtApi.checkedIn(userInfo,scheduleData);
    console.log("res", res);
    console.log("res", res.isSuccess);

    isShow(res.isSuccess);
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
          <p className='card-text text-center fs-3'>Click to check in</p>
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
