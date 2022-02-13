import { MoreVert } from '@material-ui/icons';
import './post.css';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {format} from 'timeago.js'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';

function Post({post}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const[like,setLike]=useState(post.likes.length)
    const[isLiked,setIsLiked]=useState(false)
    const[user,setUser]=useState({})
    const {user:currentUser} = useContext(AuthContext)

    useEffect(()=>{
        setIsLiked(post.likes.includes(currentUser._id))
    },[post.likes,currentUser._id])
    useEffect(()=>{
        const fetchUser=async()=>{
            const res=await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data)
        }
        fetchUser();
    },[post.userId])
    const likeHandler=()=>{
        try {
            setLike(isLiked? like - 1:like + 1)
            setIsLiked(!isLiked)
            axios.put('/posts/'+post._id+"/like",{userId:currentUser._id})
        } catch (error) {
            
        }
        setLike(isLiked? like - 1:like + 1)
        setIsLiked(!isLiked)
    }

  return (
      <div className="post">
          <div className="postWrapper">
              <div className="postTop">
                  <div className="postTopLeft">
                     <Link to={`profile/${user.username}`}> <img src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="" className="postProfileImg"/></Link>
                      <div className="postProfileName">{user.username}</div>
                      <div className="postDate">{format(post.createdAt)}</div>
                  </div>
                  <div className="postTopRight">
                      <MoreVert />
                  </div>
              </div>
              <div className="postCenter">
                  <span className="postText">{post?.description}</span>
                  <img src={PF+post.image} alt="" className="postImg" />
              </div>
              <div className="postBottom">
                  <div className="postBottomLeft">
                      <img src={`${PF}like.png`} alt="" className="likeIcon" onClick={likeHandler}/>
                      <img src={`${PF}heart.png`} alt="" className="likeIcon" onClick={likeHandler}/>
                      <span className="postLikeCounter">{like} people like it</span>
                  </div>
                  <div className="postBottomRight"><span className="postCommentText">{post.comment} comments</span></div>
              </div>
          </div>
          
      </div>
      );
}

export default Post;
