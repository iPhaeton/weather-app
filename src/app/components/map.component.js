import React from 'react';
import ReactDOM from 'react-dom';

import mapStyles from "../css/map.css";
import bootstrapStyles from "../../vendor/css/bootstrap.min.css";

import Succession from "../libs/succession";
import {ServerResponseError} from "../errors";

const GOOGLE_API_KEY = "AIzaSyBIv5Z7Gmo-glNiiqhTqGfISRr-wTQ3MSE";

class Map extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            googleMaps: null
        };

        this.getGoogleMaps((err) => {
            if (err) return console.log(err);
        })
    }

    render() {
        /*console.log(this.props.center);
        console.log(this.state.googleMaps);*/

        if (!this.props.center || !this.state.googleMaps) {
            return (
                <div>Loading...</div>
            );
        };

        //if (this.props.initiatingAction.has("position") || this.props.initiatingAction.has("googleMaps")) {
            setTimeout(this.showMap.bind(this), 0);

            /*this.getPlace((err, place) => {
                if (err) console.log(err);
                else {
                    this.props.setLocation({place});
                }
            });*/
        //};

        return (
            <div id={mapStyles.mapCanvas} className={bootstrapStyles["col-md-8"]}>Map here</div>
        );
    }

    //Get google maps and show map--------------------------------------------------------------------------------------
    getGoogleMaps (callback) {
        var googleMapsApi = require("google-maps-api")(GOOGLE_API_KEY);

        googleMapsApi().then((googleMaps) => {
            this.setGoogleMaps(googleMaps);
            callback(null);
        }, (err) => {
            callback(err);
        });
    }

    setGoogleMaps (googleMaps) {
        this.setState({googleMaps});
    }

    showMap () {
        var coords = this.props.center.coords;

        var mapProperties = {
            center: new this.state.googleMaps.LatLng(coords.latitude, coords.longitude),
            zoom: 10,
            mapTypeId: this.state.googleMaps.MapTypeId.ROADMAP
        };
        var map = new this.state.googleMaps.Map(document.getElementById(mapStyles.mapCanvas), mapProperties);
    }

    //Get a city name by coordinates------------------------------------------------------------------------------------
    getPlace (callback) {
        var coords = this.props.center.coords;

        var geocoder = new this.state.googleMaps.Geocoder;
        geocoder.geocode ({
            "location": {
                lat: coords.latitude,
                lng: coords.longitude
            }
        }, (places, status) => {
            if (status === this.state.googleMaps.GeocoderStatus.OK) {
                callback(null, this.getCity(places));
            }
            else if (status === this.state.googleMaps.GeocoderStatus.ZERO_RESULTS) {
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