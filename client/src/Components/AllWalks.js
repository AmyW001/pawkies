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