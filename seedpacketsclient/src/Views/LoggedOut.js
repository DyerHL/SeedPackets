import React from "react";
import { signInUser } from "../Data/Auth";

export default function SignIn() {
    return (
        <div>
            <h1>Welcome to Seed Packets</h1>
            <h1>Please Log In</h1>
            <div>IMG</div>
            <button type="button" onSubmit={signInUser}>Sign In</button>
        </div>
    )
};
