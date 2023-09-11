import {
  layThongTinTuForm,
  onSuccess,
  renderDSSP,
  showThongTinLenForm,
} from "./controllers.js";
import phoneServ from "../services/services.js";
import { stringToSlug, validation } from "../util/method.js";

let fetchProductList = () => {
  phoneServ
    .getList()
    .then(function (res) {
      renderDSSP(res.data);
      console.log("res132:", res.data);
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
  var valid = validation.kiemTraNumber(sp.price, "price");

  // kiểm tra thương hiệu
  var valid = validation.kiemTraThuongHieu(sp.type, "brand");

  if (!valid) {
    return;
  }

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
};

window.updateSp = () => {
  let sp = layThongTinTuForm();
  phoneServ
    .updateSp(sp)
    .then(function (res) {
      //lấy lại danh sách sản phẩm sau khi cập nhập thành công
      fetchProductList();
      onSuccess("Cập nhập thành công");
      $("#myModal").modal("hide");
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
          console.log(arrSearch);
        }
      }
      renderDSSP(arrSearch);
    })
    .catch(function (err) {});
};
