import { onSuccess, renderSpCart, renderSpUser } from "./controllers.js";
import phoneServUser from "../services/sevices.js";

let fetchProductListUser = () => {
  phoneServUser
    .getList()
    .then(function (res) {
      renderSpUser(res.data);
      console.log("resok:", res.data);
    })
    .catch(function (err) {});
};

fetchProductListUser();

let arrCartUser = [];
console.log("🚀 ~ file: index.js:17 ~ arrCartUser:", arrCartUser);
window.addCartUser = (id) => {
  phoneServUser
    .getDetail(id)
    .then(function (res) {
      arrCartUser.push(res.data);

      saveStorageArr();
      renderSpCart(arrCartUser);
      onSuccess("Thêm sp thành công");
    })
    .catch(function (err) {});
};

//giới hạn số lượng chữ xuất hiện
let convertName = (name) => {
  let maxLength = 17;
  if (name.length > maxLength) {
    return name.slice(0, maxLength) + "...";
  } else {
    return name;
  }
};

//Phương thức lưu vào application storage
let saveStorageArr = () => {
  //Chuyển arr về chuỗi
  let strArrCart = JSON.stringify(arrCartUser); // '[{},{},{}]'
  //Lưu string vào storage
  localStorage.setItem("arrCartUser", strArrCart);
};

//Phương thức lấy dữ liệu từ localstorage
let getStorageJSON = (name) => {
  if (localStorage.getItem(name)) {
    //Nếu có storage name đó thì mới đi vào if
    let str = localStorage.getItem(name);
    let jsonValue = JSON.parse(str);

    console.log("jsonValue", jsonValue);
    return jsonValue;
  }
  return null;
};

window.onload = () => {
  getStorageJSON(arrCartUser);
};
