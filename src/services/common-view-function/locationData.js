import { PermissionsAndroid } from "react-native";
import Geolocation from 'react-native-geolocation-service';

export function fetchCurrentLocation() {
    return new Promise(async function (resolved, reject) {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission Required',
                    message:
                        'Application needs access to your Location',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                Geolocation.getCurrentPosition(
                    (position) => {
                        // console.log(position);
                        let currentLocation = position.coords;
                        resolved(currentLocation)
                    },
                    (error) => {
                        // See error code charts below.
                        console.log(error.code, error.message);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );
            }
        } catch (err) {
            // resolved(err)
            console.log(err)
        }
    });
}