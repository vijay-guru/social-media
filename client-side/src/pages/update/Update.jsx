import './update.css';
import React, { useContext, useState,useEffect, useRef  } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Topbar from '../../components/topbar/Topbar';
import 'bootstrap/dist/css/bootstrap.css';
function Update() {
    const {user}=useContext(AuthContext)
    const[description,setDescription]=useState(user.description)
    const[country,setCountry]=useState(user.city)
    const[city,setCity]=useState(user.from)
    const[relationship,setRelationship]=useState(user.relationship)
    const[profilePicture,setProfilePicture]=useState(user.profilePicture)
    const[coverPicture,setCoverPicture]=useState(user.coveredPicture)
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
            <input file={profilePicture} name="profilePicture"type="file" />
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
            <input file={coverPicture} type="file" />
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
            <input value={description} onChange={(e)=>(setDescription(e.target.value))}type="text" />
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
            <input value={country} onChange={(e)=>(setCountry(e.target.value))} type="text" />
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
            <input value={city} onChange={(e)=>(setCity(e.target.value))} type="text" />
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
            <input value={relationship} onChange={(e)=>(setRelationship(e.target.value))} type="text" />
            </div>
          </div>
          
         
          
          
          
          
          
        </div>
    </div>
    </>
  )
}

export default Update