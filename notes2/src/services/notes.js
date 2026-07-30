import axios from 'axios';

const baseURL = `${import.meta.env.VITE_API_URL || ''}/api/notes`;
// const baseURL = 'http://127.0.0.1:3003/api/notes';
const getAll = () => {
  return axios.get(baseURL).then((response) => {
    // console.log(response);
    return response;
  });
};

const create = (newObject) => {
  const request = axios.post(baseURL, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseURL}/${id}`, newObject);
  // console.log(id, newObject);
  return request.then((response) => response.data);
};

const delNote = (id) => {
  const request = axios.delete(`${baseURL}/${id}`);
  return request;
};

export default {
  getAll,
  create,
  update,
  delNote,
};
