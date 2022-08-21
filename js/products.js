const URL = 'https://japceibal.github.io/emercado-api/cats_products/101.json'

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
    console.log(listaProductos)

   for (let producto of listaProductos.data.products) {
    list.innerHTML  += getHTML(producto)
   }
}) 
  
