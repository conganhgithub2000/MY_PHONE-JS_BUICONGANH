import {
  itemcart,
  onSuccess,
  renderListPage,
  renderSpCart,
  renderSpUser,
} from "./controllers.js";
import phoneServUser from "../services/sevices.js";
import { stringToSlug } from "../util/method.js";
//thông số để tạo ra page
let perPage = 8;
let currentPage = 1;
let start = 0;
let end = perPage;
let totalPages = 3;
let btnNext = document.querySelector(".btn__next");
let btnPrev = document.querySelector(".btn__prev");

//hiển thị sp ra màng hình user
let fetchProductListUser = () => {
  phoneServUser
    .getList()
    .then(function (res) {
      renderSpUser(res.data, start, end);
    })
    .catch(function (err) {});
};
fetchProductListUser();
//render ra list page
renderListPage(totalPages);
//page
let getCurrentPage = (currentPage) => {
  start = (currentPage - 1) * perPage;
  end = currentPage * perPage;
};
//lùi lại trang
window.btnPrev = () => {
  currentPage--;
  reset();
  if (currentPage <= 1) {
    currentPage = 1;
  }
  if (currentPage == 1) {
    btnPrev.classList.add("disabled_my");
  } else {
    btnNext.classList.remove("disabled_my");
  }
  $(`.number__page button:eq(${currentPage - 1})`).addClass("active");
  getCurrentPage(currentPage);
  fetchProductListUser();
};
//tiến tới 1 trang
window.btnNext = () => {
  currentPage++;
  reset();
  if (currentPage > totalPages) {
    currentPage = totalPages;
  }
  if (currentPage == totalPages) {
    btnNext.classList.add("disabled_my");
  } else {
    btnPrev.classList.remove("disabled_my");
  }
  $(`.number__page button:eq(${currentPage - 1})`).addClass("active");
  getCurrentPage(currentPage);
  fetchProductListUser();
};
//chọn page cần tới
let btnPage = document.querySelectorAll("#number__page button");
btnPage.forEach((button, index) => {
  button.addEventListener("click", () => {
    reset();
    let value = index + 1;
    currentPage = value;
    button.classList.add("active");

    if (currentPage == totalPages) {
      btnNext.classList.add("disabled_my");
    } else {
      btnNext.classList.remove("disabled_my");
    }
    if (currentPage == 1) {
      btnPrev.classList.add("disabled_my");
    } else {
      btnPrev.classList.remove("disabled_my");
    }

    getCurrentPage(currentPage);
    fetchProductListUser();
  });
});
//reset (remove active)
function reset() {
  btnPage.forEach((button) => {
    button.classList.remove("active");
  });
}
//render details
let detailItem = [];
window.details = (id) => {
  detailItem = [];
  phoneServUser
    .getDetail(id)
    .then(function (res) {
      detailItem.push(res.data);
      saveStorageDetail(detailItem);
      window.location.href = "/customer/views/detailSp.html";
    })
    .catch(function (err) {});
};
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
        renderSpUser(arrDropdown, start, end);
      }
    })
    .catch(function (err) {});
};
//Phương thức lưu vào application storage
//lưu arr cart
let saveStorageArr = () => {
  //Chuyển arr về chuỗi
  let strArrCart = JSON.stringify(arrCartUser); // '[{},{},{}]'
  //Lưu string vào storage
  localStorage.setItem("arrCartUser", strArrCart);
};
//lưu arr detail sp
let saveStorageDetail = (detailItem) => {
  //Chuyển arr về chuỗi
  let strDetailItem = JSON.stringify(detailItem); // '[{},{},{}]'
  //Lưu string vào storage
  localStorage.setItem("detailItem", strDetailItem);
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
//tìm kiếm theo tên sp
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
//tự động chạy khi load trang
window.onload = () => {
  arrCartUser = getStorageJSON("arrCartUser");
  renderSpCart(arrCartUser);
};

//chưa fix title, giá tiền của giỏ hành
//chưa thêm phần sp tương tự
//cho lấy được totalPage để nó tự động render thêm nếu sp nhiều lên (đang cho cố định)
