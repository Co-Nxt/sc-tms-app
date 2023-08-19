import "../assets/styles/main__timesheet.css";
import React from "react";
import DateTimePicker from "../components/DateTimePicker";
import { TableHeader, TableHeaderDetails, TableReportTimesheet } from "./ui";
import { useUserInfo, useFilterDate } from "../ThemeContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import cnxtApi from "../cn.dev/cnxt.api";
import utils from "../utils/helpers.js";
import { useQuery, useMutation, useQueryClient } from "react-query";

const Timesheet = () => {
  const navigate = useNavigate();
  const userInfo = useUserInfo();
  const filterDate = useFilterDate();
  const dateFilter = utils.getMonth(filterDate);
  const _tsFilter = { id: userInfo._id, dateFilter };
  const { control } = useForm();
  const queryClient = useQueryClient();

  console.log("userInfo", userInfo);

  React.useEffect(() => {
    //check if token is expired if so refresh
    const isValid = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const isTokenValid = await cnxtApi.validateToken(accessToken);
      console.log("accessToken", isTokenValid);
      !isTokenValid || !accessToken
        ? navigate("/login")
        : console.log("Valid Token!");
    };
    isValid();
  }, []);

  // const { data, isLoading, isError, error, refetch } = useQuery(
  //   "attendances",
  //   cnxtApi.getTimesheet(_tsFilter),
  //   {
  //     refetchOnReconnect: false,
  //     refetchOnWindowFocus: false,
  //     enabled: false,
  //   }
  // );

  const handleGenerate = async() => {
    console.log('refetching..')
    // refetch()
    const res  = await cnxtApi.getTimesheet(_tsFilter);
    console.log('res btn',res)
    // queryClient.invalidateQueries("attendances");
    //will query to db
    //dito mangyayari ang process ng data
    // ipapass lang sya via context papunta sa report sheet
    // console.log("data", data);
  };

  return (
    <>
      {/* <section className='controlPanel__timesheet'>
        <button>Edit</button>
        <button>Create</button>
      </section> */}
      <section className='breadcrumbs__timesheet'>
        <button className='btn btn-primary' onClick={handleGenerate}>
          Generate
        </button>
        <button className='btn btn-info'>Export</button>
      </section>

      <div className='main__timesheet'>
        <TableHeader name={"Dev, Konics"} count={1} />
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
          />
        </section>
      </div>
    </>
  );
};

export default Timesheet;
