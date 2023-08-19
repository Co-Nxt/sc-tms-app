import moment from 'moment'

const getMonth = (date) => moment(date).format("MM/YYYY");


export default {
    getMonth
}