import React, { useContext, useState,useEffect, useRef  } from 'react';
import ChatOnline from '../../components/chatOnline/ChatOnline';
import Conversation from '../../components/conversation/Conversation';
import Message from '../../components/message/Message';
import Topbar from '../../components/topbar/Topbar';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios'
import './messenger.css'
function Messenger() {
    const[conversations,setConversations]=useState([])
    const[currentChat,setCurrentChat]=useState(null);
    const[messages,setMessages]=useState([])
    const[newMessage,setNewMessage]=useState("")
    const {user}=useContext(AuthContext)
    const scrollRef=useRef()

    useEffect(()=>{
        const getConversations=async()=>{
            try {
                const res=await axios.get('/conversations/'+user._id);
                setConversations(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getConversations();
    },[user])

    useEffect(()=>{
        const getMessages=async()=>{
          try {
            const res=await axios.get('/messages/'+currentChat?._id);
            setMessages(res.data);
          } catch (error) {
            console.log(error);
          }
        }
        getMessages();
      },[currentChat]) 
const handleSubmit=async (e)=>{
    e.preventDefault();
    const message={
        sender:user._id,
        text:newMessage,
        conversationId:currentChat._id
    };
    try {
        const res=await axios.post('/messages',message);
        setMessages([...messages,res.data]);
        setNewMessage("");
    } catch (error) {
        console.log(error)
    }
}
useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior:"smooth"});
  },[messages])
  return (
  <>
      <Topbar/>
      <div className="messenger">
         <div className="chatMenu">
             <div className="chatMenuWrapper">
                 <input placeholder="Search for friends" type="text"className="chatMenuInput" />
                 {conversations.map((c)=>(
                     <div key={c._id} onClick={()=>setCurrentChat(c)}>
                     <Conversation conversation={c} currentUser={user}/>
                     </div>
                 ))}
             </div>
         </div>
         <div className="chatBox">
         <div className="chatBoxWrapper">
            { currentChat ?
             (<>
                 <div className="chatBoxTop">
                     <div ref={scrollRef}>
                     {messages.map((m)=>(
                          <Message key={m._id} message={m} own={m.sender === user._id}/>
                     ))}
                    </div>
                 </div>
                 <div className="chatBoxBottom">
                     <textarea value={newMessage} onChange={(e)=>setNewMessage(e.target.value)} placeholder="Enter your message" className="chatMessageInput"></textarea>
                     <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                 </div>
                 </>
                 ) : (
                     <span className="noConversationText">Open conversation to start chat</span>
                 )
}
</div>
             
         </div>
         <div className="chatOnline">
             <div className="chatOnlineWrapper">
                 <ChatOnline/>
             </div>
         </div>
      </div>
  </>
  );
}

export default Messenger;
