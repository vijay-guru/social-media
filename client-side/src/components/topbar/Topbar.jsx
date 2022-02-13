import './topbar.css'
import {Search,Chat,Person,Notifications, Star} from '@material-ui/icons';
import {Link} from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'
import {useContext} from 'react'
function Topbar() {
    const {user}=useContext(AuthContext)
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to='/' style={{textDecoration:"none"}}>
                <span className="logo"><b>VijayGuru</b></span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchBar">
                    <Search className="searchIcon"/>
                    <input placeholder="Search for friend/post or video" className="searchInput"/>
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                   <a target="_blank" style={{textDecoration:"none"}} href="https://github.com/vijay-guru"><span className="topbarLink"><Star className="topbarLinkStar"/> Star a repo <Star className="topbarLinkStar"/></span></a>
                    <span className="topbarLink">Logout</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                      <Link to="/messenger" style={{textDecoration:"none",color:"white"}}><Chat/></Link>
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
               <Link to={"/profile/"+user.username}> <img src={user.profilePicture ? PF+user.profilePicture : PF+"/person/noAvatar.png" } alt="" className="topbarImage" /></Link>
            </div>
        </div>
    )
}

export default Topbar
