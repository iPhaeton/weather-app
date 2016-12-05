import React from 'react';
import ReactDOM from 'react-dom';

import WeatherDashboard from './components/weather-info.component';
import Map from './components/map.component';
import Succession from "./libs/succession";
import {NoSupportError, ServerResponseError} from "./errors";

class App extends React.Component {
    constructor () {
        super();

        var succession = new Succession(
            [
                this.getPosition.bind(this),
                this.getGoogleMaps.bind(this)
            ], (err, results) => {
                if (err) console.log(err);
                else {
                    console.log(results);
                }
            }
        );
        succession.execute();
    };

    render() {
        return (
            <div>
                <WeatherDashboard/>
                <Map/>
            </div>
        );
    }

    getPosition (callback) {
        if (!navigator.geolocation) {
            return callback(new NoSupportError("Geolocation"));
        };

        navigator.geolocation.getCurrentPosition((position) => {
            callback(null, position);
        }, (err) => {
            callback(err);
        }, {
            timeout: 30000
        });
    }

    getGoogleMaps (callback, position) {
        var googleMapsApi = require("google-maps-api")("AIzaSyBIv5Z7Gmo-glNiiqhTqGfISRr-wTQ3MSE");

        googleMapsApi().then((googleMaps) => {
            this.showMap(position, googleMaps);
            callback(null, googleMaps);
        }, (err) => {
            callback(err);
        });
    }

    showMap (position, googleMaps) {
        var mapProperties = {
            center: new googleMaps.LatLng(position.coords.latitude, position.coords.longitude),
            zoom: 10,
            mapTypeId: googleMaps.MapTypeId.ROADMAP
        };
        var map = new googleMaps.Map(document.getElementById("map-canvas"), mapProperties);
    }



    getPlace (callback, position, googleMaps) {
        var geocoder = new googleMaps.Geocoder;
        geocoder.geocode ({
            "location": {
                lat: position.latitude,
                lng: position.longitude
            }
        }, (results, status) => {
            if (status === this._googleMaps.GeocoderStatus.OK) {
                callback(null, this.locationInfo.place);
            }
            else if (status === this._googleMaps.GeocoderStatus.ZERO_RESULTS) {
                callback(null, "No people here");
            }
            else callback(new ServerResponseError(status, "Google maps Api error"));
        })
    }
}

ReactDOM.render(<App/>, document.getElementById('react-container'));