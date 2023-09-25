// import "../../assets/styles/card__login.css";
import "../Login/index.css";
import ContentMain from "../../layouts/ContentMain";
import conxt from "../../cn.dev/cnxt.api";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading/index.jsx";

const Login = () => {
  const navigate = useNavigate();

  const [isLogin, setLogin] = useState(false);
  const [isShowPass, setShowPass] = useState("password");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds delay to simulate loading
  }, []);
  if (isLoading) return <Loading />;

  const onSubmit = async (data, e) => {
    console.log("login data", data);
    e.preventDefault();

    const isLoggedIn = await dologin(data);
    isLoggedIn ? setLogin(true) : setLogin(false);
  };

  const dologin = async (data) => {
    try {
      setIsLoadingLogin(true);
      const res = await conxt.login(data);
      if (res) {
        sessionStorage.setItem("x-access-token", res.accessToken);
        localStorage.setItem("refresh_token", res.refreshToken);

        const getUser = await conxt.getUser();
        const getSched = await conxt.getSchedule(getUser);
        conxt.setSchedule(getSched);
        conxt.setUserInfo(getUser);
        localStorage.setItem("sc_username", getUser.username);
        return true;
      } else {
        console.log("res", res);
        return false;
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setIsLoadingLogin(false);
    }
  };

  const handleShowPassword = () => {
    isShowPass == "password" ? setShowPass("text") : setShowPass("password");
  };

  isLogin
    ? (navigate("/sc/attendance"), console.log(" Login!!"))
    : console.log("Invalid Login");

  return (
    <ContentMain className={"main__login"}>
      {isLoadingLogin ? (
        <img
          src='/src/assets/images/loading_dualball.gif'
          alt='loading'
          className='logo'
        />
      ) : (
        <div className='card__login'>
          <div className='login__logo'>
            <img
              src='/src//assets/images/logo_time.png'
              alt='logo'
              className='logo'
            ></img>
            <p className='logo_title'>
              <span style={{ color: "#46a4e2" }}>TIMESHEET</span> INFORMATION
              MANAGEMENT AND EVALUATION SYSTEM
            </p>
          </div>
          <div className='login__card'>
            <div className='p-2'>
              <div className='login__body'>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className='d-flex flex-column'
                >
                  <div className='input-group mb-2'>
                    <input
                      {...register("username")}
                      type='text'
                      placeholder='Username'
                      className='form-control'
                    />
                    <div className='input-group-append'>
                      <div className='input-group-text'>
                        <span className='fas fa-user'></span>
                      </div>
                    </div>
                  </div>

                  <div className='input-group mb-4'>
                    <input
                      {...register("password")}
                      type={isShowPass}
                      placeholder='Password'
                      className='form-control'
                      autoComplete='on'
                    />
                    <div
                      className='input-group-append showpass'
                      onClick={handleShowPassword}
                    >
                      <div className='input-group-text'>
                        <span className='fas fa-eye'></span>
                      </div>
                    </div>
                  </div>
                  <button className='btn btn-primary rounded-5'>LOG IN</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className='login__footer'>
        This website is best viewed by Internet Explorer 11 or higher, Mozilla
        Firefox® 40.x or higher, Safari 7 or higher, Chrome 40 or higher; or
        equivalent browser software.
      </div>
    </ContentMain>
  );
};

export default Login;
