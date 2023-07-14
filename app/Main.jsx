'use client'

import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase.js";
import Play from "./Play.jsx"
import Player2 from "./Player2.jsx"


function Main() {
  return (
    <div>

      <Play/>
      <Player2/>

    </div>
  )
}

export default Main;