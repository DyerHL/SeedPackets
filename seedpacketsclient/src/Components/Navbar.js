import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/js/src/collapse';
import FrostDateField from './FrostDateField';
import { getFrostDateByName } from '../Data/FrostDate';
import { updateUser } from '../Data/Auth';

// need logo asset
export default function Navbar() {
    const [date, setDate] = useState();
    const uid = sessionStorage.getItem("uid");

    const handleSubmit = (e) => {
        e.preventDefault();
        const searchString = e.target.value.toLowerCase();
        getFrostDateByName(searchString).then(setDate).then(updateUser(date, uid));
    };

    return(
        <nav className="navbar navbar-expand navbar-light justify-content-center fixed-top">
            <Link className="navbar-brand navbar-logo" to="/">
                <img to="/" alt='logo' style={{ width: '100px' }}/>
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarTogglerDemo02"
                aria-controls="navbarTogglerDemo02"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon" />
            </button>
            <div className="" id="navbarTogglerDemo02">
                <ul className="navbar-nav mr-auto">
                    {date ? (
                        <li className="nav-item">
                            <Link className="nav-link" to="/create">
                                Add A Seed Packet
                            </Link>
                        </li>    
                    ) : (
                        <li className="nav-item hidden-link">
                            <Link className="nav-link"to="/">
                              SECRET LINK
                            </Link>
                        </li>
                    )}
                    <li className='nav-item'>
                        {date ? (
                            <div>Your Frost Date: {date.AverageFrostDate}</div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <label>Enter Your City:</label>
                                <input type="search" id="search-value" />
                                <button type="submit">Submit</button>
                            </form> 
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    )
}
