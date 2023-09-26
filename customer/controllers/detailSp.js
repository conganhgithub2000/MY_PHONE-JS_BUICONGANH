import phoneServUser from "../services/sevices.js";
import {
  itemcart,
  onSuccess,
  renderDetails,
  renderSpCart,
} from "./controllers.js";

let detailItem = [];

//thêm sp vào giỏ hàng
let arrCartUser = [];
window.addCartDetail = (id) => {
  let check = true;
  if (arrCartUser.length > 0) {
    for (let index = 0; index < arrCartUser.length; index++) {
      let idSp = arrCartUser[index];
      if (idSp.id == id) {
        idSp.quantity += 1;
        renderSpCart(arrCartUser);
        onSuccess("Thêm sp thành công");
        saveStorageArr();
        check = false;
        break;
      }
    }
  }
  if (check) {
    phoneServUser
      .getDetail(id)
      .then(function (res) {
        let itemCart = itemcart(res.data);
        arrCartUser.push(itemCart);
        renderSpCart(arrCartUser);
        onSuccess("Thêm sp thành công");
        console.log("arrCartUser:", arrCartUser);
        saveStorageArr();
      })
      .catch(function (err) {});
  }
};
//xóa sp ra khỏi giỏ hàng
window.deleteSpCart = (indexDel) => {
  arrCartUser.splice(indexDel, 1);
  renderSpCart(arrCartUser);
  saveStorageArr();
};
//clear hết giỏ hàng
window.btnClearCart = () => {
  arrCartUser = [];
  renderSpCart(arrCartUser);
  saveStorageArr();
};
//khi người dùng click mua xong sẽ clear lại giỏ hàng
window.btnBuyProduct = () => {
  arrCartUser = [];
  renderSpCart(arrCartUser);
  saveStorageArr();
};
//tăng sp trong cart
window.plus = (index) => {
  arrCartUser[index].quantity += 1;
  renderSpCart(arrCartUser);
  saveStorageArr();
};
//giảm sp trong cart
window.minus = (index) => {
  if (arrCartUser[index].quantity >= 2) {
    arrCartUser[index].quantity -= 1;
    renderSpCart(arrCartUser);
    saveStorageArr();
  } else {
    arrCartUser.splice(index, 1);
    renderSpCart(arrCartUser);
    saveStorageArr();
  }
};
//Phương thức lưu vào application storage
//lưu arr cart
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

    return jsonValue;
  }
  return null;
};

window.onload = () => {
  detailItem = getStorageJSON("detailItem");
  renderDetails(detailItem);
  arrCartUser = getStorageJSON("arrCartUser");
  renderSpCart(arrCartUser);
};
