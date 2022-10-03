const productID = localStorage.getItem('prodID')
const productURL = 'https://japceibal.github.io/emercado-api/products/' + productID +'.json'
const productReviews = 'https://japceibal.github.io/emercado-api/products_comments/' + productID + '.json'

console.log(productURL)

document.addEventListener('DOMContentLoaded', () => {

    let submitBtn = document.querySelector('#submitChat')

    fetch(productURL)
    .then(res => res.ok ? Promise.resolve(res) : Promise.reject())
    .then(res => res.json())
    .then(res => {

        showProductInfo(res)
        showProductImage(res)
        showProductRelated(res)
        console.log(res)
      
    })

    fetch(productReviews)
    .then(res => res.ok ? Promise.resolve(res) : Promise.reject())
    .then(res => res.json())
    .then(res => {

        showProductComment(res)
        estrella(res)
        console.log(res) 

    submitBtn.addEventListener('click', () => {
      
      const comment = document.querySelector('#commentDesc')
      const score = document.querySelector('#starRatingInput')

      const date = new Date();
      const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
      const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];
      let submiteDate = year+'-0'+ month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
    

      window.localStorage.setItem('comDate', submiteDate)
      let comDate = localStorage.getItem('comDate')

      window.localStorage.setItem('comScore', score.value)
      let comScore = localStorage.getItem('comScore')

      window.localStorage.setItem('comInput', comment.value)
      let comInput = localStorage.getItem('comInput')
      let comUser = localStorage.getItem('user')

      comment.value = ''
      addComment(comUser, comInput, comScore, comDate)

    })
       

    })


})

function addComment(user, comment, score, date) {

  document.getElementById('commentsContainer').innerHTML += `

  <div class="col">
  <div class="card">
      <div class="card-body">

        <h6 class="card-title fw-bold">${user}</h6>
        <div id='rating'class="rating">
          ${estrella(score)}
        </div>
        <hr>
        
        <p class="card-text">${comment}</p>
        
  
        

      </div>

    <div class="card-footer">
      <small class="text-muted">${date}</small>
    </div>
  </div>
  
  
  `;  








}

function estrella(rating){

        if (rating == 1) {
            return`
            <i class="material-icons" style="color:gold;font-size:26px">star</i>
            <i class="material-icons" style="color:gainsboro;font-size:26px">star</i>
            <i class="material-icons" style="color:gainsboro;font-size:26px">star</i>
            <i class="material-icons" style="color:gainsboro;font-size:26px">star</i>
            <i class="material-icons" style="color:gainsboro;font-size:26px">star</i>
            
            `
           }

        if (rating == 2) {
            return`
            <i class="material-icons" style="color:gold;font-size:26px">star</i>
            <i class="material-icons" style="color:gold;font-size:26px">star</i>
            <i class="material-icons" style="color:gainsboro;font-size:26px">star</i>
            <i class="material-icons" style="color:gainsboro;font-size:26px">star</i>
            <i class="material-icons" style="color:gainsboro;font-size:26px">star</i>
            
            `
           }
             
        if (rating == 3) {
            return`
            <i class="material-icons" style="color:gold;font-size:26px">star</i>
            <i class="material-icons" style="color:gold;font-size:26px">star</i>
            <i class="material-icons" style="color:gold;font-size:26px">star</i>
            <i class="material-icons" style="color:gainsboro;font-size:26px">star</i>
            <i class="material-icons" style="color:gainsboro;font-size:26px">star</i>
            
            `
           }
             
        if (rating == 4) {
            return`
            <i class="material-icons" style="color:gold;font-size:26px">star</i>
            <i class="material-icons" style="color:gold;font-size:26px">star</i>
            <i class="material-icons" style="color:gold;font-size:26px">star</i>
            <i class="material-icons" style="color:gold;font-size:26px">star</i>
            <i class="material-icons" style="color:gainsboro;font-size:26px">star</i>
            
            `
           }

        if (rating == 5) {
            return`
            <i class="material-icons" style="color:gold;font-size:26px">star</i>
            <i class="material-icons" style="color:gold;font-size:26px">star</i>
            <i class="material-icons" style="color:gold;font-size:26px">star</i>
            <i class="material-icons" style="color:gold;font-size:26px">star</i>
            <i class="material-icons" style="color:gold;font-size:26px">star</i>
            
            `
           } 
}

function showProductComment(comment){

    for (let i = 0; i < comment.length; i++) {
        const product = comment[i];
        
        document.getElementById('commentsContainer').innerHTML += `

        <div class="col">
        <div class="card">
            <div class="card-body">
  
              <h6 class="card-title fw-bold">${product.user}</h6>
              <div id='rating'class="rating">
                ${estrella(product.score)}
              </div>
              <hr>
              
              <p class="card-text">${product.description}</p>
              
        
              
  
            </div>
  
          <div class="card-footer">
            <small class="text-muted">${product.dateTime}</small>
          </div>
        </div>
        
        `;

    }
}

function showProductImage(product) {

    for (let i = 1; i < product.images.length; i++) {
        const image = product.images[i];
        
        document.getElementById('productImagecontainer').innerHTML += `

          <div class="carousel-item">
            <img src="${image}" class="d-block w-100" alt="...">
          </div>
        
        `;

    }

}

function showProductInfo(product) {
    
        
        document.getElementById('descProd').innerHTML += `

        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
        <div id="productImagecontainer"class="carousel-inner">
          <div class="carousel-item active">
            <img src="${product.images[0]}" class="d-block w-100" alt="...">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
        <div class="row top-100 ">
        </div>
      </div>
      
    
      <hr>
      <h4 class="fw-bold">Descripción</h4>

      <p>${product.description}</p>
      
      <br>
        `;


        document.getElementById('infoProd').innerHTML += `    
        
        <div class="card">
        <div class="card-body">
        
          <div onclick="window.location='products.html'" class="fw-light small cursor-active">${product.category}</div>
          <br>
          <h5 class="fw-bold card-title">${product.name}</h5>
          <h4 class="card-title">${product.currency} ${product.cost}</h4>

          <a class="small" href="" style="text-decoration: none; color: black;"><i class="fa-solid fa-arrow-right"></i> Ver medios de pago</a>        <br><br>
          <br>
          <p class="card-text fw-bold" style="color:#229fbc;"><i class="fa-solid fa-truck"></i> Envios a todo Uruguay</p>
          <p class="fw-light small">Conoce el tiempo y las formas de envio!</p>
          <hr>

          <p>${product.soldCount} Vendidos</p>
            
          <div class="d-grid gap-2">
            <button class="btn btn-primary fw-bold" style="background-color:#229fbc; border:none;" type="button">Comprar</button>
            <button class="btn btn-light fw-bold" style="color:#229fbc; background-color: #d3eaf0 ;" type="button">Agregar al carrito</button>
          </div>
        </div> 
        </div>
    `;  

}    
  
function showProductRelated(product) {

  for (let i = 0; i < product.relatedProducts.length; i++) {
    const related = product.relatedProducts[i];

    document.querySelector('#relatedContainer').innerHTML += `
    
    <div class="col cursor-active" onclick="setProdID(${related.id})">
          <div class="card">
            <img src="${related.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title text-center fw-bold">${related.name}</h5>
            </div>
          </div>
        </div>
    
    
    `

  }

}

function setProdID(id) {
  localStorage.setItem("prodID", id);
  window.location = "product-info.html"
}