import React from "react";
import cnxt from "../../cn.dev/cnxt.api";
import { useQuery } from "react-query";
import { useUserInfoUpdate } from "../../ThemeContext";

const TableReportTimesheet = () => {
  const userInfoUpdate = useUserInfoUpdate();
  const data = [];

  // const { data, isLoading, isError, error } = useQuery(
  //   "attendances",
  //   cnxt.fetchAttendances
  // );

  // React.useEffect(() => {
  //   if (data) {
  //     userInfoUpdate(data);
  //   }
  // }, [data]);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  // if (isError) {
  //   return (
  //     <>
  //       <div>Error: {isError.message}</div>
  //       <p>{error.toString()}</p>
  //     </>
  //   );
  // }
  // if (!data) {
  //   return <div>No timesheet data available.</div>;
  // }

  return (
    <>
      <table className='table table-bordered'>
        <tbody>
          <tr>
            <th>DATE</th>
            <th colSpan='2'>DUTY HOURS</th>
            <th>SCHED HOURS</th>
            <th colSpan='3'>WORKED HOURS</th>
            <th>ACTUAL OT</th>
            <th>ACTUAL WH</th>
            <th>REMARKS</th>
          </tr>
          <tr>
            <th></th>
            <th>From</th>
            <th>To</th>
            <th></th>
            <th>From</th>
            <th>To</th>
            <th>Hours</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>

          {/* {data.map((report) => {
            return report.timesheetReport
              .filter((f) => f.period === showMonth)
              .map((f) =>
                f.timesheet.map((t, index) => (
                  <tr key={index}>
                    <td>{t.date}</td>
                    <td>{t.dutyHours.from}</td>
                    <td>{t.dutyHours.to}</td>
                    <td>{t.schedHours}</td>
                    <td>{t.workHours.from}</td>
                    <td>{t.workHours.to}</td>
                    <td>{t.workHours.hours}</td>
                    <td>{t.actualOverTime}</td>
                    <td>{t.actualWorkHours}</td>
                    <td>{t.remarks}</td>
                  </tr>
                ))
              );
          })} */}

          <tr>
            <th>Total: </th>
            <th></th>
            <th></th>
            <th>104.0</th>
            <th></th>
            <th> </th>
            <th>127.52 </th>
            <th>11.5 </th>
            <th>88.0</th>
            <th></th>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default TableReportTimesheet;
