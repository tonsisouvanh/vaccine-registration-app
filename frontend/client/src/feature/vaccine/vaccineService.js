import axios from "axios";

const API_URL = "http://localhost:8000/api/vaccines/";

// Create new vaccine
const createVaccine = async (vaccineData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, vaccineData, config);

  return response.data;
};

// vaccines
const getVaccines = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
// vaccines
const getVaccine = async (id) => {
  const response = await axios.get(API_URL+id);
  return response.data;
};

// Delete user vaccine
const deleteVaccine = async (vaccineId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + vaccineId, config);

  return response.data;
};

const vaccineService = {
  createVaccine,
  getVaccines,
  getVaccine,
  deleteVaccine,
};

export default vaccineService;
