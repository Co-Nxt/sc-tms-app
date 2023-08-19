import React from "react";

const ThemeContextUserInfo = React.createContext();
const ThemeContextUserInfoUpdate = React.createContext();
const ThemeContextTokenInfo = React.createContext();
const ThemeContextTokenUpdate = React.createContext();
const ThemeContextFilterDate = React.createContext();
const ThemeContextUpdateFilterDate = React.createContext();
const ThemeContextScheduleData = React.createContext();
const ThemeContextUpdateScheduleData = React.createContext();

export const useUserInfo = () => React.useContext(ThemeContextUserInfo);
export const useUserInfoUpdate = () =>
  React.useContext(ThemeContextUserInfoUpdate);
export const useTokenInfo = () => React.useContext(ThemeContextTokenInfo);
export const useTokenUpdate = () => React.useContext(ThemeContextTokenUpdate);
export const useFilterDate = () => React.useContext(ThemeContextFilterDate);
export const useUpdateFilterDate = () =>
  React.useContext(ThemeContextUpdateFilterDate);
export const useScheduleData = () => React.useContext(ThemeContextScheduleData);
export const useScheduleDataUpdate = () =>
  React.useContext(ThemeContextUpdateScheduleData);

export const ThemeProvider = ({ children }) => {
  const [getInfo, setInfo] = React.useState([]);
  const [getToken, setToken] = React.useState([]);
  const [getDateFilter, setDateFilter] = React.useState(new Date());
  const [getSchedule, setSchedule] = React.useState([]);

  const handleUserUpdate = (data) => {
    setInfo(data);
  };
  const handleTokenUpdate = (data) => {
    setToken(data);
  };
  const handleDateFilterUpdate = (data) => {
    setDateFilter(data);
  };
  const handleScheduleUpdate = (data) => {
    setSchedule(data);
  };
  return (
    <ThemeContextScheduleData.Provider value={getSchedule}>
      <ThemeContextUpdateScheduleData.Provider value={handleScheduleUpdate}>
        <ThemeContextFilterDate.Provider value={getDateFilter}>
          <ThemeContextUpdateFilterDate.Provider value={handleDateFilterUpdate}>
            <ThemeContextTokenInfo.Provider value={getToken}>
              <ThemeContextTokenUpdate.Provider value={handleTokenUpdate}>
                <ThemeContextUserInfo.Provider value={getInfo}>
                  <ThemeContextUserInfoUpdate.Provider value={handleUserUpdate}>
                    {children}
                  </ThemeContextUserInfoUpdate.Provider>
                </ThemeContextUserInfo.Provider>
              </ThemeContextTokenUpdate.Provider>
            </ThemeContextTokenInfo.Provider>
          </ThemeContextUpdateFilterDate.Provider>
        </ThemeContextFilterDate.Provider>
      </ThemeContextUpdateScheduleData.Provider>
    </ThemeContextScheduleData.Provider>
  );
};

export default ThemeProvider;
