import {combineReducers} from "redux";

import locationReducer from "./containers/App/reducer.js";

const rootReducer = combineReducers ({
    location: locationReducer
});

export default rootReducer;