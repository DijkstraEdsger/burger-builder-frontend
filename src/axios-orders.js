import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-a029c-default-rtdb.firebaseio.com/",
});

export default instance;
