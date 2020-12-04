import { fetchVesselDataSuccess, fetchVesselDataError } from './duck';

const fetchVesselData = () => {
    return dispatch => {
        console.log('start initial fetch');

        fetch('http://192.168.1.23:3000/signalk/v1/api/vessels/self')
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(fetchVesselDataSuccess(res));
            return res.products;
        })
        .catch(error => {
            dispatch(fetchVesselDataError(error));
        })
    }
};

export default fetchVesselData;