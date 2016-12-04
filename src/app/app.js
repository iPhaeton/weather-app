import React from 'react';
import ReactDOM from 'react-dom';

import WeatherDashboard from './components/weather-info.component';
import Map from './components/map.component';


class App extends React.Component {
    render() {
        this.getLocation((err, location) => {
            if (err) return console.log(err);
            this.location = location;
            console.log(this.location);
            this.showMap();
        });

        return (
            <div>
                <WeatherDashboard/>
                <Map/>
            </div>
        );
    }

    showMap () {
        var self = this;

        var googleMapsApi = require("google-maps-api")("AIzaSyBIv5Z7Gmo-glNiiqhTqGfISRr-wTQ3MSE");
        googleMapsApi().then((googleMaps) => {
            var mapProperties = {
                center: new googleMaps.LatLng(self.location.coords.latitude, self.location.coords.longitude),
                zoom: 10,
                mapTypeId: googleMaps.MapTypeId.ROADMAP
            };
            var map = new googleMaps.Map(document.getElementById("map-canvas"), mapProperties);
        }, (err) => {
            console.log(err);
        });
    }

    getLocation (callback) {
        if (!navigator.geolocation) {
            return callback(new NoSupportError("Geolocation"));
        };

        navigator.geolocation.getCurrentPosition((pos) => {
            callback(null, pos);
        }, (err) => {
            callback(err);
        }, {
            timeout: 30000
        });
    }
}

ReactDOM.render(<App/>, document.getElementById('react-container'));