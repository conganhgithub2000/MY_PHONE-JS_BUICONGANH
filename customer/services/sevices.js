const BASE_URL = "https://64db49ec593f57e435b0bbaf.mockapi.io/product1";

let getList = () => {
  return axios({
    url: BASE_URL,
    method: "GET",
  });
};

// let deleteSp = (id) => {
//   return axios({
//     url: `${BASE_URL}/${id}`,
//     method: "DELETE",
//   });
// };

// let addSp = (sp) => {
//   return axios({
//     url: BASE_URL,
//     method: "POST",
//     data: sp,
//   });
// };

let getDetail = (id) => {
  return axios({
    url: `${BASE_URL}/${id}`,
    method: "GET",
  });
};

// let updateSp = (sp) => {
//   return axios({
//     url: `${BASE_URL}/${sp.id}`,
//     method: "PUT",
//     data: sp,
//   });
// };

let phoneServUser = {
  getList,
  // deleteSp,
  // addSp,
  getDetail,
  // updateSp,
};

export default phoneServUser;
