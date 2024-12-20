// Recuperar los datos del localStorage
const prods = JSON.parse(localStorage.getItem('productos')) || [];
const Ptotal = localStorage.getItem('total') || 0;

const empty = document.getElementById("empty");

let listaProductos = document.querySelector(".lista-productos");

if (prods.length === 0) {
    listaProductos.innerHTML = `
        <h4>El carrito esta vacio.</h4>
    `;
}



if (listaProductos) {
    prods.forEach(product => {
        const prodDiv = document.createElement("div");
        prodDiv.classList.add("item-producto");
        prodDiv.innerHTML = `
            <h4>${product.quantity}</h4>
            <img src="${product.img}" alt="">
            <h3>${product.tittle}</h3>
            <p>${product.price}</p>
        `;
        listaProductos.appendChild(prodDiv);
    });
}

let total = document.querySelector(".total");
if (total) {
    total.innerHTML = `
        <p>Total: $${Ptotal}</p>
    `;
}

function gracias() {
    sessionStorage.clear();
    window.location.href = "../html/gracias.html";
}