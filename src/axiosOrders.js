import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-builder-afe3b-default-rtdb.firebaseio.com/",
});

export default instance;
