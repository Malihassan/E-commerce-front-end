import { getCookie } from "../modal/accountsModal.js";
import {
    clearCart,
  decrementItemIncart,
  getCartItems,
  incrementItemInCart,
} from "../modal/cartModal.js";
import { getAllCategoryType } from "../modal/categoryModal.js";
import { getFavItems, removedFavorite } from "../modal/favoriteModal.js";
async function offcanvasCategory() {
  createList(getAllCategoryType());
}
async function createList(categories) {
  categories = await categories;
  let offcanvasCategory = document.getElementById("offcanvas-category");
  categories.forEach((element) => {
    let liTage = document.createElement("li");
    let a = document.createElement("a");
    a.href = `gallery.html?type=${element}`;
    a.text = element;
    liTage.appendChild(a);
    offcanvasCategory.appendChild(liTage);
  });
}
function favModalHandler() {
  createtitle("Favorite");
  createbody("fav", getFavItems());
  styleModal("fav");
}
function cartModalHandler() {
  createtitle("Cart");
  createbody("cart", getCartItems());
  styleModal("cart");
}
function createtitle(title) {
  document.getElementById("exampleModalLabel").innerText = title;
}
function styleModal(caseStyle) {
  let checkout = document.getElementById("checkout");
  let close = document.getElementById("close");
  let totalPriceContainer = document.getElementById('totalPriceContainer');
  switch (caseStyle) {
    case "cart":
      checkout.style.display = "block";
      close.style.backgroundColor = "white";
      close.style.color = "black";
      totalPriceContainer.removeAttribute('style','display:none !important') 
      break;
    case "fav":
      checkout.style.display = "none";
      close.style.backgroundColor = "black";
      close.style.color = "white";
      totalPriceContainer.setAttribute('style','display:none !important')
      break;
  }
}
function createbody(caseBody, data) {
  let modalBody = document.getElementById("modalBody");
  modalBody.innerHTML = "";
  switch (caseBody) {
    case "cart":
      createCartProduct(data);
      createTotalPrice(data);
      break;
    case "fav":
      createFavProduct(data);
      break;
  }
}
function createCartProduct(data) {
  if (data.length == 0) {
    return (modalBody.innerHTML = `<h2> no item in cart </h2>`);
  }
  data.forEach((item) => {
    let cartItem = document.createElement("div");
    cartItem.classList.add("cart-item", "col-12");
    let cartItemBody = document.createElement("div");
    cartItemBody.classList.add("cart-item-body", "col-8");
    let cartItemName = document.createElement("div");
    cartItemName.classList.add("cart-item-name");
    cartItemName.innerHTML = `<div class="cart-item-name">
        <h4>${item.name}</h4>
        <label><span>${item.amount}x</span> LE ${item.price.toFixed(
      2
    )}</label>`;
    let cartControl = document.createElement("div");
    cartControl.classList.add("cart-control", "col-4");
    let increment = document.createElement("button");
    increment.innerText = "+";
    increment.value = item.id;
    increment.category = item.catgoryName;
    increment.addEventListener("click", incrementItemHandeler);
    let amountofCartControl = document.createElement("label");
    amountofCartControl.innerText = item.amount;
    let decrement = document.createElement("button");
    decrement.innerText = "-";
    decrement.value = item.id;
    decrement.category = item.catgoryName;
    decrement.addEventListener("click", decrementItemHandeler);
    let cartItemImg = document.createElement("div");
    cartItemImg.classList.add("cart-item-img", "col-3");
    cartItemImg.innerHTML = `<img src=${item.img} />`;

    cartControl.appendChild(increment);
    cartControl.appendChild(amountofCartControl);
    cartControl.appendChild(decrement);

    cartItemBody.appendChild(cartItemName);
    cartItemBody.appendChild(cartControl);

    cartItem.appendChild(cartItemBody);
    cartItem.appendChild(cartItemImg);

    modalBody.appendChild(cartItem);
  });
}
function createTotalPrice(data) {
  let totalTag = document.getElementById("totalPrice");
  if (data.length == 0) {
    totalTag.innerText = "0.00";
  }
  let total = 0;
  data.forEach((item) => {
    total += item.amount * item.price;
  });
  totalTag.innerText = `LE ${total.toFixed(2)} `;
}
async function incrementItemHandeler(event) {
  await incrementItemInCart(event.target.value);
  createbody("cart", getCartItems());
}
async function decrementItemHandeler(event) {
  await decrementItemIncart(event.target.value);
  createbody("cart", getCartItems());
}
function createFavProduct(data) {
    if (data.length == 0) {
        return modalBody.innerHTML ='<h2> no favorite Item</h2>'
    }
  data.forEach((item) => {
    let favItem = document.createElement("div");
    favItem.classList.add("cart-item", "col-12");
    let favItemBody = document.createElement("div");
    favItemBody.classList.add("cart-item-body", "col-7");
    let favItemName = document.createElement("div");
    favItemName.classList.add("cart-item-name");
    favItemName.innerHTML = `<div class="cart-item-name">
        <h4>${item.name}</h4>
        <label>LE ${item.price.toFixed(2)}</label>`;
    let favItemImg = document.createElement("div");
    favItemImg.classList.add("cart-item-img", "col-3");
    favItemImg.innerHTML = `<img src=${item.img} />`;
    let DeleteFav = document.createElement("div");
    DeleteFav.classList.add("fav-delete", "col-1");
    DeleteFav.setAttribute('value',item.id) 
    DeleteFav.innerHTML = `<i class="bi bi-x-square"></i>`;
    DeleteFav.addEventListener('click',removedFavoriteHadler)

    favItemBody.appendChild(favItemName);
    favItem.appendChild(favItemBody);
    favItem.appendChild(favItemImg);
    favItem.appendChild(DeleteFav);
    modalBody.appendChild(favItem);
  });  
}
function removedFavoriteHadler(event) {
    let x = this.getAttribute('value')
    removedFavorite(x)
    createbody("fav", getFavItems());
}
function checkOutCartHandler(params) {
    if (!getCookie('token')) {
       return window.location ='accounts.html'
    }
    clearCart()
    modalBody.innerHTML = `<h3> Thank You For Checkout </h3>`;
    styleModal('fav')

    
}
export { offcanvasCategory, favModalHandler, cartModalHandler ,checkOutCartHandler};
