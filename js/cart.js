let cartUrl = 'https://japceibal.github.io/emercado-api/user_cart/25801.json'

document.addEventListener('DOMContentLoaded', ()=> {

    fetch(cartUrl).then(res => res.ok ? Promise.resolve(res) : Promise.reject)
    .then(res => res.json())
    .then(res => {
    
      let userCart = JSON.parse(localStorage.getItem('carritoTOTAL')) 
      console.log(userCart)
    
    console.log(res)
    addProdCart(userCart)
    totales(sumaCarrito(userCart))

    console.log(userCart.map(function (e) { return e.id; }).indexOf(50921))

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

    document.getElementById('cartProdRes').addEventListener('change', ()=>{

      document.getElementById('subtotalprod').innerHTML = `${'USD' + ' ' + sumaCarrito(userCart)}`
      document.getElementById('costoenvio1').innerHTML = `${'USD' + ' '+ localStorage.getItem('envio')*sumaCarrito(userCart)}`
      document.getElementById('sumatotal').innerHTML = `${'USD' + ' '+ parseInt(localStorage.getItem('envio')*sumaCarrito(userCart)+(sumaCarrito(userCart))) }`


    })

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
      localStorage.setItem('carritoTOTAL', [])

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

      document.getElementById('subtotalprod').innerHTML = `${'USD' + ' ' + sumaCarrito(userCart)}`
      document.getElementById('costoenvio1').innerHTML = `${'USD' + ' '+ localStorage.getItem('envio')*sumaCarrito(userCart)}`
      document.getElementById('sumatotal').innerHTML = `${'USD' + ' '+ parseInt(localStorage.getItem('envio')*sumaCarrito(userCart)+(sumaCarrito(userCart))) }`

    })
  })
})

function addProdCart(value) {

    for (let i = 0; i < value.length; i++) {
        const array = value[i];

        console.log(value)

        document.getElementById('cartProdRes').innerHTML += 

            `
            <div class="card " style=" border: none;">
            <div class="row g-0">
              <div class="col-md-1 mt-4">
                <img src="${array.images[0]}" class="rounded-start" alt="..." height="80px" width="80px" style="object-fit: cover;">
              </div>
              <div class="col ms-3">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h5 class="card-title fw-bold">${array.name}
                      <p class="card-text"><small class="text-muted">${array.id}</small></p></h5>
                    </div>
      
                    <div onclick="localStorage.setItem('idProdDel', ${array.id})" class="col text-end mt-2 cursor-active">
                      <span class="text-de"><i class="fa-solid fa-circle-xmark fa-2x"></i></span>
                    </div>
                  </div>
                
                  <div class="row">
                    <div class="col"><h5 class="fw-bold">${array.currency + ' ' + array.cost}</h5></div>
                    <div class="col text-end me-1">
                       <input id="cantidadProd${array.id}" class="text-center fs-5 fw-bold" min="1" value="1" style="width: 15%;  " type="number">
                    </div>
                    
                  </div>
                
                  
                </div>
                
              </div>
            </div>
          `

    }
}

function totales(value, ){

  document.getElementById('totales').innerHTML = 

  `
  <hr>
  <div class=" row">
  <div class="col">
    <h6>Subtotal</h6>
    <small class="text-muted">Sumatoria de todos los productos del carrito</small>
  </div>
 <div id="subtotalprod" class="col text-muted text-end">USD ${value}</div>
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
 <div id="sumatotal"class="col text-muted text-end fw-bold"></div>
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

function sumaCarrito(array) {

  let arrayProd = []

  for (let i = 0; i < array.length; i++) {
    

    let cantidad = document.getElementById('cantidadProd' + array[i].id)
    console.log(cantidad.value)

    const precios = array[i].cost;

    let precioProd = parseInt(JSON.stringify(precios*cantidad.value))

    arrayProd.push(precioProd)
    console.log(arrayProd)
  }
  
  
  return arrayProd.reduce((a, b) => a + b, 0)
  
}

function deleteItem(array) {

  var index = array.map(function (e) { return e.id; }).indexOf(localStorage.getItem('idProdDel')) 
    let indexdelete = array.splice(index)
      localStorage.setItem('carritoTOTALb', JSON.stringify(indexdelete))

}
