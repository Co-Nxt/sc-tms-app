// SweetAlert.js
import Swal from "sweetalert2";


const SweetAlert = ({
  title,
  text,
  icon,
}) => {
  Swal.fire({
    postion: "top-end",
    title,
    text,
    icon,
    showConfirmButton: false,
    timer: 1500,
    toast: true,
  });

  return null;
};

export default SweetAlert;
