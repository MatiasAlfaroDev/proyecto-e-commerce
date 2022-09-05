let categoria = localStorage.getItem('catID');
const URL = 'https://japceibal.github.io/emercado-api/cats_products/' + categoria + '.json'


function getHTML(producto) {
    return `    
    <div class="row row-cols-1 row-cols-md g-4">
        <div class="col product-list">
            <div class="card">
                <img src="${producto.image}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${producto.name}</h5>
                    <p class="card-text">${producto.description}</p>
                    <p>${producto.soldCount} vendidos</p>
                    <hr>
                    <div class="fw-bold text-end">
                        <span class="currency">${producto.currency}</span>
                        <span class="cost">${producto.cost}</span>
                    </div>
                </div>
            </div>
        </div> 
    </div>`;  
}

document.addEventListener('DOMContentLoaded', async function() {
    const list = document.querySelector('.product-list');

    const listaProductos = await getJSONData(URL);  
    

   for (let producto of listaProductos.data.products) {
    list.innerHTML  += getHTML(producto)
   }
}) 
  
const priceAsc = document.getElementById('priceAsc');
const priceDesc = document.getElementById('priceDesc');
const sortByRelevance = document.getElementById('sortByRelevance');


document.addEventListener("DOMContentLoaded", async function() {
    const productsList = await getJSONData(URL)
    let productArray = productsList.data.products
    console.log(productArray)
})


const ORDER_ASC_BY_COST = "ASC";
const ORDER_DESC_BY_COST = "DESC";
const ORDER_BY_RELEVANCE = ">";

let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });

    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });

    }else if (criteria === ORDER_BY_RELEVANCE){
        result = array.sort(function(a, b) {
            if ( a.soldCount > b.soldCount ){ return -1; }
            if ( a.soldCount < b.soldCount ){ return 1; }
            return 0;
        });
    }

    return result;
}


document.addEventListener("DOMContentLoaded", function(e) {
    document.getElementById("priceAsc").addEventListener("click", function(){
        
        console.log('click')
    });
    
    document.getElementById("priceDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_COST);
    });
    
    document.getElementById("sortByRelevance").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_RELEVANCE);
    });
    
})