import axios from "axios";

const API_URL = "http://localhost:8000/api/vaccine-registration/";

// Create new registration
const registerVaccine = async (registrationsData) => {
  const response = await axios.post(API_URL + "register", registrationsData);
  return response.data;
};


// registrations
const getRegistrationHistory = async (userData) => {
  const response = await axios.get(API_URL + "history", {
    params: { phone: userData.phone, citizenId: userData.citizenId },
  });
  return response.data;
};


const registrationsService = {
  registerVaccine,
  getRegistrationHistory,

};

export default registrationsService;
