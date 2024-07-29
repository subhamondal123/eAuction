import { PropTypes } from 'prop-types';
import { StyleSheet, Text, View } from 'react-native'
import React, { Component, useEffect, useMemo, useState } from 'react';
// import styles from './style';

function Timer({
    startTime,
    endTime,
    isHidden,
    additionalTimerTextStyle,
    additionalHrsTextStyle,
    onTimeOut
}) {
    // if (isHidden) return null;
    const [hoursLeft, setHoursLeft] = useState("0");
    const [minutesLeft, setMinutesLeft] = useState("0");
    const [secondsLeft, setSecondsLeft] = useState("0");

    useEffect(() => {
        const interval = setInterval(function () {
            // Get today's date and time
            let isTimeOver = false;
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = endTime - now;

            if (distance < 0) {
                // console.log('timeOut called')
                isTimeOver = true;
                clearInterval(interval);
                onTimeOut()
            }

            if (isTimeOver == false) {
                // Time calculations for days, hours, minutes and seconds
                // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                // var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

                //time calculation for hours ,minutes and seconds
                var hours = Math.floor(distance / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                setHoursLeft(hours.toString());
                setMinutesLeft(minutes.toString());
                setSecondsLeft(seconds.toString());
                // console.log("time left ", ("D" + hours + "H" + minutes + "M" + seconds + "S"))
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Text style={[{
            color: '#7E47F3',
            fontSize: 12,
            fontFamily: 'Poppins-Medium'
        }, additionalTimerTextStyle]}>{hoursLeft.length > 1 ? hoursLeft : ("0" + hoursLeft)}:{minutesLeft.length > 1 ? minutesLeft : ("0" + minutesLeft)}:{secondsLeft.length > 1 ? secondsLeft : ("0" + secondsLeft)} <Text style={[{
            color: "#afb2b1",
            fontSize: 12,
            fontFamily: 'Poppins-Regular'
        }, additionalHrsTextStyle]}>Hrs.</Text></Text>
    )
}

Timer.defaultProps = {
    startTime: (new Date()).getTime(),
    endTime: (new Date()).getTime(),
    isHidden: false,
    additionalTimerTextStyle: {},
    additionalHrsTextStyle: {},
    onTimeOut: () => { }
};

Timer.propTypes = {
    startTime: PropTypes.number,
    endTime: PropTypes.number,
    isHidden: PropTypes.bool,
    additionalTimerTextStyle: PropTypes.object,
    additionalHrsTextStyle: PropTypes.object,
    onTimeOut: PropTypes.func
};


export default Timer;