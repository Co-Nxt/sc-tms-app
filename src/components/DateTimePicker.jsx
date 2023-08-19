import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUpdateFilterDate } from "../ThemeContext";
const DateTimePicker = ({ control, name }) => {
  const updateDateFilter = useUpdateFilterDate();
  
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <DatePicker
          selected={field.value || new Date()}
          onChange={(date) => {
            field.onChange(date);
            updateDateFilter(date);
          }}
          className='form-control'
          dateFormat='MM/yyyy'
        />
      )}
    />
  );
};

export default DateTimePicker;
