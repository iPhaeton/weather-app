import React from 'react';
import ReactDOM from 'react-dom';

import Map from "./components/map.component.js";
import WeatherDashboard from './components/weather-info.component';
import {NoSupportError} from "./errors";

import mainStyles from "./css/main.css";

class App extends React.Component {
    constructor () {
        super();

        this.state = {
            location: {
                position: null,
                place: null
            },
            lastChangedProps: new Set()
        };

        this.getPosition((err, position) => {
            if (err) console.log(err);
            else {
                this.setLocation({position});
            }
        });
    };

    render() {
        return (
            <div>
                <WeatherDashboard/>
                <Map center={this.state.location.position} initiatingStateProps={this.state.lastChangedProps} setLocation={this.setLocation.bind(this)}/>
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
        this.setState({
            location: {
                position: params.position || this.state.location.position,
                place: params.place || this.state.location.place
            },
            lastChangedProps: new Set(Object.getOwnPropertyNames(params).concat("location"))
        });

        console.log(this.state.location);
    }
}

ReactDOM.render(<App/>, document.getElementById('react-container'));