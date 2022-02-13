import './message.css';
import {format} from 'timeago.js'
function Message({message,own}) {
  return (
      <div className={own ?"message own" : "message"}>
          <div className="messageTop">
              <img src="https://hindibate.com/wp/WhatsApp-DP-For-Girls-HD-1686.png" alt="" className="messageImg" />
              <p className="messageText">{message.text}</p>
          </div>
          <div className="messageBottom">{format(message.createdAt)}</div>
      </div>
  );
}

export default Message;
