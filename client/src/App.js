import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import {listLogEntries} from './API'
import LogEntryForm from './LogEntryForm'

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({})
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [settings, setSettings] = useState({
    dragPan: true,
    dragRotate: false,
    scrollZoom: true,
    touchZoom: false,
    touchRotate: false,
    keyboard: true,
    doubleClickZoom: false
    });

  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.7577,
    longitude: -90.4376,
    zoom: 4,
  }); 

  // useEffect cannot use async/await, so we use an IIFE inside of it
  useEffect(() => {
    (async () =>{
      const logEntries = await listLogEntries()
      setLogEntries(logEntries);
    })()

  }, [])
  const showAddMarker = event => {
    const [ longitude, latitude] = event.lngLat;
    setAddEntryLocation({latitude, longitude})
    
  }
  return (
    <ReactMapGL
      {...viewport}
      {...settings}
      mapStyle="mapbox://styles/kimchicoder/ckcfqsqju0e231imvoqil8wra"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      onDblClick={showAddMarker}
    >
      {
      logEntries.map(entry => (
        <React.Fragment>
          <Marker 
          latitude={entry.latitude}
          longitude={entry.longitude}
          key={entry._id}
          >
            <div style={{color:'white'}}
            onClick={() => setShowPopup({
              // Only allow one popup at a time
              //...showPopup,
              [entry._id]: true,
            })}>
              <svg 
              className='marker pokeball'
              style={{
                      height: `${6 * viewport.zoom}px`,
                      width: `${6 * viewport.zoom}px`,
                    }}
                    xmlns="http://www.w3.org/2000/svg" 
                    version="1.1" 
                    id="Laag_1" 
                    x="0px" 
                    y="0px" viewBox="0 0 175 245">
                <g>
                  <g>
                    <path fill="#3A3B3E" d="M88,243.716c-13.844,0-17.695-10.024-19.389-17.565l-0.124-0.663c-0.037-0.216-5.278-29.483-46.093-80.249    l-0.324-0.403c-13.278-15.624-20.581-35.47-20.581-55.98c0-47.703,38.809-86.51,86.511-86.51    c47.702,0,86.511,38.809,86.511,86.512c0,20.541-7.325,40.415-20.642,56.052l-0.263,0.33    c-40.816,50.766-46.057,80.033-46.104,80.323l-0.113,0.589C105.695,233.691,101.843,243.716,88,243.716L88,243.716z     M87.72,225.011c0.169,0.006,0.391,0.006,0.559,0c0.206-0.51,0.495-1.368,0.813-2.744c0.756-4.206,7.457-35.143,47.875-86.161    v-0.214l2.284-2.668c10.677-12.322,16.558-28.078,16.558-44.367c0-37.391-30.419-67.811-67.81-67.811S20.19,51.464,20.19,88.854    c0,16.291,5.88,32.047,16.558,44.369l2.284,2.636v0.246c40.417,51.019,47.119,81.955,47.874,86.161    C87.225,223.643,87.514,224.501,87.72,225.011L87.72,225.011z"/>
                  </g>
                  <g>
                    <path fill="#EBEBEB" d="M88,234.365c-5.798,0-8.494-2.378-10.265-10.264c0,0-4.596-30.671-48.053-84.723v-0.031    C17.953,125.813,10.84,108.169,10.84,88.854c0-42.614,34.545-77.16,77.16-77.16c42.614,0,77.16,34.546,77.16,77.162    c0,19.314-7.113,36.957-18.842,50.491v0.031c-43.457,54.052-48.054,84.723-48.054,84.723    C96.494,231.987,93.799,234.365,88,234.365z"/>
                  </g>
                  <path fill="#DF0824" d="M10.84,88.425c0-42.615,34.545-77.16,77.16-77.16c42.614,0,77.16,34.545,77.16,77.16H10.84z"/>
                  <circle fill="#CDCFD2" cx="88" cy="88.425" r="26.201"/>
                  <g>
                    <path d="M165.043,84.487h-47.918C115.193,70.135,102.873,59.028,88,59.028c-14.874,0-27.194,11.106-29.125,25.459H10.958    c-0.074,1.387-0.118,2.783-0.118,4.189c0,1.235,0.031,2.464,0.088,3.685h47.947C60.806,106.715,73.126,117.82,88,117.82    c14.873,0,27.193-11.105,29.125-25.459h47.946c0.058-1.221,0.089-2.449,0.089-3.684C165.16,87.271,165.117,85.874,165.043,84.487z     M88,109.766c-11.787,0-21.342-9.554-21.342-21.341c0-11.788,9.556-21.342,21.342-21.342c11.787,0,21.342,9.554,21.342,21.342    C109.342,100.212,99.787,109.766,88,109.766z"/>
                  </g>
                </g>
              </svg>
            </div>
          </Marker>
          {
            showPopup[entry._id] ? (
          <Popup 
          longitude={entry.longitude} 
          latitude={entry.latitude} 
          closeButton={true} 
          closeOnClick={false} 
          dynamicPosition={true}
          anchor="left"
          onClose={()=>(setShowPopup({}))}
          >
            <div className="popup">
              <h3>{entry.title}</h3>
              <p>{entry.comments}</p>
              <p>Rating: {entry.rating}</p>
              <small> Visited on {new Date(entry.visitDate).toLocaleDateString()}</small>


            </div>
          </Popup>
            ) : null  }
        </React.Fragment>
      ))
      }
      {
        addEntryLocation ? (
          <>
          <Marker 
          latitude={addEntryLocation.latitude}
          longitude={addEntryLocation.longitude}
          >
          <img className="marker" style={{
                      height: `${5 * viewport.zoom}px`,
                      width: `${5 * viewport.zoom}px`,
                    }} src="https://cdn2.iconfinder.com/data/icons/poke-ball-set-free/150/Master_Ball-512.png" alt="add entry ball"></img>
          </Marker>
          <Popup 
          longitude={addEntryLocation.longitude} 
          latitude={addEntryLocation.latitude} 
          closeButton={true} 
          closeOnClick={false} 
          dynamicPosition={true}
          anchor="left"
          onClose={()=>(setAddEntryLocation(null))}
          >
            <div className="popup">
              <LogEntryForm></LogEntryForm>
            </div>
          </Popup>
          </>
        ) : null
      }
    </ReactMapGL>
  );
}

export default App;
