import { signOutUser } from "../Data/Auth";
import { useNavigate } from "react-router";
import logout from '../Assests/logout.ico';

export default function Footer() {
    const nav = useNavigate();
    const handleClick = (e) => {
        signOutUser();
    }
    return (
        <div className="footer-nav">
            <button 
              onClick={handleClick}
              type="button"
              className="logout">
                  <img src={logout} alt="logout" />
            </button>
        </div>
    )
}