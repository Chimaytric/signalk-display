import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import fetchVesselDataAction from './fetchVesselData';
import updateVesselDataAction from './updateVesselData';
import { loadingSelector, errorSelector } from './duck';

import Screen from './Screen';

// const result = await fetch('http://localhost:3000/signalk/v1/api/vessels/self');

const App = () => {
  console.log('render')
  const [loading, error] = [
    useSelector(loadingSelector),
    useSelector(errorSelector),
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVesselDataAction());
  }, []);

  useEffect(() => {
    !loading && dispatch(updateVesselDataAction());
  });

  return (
    <>
      {(loading || error) && (
        <ul>
          <li>loading : {JSON.stringify(loading)}</li>
          <li>error : {JSON.stringify(error)}</li>
        </ul>
      )}
      {!loading && !error && <Screen />}
    </>
  );
}

export default App;
