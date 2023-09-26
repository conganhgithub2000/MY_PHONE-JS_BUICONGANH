export let renderSpUser = (productListUser, start, end) => {
  let contentHTMLdiv = "";
  productListUser.map(
    (
      { id, name, price, img, type, desc, screen, backCamera, frontCamera },
      index
    ) => {
      if (index >= start && index < end) {
        let contentDiv = `
                        <div class="col-6 col-md-4 col-lg-3 bg_card">
                          <div class="card card_item">
                            <img
                              src=${img}
                              class="card-img-top"
                              alt="..."
                            />
                            <div class="card_item_body">
                              <h4>${convertName(name, 22)}</h4>
                              <p class="card_price">${price.toLocaleString()} VNĐ</p>
                              <p class="card_desc"><b>Desc: </b>${convertName(
                                desc,
                                35
                              )}</p>
                            </div>
                            <div class="card_overlay">
                              <div class="card_text">
                                <p><b>Màn hình :</b> ${screen}</p>
                                <p><b>Camera sau :</b> ${backCamera}</p>
                                <p><b>Camera trước :</b> ${frontCamera}</p>
                              </div>
                              <div class="card_link">
                                <div class="btn btn__detail" onclick="details(${id})" >Bấm vào đây để xem chi tiết</div>
                              </div>
                              <button onclick="addCartUser(${id})" class="btn btn-success">Thêm vào giỏ hàng</button>
                            </div>
                          </div>
                        </div>`;
        contentHTMLdiv += contentDiv;
      }
    }
  );
  document.getElementById("renderDanhSachUser").innerHTML = contentHTMLdiv;
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

export let renderSpCart = (productListUser) => {
  let contentHTMLtr = "";
  let totalMoney = 0;
  // for (let index = 0; index < productListUser.length; index++) {
  //   let sp = productListUser[index];
  //   let total = sp.price * sp.quantity;
  //   totalMoney += total;
  //   let contentTr = `
  //     <tr>
  //       <td class="td__sp">
  //         <img src=${sp.img} alt="" />
  //         <span class="ml-3">${convertName(sp.name, 20)}</span>
  //       </td>
  //       <td class="td__price">${sp.price.toLocaleString()} VNĐ</td>
  //       <td class="td__quantity">
  //         <button onclick="minus(${index})" class="btn btn-light">
  //           <i class="fa-solid fa-caret-left"></i>
  //         </button>
  //         <span>${sp.quantity}</span>
  //         <button onclick="plus(${index})" class="btn btn-light">
  //           <i class="fa-solid fa-caret-right"></i>
  //         </button>
  //       </td>
  //       <td class="td__btn">
  //         <button
  //           class="btn btn-danger"
  //           onclick="deleteSpCart(${index})"
  //         >
  //           Xóa
  //         </button>
  //       </td>
  //     </tr>`;
  //   contentHTMLtr += contentTr;
  // }
  productListUser.map(({ name, img, quantity, price }, index) => {
    let total = price * quantity;
    totalMoney += total;
    let contentTr = `
      <tr>
        <td class="td__sp">
          <img src=${img} alt="" />
          <span class="ml-3">${convertName(name, 20)}</span>
        </td>
        <td class="td__price">${price.toLocaleString()} VNĐ</td>
        <td class="td__quantity">
          <button onclick="minus(${index})" class="btn btn-light">
            <i class="fa-solid fa-caret-left"></i>
          </button>
          <span>${quantity}</span>
          <button onclick="plus(${index})" class="btn btn-light">
            <i class="fa-solid fa-caret-right"></i>
          </button>
        </td>
        <td class="td__btn">
          <button
            class="btn btn-danger"
            onclick="deleteSpCart(${index})"
          >
            Xóa
          </button>
        </td>
      </tr>`;
    contentHTMLtr += contentTr;
  });
  document.getElementById("tableDanhSachCart").innerHTML = contentHTMLtr;
  document.querySelector(
    ".total__money"
  ).innerHTML = `Tổng tiền: ${totalMoney.toLocaleString()} VNĐ`;
};

export let renderDetails = (productListUser) => {
  let contentHTMLdiv = "";
  productListUser.map(
    ({ id, name, price, img, desc, screen, backCamera, frontCamera }) => {
      let contentDiv = `
      <h4 class="mt-4 mb-4">${name}</h4>
      <div class="row">
        <div class="col-12 col-lg-7 content__sp--left">
          <img
            src=${img}
            alt=""
          />
        </div>
        <div class="col-12 col-lg-5 content__sp--right">
          <h4>Thông số kỹ thuật</h4>
          <div class="specifications">
            <div class="specifications__item">
              <p>Tên sản phảm :</p>
              <span>${name}</span>
            </div>
            <div class="specifications__item">
              <p>Kích thước màng hình :</p>
              <span>${screen}</span>
            </div>
            <div class="specifications__item">
              <p>Camera sau :</p>
              <span
                >${backCamera}</span
              >
            </div>
            <div class="specifications__item">
              <p>Camera trước :</p>
              <span>${frontCamera}</span>
            </div>
            <div class="specifications__item">
              <p>Mô tả :</p>
              <span>${desc}</span>
            </div>
          </div>
          <div class="price__sp">
            <h5>Tạm tính: ${price.toLocaleString()} VNĐ</h5>
          </div>
          <div class="specifications__btn">
            <button class="btn btn__cart" onclick="addCartDetail(${id})">
              <i class="fa-solid fa-cart-shopping"></i>
              Cart
            </button>
            <button class="btn btn__buy">MUA</button>
          </div>
        </div>
      </div>`;
      contentHTMLdiv += contentDiv;
    }
  );
  document.getElementById("renderDeltails").innerHTML = contentHTMLdiv;
};

export let onSuccess = (message) => {
  Swal.fire(message, "", "success");
};

//giới hạn số lượng chữ xuất hiện
let convertName = (name, number) => {
  let maxLength = number;
  if (name.length > maxLength) {
    return name.slice(0, maxLength) + "...";
  } else {
    return name;
  }
};

export let itemcart = (data) => {
  let id = data.id;
  let name = data.name;
  let price = data.price;
  let img = data.img;
  let quantity = 1;

  return {
    id,
    name,
    price,
    img,
    quantity,
  };
};
