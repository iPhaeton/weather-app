import React from 'react';
import ReactDOM from 'react-dom';

import WeatherDashboard from './components/weather-info.component';
import Map from './components/map.component';
import Succession from "./libs/succession";

class App extends React.Component {
    render() {
        var succession = new Succession([this.getPosition, this.showMap],
            (err, position) => {
                if (err) console.log(err);
                else console.log(position);
            }
        );
        succession.execute();

        return (
            <div>
                <WeatherDashboard/>
                <Map/>
            </div>
        );
    }

    showMap (callback, position) {
        var self = this;

        var googleMapsApi = require("google-maps-api")("AIzaSyBIv5Z7Gmo-glNiiqhTqGfISRr-wTQ3MSE");
        googleMapsApi().then((googleMaps) => {
            var mapProperties = {
                center: new googleMaps.LatLng(position.coords.latitude, position.coords.longitude),
                zoom: 10,
                mapTypeId: googleMaps.MapTypeId.ROADMAP
            };
            var map = new googleMaps.Map(document.getElementById("map-canvas"), mapProperties);
            callback(null, position);
        }, (err) => {
            callback(err);
        });
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
}

ReactDOM.render(<App/>, document.getElementById('react-container'));