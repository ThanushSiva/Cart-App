const body = document.querySelector('body');
const items = document.querySelector('.items');
const cartNumber = document.querySelector('.number');
const cartBtn = document.querySelector('.cartBtn');
const modal = document.querySelector('.modal');
const modalC = document.querySelector('.modal-container');
const ul = document.querySelector('ul');
const totalC = document.querySelector('.total');
let quantity, priceQuantity;

let bool = true;
let store = [];
let cartItems = [];
let itemStr = '';
let modalStr = '';
let checkFlag = '';
let total = 0;
let temp = '';

modal.addEventListener('click', (e) => {
    if (e.target == modal) {
        modalToggle();
    }
})

cartBtn.addEventListener('click', () => {
    modalToggle();
})

function modalToggle() {
    if (bool) {
        modal.style.display = 'flex';
        body.style.overflow = 'hidden';
        renderModal();
        bool = !bool;
    } else {
        modal.style.display = 'none';
        body.style.overflow = 'auto';
        modalStr = '';
        bool = !bool;
    }
}

function addToCart(arg) {
    if (cartItems.length !== 0) {
        checkFlag = false;
        cartItems.forEach(e => {
            if (e.id === store[arg].id) {
                checkFlag = true;
            }
        })
        if (!checkFlag) {
            cartItems.push(store[arg]);
            cartItems[cartItems.length - 1].quantity = 1;
            cartNumber.textContent = cartItems.length;
        }
    }
    else {
        cartItems.push(store[arg]);
        cartItems[cartItems.length - 1].quantity = 1;
        cartNumber.textContent = cartItems.length;
    }
}

function renderModal() {
    total = 0;
    cartItems.forEach(e => {
        total += e.price * e.quantity;
        modalStr += `
            <li class="list">
                <h5>${e.title}</h5>
                <input class="quantity" type="number" min="1" value="${e.quantity}">
                <div class="priceQuantity">$ ${e.quantity * e.price}</div>
            </li>
        `
    })
    ul.innerHTML = modalStr;
    temp = String(total).split('.');
    totalC.textContent = `Total : $${temp[0]}.${(!temp[1]) ? '' : temp[1].slice(0, 2)}`;
    quantity = document.querySelectorAll('.quantity');
    priceQuantity = document.querySelectorAll('.priceQuantity');
    quantity.forEach((e, i) => {
        e.addEventListener('change', () => {
            cartItems[i].quantity = e.value;
            priceQuantity[i].textContent = `$ ${e.value * cartItems[i].price}`;
            total = 0;
            cartItems.forEach(e => {
                total += e.price * e.quantity;
            })
            temp = String(total).split('.');
            totalC.textContent = `Total : $${temp[0]}.${(!temp[1]) ? '' : temp[1].slice(0, 2)}`;
        })
    })
}


function render() {
    store.forEach(e => {
        itemStr += `
        <div class="item">
        <div class="img">
          <img
            src="${e.image}"
            alt=""
            srcset=""
          />
        </div>
        <div class="details">
          <h3>${e.title}</h3>
          <div class="ratings">
            <div class="rating">${e.rating.rate}</div>
            <p>${e.rating.count} ratings</p>
          </div>
          <div class="desc">
            ${e.description}
          </div>
          <div class="category">
            <span>${e.category}</span>
          </div>
        </div>
        <div class="price">
          <div class="pricedetails">
              <h3>$ ${e.price}</h3>
              <p><del>${String(e.price + (e.price / 10)).slice(0, 5)}</del></p>
              <div class="offer">${10}% off</div>
          </div>
          <button class="btncart" onclick="addToCart(${e.id - 1})">Add to Cart</button>
        </div>
      </div>
        `
    })
    items.innerHTML = itemStr;
}

function errMsg(error) {
    body.innerHTML = `Failed due to ${error}`;
}

function loadResources() {
    fetch('https://fakestoreapi.com/products/')
        .then(res => res.json())
        .then(res => {
            store = res;
            render();
        })
        .catch(err => {
            errMsg(err);
        })
}

loadResources()