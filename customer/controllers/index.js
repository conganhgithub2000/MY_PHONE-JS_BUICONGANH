import {
  itemcart,
  onSuccess,
  renderSpCart,
  renderSpUser,
} from "./controllers.js";
import phoneServUser from "../services/sevices.js";

//hiển thị sp ra màng hình user
let fetchProductListUser = () => {
  phoneServUser
    .getList()
    .then(function (res) {
      renderSpUser(res.data);
    })
    .catch(function (err) {});
};

fetchProductListUser();
//thêm sp vào giỏ hàng
let arrCartUser = [];
window.addCartUser = (id) => {
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
//khi user chọn loại sp thì sẽ tự in ra màng hình loại sp đó
window.productType = () => {
  let loaiTimKiem = document.getElementById("dropdown_sp").value;
  phoneServUser
    .getList()
    .then(function (res) {
      if (loaiTimKiem == "All") {
        fetchProductListUser();
      } else {
        let arrDropdown = [];
        for (let index = 0; index < res.data.length; index++) {
          let sp = res.data[index];
          if (loaiTimKiem == sp.type) {
            arrDropdown.push(sp);
          }
        }
        renderSpUser(arrDropdown);
      }
    })
    .catch(function (err) {});
};

window.plus = (index) => {
  arrCartUser[index].quantity += 1;
  renderSpCart(arrCartUser);
  saveStorageArr();
};

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

document.querySelector("#keyword").oninput = function (event) {
  let keySearch = event.target.value;
  phoneServUser
    .getList()
    .then(function (res) {
      let arrSearch = [];
      for (let index = 0; index < res.data.length; index++) {
        let sp = res.data[index];
        let namePhone = res.data[index].name;

        keySearch = keySearch.toLowerCase(); //đổi từ chữ HOA --> thường
        namePhone = namePhone.toLowerCase(); //đổi từ chữ HOA --> thường
        // keySearch = stringToSlug(keySearch); //đổi từ chữ HOA --> thường
        // namePhone = stringToSlug(namePhone); //đổi từ chữ HOA --> thường
        if (namePhone.search(keySearch) !== -1) {
          arrSearch.push(sp);
        }
      }
      renderSpUser(arrSearch);
    })
    .catch(function (err) {});
};

window.onload = () => {
  arrCartUser = getStorageJSON("arrCartUser");
  renderSpCart(arrCartUser);
};
