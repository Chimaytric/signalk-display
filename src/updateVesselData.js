import { updateVesselData as updateVesselDataAC } from './duck';

const updateVesselData = () => {
    return dispatch => {
        console.log('start continuous update');

        const websocket = new WebSocket('ws://192.168.1.23:3000/signalk/v1/stream?subscribe=self');
        let isHandshake = true;

        websocket.onopen = () => {
            console.log('websocket connected');
        };

        websocket.onmessage = evt => {
            const update = JSON.parse(evt.data);
            if (!isHandshake) {
                dispatch(updateVesselDataAC(update));
            } else {
                isHandshake = false;
            }
        };

        // setTimeout(() => {
        //     websocket.close();
        // }, 10000)
    }
};

export default updateVesselData;
