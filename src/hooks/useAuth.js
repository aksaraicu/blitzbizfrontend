import axios from "axios";
import jwt_decode from "jwt-decode";

export const useAuth = axios.create();

useAuth.interceptors.request.use(async (config) => {
  const check = await axios.get("token");
  const decoded = await jwt_decode(check.data);
  const exp = decoded.exp;
  if (exp * 1000 < new Date().getTime()) {
    const res = await axios.get("token");
    config.headers.Authorization = `Bearer ${res.data}`;
    return config;
  }
  config.headers.Authorization = `Bearer ${check.data}`;
  return config;
});
