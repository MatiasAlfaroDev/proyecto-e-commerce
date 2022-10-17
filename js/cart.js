let cartUrl = 'https://japceibal.github.io/emercado-api/user_cart/25801.json'

document.addEventListener('DOMContentLoaded', ()=> {

    fetch(cartUrl).then(res => res.ok ? Promise.resolve(res) : Promise.reject)
    .then(res => res.json())
    .then(res => {
    
    console.log(res)
    addProdCart(res.articles)

    let btnMax = document.querySelector('#btnMax')
    let btnMin = document.querySelector('#btnMin')
    
    btnMax.addEventListener('click', ()=>{

      quanty.value++
      document.getElementById('priceMult').innerHTML = `${res.articles[0].currency + ' ' +res.articles[0].unitCost*quanty.value+',00 '}`
    })

    btnMin.addEventListener('click', ()=>{

      if (quanty.value > 1) {quanty.value--}
      document.getElementById('priceMult').innerHTML = `${res.articles[0].currency + ' ' +res.articles[0].unitCost*quanty.value+',00 '}`

    })
   
    /*var quanty = document.querySelector('#quanty')
    quanty.addEventListener('input', ()=> {

        document.getElementById('priceMult').innerHTML = `${res.articles[0].currency + ' ' +res.articles[0].unitCost*quanty.value+',00 '}`

    })*/

  })
})

function addProdCart(value) {

    for (let i = 0; i < value.length; i++) {
        const array = value[i];

        document.getElementById('cartProdRes').innerHTML += 

            `<div class="row">
            
            <div class="col-sm-2">
              <div class="col"><img src="${array.image}" height="200%" width="150%" alt=""></div>
            </div>

            <div class="col"style=" margin-left:40px;">
              <h5 class="card-title fw-bold" >${array.name}</h5>
              <p class="card-text"><small class="text-muted">ID Producto: ${array.id}</small></p>
            </div>

            <div class="col-sm-2">
              <div class="input-group">
                <span><button id="btnMin" class="btn btn-light btn-sm"> <i class="fa-solid fa-minus"></i></button></span>
                <input id="quanty" class="form-control form-control-sm input-number text-center" value="1" min="1"" type="text" name="">
                <span><button id="btnMax" class="btn btn-light btn-sm"> <i class="fa-solid fa-plus"></i></button></span>
              </div>
            </div>

            <div class="col-sm" style=" margin-left:50px; "> 
              <div class="input-group">
                <small id="priceMult"class="p-2">.ㅤ${array.currency + ' ' + array.unitCost + ',00'}</small>
                <button class="btn btn-light btn-sm"> <i class="fa-regular fa-trash-can"></i></button>
              </div>
              
            </div>
          </div>
          <hr style="margin-right: 30px;">`

    }
}
