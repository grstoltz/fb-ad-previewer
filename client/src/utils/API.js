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
    return axios.get(`/api/instance/${id}`, headerConfig);
  },
  getContent: function(id) {
    return axios.get(`/api/content/${id}`, headerConfig);
  },
  createInstance: function(data) {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'access-token': usertoken,
        userId
      }
    };
    return axios.post(`/api/instance/`, data, config);
  },
  getInstanceByUser: function() {
    return axios.get(`/api/instance/user/`, headerConfig);
  },
  deleteInstance: function(instanceId) {
    return axios.delete(`/api/instance/${instanceId}`, headerConfig);
  }
};
