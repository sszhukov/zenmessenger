import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { BASE_URL_API } from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  actions: {
    loadContactsData() {
      return axios.get(`${BASE_URL_API}/users`)
        .then((resporse) => resporse.data);
    },
    loadContactPhotos(context, id) {
      return axios.get(`${BASE_URL_API}/photos/${id}`)
        .then((response) => response.data);
    },
    loadMessages(context, id) {
      return axios.get(`${BASE_URL_API}/comments?postId=${id}`)
        .then((response) => response.data);
    },
    sendMessage(context, message) {
      return axios.post(`${BASE_URL_API}/comments`, { params: message })
        .then((response) => response.data.params);
    },
  },
});
