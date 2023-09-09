export let renderSpUser = (productListUser) => {
  let contentHTMLdiv = "";
  productListUser.map(
    ({ id, name, price, img, type, desc, screen, backCamera, frontCamera }) => {
      let contentDiv = `
                      <div class="col-sm-6 col-lg-4 bg_card">
                        <div class="card card_item">
                          <img
                            src=${img}
                            class="card-img-top"
                            alt="..."
                          />
                          <div class="card_item_body">
                            <h4>${name}</h4>
                            <p>${price}$</p>
                            <p class="card_brand">${type}</p>
                            <p class="card_desc"><b>Description: </b>${desc}</p>
                          </div>
                          <div class="card_overlay">
                            <h2>Specifications</h2>
                            <div class="card_text">
                              <p><b>Screen:</b> ${screen}</p>
                              <p><b>Back camera:</b> ${backCamera}</p>
                              <p><b>Front camera:</b> ${frontCamera}</p>
                            </div>
                            <div class="card_link">
                              <a href="">click here for more details</a>
                            </div>
                            <button onclick="addCartUser(${id})" class="btn btn-warning">Thêm vào giỏ hàng</button>
                          </div>
                        </div>
                      </div>`;
      contentHTMLdiv += contentDiv;
    }
  );
  document.getElementById("renderDanhSachUser").innerHTML = contentHTMLdiv;
};

export let renderSpCart = (productListUser) => {
  let contentHTMLtr = "";
  productListUser.map(({ id, name, price, img }) => {
    let contentTr = `
      <tr>
        <td class="td__sp">
          <img src=${img} alt="" />
          <span class="ml-3">${name}</span>
        </td>
        <td class="td__price">${price}$</td>
        <td class="td__quantity">
          <button class="btn btn-light">
            <i class="fa-solid fa-caret-left"></i>
          </button>
          <span>1</span>
          <button class="btn btn-light">
            <i class="fa-solid fa-caret-right"></i>
          </button>
        </td>
        <td class="td__btn">
          <button
            class="btn btn-danger"
            onclick="deleteSpCart(${id})"
          >
            Xóa
          </button>
        </td>
      </tr>`;
    contentHTMLtr += contentTr;
  });
  document.getElementById("tableDanhSachCart").innerHTML = contentHTMLtr;
};

export let onSuccess = (message) => {
  Swal.fire(message, "", "success");
};