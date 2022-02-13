import './profile.css';
import Feed from "../../components/feed/Feed"
import RightBar from "../../components/rightbar/RightBar"
import SideBar from "../../components/sidebar/SideBar"
import Topbar from "../../components/topbar/Topbar"
import { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams} from 'react-router'

function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const[user,setUser]=useState({})
    const username=useParams().username

    useEffect(()=>{
        const fetchUser=async()=>{
            const res=await axios.get(`/users?username=${username}`);
            setUser(res.data);
            
        }
        fetchUser();
    },[username]);

  return (
        <>
          <Topbar/>
            <div className="profile">
                <SideBar/>
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img src={user.coverPicture ? PF+user.coverPicture : PF+"person/noAvatarCover.png" } alt="" className="profileCoverImg" />
                            <img src={user.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.png" } alt="" className="profileUserImg" />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profieInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.description}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username}/>
                        <RightBar user={user}/>
                    </div>
                </div>
            </div>
        </>
        
    );
}

export default Profile;
