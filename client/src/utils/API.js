import axios from 'axios';

const usertoken = localStorage.getItem('token');
const userId = localStorage.getItem('fbuid');

const headerConfig = {
  headers: {
    'access-token': usertoken,
    userId
  }
};

export default {
  getInstance: function(id) {
    return axios.get(`http://localhost:8081/api/instance/${id}`, headerConfig);
  },
  createInstance: function(data) {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'access-token': usertoken
      }
    };
    return axios.post(`http://localhost:8081/api/parser/`, data, config);
  },
  getInstanceByUser: function(userId) {
    return axios.get(
      `http://localhost:8081/api/instance/user/${userId}`,
      headerConfig
    );
  },
  deleteInstance: function(instanceId) {
    return axios.delete(
      `http://localhost:8081/api/instance/${instanceId}`,
      headerConfig
    );
  }
};
