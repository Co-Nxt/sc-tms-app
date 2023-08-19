import { useScheduleData, useUserInfo } from "../../ThemeContext";
const TableHeaderDetails = () => {
  const userSchedule = useScheduleData();
  const userInfo = useUserInfo();
  return (
    <>
      <tr>
        <td> ID</td>
        <td>{userInfo.username}</td>
      </tr>
      <tr>
        <td> Working Schedule</td>
        <td>{userSchedule.workingSchedule}</td>
      </tr>
      <tr>
        <td>Company</td>
        <td>{userSchedule.department}</td>
      </tr>
    </>
  );
};

export default TableHeaderDetails;
