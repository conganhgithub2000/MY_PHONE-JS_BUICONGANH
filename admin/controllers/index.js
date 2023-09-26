import {
  layThongTinTuForm,
  onSuccess,
  renderDSSP,
  renderListPage,
  showThongTinLenForm,
} from "./controllers.js";
import phoneServ from "../services/services.js";
import { stringToSlug, validation } from "../util/method.js";

let perPage = 10;
let currentPage = 1;
let start = 0;
let end = perPage;
let totalPages = 3;
let btnNext = document.querySelector(".btn__next");
let btnPrev = document.querySelector(".btn__prev");

let fetchProductList = () => {
  phoneServ
    .getList()
    .then(function (res) {
      renderDSSP(res.data, start, end);
    })
    .catch(function (err) {});
};

fetchProductList();

window.deleteSp = (id) => {
  phoneServ
    .deleteSp(id)
    .then(function (res) {
      fetchProductList();
      onSuccess("Xóa thành công");
    })
    .catch(function (err) {});
};

window.addSp = () => {
  let sp = layThongTinTuForm();

  //kiểm tra không được bỏ trống
  var valid =
    validation.kiemTraRong(sp.name, "phoneName") &
    validation.kiemTraRong(sp.price, "price") &
    validation.kiemTraRong(sp.screen, "screen") &
    validation.kiemTraRong(sp.backCamera, "backCamera") &
    validation.kiemTraRong(sp.frontCamera, "frontCamera") &
    validation.kiemTraRong(sp.img, "imgLink") &
    validation.kiemTraRong(sp.desc, "description");

  // kiểm tra tất cả phải là số
  valid = valid & validation.kiemTraNumber(sp.price, "price");

  // kiểm tra thương hiệu
  valid = valid & validation.kiemTraThuongHieu(sp.type, "brand");

  if (!valid) {
    return;
  }

  document.getElementById("MaSP").disabled = false;
  document.querySelector("#btnCapNhapSP").disabled = false;
  document.querySelector("#btnThemSP").disabled = false;

  phoneServ
    .addSp(sp)
    .then(function (res) {
      console.log("res:", res);
      $("#myModal").modal("hide");
      fetchProductList();
      onSuccess("Thêm sp thành công");
    })
    .catch(function (err) {});
};
//vô hiện hóa btn
document.querySelector("#btnThem").onclick = function () {
  document.querySelector("#btnCapNhapSP").disabled = true;
};
document.querySelector("#btnDong").onclick = function () {
  document.querySelector("#btnCapNhapSP").disabled = false;
  document.querySelector("#btnThemSP").disabled = false;
};

window.editSp = (id) => {
  phoneServ
    .getDetail(id)
    .then(function (res) {
      console.log("res:show", res.data);
      $("#myModal").modal("show");
      showThongTinLenForm(res.data);
    })
    .catch(function (err) {});
  document.getElementById("MaSP").disabled = true;
  document.querySelector("#btnThemSP").disabled = true;
  document.querySelector("#btnCapNhapSP").disabled = false;
};

window.updateSp = () => {
  let sp = layThongTinTuForm();
  //kiểm tra không được bỏ trống
  var valid =
    validation.kiemTraRong(sp.name, "phoneName") &
    validation.kiemTraRong(sp.price, "price") &
    validation.kiemTraRong(sp.screen, "screen") &
    validation.kiemTraRong(sp.backCamera, "backCamera") &
    validation.kiemTraRong(sp.frontCamera, "frontCamera") &
    validation.kiemTraRong(sp.img, "imgLink") &
    validation.kiemTraRong(sp.desc, "description");

  // kiểm tra tất cả phải là số
  valid = valid & validation.kiemTraNumber(sp.price, "price");

  // kiểm tra thương hiệu
  valid = valid & validation.kiemTraThuongHieu(sp.type, "brand");

  if (!valid) {
    return;
  }

  document.querySelector("#btnThemSP").disabled = false;

  phoneServ
    .updateSp(sp)
    .then(function (res) {
      //lấy lại danh sách sản phẩm sau khi cập nhập thành công
      fetchProductList();
      $("#myModal").modal("hide");
      onSuccess("Cập nhập thành công");
    })
    .catch(function (err) {});
};

window.reset = () => {
  // productForm - ID của thẻ form chứa các input cần reset
  document.getElementById("productForm").reset();
};

window.arrange = () => {
  let trData = document.querySelector("tr[data-title]");
  phoneServ
    .getList()
    .then(function (res) {
      let order = trData.getAttribute("data-order");
      let arrArrange = _.orderBy(res.data, ["price"], [order]);
      if (order == "asc") {
        trData.setAttribute("data-order", "desc");
      } else {
        trData.setAttribute("data-order", "asc");
      }
      renderDSSP(arrArrange);
    })
    .catch(function (err) {});
};

renderListPage(totalPages);
//page
let getCurrentPage = (currentPage) => {
  start = (currentPage - 1) * perPage;
  end = currentPage * perPage;
};

//lùi lại trang
window.btnPrev = () => {
  currentPage--;
  resetActive();
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
  fetchProductList();
};

//tiến tới 1 trang
window.btnNext = () => {
  currentPage++;
  resetActive();
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
  fetchProductList();
};

let btnPage = document.querySelectorAll("#number__page button");
btnPage.forEach((button, index) => {
  button.addEventListener("click", () => {
    resetActive();
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
    fetchProductList();
  });
});

function resetActive() {
  btnPage.forEach((button) => {
    button.classList.remove("active");
  });
}

document.querySelector("#keyword").oninput = function (event) {
  let keySearch = event.target.value;
  phoneServ
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
      renderDSSP(arrSearch, start, end);
    })
    .catch(function (err) {});
};
