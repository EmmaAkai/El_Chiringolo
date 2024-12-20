var modal = document.getElementById("cartModal");
var btnCart = document.querySelector(".cart__img");
var span = document.getElementsByClassName("close")[0];

btnCart.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//==================================================================================

let productos = [];

const valorTotal = document.querySelector("#totalAPagar");

const countProducts = document.querySelector("#ProdContador");


function agregarProducto(producto, precio, img) {
}

const listedProduct = document.querySelector("#listed-product");
const cartProducts = document.querySelector("#modal-products");
const removeProducts = document.querySelector("#remove-products");


//lista de todos los contenedores de los productos
const productsList = document.querySelector(".box__container");

productsList.addEventListener("click", (e) => {
    if (e.target.classList.contains("info__btn")) {
        const product = e.target.parentElement;

        const infoProduct = {
            quantity: 1,
            img: product.querySelector("img").src,//no puedo poner las fotos xq es complicado ajustarlas
            tittle: product.querySelector("h2").textContent,
            price: product.querySelector("p").textContent
        }

        const exist = productos.some(producto => producto.tittle === infoProduct.tittle);

        if (exist) {
            const Products = productos.map(producto => {
                if (producto.tittle === infoProduct.tittle) {
                    producto.quantity++;
                    return producto
                } else {
                    return producto
                }
            })
            productos = [...Products]
        }else {
            productos = [...productos, infoProduct];
        }        

        showHTML();

    }

})


function pagar () {
    // Guardar datos en sessionStorage
    localStorage.setItem('productos', JSON.stringify(productos));
    localStorage.setItem('total', valorTotal.textContent);

    window.location.href = "../html/compra.html"; 
}



cartProducts.addEventListener("click", (e) => {

    if (e.target.classList.contains("icon-close")) {
        const product = e.target.parentElement;
        const tittle = product.querySelector("h3").textContent;
    
        productos = productos.filter(
            product => product.tittle !== tittle)

        console.log(productos);
        showHTML();
    }
});



//Funcion para mostrar en el html los productos seleccionados
const showHTML = () => {

    //if(!productos.lenght){
    //    cartProducts.innerHTML = ` 
    //        <div class="listed-product" id="listed-product" style="display: flex; justify-content: center; align-items: center;">
    //            <h3>El carrito esta vacio.</h3>
    //        </div>`
    //}


    cartProducts.innerHTML = "";

    let total = 0;
    let totalQuantity = 0;


    productos.forEach(product => {
        const containerProduct = document.createElement("div")
        containerProduct.classList.add("listed-product")

        containerProduct.innerHTML = `
            <h4>${product.quantity}</h4>
            <img src="${product.img}" alt="">
            <h3>${product.tittle}</h3>
            <p>${product.price}</p>
            <svg class="icon-close" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="none" stroke="#dc2626" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/></svg>
        `
    
        cartProducts.append(containerProduct);
    
        total += parseInt(product.quantity * product.price.replace(".", "").slice(1));
        totalQuantity += product.quantity;
    });

    valorTotal.innerText = `${total}`;
    countProducts.innerText = totalQuantity;

}

