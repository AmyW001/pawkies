import React, { useEffect, useState } from 'react';
import AllWalks from "./AllWalks";

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
    <div>
      <div className="header-image-div">
        <img
          className="img-fluid main-page-header-image"
          src="https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2574&q=80"
          alt="dog-women"
        ></img>
      </div>
      <h1>🐶 Welcome to our dog walks app! 🐶</h1>
      <AllWalks walks={fullWalks}/>
    </div>
  );
}
