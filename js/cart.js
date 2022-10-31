let cartUrl = 'https://japceibal.github.io/emercado-api/user_cart/25801.json'

document.addEventListener('DOMContentLoaded', ()=> {

    fetch(cartUrl).then(res => res.ok ? Promise.resolve(res) : Promise.reject)
    .then(res => res.json())
    .then(res => {
    
    console.log(res)
    addProdCart(res.articles)
    totales(res.articles[0].unitCost)

    let btnMax           = document.querySelector('#btnMax')
    let btnMin           = document.querySelector('#btnMin')

    let check5           = document.querySelector('#check5')
    let check7           = document.querySelector('#check7')
    let check15          = document.querySelector('#check15')

    let nombrecalle      = document.querySelector('#nombrecalle')
    let numerocalle      = document.querySelector('#numerocalle')
    let esquinacalle     = document.querySelector('#esquinacalle')

    let modalpago        = document.querySelector('#modalpago')

    let creditcardcheck  = document.querySelector('#creditcardcheck')
    let cardnumber       = document.querySelector('#cardnumber')
    let cardsecure       = document.querySelector('#cardsecure')
    let cardmonth        = document.querySelector('#cardmonth')

    let bankcheck        = document.querySelector('#bankcheck')
    let banknumber       = document.querySelector('#banknumber')

    creditcardcheck.addEventListener('change', () => {

      if (creditcardcheck.checked) {
        banknumber.setAttribute('disabled', '')
        cardnumber.removeAttribute('disabled', '')
        cardsecure.removeAttribute('disabled', '')
        cardmonth.removeAttribute('disabled', '')
      } 
    })


    bankcheck.addEventListener('change', () => {
     
      if (bankcheck.checked) {
        cardnumber.setAttribute('disabled', '')
        cardsecure.setAttribute('disabled', '')
        cardmonth.setAttribute('disabled', '')
        banknumber.removeAttribute('disabled', '')
      } 
    })

    console.log(creditcardcheck.checked)

    

    document.getElementById('finalizar').addEventListener('click', ()=> {


    if (creditcardcheck.checked || bankcheck.checked) {
        
      modalpago.classList.remove('is-invalid')
      
    } else {

      modalpago.classList.add('is-invalid')

    }

    if (nombrecalle.value !== '') {
      nombrecalle.classList.remove('is-invalid')
      nombrecalle.classList.add('is-valid')
    } else {
      nombrecalle.classList.add('is-invalid')
      nombrecalle.classList.remove('is-valid')
    }

    if (numerocalle.value !== '') {
      numerocalle.classList.remove('is-invalid')
      numerocalle.classList.add('is-valid')
    } else {
      numerocalle.classList.add('is-invalid')
      numerocalle.classList.remove('is-valid')
    }

    if (esquinacalle.value !== '') {
      esquinacalle.classList.remove('is-invalid')
      esquinacalle.classList.add('is-valid')
    } else {
      esquinacalle.classList.add('is-invalid')
      esquinacalle.classList.remove('is-valid')
    }

    if ((check5.checked || check7.checked || check15.checked) 
    && nombrecalle.value !== '' 
    && numerocalle.value !== ''
    && esquinacalle.value !== ''
    && (creditcardcheck.checked || bankcheck.checked))
    {
      

      window.location = "home.html"
      alert('Has comprado con éxito')

  }
  
    })

    let formcarrito = document.querySelector('#formcarrito')

    formcarrito.addEventListener('change', () =>{

      if (nombrecalle.value !== '') {
        nombrecalle.classList.remove('is-invalid')
        nombrecalle.classList.add('is-valid')
      } else {
        nombrecalle.classList.add('is-invalid')
        nombrecalle.classList.remove('is-valid')
      }

      if (numerocalle.value !== '') {
        numerocalle.classList.remove('is-invalid')
        numerocalle.classList.add('is-valid')
      } else {
        numerocalle.classList.add('is-invalid')
        numerocalle.classList.remove('is-valid')
      }

      if (esquinacalle.value !== '') {
        esquinacalle.classList.remove('is-invalid')
        esquinacalle.classList.add('is-valid')
      } else {
        esquinacalle.classList.add('is-invalid')
        esquinacalle.classList.remove('is-valid')
      }

     


      document.getElementById('costoenvio1').innerHTML = `USD ${localStorage.getItem('precio')*localStorage.getItem('envio')}`
      document.getElementById('sumatotal').innerHTML = `USD ${parseInt(localStorage.getItem('precio'))+parseInt(localStorage.getItem('precio')*localStorage.getItem('envio'))}`


    })
    
    btnMax.addEventListener('click', ()=>{

      totales()
      quanty.value++
      localStorage.setItem('cantidad', quanty.value)
      localStorage.setItem('precio', res.articles[0].unitCost*quanty.value)
      document.getElementById('subtotalprod').innerHTML =`${res.articles[0].currency + ' ' +res.articles[0].unitCost*quanty.value+',00 '}`
      document.getElementById('priceMult').innerHTML = `${res.articles[0].currency + ' ' +res.articles[0].unitCost*quanty.value+',00 '}`
      document.getElementById('costoenvio1').innerHTML = `USD ${localStorage.getItem('precio')*localStorage.getItem('envio')}`
      document.getElementById('sumatotal').innerHTML = `USD ${parseInt(localStorage.getItem('precio'))+parseInt(localStorage.getItem('precio')*localStorage.getItem('envio'))}`
    })

    btnMin.addEventListener('click', ()=>{

      
      if (quanty.value > 1) {quanty.value--}
      totales()
      localStorage.setItem('cantidad', quanty.value)
      localStorage.setItem('precio', res.articles[0].unitCost*quanty.value)
      document.getElementById('subtotalprod').innerHTML =`${res.articles[0].currency + ' ' +res.articles[0].unitCost*quanty.value+',00 '}`
      document.getElementById('priceMult').innerHTML = `${res.articles[0].currency + ' ' +res.articles[0].unitCost*quanty.value+',00 '}`
      document.getElementById('costoenvio1').innerHTML = `USD ${localStorage.getItem('precio')*localStorage.getItem('envio')}`
      document.getElementById('sumatotal').innerHTML = `USD ${parseInt(localStorage.getItem('precio'))+parseInt(localStorage.getItem('precio')*localStorage.getItem('envio'))}`


    })

  })
})

