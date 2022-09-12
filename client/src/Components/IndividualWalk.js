
// import React, { useState, useEffect } from 'react';
// import MapAPI from './MapAPI';

// export default function IndividualWalk() {
//   const [individualWalk, setIndividualWalk] = useState();
//   const [error, setError] = useState("");


//   useEffect(() => {
//     const loadIndWalk = async (e) => {
//       try {
//         let response = await fetch(`/walk/:name`, {
//           method: "GET",
//         });
//         if (response.ok) {
//           let data = await response.json();
//           setIndividualWalk(data[0]);
//         } else {
//           console.log(
//             `Server error: ${response.status} ${response.statusText}`
//           );
//         }
//       } catch (err) {
//         console.log(`Network error:", err.message`);
//       }
//     };

//     loadIndWalk();
//   }, []);

//   return (
//     <div className="individualWalks_container">
//       <div className="info_individualWalks">
//         <h5>{individualWalk.rating}</h5>
//         <h2>{individualWalk.name}</h2>
//         <h5>{individualWalk.location}</h5>
//         <div></div>

//         <h4>Type of walk</h4>
//         <h6>{individualWalk.types}</h6>
{/* <div className="map_container">
<MapAPI />
</div>
</div> */}

import React, { useState } from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';

export default function IndividualWalk() {

  const walklocation = useLocation()
  const path= (walklocation.pathname.split("/")[2]);
  const [individualwalk, setIndividualwalk] = useState([]);

  useEffect(() => {
    fetch("/walk/" + path) 
            .then(res => res.json())
            .then(json => {
              console.log("*****",json)
              setIndividualwalk(json);
            })
            .catch(error => {
              console.log("****CATCH***", error)
            });
        }, [path]);

  return (
    <div className='singleWalk'>
      <br></br>
      {individualwalk.map (one => (
        <tr key={one.walk_id}>
        <img
        src="https://cdn.pixabay.com/photo/2016/11/29/05/43/dog-1867604__480.jpg"
        />
      <h1>This is a title walk: {one.walk_name}  </h1>
      <h2>Here is the description: {one.description} </h2>
      <h3>Here is the location: {one.location}</h3>
      <div className="map-container">
        <MapAPI />
      </div>
      <Link to={`/user/${one.user_name}`}>
      <span>{one.user_name}</span>
      </Link>
        </tr>
      ))}
    </div>
  )
}