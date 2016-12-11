import React from 'react';
import ReactDOM from 'react-dom';

import WeatherDashboard from './components/weather-info.component';
import Map from './components/map.component';
import Succession from "./libs/succession";
import {NoSupportError, ServerResponseError} from "./errors";

class App extends React.Component {
    constructor () {
        super();

        this.state = {
            location: {}
        };

        var succession = new Succession(
            [
                this.getPosition.bind(this),
                this.getGoogleMaps.bind(this),
                this.getPlace.bind(this)
            ], (err, results) => {
                if (err) console.log(err);
                else {
                    console.log(this.state.location);
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
            this.setLocation({position});
            callback(null, position);
        }, (err) => {
            callback(err);
        }, {
            timeout: 30000
        });
    }

    getGoogleMaps (callback) {
        var googleMapsApi = require("google-maps-api")("AIzaSyBIv5Z7Gmo-glNiiqhTqGfISRr-wTQ3MSE");

        googleMapsApi().then((googleMaps) => {
            this.googleMaps = googleMaps;
            this.showMap();
            callback(null, googleMaps);
        }, (err) => {
            callback(err);
        });
    }

    showMap () {
        var coords = this.state.location.position.coords;

        var mapProperties = {
            center: new this.googleMaps.LatLng(coords.latitude, coords.longitude),
            zoom: 10,
            mapTypeId: this.googleMaps.MapTypeId.ROADMAP
        };
        var map = new this.googleMaps.Map(document.getElementById("map-canvas"), mapProperties);
    }

    getPlace (callback) {
        var coords = this.state.location.position.coords;

        var geocoder = new this.googleMaps.Geocoder;
        geocoder.geocode ({
            "location": {
                lat: coords.latitude,
                lng: coords.longitude
            }
        }, (places, status) => {
            if (status === this.googleMaps.GeocoderStatus.OK) {
                var place = this.getCity(places);
                this.setLocation({place});
                callback(null, place);
            }
            else if (status === this.googleMaps.GeocoderStatus.ZERO_RESULTS) {
                this.setLocation({place: null});
                callback(null, "No people here");
            }
            else callback(new ServerResponseError(status, "Google maps Api error"));
        })
    }

    getCity (results) {
        for (var i = results.length-1; i >= 0; i--) {
            for (var j = 0; j < results[i].types.length; j++) {
                if (results[i].types[j] === "locality") return results[i];
            };
        };
        return null;
    }

    setLocation (params) {
        if (params.position === undefined) params.position = this.state.location.position;
        if (params.place === undefined) params.place = this.state.location.place;

        this.setState({
            location: {
                position: params.position,
                place: params.place
            }
        });
    }
}

ReactDOM.render(<App/>, document.getElementById('react-container'));