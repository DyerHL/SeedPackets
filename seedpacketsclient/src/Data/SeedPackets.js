import axios from "axios";

const baseUrl = "https://localhost:7027/Api/SeedPacket";

// GET SEED PACKETS BY USER'S UID
const getSeedPacketsByUid = (uid) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/user/${uid}`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

// GET SEED PACKET BY ID
const getSeedPacketById = (id) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/${id}`)
    .then((response) => resolve((response.data)))
    .catch(reject);
});

// ADD NEW SEED PACKET
const addSeedPacket = (obj) => new Promise((resolve, reject) => {
    axios.post(`${baseUrl}`, obj)
    .then((response) => resolve(response.data))
    .catch(reject);
});

// UPDATE SEED PACKET
const updateSeedPacket = (id, obj) => new Promise((resolve, reject) => {
    axios.put(`${baseUrl}/${id}`, obj)
    .then((response) => resolve(response.data))
    .catch(reject);
});

// DELETE SEED PACKET
const deleteSeedPacket = (id) => new Promise((resolve, reject) => {
    axios.delete(`${baseUrl}/${id}`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

// UPDATE PLANTING DATE
const updatedPlantedDate = (id) => new Promise((resolve, reject) => {
    axios.post(`${baseUrl}/${id}/Planted`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

// GET SEED PACKETS IN ALPHABETICAL ORDER
const getAlphabeticalSeedPackets = (uid) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/Alphabetical/${uid}`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const getSeedPacketsByPlantedStatus = (uid) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/Planted/${uid}`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

export {
    getSeedPacketsByUid,
    getSeedPacketById,
    addSeedPacket,
    updateSeedPacket,
    deleteSeedPacket,
    updatedPlantedDate,
    getAlphabeticalSeedPackets
};
