import { getCarusalImages } from "../modal/categoryModal.js";
import {
  cartModalHandler,
  checkOutCartHandler,
  favModalHandler,
  offcanvasCategory,
} from "./globalUIFunc.js";
window.addEventListener("load", async () => {
  offcanvasCategory();
  carouselImages(getCarusalImages());
  shopNowHandler();
  let favHeaderBtn = document.getElementsByClassName("fav-btn");
  for (let x = 0; x < favHeaderBtn.length; x++) {
    favHeaderBtn[x].addEventListener("click", favModalHandler);
  }
  let cartHeaderBtns = document.getElementsByClassName("cart-btn");
  for (let x = 0; x < cartHeaderBtns.length; x++) {
    cartHeaderBtns[x].addEventListener("click", cartModalHandler);
  }
});
document.getElementById("checkout").addEventListener("click", checkOutCartHandler);

function shopNowHandler() {
  let shopNow_btns = document.getElementsByClassName("shopNow");
  for (let x = 0; x < shopNow_btns.length; x++) {
    shopNow_btns[x].addEventListener("click", (event) => {
      window.location = `./gallery.html?type=${event.target.value}`;
    });
  }
}
async function carouselImages(response) {
  let imgArr = await response;
  for (let x = 0; x < imgArr.length; x++) {
    let imgContiner = createImgContainer(x);
    let img = createImg(imgArr[x]);
    imgContiner.appendChild(img);
    document.getElementById("carousel-wrapper").appendChild(imgContiner);
  }
}
function createImgContainer(x) {
  let imgContiner = document.createElement("div");
  if (x == 0) {
    imgContiner.classList.add("carousel-item", "active");
    return imgContiner;
  }
  imgContiner.classList.add("carousel-item");
  return imgContiner;
}
function createImg(src) {
  let img = document.createElement("img");
  img.classList.add("d-block", "w-100");
  img.setAttribute("src", src);
  return img;
}
