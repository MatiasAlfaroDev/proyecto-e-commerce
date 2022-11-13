const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

document.addEventListener("DOMContentLoaded", function() {

  if (localStorage.getItem(user) !== undefined) {

    document.querySelector('.userMain').innerHTML = ` 

    <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
            ${localStorage.getItem('user')}
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
            <li><a class="dropdown-item m-0" href="cart.html"><i class="fa-solid fa-cart-shopping"></i> Carrito</a></li>
            <li><a class="dropdown-item m-0" href="my-profile.html"><i class="fa-solid fa-user"></i> Perfil</a></li>
            <li><a class="dropdown-item m-0" onclick="clearUser()" href="#"><i class="fa-solid fa-right-from-bracket"></i> Cerrar Sesión</a></li>
          </ul>
        </div>
    `;
  } else {

    document.querySelector('.userMain').innerHTML = ` 

    <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
            Hola, Identificate
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
            <li><a class="dropdown-item m-0" href="cart.html"><i class="fa-solid fa-cart-shopping"></i> Carrito</a></li>
            <li><a class="dropdown-item m-0 disabled" href="my-profile.html"><i class="fa-solid fa-user"></i> Perfil</a></li>
            <li><a class="dropdown-item m-0" onclick="clearUser()" href="#"><i class="fa-solid fa-right-from-bracket"></i> Iniciar Sesión</a></li>
          </ul>
        </div>
    `;



  }
  

})


function clearUser() {

  localStorage.setItem("user", '');
  window.location = "index.html"
}