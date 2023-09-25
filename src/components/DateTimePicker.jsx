import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import utils from "../utils/helpers.js";
const DateTimePicker = ({ control, name }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <DatePicker
          selected={field.value || new Date()}
          onChange={(date) => {
            field.onChange(date);
            sessionStorage.setItem("sc_tms_period", utils.getMonth(date));
          }}
          className='form-control'
          dateFormat='MM/yyyy'
        />
      )}
    />
  );
};

export default DateTimePicker;
