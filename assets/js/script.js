//Clase Producto, para los productos existentes en stock
window.addEventListener('DOMContentLoaded', stockProductosDisponibles);

class Producto {
    constructor(nombre, precio, imagen) {
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
    }
}
//Clase de los productos que van al carrito, con la funcion que calcula el subtotal (se muestra en el div)
class ProductoCarrito {
    constructor(producto, cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
    }

    calcularSubtotal() {
        return this.producto.precio * this.cantidad;
    }
}

class Carrito {
    constructor() {
        //Arreglo que contiene a los elementos del carrito
        this.productos = [];
    }
    //FUNCIONES
    agregarProducto(producto, cantidad) {
        const productoCarrito = new ProductoCarrito(producto, cantidad);
        this.productos.push(productoCarrito);
        this.mostrarProductos();
    }

    editarProducto(index) {
        const cantidad = parseFloat(prompt("Ingrese la nueva cantidad del producto:", this.productos[index].cantidad), 10);

        if (!isNaN(cantidad) && cantidad > 0) {
            this.productos[index].cantidad = cantidad;
            this.mostrarProductos();
        } else {
            alert("Cantidad incorrecta. Por favor, intente de nuevo.");
        }
    }

    eliminarProducto(index) {
        this.productos.splice(index, 1);
        this.mostrarProductos();
    }

    calcularTotal() {
        return this.productos.reduce((total, productoCarrito) => total + productoCarrito.calcularSubtotal(), 0);
    }
    
    //Funcion que muestra los productos en el contenedor CARRITO y permite EDITAR y ELIMINAR
    mostrarProductos() {
        /* const titulo = document.getElementById('tituloCarrito');
        titulo.innerHTML = `Carrito de compras (${this.productos.length} productos)`; */
        const productosDiv = document.getElementById('productos');
        productosDiv.innerHTML = '';
        //Aqui se muestran los productos que se han ingresado al carrito, cantidad y subtotal
        this.productos.forEach((productoCarrito, index) => {
            const productoDiv = document.createElement('div');
            const img = document.createElement('img');
            img.src = productoCarrito.producto.imagen;
            const texto = document.createElement('span');
            texto.textContent = `${index + 1}. ${productoCarrito.producto.nombre} - $${productoCarrito.producto.precio.toFixed(2)} x ${productoCarrito.cantidad} = $${productoCarrito.calcularSubtotal().toFixed(2)}`;
            const botonesDiv = document.createElement('div');
            botonesDiv.className = 'product-buttons';
            const editarBtn = document.createElement('button');
            editarBtn.textContent = 'Editar';
            editarBtn.onclick = () => this.editarProducto(index);
            const eliminarBtn = document.createElement('button');
            eliminarBtn.textContent = 'Eliminar';
            eliminarBtn.className = 'delete';
            eliminarBtn.onclick = () => this.eliminarProducto(index);
            botonesDiv.appendChild(editarBtn);
            botonesDiv.appendChild(eliminarBtn);
            productoDiv.appendChild(img);
            productoDiv.appendChild(texto);
            productoDiv.appendChild(botonesDiv);
            productosDiv.appendChild(productoDiv);
        });
        this.mostrarTotal();
    }

    mostrarTotal() {
        const totalDiv = document.getElementById('total');
        totalDiv.innerHTML = `<b>Total: $${this.calcularTotal().toFixed(2)}</b>`;
    }

    finalizarCompra() {
        if (this.productos.length === 0) {
            alert("El carrito está vacío.");
        } else {
            alert(this.mostrarDetalles());
            this.productos = [];
            this.mostrarProductos();
        }
    }

    //Funcion que muestra el detalle de la compra del carrito en un ALERT
    mostrarDetalles() {
        let detalles = "Detalles de la compra:\n";
        this.productos.forEach((productoCarrito, index) => {
            detalles += `${index + 1}. ${productoCarrito.producto.nombre} - $${productoCarrito.producto.precio.toFixed(2)} x ${productoCarrito.cantidad} = $${productoCarrito.calcularSubtotal().toFixed(2)}\n`;
        });
        detalles += `Total: $${this.calcularTotal().toFixed(2)}`;
        return detalles;
    }
}

const productosDisponibles = [
    new Producto("Pan (kilo)", 1500, "https://cdn.pixabay.com/photo/2018/06/10/20/30/bread-3467243_640.jpg"),
    new Producto("Palta (kilo)", 3500, "https://cdn.pixabay.com/photo/2024/01/09/22/11/avocado-8498520_640.jpg"),
    new Producto("Queso (kilo)", 4290, "https://cdn.pixabay.com/photo/2014/12/21/23/34/cheese-575540_640.png"),
    new Producto("Pastel", 1800, "https://cdn.pixabay.com/photo/2016/11/21/16/59/baked-goods-1846460_640.jpg"),
    new Producto("Mantequilla", 2300, "https://cdn.pixabay.com/photo/2021/09/06/00/19/butter-6600552_640.png"),
    new Producto("Pasta", 1100, "https://cdn.pixabay.com/photo/2016/03/27/03/20/pasta-1282067_640.jpg")
];

const carrito = new Carrito();

function stockProductosDisponibles() {
    const listaProductosDiv = document.getElementById('listaProductos');
    productosDisponibles.forEach((producto) => {
        const productoDiv = document.createElement('div');
        const img = document.createElement('img');
        img.src = producto.imagen;
        const texto = document.createElement('span');
        texto.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)}`;
        const agregarBtn = document.createElement('button');
        agregarBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-basket2" viewBox="0 0 16 16">
        <path d="M4 10a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm3 0a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm3 0a1 1 0 1 1 2 0v2a1 1 0 0 1-2 0z"/>
        <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-.623l-1.844 6.456a.75.75 0 0 1-.722.544H3.69a.75.75 0 0 1-.722-.544L1.123 8H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.163 8l1.714 6h8.246l1.714-6z"/>
      </svg>`;
        agregarBtn.onclick = () => {
            const cantidad = parseFloat(prompt(`Ingrese la cantidad de ${producto.nombre}</b> que desea agregar: \n(valores decimales deben ir con punto)`), 10);
            if (!isNaN(cantidad) && cantidad > 0) {
                carrito.agregarProducto(producto, cantidad);
                alert("Producto agregado al carrito.");
            } else {
                alert("Cantidad incorrecta. Por favor, intente de nuevo.");
            }
        };
        productoDiv.appendChild(img);
        productoDiv.appendChild(texto);
        productoDiv.appendChild(agregarBtn);
        listaProductosDiv.appendChild(productoDiv);
    });
}

function agregarProducto() {
    const nombre = prompt("Ingrese el nombre del producto:");
    const producto = productosDisponibles.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());

    if (producto) {
        const cantidad = parseInt(prompt(`Ingrese la cantidad de ${producto.nombre} que desea agregar: \n(valores decimales deben ir con punto)`), 10);
        if (!isNaN(cantidad) && cantidad > 0) {
            carrito.agregarProducto(producto, cantidad);
            alert("Producto agregado al carrito.");
        } else {
            alert("Cantidad incorrecta. Por favor, intente de nuevo.");
        }
    } else {
        alert("Producto no encontrado. Por favor, intente de nuevo.");
    }
}

function finalizarCompra() {
    carrito.finalizarCompra();
}

