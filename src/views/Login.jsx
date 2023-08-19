import "../assets/styles/card__login.css";
import ContentMain from "../layouts/ContentMain";
import conxt from "../cn.dev/cnxt.api";
import { useForm } from "react-hook-form";
import {
  useTokenUpdate,
  useTokenInfo,
  useUserInfo,
  useUserInfoUpdate,
  useScheduleDataUpdate,
} from "../ThemeContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const tokenUpdate = useTokenUpdate();
  const tokenInfo = useTokenInfo();
  const userInfo = useUserInfo();
  const userInfoUpdate = useUserInfoUpdate();
  const updateSchedule = useScheduleDataUpdate();
  const [isLogin, setLogin] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, e) => {
    console.log("login data", data);
    e.preventDefault();
    const res = await conxt.login(data);
    localStorage.setItem("accessToken", res.accessToken);
    if (res) {
      const getUser = await conxt.getUser();
      const getSched = await conxt.getSchedule(getUser)
      console.log("getUser", getUser);
      console.log("getSched", getSched);
      userInfoUpdate(getUser); // update userInfo
      tokenUpdate(res); //update token
      updateSchedule(getSched);//update workSchedule
      setLogin(true)
    } else {
      console.log("res", res);
    }
  };

  isLogin ? ( navigate("/sc/attendance"),
    console.log(" Login!!")) :  console.log("Invalid Login");
   
  console.log("tokenInfo", tokenInfo);
  console.log("userInfo", userInfo);

  return (
    <ContentMain className={"main__login"}>
      <div className='card__login'>
        <div className='card p-2'>
          <div className='card-title text-center fs-2'>Login</div>
          <div className='card-body'>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='d-flex flex-column'
            >
              <input
                {...register("username")}
                type='text'
                placeholder='Username'
                className='form-control my-1'
              />
              <input
                {...register("password")}
                type='password'
                placeholder='Password'
                className='form-control my-1'
                autoComplete='on'
              />
              <button className='btn btn-primary'>Login</button>
            </form>
          </div>
        </div>
      </div>
    </ContentMain>
  );
};

export default Login;
