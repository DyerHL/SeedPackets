import { signOutUser } from "../Data/Auth";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

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
                  <span><FontAwesomeIcon icon={faArrowRightFromBracket} /></span>
            </button>
        </div>
    )
}