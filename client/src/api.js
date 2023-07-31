// Define your base URL here
const BASE_URL = "https://grumpy-fedora-calf.cyclic.cloud/api/v1";

const AUTH_ENDPOINT = "/auth";
const SIGNUP_ENDPOINT = "/signup";
const LOGIN_ENDPOINT = "/login";
const USER_INFO_ENDPOINT = "/user-info";
const PRODUCTS_ENDPOINT = "/products";


export const API_BASE_URL = BASE_URL;
export const AUTH_URL = BASE_URL + AUTH_ENDPOINT;
export const SIGNUP_URL = BASE_URL + AUTH_ENDPOINT + SIGNUP_ENDPOINT;
export const LOGIN_URL = BASE_URL + AUTH_ENDPOINT + LOGIN_ENDPOINT;
export const USER_INFO_URL = BASE_URL + USER_INFO_ENDPOINT;
export const PRODUCTS_URL = BASE_URL + PRODUCTS_ENDPOINT;
