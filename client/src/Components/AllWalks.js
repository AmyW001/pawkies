// import React, { useState, useEffect } from 'react';

// export default function AllWalks() {
//   const [walk, setWalk] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const loadWalk = async (e) => {
//       try {
//         let response = await fetch(`/all-walks`, {
//           method: "GET",
//         });
//         if (response.ok) {
//           let data = await response.json();
//           setWalk(data);
//         } else {
//           console.log(
//             `Server error: ${response.status} ${response.statusText}`
//           );
//         }
//       } catch (err) {
//         console.log(`Network error:", err.message`);
//       }
//     };

//     loadWalk();
//   }, []);

//   return (
//     <div>
//       <h1>All Walks page is working!</h1>
//       {walk}
//     </div>
//   )
// }

import React, { useEffect, useState } from 'react';

export default function AllWalks({Walksprop}) {
let [fullWalks, setFullWalks] = useState([]);

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
    <div class = "card pb-3 bg-light"> AllWalks
    {
    fullWalks.map( fullWalk => (
        <tr key={fullWalk.id}>
        <img 
          src= {fullWalk.photo_url}
          class= "card-img-top"
          width="200" height= "250"
        />
        <div class="card-body">
          <h5 class="card-title"> Location: {fullWalk.location} </h5>
          <p class="card-text"> Description: {fullWalk.description} </p>
        </div>
        </tr>
      ))
    }
    </div>
  );
};

