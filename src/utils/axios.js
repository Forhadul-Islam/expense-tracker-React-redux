import axios from "axios";

const axiosInstrance = axios.create({
  baseURL: "http://localhost:9000/",
});

export default axiosInstrance;
