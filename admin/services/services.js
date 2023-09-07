const BASE_URL = "https://64db49ec593f57e435b0bbaf.mockapi.io/product1";


let getList = () => {
  return axios({
    url: BASE_URL,
    method: "GET",
  });
};


let foodServ = {
  getList,
};

export default phoneServ;