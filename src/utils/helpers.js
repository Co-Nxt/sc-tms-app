import moment from "moment"
const dateNow = moment().format("YYYY-MM-DD HH:MM:SS");
const dateNowFormat1 = moment().format("MM/DD/YYYY");
const getMonth = (date) => moment(date).format("MM/YYYY");

export default { dateNow, dateNowFormat1, getMonth };