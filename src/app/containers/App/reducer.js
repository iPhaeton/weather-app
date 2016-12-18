import {NoSupportError} from "../../errors";

//function locationReducer (state = {position: null, place: null}, params = {}) {
function locationReducer () {
    /*return {
        position: params.position || state.position,
        place: params.place || state.place
    };*/

    return {
        position: {
            coords: {
                latitude: 53.930855199999996,
                longitude: 27.551547900000003
            }
        }
    }
};

export default locationReducer;