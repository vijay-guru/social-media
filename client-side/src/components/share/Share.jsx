import {PermMedia,Label,Room,EmojiEmotions, Cancel} from '@material-ui/icons'
import './share.css'
import {useContext,useState,useRef} from 'react'
import {AuthContext} from '../../context/AuthContext'
import  axios  from 'axios'
function Share() {
    const {user}=useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [file,setFile]=useState(null)
    const desc =useRef();
    const submitHandler= async (e)=>{
        e.preventDefault();
        const newPost={
            userId:user._id,
            description:desc.current.value
        };
        if(file){
            const data=new FormData();
            data.append("file",file);
            try {
                const filePath=  await axios.post("/upload",data);
                newPost.image=filePath.data;
            } catch (error) {
                console.log(error);
            }
        }
        try {
         await axios.post('/posts',newPost); 
         window.location.reload();
           
        } catch (error) {
            console.log(error);
        }
    }
  return ( 
     <div className="share">
        <div className="shareWrapper">
           <div className="shareTop">
               <img className="shareProfileImg" src={user.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.png"} alt=""/>
               <input placeholder={"What's in your mind "+user.username+" ?"} ref={desc} className="shareInput"/>
           </div>
           <hr className="shareHr"/>
           {file && (
               <div className="shareImgContainer">
                   <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                   <Cancel  className="shareCancelImg" onClick={()=>setFile(null)} />
               </div>
           )}
           <form className="shareBottom" onSubmit={submitHandler}>
               <div className="shareOptions">
                   <label htmlFor="file" className="shareOption">
                       <PermMedia htmlColor='tomato' className="shareIcon" />
                       <span className="shareText">Photo or video</span>
                       <input style={{display: 'none'}} name="file" type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=>setFile(e.target.files[0])} />
                   </label>
                   <div className="shareOption">
                       <Label htmlColor='blue' className="shareIcon" />
                       <span className="shareText">Tag</span>
                   </div>
                   <div className="shareOption">
                       <Room htmlColor='green' className="shareIcon" />
                       <span className="shareText">Location</span>
                   </div>
                   <div className="shareOption">
                       <EmojiEmotions htmlColor='goldenrod' className="shareIcon" />
                       <span className="shareText">Feelings</span>
                   </div>
               </div>
               <button type="submit" className="shareButton">Share</button>
           </form>
        </div>
     </div>
  );
}

export default Share;
