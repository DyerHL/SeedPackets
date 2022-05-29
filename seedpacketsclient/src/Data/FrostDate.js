import axios from "axios";

const baseUrl = "https://localhost:7027/Api/FrostDate";

// GET ALL FROST DATES
const getFrostDates = () => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

//SEARCH FROST DATES
const searchCity = (searchString) => new Promise((resolve, reject) => {
    getFrostDates().then((response) => {
        const foundCity = response.filter((name) => {
            const queryByName = name.toLowerCase().includes(searchString);
            return queryByName;
        });
        resolve(foundCity.AverageFrostDate);
    })
    .catch(reject);
});

// GET FROST DATE BY ID
const getFrostDateById = (id) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/Id/${id}`)
    .then((response) => resolve((response.data)))
    .catch(reject);
});

// GET FROST DATE BY NAME
const getFrostDateByName = (name) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/Name/${name}`)
    .then((response) => resolve((response.data)))
    .catch(reject);
});

export {
    getFrostDates,
    searchCity,
    getFrostDateById,
    getFrostDateByName
};
