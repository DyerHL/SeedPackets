import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/src/collapse';
import { getFrostDateById, getFrostDateByName } from '../Data/FrostDate';
import { signOutUser, updateUser } from '../Data/Auth';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import logo from '../Assests/logo-nobg.png';

const initialState = {
    name: '',
};

export default function Navbar({ user }) {
    const [formInput, setFormInput] = useState(initialState);
    const [date, setDate] = useState(null);
    const [variable, setVariable] = useState(null);

    
    useEffect(() => {
        setFormInput(initialState);
        if(user.frostDateId) {
            getFrostDateById(user.frostDateId).then(setDate);
        };
    }, []);
    
    useEffect(() => {
        async function dateToString(input) {
            const toJSDate = await new Date(input.averageFrostDate);
            const dateToText = await toJSDate.toLocaleString('default', {month: 'long', day: 'numeric'});
            setVariable(dateToText);
        };
        dateToString(date);
    }, [date])
    
    const handleChange = (e) => {
        setFormInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await getFrostDateByName(formInput.name);
        updateUser(result, user.uid).then(setDate(result));
    };


    return(
        <nav className="navbar navbar-expand-md navbar-dark fixed-top">
            <div className='container-fluid'>
                <Link className="navbar-brand navbar-logo" to="/">
                    <img className="navbar-brand navbar-logo" to="/" alt='logo' style={{ width: '50px' }} src={logo}/>
                </Link>
                <div className='navbar greeting'>Lets Get Planting, {user.name}!</div>
                {/* Seed Packet Button */}
                    {date ? (
                        <Link type="button" className="nav-link" to="/create">
                            Add A Seed Packet
                        </Link>
                    ) : (
                    ""
                    )}
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
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav">
                        <li className="nav-item add-packet">
                        </li>    
                        <li className='nav-item frost'>
                            {/* Frost Date Field */}
                                {(date != null) ? (
                                    <div className='frost-item'>Your Frost Date: <strong>{variable}</strong></div>
                                ) : (
                                    <form className="city-form" onSubmit={handleSubmit}>
                                        <label className="label" htmlFor="name">Enter Your City:</label>
                                        <input type="text" id="name" name="name" value={formInput.name} onChange={handleChange}  />
                                        <button className="button" type="submit">Submit</button>
                                    </form> 
                                )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

Navbar.propTypes = {
    user: PropTypes.shape(PropTypes.obj).isRequired
};
