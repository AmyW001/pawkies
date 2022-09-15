import "./Walk.css"
import React from 'react'
import { Link } from "react-router-dom"

export default function Walk({walk}) {
  return (
    <div className="walk">
      <img
      className="walkImg"
        src= {walk.photo_url}
        alt= ""
      />  

      <div className="walkInfo">

        <div className="walkCats">
         <span className="walkLocation">{walk.location}</span>
        </div>

        <Link className="link" to={`/walk/${walk.walk_id}`}>
        <span className="walkTitle">{walk.walk_name}</span>
        </Link>
        <span className="walkType">{walk.types}</span>
        <p className="walkDesc">"{walk.description}"</p>
        </div>
    </div>
  )
}
