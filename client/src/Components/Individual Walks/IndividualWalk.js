import React, { useState } from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';
import MapAPI from '../Map API/MapAPI';

export default function IndividualWalk({coordinates}) {

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
        src={one.photo_url}
        alt=""
        />
      <h1>This is a title walk: {one.walk_name}  </h1>
      <h2>Here is the description: {one.description} </h2>
      <h3>Here is the location: {one.location}</h3>
      <div className="map-container">
        <MapAPI coordinates={(coordinates)}/>
      </div>
      <Link to={`/user/${one.user_name}`}>
      <span>{one.user_name}</span>
      </Link>
        </tr>
      ))}
    </div>
  )
}