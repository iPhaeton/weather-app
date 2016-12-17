import React from 'react';
import ReactDOM from 'react-dom';

import mainStyles from "../css/main.css";
import bootstrapStyles from "../../vendor/css/bootstrap.min.css";

import Succession from "../libs/succession";
import {ServerResponseError} from "../errors";

class Map extends React.Component {

    constructor (props) {
        super(props);

        this.allowRender = true;
    }

    render() {
        if (!this.props.center) {
            return (
                <div>Loading...</div>
            );
        };

        if (this.props.initiatingStateProps.has("position")) {
            var succession = new Succession(
                [
                    this.getGoogleMaps.bind(this),
                    this.getPlace.bind(this)
                ], (err, results) => {
                    if (err) console.log(err);
                    else {
                        this.allowRender = false;
                        this.props.setLocation({
                            place: results[1]
                        });
                    }
                }
            );
            succession.execute();
        };

        return (
            <div id={mainStyles.mapCanvas} className={bootstrapStyles["col-md-8"]}>Map here</div>
        );
    }

    getGoogleMaps (callback) {
        var googleMapsApi = require("google-maps-api")("AIzaSyBIv5Z7Gmo-glNiiqhTqGfISRr-wTQ3MSE");

        googleMapsApi().then((googleMaps) => {
            this.googleMaps = googleMaps;
            try {
                this.showMap();
            } catch (err) {
                callback(err);
            };
            callback(null, googleMaps);
        }, (err) => {
            callback(err);
        });
    }

    showMap () {
        var coords = this.props.center.coords;

        var mapProperties = {
            center: new this.googleMaps.LatLng(coords.latitude, coords.longitude),
            zoom: 10,
            mapTypeId: this.googleMaps.MapTypeId.ROADMAP
        };
        var map = new this.googleMaps.Map(document.getElementById(mainStyles.mapCanvas), mapProperties);
    }

    getPlace (callback) {
        var coords = this.props.center.coords;

        var geocoder = new this.googleMaps.Geocoder;
        geocoder.geocode ({
            "location": {
                lat: coords.latitude,
                lng: coords.longitude
            }
        }, (places, status) => {
            if (status === this.googleMaps.GeocoderStatus.OK) {
                callback(null, this.getCity(places));
            }
            else if (status === this.googleMaps.GeocoderStatus.ZERO_RESULTS) {
                callback(null, null);
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

}

export default Map;