function addProdCart(value) {

    for (let i = 0; i < value.length; i++) {
        const array = value[i];

        document.getElementById('cartProdRes').innerHTML += 

            `<br>
            <div class="row">
            
            <div class="col-sm-3">
              <div class="col"><img class="img-fluid"src="${array.image}" alt=""></div>
            </div>

            <div class="col mt-2">
              <h4 class="fw-bold" >${array.name}</h4>
              <p class="card-text"><small class="text-muted">ID Producto: ${array.id}</small></p>
             
              <div class="input-group">
                <h5 class="fw-bold text-muted" id="priceMult"> ${array.currency + ' ' + array.unitCost}</h6>
              </div>
            </div>

            <div class="col-sm-2">
              <div class="input-group">
                <span><button id="btnMin" class=" btn-dark btn-sm ms-2"> <i class="fa-solid fa-minus"></i></button></span>
                <input id="quanty" class="form-control form-control-sm w-25 input-number text-center" value="1" min="1"" type="text" name="">
                <span><button id="btnMax" class=" btn-dark btn-sm"> <i class="fa-solid fa-plus"></i></button></span>
              </div>
            </div>

           
          </div>
          <hr>
          `

    }
}

function totales(value){

  document.getElementById('totales').innerHTML = 

  `<hr>
  <div class=" row">
  <div class="col">
    <h6>Subtotal</h6>
    <small class="text-muted">Costo unitario del producto por cantidad</small>
  </div>
 <div id="subtotalprod" class="col text-muted text-end">USD 15200</div>
</div>
<hr>
<div class="row">
  <div class="col">
    <h6>Costo de envio</h6>
    <small class="text-muted">Segun el tipo de envio</small>
  </div>
 <div id="costoenvio1" class="col text-muted text-end"></div>
</div>

<hr>
<div class="row">
  <div class="col">
    <h6>Total</h6>
  </div>
 <div id="sumatotal"class="col text-muted text-end fw-bold">USD 15200</div>
</div>`


}

function enviopremium() {
  localStorage.setItem('envio', 0.15)

}

function envioexpress() {
  localStorage.setItem('envio', 0.07)
}

function enviostandard() {
  localStorage.setItem('envio', 0.05)
}

function submitForms() {

  document.getElementById('formcarrito1').submit()
  document.getElementById('formcarrito2').submit()

}