import React, { useState, useEffect } from 'react';
import MapAPI from './MapAPI';

export default function IndividualWalk() {
  const [individualWalk, setIndividualWalk] = useState();
  const [error, setError] = useState("");


  useEffect(() => {
    const loadIndWalk = async (e) => {
      try {
        let response = await fetch(`/walk/:name`, {
          method: "GET",
        });
        if (response.ok) {
          let data = await response.json();
          setIndividualWalk(data[0]);
        } else {
          console.log(
            `Server error: ${response.status} ${response.statusText}`
          );
        }
      } catch (err) {
        console.log(`Network error:", err.message`);
      }
    };

    loadIndWalk();
  }, []);

  return (
    <div className="individualWalks_container">
      <div className="info_individualWalks">
        <h5>{individualWalk.rating}</h5>
        <h2>{individualWalk.name}</h2>
        <h5>{individualWalk.location}</h5>
        <div></div>

        <h4>Type of walk</h4>
        <h6>{individualWalk.types}</h6>

        <h4>Duration of the walk</h4>
        <h6>{individualWalk.length}</h6>

        <h4>Difficulty</h4>
        <h6>{individualWalk.difficulty}</h6>

        <h4>More info</h4>
        <h6>{individualWalk.description}</h6>
      </div>

      <div className="location_container">
        <h3>How to get there</h3>
        <h4>Address</h4>
        <h6>{individualWalk.address}</h6>

        <div className="map_container">
          <MapAPI />
        </div>
      </div>

      <div className="user_container">
        <h3>Walk added by</h3>
        <h6>{individualWalk.user}</h6>
      </div>

    </div>
  )
}
