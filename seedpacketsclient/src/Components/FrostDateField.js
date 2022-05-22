import { useState } from "react";
import { searchCity } from "../Data/FrostDate";

export default function FrostDateField() {
    const [date, setDate] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        const searchString = document.querySelector('#search-value').value.toLowerCase();
        searchCity(searchString).then(setDate)
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label>Enter Your City:</label>
            <input type="search" id="search-value" />
            <button type="submit">Submit</button>
        </form> 
        </>
    )
}