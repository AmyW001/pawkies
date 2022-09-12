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
import Walk from "./walk/Walk"

export default function AllWalks({walks}) {


  return (
    <div class = "card pb-3 bg-light"> AllWalks
    {walks.map((w) => (
          <Walk key={w.id} walk={w} />
    ))};
    </div>
  );

};

