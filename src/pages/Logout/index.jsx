import { useNavigate } from "react-router-dom";
import cnxtApi from "../../cn.dev/cnxt.api";
import Swal from "sweetalert2";

const Logout = () => {
  const navigate = useNavigate();

  const handleAlert = () => {
    return Swal.fire({
      title: "Are you sure?",
      text: "You are about to logout from Timesheet Information Management and Evaluation System (TIME).",
      imageUrl: "/src/assets/images/logo_time.png",
      imageWidth: "auto",
      imageHeight: 50,
      imageAlt: "TIME Logo",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire("Deleted!", "Your file has been deleted.", "success");
        return true;
      } else {
        return false;
      }
    });
  };
  const handleLogout = async () => {
    const isConfirmed = await handleAlert();
    console.log("isConfirmed", isConfirmed);
    isConfirmed ? (cnxtApi.logout(), navigate("/login")) : "";
  };
  return (
    <div className='logout' onClick={handleLogout}>
      <i className='fas fa-sign-out-alt'></i>
    </div>
  );
};

export default Logout;
