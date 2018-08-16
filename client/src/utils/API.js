import axios from 'axios';

// Export an object containing methods we'll use for accessing the Dog.Ceo API

export default {
  getInstance: function(id) {
    return axios.get(`http://localhost:8081/api/instance/${id}`);
  }
};
