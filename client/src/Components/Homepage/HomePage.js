import React, { useEffect, useState } from 'react';
import AllWalks from '../Allwalks/AllWalks';
import "./Homepage.css"
import Logo from "./Logo Pawkies.png"


export default function HomePage() {

let [fullWalks, setFullWalks] = useState([]);
console.log("fullWalks", fullWalks);


useEffect(() => {
  fetch("/all-walks") 
          .then(res => res.json())
          .then(json => {
            // upon success, update trials
            console.log(json);
            setFullWalks(json);
          })
          .catch(error => {
            // upon failure, show error message
          });
      }, []);

return (
    <div className=''>
      <div className='headerTitles'>
        <img src={Logo} className='headerTitleLg'></img>
      </div>
        <img
          className="headerImg"
          src="https://images.unsplash.com/photo-1551779891-b83901e1f8b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
        ></img>
      <div className='walksTitle'>
      Latest pawkies
      <br></br>
      <p>Explore recently added pawkies</p>
      </div>
      <AllWalks walks={fullWalks}/>
    </div>
  );
}
