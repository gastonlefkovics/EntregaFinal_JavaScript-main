let productos = []

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data
        cargarProductos(productos);
    })

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");/* Ponemos ALL porque queremos traernos todos los botones */
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

// /* Esta funcion rellena todos los productos en el html*/
function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML="";   /* Primero dejamos el contenedor vacio para que cuando se elija una categoria no se dupliquen */

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">$${producto.precio}</p>
            <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;
        contenedorProductos.append(div);
    })
    actualizarBotonesAgregar();
}


/* Agregar productos al carrito */
function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito")

if(productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS)
    actualizarNumerito()
}else{
    productosEnCarrito = []
}


/* Agregamos los elementos a un array para agregarlos al carrito*/
function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
        Toastify({
            text: 'Producto agregado al carrito.',
            duration: 2000,
            gravity: 'bottom',
            position: 'right',
            style: {
                background: 'linear-gradient(to right, #FD8D14, #C51605)',
                color: 'white'
            }
        }).showToast()
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
        actualizarNumerito(); 
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        Toastify({
            text: 'Producto agregado al carrito.',
            duration: 2000,
            gravity: 'bottom',
            position: 'right',
            style: {
                background: 'linear-gradient(to right, #FD8D14, #C51605)',
                color: 'white'
            }
        }).showToast()
    }
}


/* Actualizamos el numero del carrito */
function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}