import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/js/src/collapse';
import { getFrostDateById, getFrostDateByName } from '../Data/FrostDate';
import { signOutUser, updateUser } from '../Data/Auth';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// need logo asset

const initialState = {
    name: '',
};

export default function Navbar({ user }) {
    const [formInput, setFormInput] = useState(initialState);
    const [date, setDate] = useState();

    useEffect( async () => {
        setFormInput(initialState);
        if(user.frostDateId) {
            const result = await getFrostDateById(user.frostDateId);
            setDate(result);
        };
    }, []);

    const handleChange = (e) => {
        setFormInput((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormInput(e.target.value);
        const searchString = formInput.name;
        const result = await getFrostDateByName(searchString);
        console.clear();
        updateUser(result, user.uid);
        setDate(result);
    };

    const handleLogOut = (e) => {
        signOutUser();
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
                        ""
                    )}
                    <li className='nav-item'>
                        {user.frostDateId ? (
                            <div>Your Frost Date: {date.averageFrostDate}</div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <label>Enter Your City:</label>
                                <input type="text" id="name" value={formInput.name} onChange={handleChange}  />
                                <button type="submit">Submit</button>
                            </form> 
                        )}
                    </li>
                    <li>
                        <button onClick={(e) => handleLogOut(e)}>LOGOUT</button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

Navbar.propTypes = {
    user: PropTypes.shape(PropTypes.obj).isRequired
};
