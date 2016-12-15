import React from 'react';
import ReactDOM from 'react-dom';

import mainStyles from "../css/main.css";
import bootstrapStyles from "../../vendor/css/bootstrap.min.css";

class Map extends React.Component {

    render() {
        return (
            <div id={mainStyles.mapCanvas} className={bootstrapStyles["col-md-8"]}>Map here</div>
        );
    }

}

export default Map;