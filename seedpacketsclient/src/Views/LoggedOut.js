import React from "react";
import { signInUser } from "../Data/Auth";
import logoalt from '../Assests/logoalt.PNG';

export default function SignIn() {
    console.clear();
    const handleClick = (e) => {
        signInUser();
    };

    return (
        <div className="signedout">
            <h1 className="large-text">Log In to Start Planning Your Garden</h1>
            <img src={logoalt} />
            <br />
            <button className="signin" type="submit" onClick={(e) => handleClick(e)}>Sign In</button>
            <br />
            <p className="desc">Seed Packets is an app designed to help home gardeners in Tennessee schedule their seed starting at the beginning of the growing season. Input your city, and information from your seed packets and this app does the rest. </p>
        </div>
    )
};
