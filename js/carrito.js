let productosEnCarrito = localStorage.getItem("productos-en-carrito")
productosEnCarrito = JSON.parse(productosEnCarrito)

const contenedorCarritoVacio = document.querySelector("#carrito-vacio")
const contenedorCarritoProductos = document.querySelector("#carrito-productos")
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones")
const contenedorCarritoComprado = document.querySelector("#carrito-comprado")
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar")
const botonVaciar = document.querySelector("#carrito-acciones-vaciar")
const contenedorTotal = document.querySelector("#total")
const botonComprar = document.querySelector("#carrito-acciones-comprar")


function cargarProductosCarrito () {
    if(productosEnCarrito && productosEnCarrito.length>0 ){

        contenedorCarritoVacio.classList.add("disabled")
        contenedorCarritoProductos.classList.remove("disabled")
        contenedorCarritoAcciones.classList.remove("disabled")
        contenedorCarritoComprado.classList.add("disabled")

        contenedorCarritoProductos.innerHTML="";

        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div")
            div.classList.add("carrito-producto")
            div.innerHTML =`
            <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="carrito-producto-titulo">
                <small>Título</small>
                <h3>${producto.titulo}</h3>
            </div>
            <div class="carrito-producto-cantidad">
                <small>Cantidad:</small>
                <p>${producto.cantidad}</p>
            </div>
            <div class="carrito-producto-precio">
                <small>Precio</small>
                <p>$${producto.precio}</p>
            </div>
            <div class="carrito-producto-subtotal">
                <small>Subtotal</small>
                <p>$${producto.precio * producto.cantidad}</p>
            </div>
            <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `
            contenedorCarritoProductos.append(div)
        })} else {
            contenedorCarritoVacio.classList.remove("disabled")
            contenedorCarritoProductos.classList.add("disabled")
            contenedorCarritoAcciones.classList.add("disabled")
            contenedorCarritoComprado.classList.add("disabled")
    }
    actualizarBotonesEliminar()
    actualizarTotal()
}


cargarProductosCarrito()

/* Eliminar cosas del carrito */
function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    })
}
function eliminarDelCarrito(e){
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton)
    const nombreProducto = productosEnCarrito[index].titulo;

    Swal.fire({
        title: '¿Esta seguro en eliminar el producto del carrito?',
        text: `Va a eliminar: ${nombreProducto}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if(result.isConfirmed){
            productosEnCarrito.splice(index, 1) /* Splice sirve para eliminar desde el index, y queremos q se elimine solo un producto*/
            cargarProductosCarrito()
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
        }
    })
}
 
/* funcion que vacia todo del carrito */
botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito(){
    
    Swal.fire({
        title: '¿Esta seguro en eliminar todo el carrito?',
        text: 'Una vez eliminado no se va a poder volver a recuperar. Si quiere eliminar un producto en particular lo puede hacer directamente desde el producto a eliminar.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if(result.isConfirmed){
            Swal.fire(
                'Eliminado!',
                'El carrito ha sido eliminado correctamente.',
                'success'
            )
            productosEnCarrito.length= 0;
                localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
                cargarProductosCarrito()
        }
    })
}

/* Modificamos el total cada vez q se cargan los productos en el carrito */
function actualizarTotal () {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0) /* q arranque en 0 */
    total.innerText = `
    $${totalCalculado}
    `
}

/* funcion si usamos el comprar */
botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {
    Swal.fire({
        imageUrl: './assets/images/fondoRango.jpg',
        imageHeight: 300,
        imageAlt: 'Imagen de Rango',
        title: '¡GRACIAS!',
        text: 'Su compra se ha registrado con éxito.'
    }).then((result) => {
        // Verificar si el usuario hizo clic en el botón "OK"
        if (result.isConfirmed) {
            // Redirigir al usuario a la página de pago
            window.location.href = './pago.html';
        }
    })
    
    productosEnCarrito.length= 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))

    contenedorCarritoVacio.classList.add("disabled")
    contenedorCarritoProductos.classList.add("disabled")
    contenedorCarritoAcciones.classList.add("disabled")
    contenedorCarritoComprado.classList.remove("disabled")

}