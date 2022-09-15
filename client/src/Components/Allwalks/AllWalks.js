import React, { useEffect, useState } from 'react';
import Walk from '../Walk/Walk';
import "./Allwalks.css"

export default function AllWalks({walks}) {


  return (
    <div className='allWalks'>
    {walks.map((w) => (
          <Walk key={w.id} walk={w}/>
    ))};
    </div>
  );
};