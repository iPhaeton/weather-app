import React from 'react';
import ReactDOM from 'react-dom';

import WeatherDashboard from './components/weather-info.component';
import Map from './components/map.component';


class App extends React.Component {
  render() {
    return (
      <div>
          <WeatherDashboard/>
          <Map/>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('react-container'));
