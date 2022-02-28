import './update.css';
import React, { useContext, useState,useEffect, useRef  } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Topbar from '../../components/topbar/Topbar';
import 'bootstrap/dist/css/bootstrap.css';
function Update() {
    const {user}=useContext(AuthContext)
  return (
    <>
    <Topbar/>
    <div>
        <h4 className="text-center">!...Update your info...!</h4>
        <hr/>
        <div className="inputs container">
          <div className="row">
            <div className="col">
            <label>Username </label>
            </div>
            <div className="col">
              : 
            </div>
            <div className="col">
               {user.username}
            </div>
          </div>
          <div className="row">
            <div className="col">
            <label>Email</label>
            </div>
            <div className="col">
              : 
            </div>
            <div className="col">
            {user.email}
            </div>
          </div>
          <div className="row">
            <div className="col">
            <label>Profile picture</label>
            </div>
            <div className="col">
              : 
            </div>
            <div className="col">
            <input type="file" />
            </div>
          </div>
          <div className="row">
            <div className="col">
            <label>Cover picture</label>
            </div>
            <div className="col">
              : 
            </div>
            <div className="col">
            <input type="file" />
            </div>
          </div>
          <div className="row">
            <div className="col">
            <label>Description</label>
            </div>
            <div className="col">
              : 
            </div>
            <div className="col">
            <input type="text" />
            </div>
          </div>
          <div className="row">
            <div className="col">
            <label>Country</label>
            </div>
            <div className="col">
              : 
            </div>
            <div className="col">
            <input type="text" />
            </div>
          </div>
          <div className="row">
            <div className="col">
            <label>City</label>
            </div>
            <div className="col">
              : 
            </div>
            <div className="col">
            <input type="text" />
            </div>
          </div>
          <div className="row">
            <div className="col">
            <label>Relationship</label>
            </div>
            <div className="col">
              : 
            </div>
            <div className="col">
            <input type="text" />
            </div>
          </div>
          
         
          
          
          
          
          
        </div>
    </div>
    </>
  )
}

export default Update