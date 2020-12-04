import { lensPath, set } from 'ramda';

// ACTIONS

export const VESSEL_DATA_FETCH_SUCCESS = 'VESSEL_DATA/FETCH/SUCCESS';
export const VESSEL_DATA_FETCH_ERROR = 'VESSEL_DATA/FETCH/ERROR';
export const VESSEL_DATA_UPDATE = 'VESSEL_DATA/UPDATE';

// ACTION CREATORS

export const fetchVesselDataSuccess = vesselData => ({
    type    : VESSEL_DATA_FETCH_SUCCESS,
    payload : vesselData,
});

export const fetchVesselDataError = error => ({
    type    : VESSEL_DATA_FETCH_ERROR,
    payload : error,
});

export const updateVesselData = update => ({
    type    : VESSEL_DATA_UPDATE,
    payload : update,
});

// INITIAL STATE

const initialState = {
    error      : null,
    loading    : true,
    vesselData : null,
};

// SELECTORS

export const errorSelector = state => state.error;
export const loadingSelector = state => state.loading;
export const vesselDataSelector = state => state.vesselData;
export const speedThroughWaterSelector = state => vesselDataSelector(state)
    .navigation
    .speedThroughWater;

// REDUCER

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case VESSEL_DATA_FETCH_SUCCESS:
            return {
                ...state,
                loading    : false,
                vesselData : payload,
            };
        case VESSEL_DATA_FETCH_ERROR:
            return {
                ...state,
                loading : false,
                error   : payload,
            };
        case VESSEL_DATA_UPDATE:
            const updatedValues = payload.updates[0].values;
            const timestamp = payload.updates[0].timestamp;
            let newVesselData = state.vesselData;
            updatedValues.forEach(({ path, value }) => {
                const splitPath = path.split('.');
                const valueLens = lensPath([...splitPath, 'value']);
                const timestampLens = lensPath([...splitPath, 'timestamp']);
                newVesselData = set(valueLens, value, newVesselData);
                newVesselData = set(timestampLens, timestamp, newVesselData);
            })
            return {
                ...state,
                vesselData : newVesselData,
            };
        default:
            return state;
    }
};

export default reducer;