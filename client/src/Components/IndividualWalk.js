import React, { useState } from 'react';

export default function IndividualWalk() {
  const [individualWalk, setIndividualWalk] = useState({
    name: "",
    location: "",
    address: "",
    type: "",
    length: "",
    rating: "",
    difficulty: "",
    description: "",
    user: "",
  })


  return (
    <div className="individualWalks_container">
      <div className="info_individualWalks">
        <h5>{individualWalk.rating}</h5>
        <h2>{individualWalk.name}</h2>
        <h5>{individualWalk.location}</h5>
        <div></div>

        <h4>Type of walk</h4>
        <h6>{individualWalk.type}</h6>

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
          <MapApi />
        </div>
      </div>

      <div className="user_container">
        <h3>Walk added by</h3>
        <h6>{individualWalk.user}</h6>
      </div>

    </div>
  )
}
