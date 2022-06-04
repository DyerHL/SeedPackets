import React from "react";
import { signInUser } from "../Data/Auth";
import logo from '../Assests/logo-nobg.png';

export default function SignIn() {
    console.clear();
    const handleClick = (e) => {
        signInUser();
    };

    return (
        <div className="signedout">
            <h1>Welcome to Seed Packets</h1>
            <h1>Please Log In</h1>
            <img src={logo} />
            <p className="desc">Seed Packets is an app designed to help home gardeners in Tennessee schedule their seed starting at the beginning of the growing season. Input your city, and information from your seed packets and this app does the rest. </p>
            <button className="signin" type="submit" onClick={(e) => handleClick(e)}>Sign In</button>
        </div>
    )
};
