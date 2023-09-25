import { useScheduleData, useUserInfo } from "../../ThemeContext";
const TableHeaderDetails = () => {
  const schedule = JSON.parse(sessionStorage.getItem("sc_user_schedule"));
  return (
    <>
      <tr>
        <td> ID</td>
        <td>{schedule.employee_id}</td>
      </tr>
      <tr>
        <td> Working Schedule</td>
        <td>{schedule.workingSchedule}</td>
      </tr>
      <tr>
        <td>Company</td>
        <td>{schedule.department}</td>
      </tr>
    </>
  );
};

export default TableHeaderDetails;
