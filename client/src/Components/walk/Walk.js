import "./Walk.css"
import React from 'react'
import { Link } from "react-router-dom"

export default function Walk({walk}) {
  return (
    <div className="walk">
      <img
      className="walkImg"
        src= "https://cdn.pixabay.com/photo/2019/11/07/20/44/dog-4609870__480.jpg"
        alt= ""
      />  
      <Link to={`/walk/${walk.walk_id}`}>
      <span className="walktitle">{walk.walk_name}</span>
      </Link>
      <div className="walkDesc">
        <div className="walkPlace">
            <span className="waltype">{walk.types}</span>
            <span className="walkdifficulty">{walk.difficulty}</span>
        </div>
      </div>
    </div>
  )
}
