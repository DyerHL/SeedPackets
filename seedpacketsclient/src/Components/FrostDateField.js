import { useState } from "react";
import { getFrostDateByName, searchCity } from "../Data/FrostDate";

export default function FrostDateField() {
    const [date, setDate] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        const searchString = e.target.value.toLowerCase();
        getFrostDateByName(searchString).then(setDate);
    }

    return (
        <>
        {date ? (
            <div>Your Frost Date: {date}</div>
        ) : (
            <form onSubmit={handleSubmit}>
                <label>Enter Your City:</label>
                <input type="search" id="search-value" />
                <button type="submit">Submit</button>
            </form> 
        )};
        </>
    )
}
