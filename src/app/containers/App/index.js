import React from 'react';
import ReactDOM from 'react-dom';

import Map from "../../components/map.component.js";
import WeatherDashboard from '../../components/weather-info.component.js';
import {NoSupportError} from "../../errors";

import bootstrapStyles from "../../../vendor/css/bootstrap.min.css";

import {connect} from "react-redux";

class App extends React.Component {
    constructor (props) {
        super(props);
    };

    render() {
        console.log(this.props.location);

        return (
            <div className={bootstrapStyles.row}>
                <Map center={this.props.location.position} />
                <WeatherDashboard position={this.props.location.position} />
            </div>
        );
    }

    /*getPosition (callback) {
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
    }*/
};

function mapStateToProps (state) {
    return {
        location: state.location
    }
};

export default connect (mapStateToProps)(App);