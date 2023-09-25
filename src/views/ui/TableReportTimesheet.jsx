import React from "react";

const TableReportTimesheet = ({ timesheet, isLoading, isError }) => {
  // console.log("timesheet", timesheet.timesheetReport);
  const [totalWorkHours, setTotalWorkHours] = React.useState(0);
  const tableRef = React.useRef(null);

  React.useEffect(() => {
    if (timesheet) {
      const totalHours = timesheet.timesheetReport.reduce(
        (a, t) => {
          // console.log("twh", t.workHours.hours);
          a.actualWorkHours += parseFloat(t.actualWorkHours);
          a.hours += parseFloat(t.workHours.hours);
          return a;
        },
        {
          actualWorkHours: 0,
          hours: 0,
        }
      );
      const roundedTotalHours = {
        actualWorkHours: totalHours.actualWorkHours.toFixed(1),
        hours: totalHours.hours.toFixed(2),
      };
      setTotalWorkHours(roundedTotalHours);
      console.log("totalWorkhours", roundedTotalHours);
    }
  }, [timesheet]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return (
      <>
        <div>Error: {isError.message}</div>
        <p>{isError.toString()}</p>
      </>
    );
  }
  if (!timesheet || !timesheet.timesheetReport) {
    return <div>No timesheet data available.</div>;
  }
  return (
    <>
      <table ref={tableRef} className='table table-bordered'>
        <tbody>
          <tr>
            <th>DATE</th>
            <th colSpan='2'>DUTY HOURS</th>
            <th>SCHED HOURS</th>
            <th colSpan='3'>WORKED HOURS</th>
            <th>ACTUAL OT</th>
            <th>ACTUAL WH</th>
            <th>Remarks</th>
          </tr>

          {timesheet.timesheetReport.map((t, index) => {
            return (
              <tr key={index}>
                <td>{t.date}</td>
                <td>{t.dutyHours.from}</td>
                <td>{t.dutyHours.to}</td>
                <td>{t.actualWorkHours}</td>
                <td>{t.workHours.from}</td>
                <td>{t.workHours.to}</td>
                <td>{t.workHours.hours}</td>
                <td>{t.actualOverTime}</td>
                <td>{t.actualWorkHours}</td>
                <td>{t.remarks}</td>
              </tr>
            );
          })}

          <tr>
            <th>Total: </th>
            <th></th>
            <th></th>
            <th>{totalWorkHours ? totalWorkHours.actualWorkHours : 0}</th>
            {/*scheduleHours*/}
            <th></th>
            <th> </th>
            <th>{totalWorkHours ? totalWorkHours.hours : 0}</th>{" "}
            {/* WORKED HOURS*/}
            <th>11.5 </th> {/* ACTUAL OT*/}
            <th>88.0</th> {/* ACTUAL WH*/}
            <th></th>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default TableReportTimesheet;
