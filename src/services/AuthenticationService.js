import axios from "axios";
import { API_URL } from "../Constants";
export const USER_NAME_SESSION_ATTRIBUTE_NAME = "authenticatedUser";

class AuthenticationService {
  registerSuccessfulLogin(username, password) {
    sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
  }

  // //xử lý đăng xuất
  // logout(){
  //     sessionStorage.removeItem("authenticateUser");
  // }

  // isUserLoggedIn() {
  //     let user = sessionStorage.getItem("authenticateUser")
  //     console.log("authenticateUser",user);
  //     if (user === null) return false
  //     return true
  // }
  executeJwtAuthenticationService(username, password) {
    console.log(`${API_URL}/authenticate`);
    return axios.post(`${API_URL}/authenticate`, {
      username,
      password,
    });
  }

 
  registerSuccessfulLoginForJwt(username, token) {
    // debugger;
    sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    sessionStorage.setItem("tokenStorage", token);
    //this.setupAxiosInterceptors(this.createJWTToken(token))
  }

  createJWTToken(token) {
    return "Bearer " + token;
  }

  // logout() {
  //     sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
  // }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) return false;
    return true;
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) return "";
    return user;
  }

  setupAxiosInterceptors(token) {
    debugger;
    axios.interceptors.request.use((config) => {
      if (this.isUserLoggedIn()) {
        config.headers.authorization = token;
      }
      return config;
    });
  }
}

export default new AuthenticationService();
