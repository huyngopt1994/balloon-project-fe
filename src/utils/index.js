import moment from 'moment'

export function convertUtcTimeToLocalTime(time_string) {
    if (time_string === '') {
        return time_string
    }

    let gmtDateTime = moment.utc(time_string, "YYYY-MM-DDTHH:mm:ss.SSSZ")
    let local = gmtDateTime.local().format('YYYY-MMM-DD h:mm A');
    return local
}

export function getDateTime(time_string) {
    if (time_string === '') {
        return time_string
    }

    let gmtDateTime = moment.utc(time_string, "YYYY-MM-DDTHH:mm:ss.SSSZ")


    return gmtDateTime.local().toDate();

}
