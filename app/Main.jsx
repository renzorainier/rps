'use client'

import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase.js";
import Play from "./Play.jsx"

function Main() {
  return (
    <div>

      <Play/>
    </div>
  )
}

export default Main;