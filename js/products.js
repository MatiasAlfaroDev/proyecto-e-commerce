const filterAsc         = document.querySelector('#filterAsc')
const filterDesc        = document.querySelector('#filterDesc')
const filterRel         = document.querySelector('#filterRel')
const filterPriceBtn    = document.querySelector('#filterPriceBtn')
const filterDeleteBtn   = document.querySelector('#filterDeleteBtn')

// Asc Filter
function ascPrice(array) {
    array.sort((a, b) => {
      if (a.cost > b.cost) return -1;
      if (a.cost < b.cost) return 1;
      return 0; 
    })
        showProducts(array)
}

// Desc Filter
function descPrice(array) {
    array.sort((a, b) => {
      if (a.cost < b.cost) return -1;
      if (a.cost > b.cost) return 1;
      return 0; 
    })
        showProducts(array)

}

// Rel Filter
function relevance(array) {
    array.sort((a, b) => {
      if ( parseInt(a.soldCount) > parseInt(b.soldCount)) return -1;
      if ( parseInt(a.soldCount) < parseInt(b.soldCount)) return 1;
      return 0; 
    })
        showProducts(array)
}

// User price Filter
function userPrice(array) {

    var minPrice = document.querySelector('#priceFilterCountMin').value
    var maxPrice = document.querySelector('#priceFilterCountMax').value

    // checks user's minimum price input
    if ((minPrice != undefined) && (minPrice != '')) maxValue = parseInt(minPrice)
    else minPrice = 0

    // checks user's maximum price input
    if ((maxPrice != undefined) && (maxPrice != '')) maxValue = parseInt(maxPrice)
    else maxPrice = 0

    let priceArray = []

    for (const product of array) {
        if (minPrice <= product.cost && maxPrice >= product.cost) {
            priceArray.push(product)
        }
    }

    showProducts(priceArray)
}
    
// Dynamic product adding 
document.addEventListener("DOMContentLoaded", ()=> {
    //Fetch for products, json to array
    fetch(productsUrl)
    .then(res => res.ok ? Promise.resolve(res) : Promise.reject())
    .then(res => res.json())
    .then(res => {

        productCat(res.catName)

        // Filter triggers
        relevance(res.products)
        document.querySelector('#DropdownMenu').innerHTML = 'Mas relevantes'


        filterAsc.addEventListener('click', () => {
            ascPrice(res.products)
            document.querySelector('#DropdownMenu').innerHTML = 'Mayor precio'
        })

        filterDesc.addEventListener('click', () => {
            descPrice(res.products)
            document.querySelector('#DropdownMenu').innerHTML = 'Menor precio'
        })

        filterRel.addEventListener('click', () => {
            relevance(res.products)
            document.querySelector('#DropdownMenu').innerHTML = 'Mas relevantes'
        })

        
        filterPriceBtn.addEventListener('click', () => {
            userPrice(res.products)
        })

        filterDeleteBtn.addEventListener('click', () => {

            document.querySelector('#priceFilterCountMin').value = ''
            document.querySelector('#priceFilterCountMax').value = ''
            minCount = undefined
            maxCount = undefined
            relevance(res.products)

        })

        const searchInput = document.querySelector('.searchBarInput')

        searchInput.addEventListener('input', (e) => {
            
            const value = e.target.value
            showProducts(searchProduct(res.products, value))
        })
        

    })
})

// Dynamic product adding content
function showProducts(productsList) {

    document.getElementById('productContainer').innerHTML = ''

    for (let index = 0; index < productsList.length; index++) {
        const product = productsList[index];

        document.getElementById('productContainer').innerHTML += `    
        <div onclick="setProdID(${product.id})" class="col product-list cursor-active">
            <div class="card">
                <img src="${product.image}" class="img-fluid rounded-start">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p>${product.soldCount} vendidos</p>
                    <hr>
                    <div class="fw-bold text-end">
                        <span class="currency">${product.currency}</span>
                        <span class="cost">${product.cost}</span>
                    </div>
                </div>
            </div>
        </div> 
    </div>`;  

       }    
  
}

function productCat(product) {

    document.getElementById('prodCat').innerHTML = `
    
    <h2 class="fw-bold">${product}</h3>
    
    `


}

function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}

const productsUrl = 'https://japceibal.github.io/emercado-api/cats_products/' + localStorage.getItem('catID') + '.json';    