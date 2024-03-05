import axios from "axios";


export default {
  // Get all items in collection
  getItems: (collectionName) => {
    return axios.get(`/api/${collectionName}`);
  },
  getItemsByLeague: (collectionName, league) => {
    return axios.get(`/api/${collectionName}/league/${league}`);
  },
  // Get item by id
  getItemById: (collectionName, id) => {
    return axios.get(`/api/${collectionName}/${id}`);
  },

  // Create item
  createItem: (collectionName, items) => {
    return axios.post(`/api/${collectionName}`, items);
  },
  // Login Authentication
  confirmUser: (user) => {
    return axios.post(`/api/users/confirmUser`, user);
  },
  // Update item
  updateItem: (collectionName, id, update) => {
    return axios.put(`/api/${collectionName}/${id}`, update);
  },
  // Delete item by id
  deleteItemById: (collectionName, id) => {
    return axios.delete(`/api/${collectionName}/${id}`);
  },
  getCurrentWeek: (sport, league) => {
    return axios.get(
      `http://site.api.espn.com/apis/site/v2/sports/${sport}/${league}/scoreboard`
    );
  },
  getWeeksInfo: (sport, league, season, week) => {
    return axios.get(
      `http://site.api.espn.com/apis/site/v2/sports/${sport}/${league}/scoreboard?seasontype=${season}&week=${week}`
    );
  },
  getStandingsInfo: (sport, league) => {
    return axios.get(
      `https://site.api.espn.com/apis/v2/sports/${sport}/${league}/standings`
    );
  },
};
