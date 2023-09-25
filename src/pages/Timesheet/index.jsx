import "../../assets/styles/main__timesheet.css";
import React from "react";
import DateTimePicker from "../../components/DateTimePicker";
import ExportToPDF from "../../components/ExportToPDF";
import {
  TableHeader,
  TableHeaderDetails,
  TableReportTimesheet,
} from "../../views/ui";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import cnxtApi from "../../cn.dev/cnxt.api";

const Timesheet = () => {
  const navigate = useNavigate();
  const { control } = useForm();
  const userInfo = JSON.parse(sessionStorage.getItem("sc_user_info"));
  const scheduleInfo = JSON.parse(sessionStorage.getItem("sc_user_schedule"));

  const [timesheet, setTimesheet] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [countTMS, setCountTMS] = React.useState(0);
  const [isvalidToken, setIsValidToken] = React.useState(false);
  const accessToken = sessionStorage.getItem("x-access-token");

  React.useEffect(() => {
    const isValid = async () => {
      console.log("test");
      const isTokenValid = await cnxtApi.validateToken(accessToken);
      !isTokenValid || !accessToken
        ? (setIsValidToken(false), navigate("/login"))
        : (console.log("Valid token", isTokenValid), setIsValidToken(true));
    };
    isValid();
  }, []);
  // if (!accessToken) {
  //   navigate("/login");
  // }
  const handleGenerate = async () => {
    const period = sessionStorage.getItem("sc_tms_period");
    console.log("period", period);
    console.log("userInfo", userInfo._id);
    console.log("scheduleInfo", scheduleInfo.workingSchedule);

    try {
      setIsLoading(true);
      const genTMS = await cnxtApi.generateTimesheet({
        id: userInfo._id,
        period,
      });
      console.log("genTMS", genTMS);
      setTimesheet(genTMS);
      sessionStorage.setItem("sc_timesheet", JSON.stringify(genTMS));
      setCountTMS(genTMS.count);
    } catch (err) {
      console.error("Error Msg: ", err);
      setIsError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className='breadcrumbs__timesheet'>
        <button className='btn btn-primary' onClick={handleGenerate}>
          Generate
        </button>
        <button className='btn btn-info'>
          <ExportToPDF />
        </button>
        {/* <ExportToPDF tableRef={tableRef} /> */}
      </section>

      <div className='main__timesheet'>
        <TableHeader data={{ name: userInfo.name, count: countTMS }} />
        <section className='details__timesheet'>
          <table className='table table-borderless'>
            <tbody>
              <tr>
                <td> Timesheet Month Period</td>
                <td>
                  <DateTimePicker control={control} name='periodTimesheet' />
                </td>
              </tr>
              <TableHeaderDetails />
            </tbody>
          </table>
        </section>
        <section className='report__timesheet'>
          <TableReportTimesheet
            timesheet={timesheet}
            isLoading={isLoading}
            isError={isError}
          />
        </section>
      </div>
    </>
  );
};

export default Timesheet;
