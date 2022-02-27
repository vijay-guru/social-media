import './rightBar.css'
import Online from '../online/Online'
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext'
import { Add, Remove,Favorite } from '@material-ui/icons';
function RightBar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const[friends,setFriends]=useState([])
    const{user:currentUser,dispatch} = useContext(AuthContext);
    const[followed,setFollowed]=useState(false)
    useEffect(()=>{
        setFollowed(currentUser.following.includes(user?._id));
    },[currentUser,user])
    useEffect(()=>{
        const getFriends=async()=>{
           try {
               const friendList=await axios.get(`/users/friends/${user?._id}`);
               setFriends(friendList.data);
           } catch (error) {
               console.log(error);
           }
        }
        getFriends();
    },[user])
    const handleClick =async() => {
        try {
            if(followed){
                await axios.put("/users/"+user._id+"/unfollow",{
                    userId:currentUser._id
                });
                dispatch({type:"UNFOLLOW",payload:user._id})
            }
            else{
                await axios.put("/users/"+user._id+"/follow",{
                    userId:currentUser._id
                });
                dispatch({type:"FOLLOW",payload:user._id})
            }
            setFollowed(!followed);
        } catch (error) {
        }
    }
    const HomeRightBar=()=>(
        <>
        <div className="birthdayContainer">
                    <img src="data:image/png;base64,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"
                     alt="" 
                     className="birthdayImg"
                      />
                    <span className="birthdayText">
                        <i>Let's connect and celebrate everyone , everywhere</i>
                    </span>
                </div>
                <img src="/assets/ad.png" alt="" className="rightbarAd" />
                <hr/>
                <div className="about">
                    <h4 className="aboutName">Made with <span className="aboutNameHeart" style={{color: 'blue',marginLeft:"3px",marginRight:"3px",marginTop:"-5px"}}> <Favorite/> </span> by Vijay</h4>
                    <div className="aboutSocial1">
                       <a className="socialLinks" href="https://www.linkedin.com/in/vijay-guru-166866210/" target="_blank">LinkedIn</a>
                        <a className="socialLinks" href="https://github.com/vijay-guru" target="_blank">GitHub</a>
                       <a className="socialLinks" href="https://www.instagram.com/vijay_guru18/" target="_blank">Instagram</a>
                    </div>
                    <div className="aboutSocial2">
                       <a className="socialLinks" href="https://www.facebook.com/people/Vijay-Guru/100073320799153/" target="_blank">Facebook</a>
                      <a className="socialLinks" href="mailto:vjguru40@gmail.com" target="_blank">Mail Us</a>
                    </div>
                    <h5 className="aboutCopyrights">Vijay-Guru &#169; 2022-2023</h5>
                </div>
        </>
    )
    const ProfileRightBar=()=>(
        <>
        {user.username !== currentUser.username && (
            <button className="rightbarFollowButton" onClick={handleClick}>
              {followed ? "Unfollow" : "Follow"}
              {followed ? <Remove/> : <Add/>}
            </button>
        )}
          <div className="rightbarTitle">
              <div className="rightbarInfo">
                  <div className="rightbarInfoItem">
                      <span className="rightbarInfoKey">City : </span>
                      <span className="rightbarInfoValue">{user.city}</span>
                  </div>
                  <div className="rightbarInfoItem">
                      <span className="rightbarInfoKey">From : </span>
                      <span className="rightbarInfoValue">{user.from}</span>
                  </div>
                  <div className="rightbarInfoItem">
                      <span className="rightbarInfoKey">Relationship : </span>
                      <span className="rightbarInfoValue">{user.relationship ===1?"Single" : user.relationship ===2?"Married":"-" }</span>
                  </div>
              </div>
              <h4 className="rightbarTitle">User Friends</h4>
              <div className="rightbarFollowings">
              {friends.map(friend=>(  
                  <Link key={friend._id} to={"/profile/"+friend.username} style={{textDecoration:"none",color:"black"}}>
                  <div  className="rightbarFollowing">
                             <img src={friend.profilePicture ? PF+friend.profilePicture : PF+"person/noAvatar.png" } alt="" className="rightbarFollowingImg" />
                             <span className="rightbarFollowingName">{friend.username}</span>
                  </div>
                 </Link>
              ))}
              </div>
          </div>
        </>
    )
    return (
        <div className="rightBar">
            <div className="rightbarWrapper">
                {user ? <ProfileRightBar/> : <HomeRightBar/>}
            </div>
        </div>
    )
}

export default RightBar
