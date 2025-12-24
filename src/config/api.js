const DEFAULT_API_BASE_URL = "https://love-gifts-api.onrender.com";
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || DEFAULT_API_BASE_URL;
const API_BASE_URL = apiBaseUrl.replace(/\/$/, "");

export default API_BASE_URL;
