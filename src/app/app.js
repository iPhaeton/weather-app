import React from 'react';
import ReactDOM from 'react-dom';

import Map from "./components/map.component.js";
import WeatherDashboard from './components/weather-info.component.js';
import {NoSupportError} from "./errors";

import bootstrapStyles from "../vendor/css/bootstrap.min.css";

class App extends React.Component {
    constructor () {
        super();

        this.state = {
            location: {
                position: null,
                place: null
            }
        };

        //Track the actions that change state
        this.initiatingAction = new Set();

        this.getPosition((err, position) => {
            if (err) console.log(err);
            else {
                this.setLocation({position});
            }
        });
    };

    render() {
        return (
            <div className={bootstrapStyles.row}>
                <Map center={this.state.location.position} initiatingAction={this.initiatingAction}
                     setLocation={this.setLocation.bind(this)} setInitiatingAction={this.setInitiatingAction.bind(this)}/>
                <WeatherDashboard position={this.state.location.position} initiatingAction={this.initiatingAction}/>
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

    setLocation (params) {
        this.setInitiatingAction(Object.getOwnPropertyNames(params).concat("location"));

        this.setState({
            location: {
                position: params.position || this.state.location.position,
                place: params.place || this.state.location.place
            }
        });

        console.log(this.state.location);
    }

    setInitiatingAction (actions) {
        this.initiatingAction = new Set(actions);
    }
}

ReactDOM.render(<App/>, document.getElementById('react-container'));