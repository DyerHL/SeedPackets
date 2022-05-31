import React from "react";
import { signInUser } from "../Data/Auth";

export default function SignIn() {
    const handleClick = (e) => {
        signInUser();
    };

    return (
        <div>
            <h1>Welcome to Seed Packets</h1>
            <h1>Please Log In</h1>
            <div>IMG</div>
            <button type="submit" onClick={(e) => handleClick(e)}>Sign In</button>
        </div>
    )
};
