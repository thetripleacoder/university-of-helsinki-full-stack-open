import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.log('fail');
    });
};

const create = (newObject) => {
  let request = axios.post(baseUrl, newObject);
  return request;
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request;
};

const deleteNumber = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request;
};

export default { getAll, create, update, deleteNumber };
