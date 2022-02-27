import './update.css';
import React, { useContext, useState,useEffect, useRef  } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Topbar from '../../components/topbar/Topbar';

function Update() {
    const {user}=useContext(AuthContext)
  return (
    <>
    <Topbar/>
    <div>
        
    </div>
    </>
  )
}

export default Update