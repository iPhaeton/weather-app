import {NoSupportError} from "../../errors";

function locationReducer (state = {position: null, place: null}, params = {}) {
    return {
        position: params.position || state.position,
        place: params.place || state.place
    };
};

export default locationReducer;