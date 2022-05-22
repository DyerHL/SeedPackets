import axios from "axios";
import { resolve } from "path";

const baseUrl = "https://localhost:7027/Api/FrostDate";

// GET ALL FROST DATES
const getFrostDates = () => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

//SEARCH FROST DATES
const searchCity = (searchString) => new Promise((resolve, reject) => {
    getFrostDates().then((dates) => {
        const foundCity = dates.filter((name) => {
            const queryByName = name.toLowerCase().includes(searchString);
            return queryByName;
        });
        resolve(foundCity);
    })
    .catch(reject);
});

export {
    getFrostDates,
    searchCity
};
