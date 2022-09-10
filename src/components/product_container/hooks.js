import { useEffect, useState } from "react";

export let timeSince = function (date, date_from=null) {
    if (typeof date !== 'object') {
        date = new Date(date);
    }

    const ddt = date_from ? date_from : new Date()
    let seconds = Math.abs(Math.floor((ddt - date) / 1000));
    let intervalType;

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
        intervalType = 'year';
    } else {
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
            intervalType = 'month';
        } else {
            interval = Math.floor(seconds / 86400);
            if (interval >= 1) {
                intervalType = 'day';
            } else {
                interval = Math.floor(seconds / 3600);
                if (interval >= 1) {
                    intervalType = "hour";
                } else {
                    interval = Math.floor(seconds / 60);
                    if (interval >= 1) {
                        intervalType = "minute";
                    } else {
                        interval = seconds;
                        intervalType = "second";
                    }
                }
            }
        }
    }

    if (interval > 1 || interval === 0) {
        intervalType += 's';
    }

    return interval + ' ' + intervalType;
};


export function useTimeSince(datetime) {
    const [dts, setDts] = useState('')
    const dt = Date.parse(datetime)

    useEffect(() => {
        setDts(timeSince(dt))
        const intv = setInterval(() => {
            setDts(timeSince(dt))
        }, 1000);
        return () => clearInterval(intv)
    }, [dt])
    return dts
}


export function useIsLatest(datetime) {
    // return true if date posted is lesser than 7days else false
    const [isLatest, setIsLatest] = useState(false)
    const dt = Date.parse(datetime)
    useEffect(() => {
        const intv = setInterval(() => {
            let seconds = Math.floor((new Date() - dt) / 1000);
            const aDay = 86400
            setIsLatest(seconds < aDay*7)
        }, 1000);
        return () => clearInterval(intv)
    }, [dt])
    return isLatest
}