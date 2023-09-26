// render danh sách Admin
export let renderDSSP = (productList, start, end) => {
  let contentHTML = "";
  productList.map(({ id, name, price, img, desc }, index) => {
    if (index >= start && index < end) {
      let contentTr = `<tr>
                              <td class="td__id">${id}</td>
                              <td class="td__name">${name}</td>
                              <td class="td__price">${price}$</td>
                              <td class="td__img"><img src=${img} alt="" /></td>
                              <td class="td__desc">${desc}</td>
                              <td class="td__btn">
                                  <button class="btn btn-danger" onclick=deleteSp(${id})>Xóa</button>
                                  <button class="btn btn-warning" onclick=editSp(${id})>Sửa</button>
                              </td>
                          </tr>`;
      contentHTML += contentTr;
    }
  });
  //dom
  document.getElementById("tableDanhSach").innerHTML = contentHTML;
};

export let renderListPage = (totalPage) => {
  let divPage = `<button class="number__page--item active">1</button>`;
  for (let index = 1; index < totalPage; index++) {
    let contentDiv = `
    <button class="number__page--item">
    ${index + 1}
    </button>
    `;
    divPage += contentDiv;
  }
  document.getElementById("number__page").innerHTML = divPage;
};

export let layThongTinTuForm = () => {
  let id = document.getElementById("MaSP").value;
  let name = document.getElementById("phoneName").value;
  let price = document.getElementById("price").value;
  let screen = document.getElementById("screen").value;
  let backCamera = document.getElementById("backCamera").value;
  let frontCamera = document.getElementById("frontCamera").value;
  let imgLink = document.getElementById("imgLink").value;
  let description = document.getElementById("description").value;
  let brand = document.getElementById("brand").value;
  return {
    id: id,
    name: name,
    price: price,
    screen: screen,
    backCamera: backCamera,
    frontCamera: frontCamera,
    img: imgLink,
    desc: description,
    type: brand,
  };
};

export let showThongTinLenForm = (data) => {
  document.getElementById("MaSP").value = data.id;
  document.getElementById("phoneName").value = data.name;
  document.getElementById("price").value = data.price;
  document.getElementById("screen").value = data.screen;
  document.getElementById("backCamera").value = data.backCamera;
  document.getElementById("frontCamera").value = data.frontCamera;
  document.getElementById("imgLink").value = data.img;
  document.getElementById("description").value = data.desc;
  document.getElementById("imgLink").value = data.img;
  document.getElementById("brand").value = data.type;
};

export let onSuccess = (message) => {
  Swal.fire(message, "", "success");
};
