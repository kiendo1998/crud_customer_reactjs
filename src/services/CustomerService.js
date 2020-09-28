import axios from "axios";
import { API_URL } from "../Constants";

class CustomerService {
  //Lấy ra danh mục cơ quan thuế DISTINCT
  // getDistinctDmcqt(setValueFn, token, apiUrl) {
  //     return (
  //         Axios.get(
  //             ` ${apiUrl}/api/dmcqt`
  //             , {
  //                 headers: { Authorization: `Bearer ${token}` }
  //             }
  //         )
  //             .then(res => {
  //                 setValueFn(res.data);
  //             }).catch(err => {
  //                 console.log("Error getDistinctDmcqt()", err);
  //                 setValueFn([]);
  //             })
  //     )
  // }

  getCustomerList(setValueFn, token, apiUrl, page, countPerPage) {
    // debugger
    return axios
      .get(` ${apiUrl}/api/customers?page=${page}&size=${countPerPage}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setValueFn(res.data);
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setValueFn([]);
      });
  }
  addCustomer(name, age, token) {
    return axios
      .post(
        `${API_URL}/api/customers`,
        {
          name,
          age,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        // setValueFn(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        // setValueFn([]);
      });
  }
  editCustomer(id,name, age, token) {
    return axios
      .put(
        `${API_URL}/api/customers`,
        {
            id,
          name,
          age,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        // setValueFn(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        // setValueFn([]);
      });
  }

  deleteCustomer(id, token) {
    return axios
      .delete(
        `${API_URL}/api/customers/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        // setValueFn(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        // setValueFn([]);
      });
  }
  getCustomer(setCustomer,id, token) {
    return axios
      .get(
        `${API_URL}/api/customers/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setCustomer(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        // setValueFn([]);
      });
  }
  setCustomer(setCustomer, token) {
    return axios
      .get(
        `${API_URL}/api/customers/${setCustomer.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setCustomer(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        // setValueFn([]);
      });
  }
  
  



}

export default new CustomerService();
