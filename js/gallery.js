import { getCategoryByName } from "../modal/categoryModal.js";
import { addItemInCart } from "../modal/cartModal.js";
import { addFavoriteItem } from "../modal/favoriteModal.js";
import {
  offcanvasCategory,
  favModalHandler,
  cartModalHandler,
  checkOutCartHandler,
} from "./globalUIFunc.js";
window.addEventListener("load", async () => {
  let productContainer = document.getElementById("product-container");
  try {
    offcanvasCategory();
    let categoryType = getUrlParameter("type");
    if (!categoryType) {
      throw new Error("Category not found ");
    }
    if ((await getCategoryByName(categoryType)).length == 0) {
      throw new Error(`this Category not found `);
    }
    let itemsList = await getCategoryByName(categoryType);
    showCategoryBannerImg(itemsList[0].categoryImg);
    showProduct(itemsList);
    addItemInCartHandler(categoryType);
    addItemInFav(categoryType);
    let favHeaderBtn =document.getElementsByClassName("fav-btn")
      for (let x = 0; x < favHeaderBtn.length; x++) {
          favHeaderBtn[x].addEventListener("click", favModalHandler);; 
      }
    let cartHeaderBtns  = document.getElementsByClassName("cart-btn")
    for (let x = 0; x < cartHeaderBtns.length; x++) {
        cartHeaderBtns[x].addEventListener("click", cartModalHandler);
    }
    document.getElementById('checkout').addEventListener('click',checkOutCartHandler)
  } catch (error) {
    productContainer.innerHTML = `<h2>${error.message}</h2>`;
  }
});

function getUrlParameter(name) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === name) {
      return sParameterName[1] === undefined
        ? true
        : decodeURIComponent(sParameterName[1]);
    }
  }
  return false;
}
function showCategoryBannerImg(img) {
  document.getElementById("category-banner").setAttribute("src", img);
}
function showProduct(itemList) {
  itemList[0].items.map((item) => {
    let x = `<div class="product-item">
        <figure class="product-img-container my-0">
            <img class="product-img" src=${item.image}>
            <i class="add-fav bi-suit-heart" value=${item.id}></i>
            <button class="product-action" value=${item.id}>
                <i class="bi bi-cart"></i> add to cart
            </button>
        </figure>
        <div class="product-body">
            <label >${item.name}</label>
            <label class="description">${item.description}</label>
            <label class="price">LE ${item.price}</label>
        </div>
    </div>`;
    document.getElementById("product-container").innerHTML += x;
  });
}
function addItemInCartHandler(categoryType) {
  let cartBtns = document.getElementsByClassName("product-action");
  for (let x = 0; x < cartBtns.length; x++) {
    cartBtns[x].addEventListener("click", async (event) => {
      let resMessage = await addItemInCart(categoryType, event.target.value);
      cartMessageHandeler(resMessage.res);
    });
  }
}
function addItemInFav(categoryType) {
  let favBtns = document.getElementsByClassName("add-fav");
  for (let x = 0; x < favBtns.length; x++) {
    favBtns[x].addEventListener("click", async (event) => {
      let message = await addFavoriteItem(
        categoryType,
        event.target.getAttribute("value")
      );
      cartMessageHandeler(message.res);
    });
  }
}
function cartMessageHandeler(resMessage) {
  let cartMessage = document.getElementById("cart-message");
  cartMessage.style.display = "block";
  cartMessage.classList.add("cart-message");
  cartMessage.textContent = resMessage;
  setTimeout(() => {
    cartMessage.classList.remove("cart-message");
    cartMessage.style.display = "none";
  }, 2000);
}
