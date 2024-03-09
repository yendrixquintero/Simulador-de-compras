alert("Bienvenido a costumexpress");

let carrito = [];

let productos = [
    { id: 1, nombre: "arepa",  stock: 2, precio: 10 },
    { id: 2, nombre: "empanada",  stock: 4, precio: 20 },
    { id: 3, nombre: "tequeño", stock: 6, precio: 30 },
];

function sumarPrecios(carrito) {
    return carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
}

function agregarAlCarrito(id, cantidad) {
    const productoEncontrado = productos.find(producto => producto.id === id);

    if (productoEncontrado) {
        const productoEnCarrito = carrito.find(item => item.id === id);

        if (productoEnCarrito) {
            productoEnCarrito.cantidad += cantidad;
        } else {
            carrito.push({ ...productoEncontrado, cantidad });
        }

        alert(`Se agregaron ${cantidad} unidades de "${productoEncontrado.nombre}" al carrito.`);
    } else {
        alert('Producto no encontrado.');
    }
}

function mostrarCarrito() {
    if (carrito.length === 0) {
        alert('El carrito está vacío.');
    } else {
        let carritoMensaje = 'Productos en el carrito:\n';
        carrito.forEach(item => {
            carritoMensaje += `- ${item.nombre} - Precio: $${item.precio} - Cantidad: ${item.cantidad}\n`;
        });
        carritoMensaje += `Total de la compra: $${sumarPrecios(carrito)}`;
        alert(carritoMensaje);
    }
}

function mostrarProductos() {
    let productosMensaje = 'Lista de productos disponibles:\n';
    productos.forEach(producto => {
        productosMensaje += `- ID: ${producto.id} - ${producto.nombre} - Precio: $${producto.precio} - Stock: ${producto.stock}\n`;
    });
    alert(productosMensaje);
}

function eliminarDelCarrito(id, cantidad) {
    const indice = carrito.findIndex(item => item.id === id);

    if (indice !== -1) {
        const productoEnCarrito = carrito[indice];

        if (cantidad < productoEnCarrito.cantidad) {
            productoEnCarrito.cantidad -= cantidad;
            alert(`Se eliminaron ${cantidad} unidades de "${productoEnCarrito.nombre}" del carrito.`);
        } else {
            carrito.splice(indice, 1);
            alert(`Se eliminó "${productoEnCarrito.nombre}" completamente del carrito.`);
        }
    } else {
        alert('Producto no encontrado en el carrito.');
    }
}

function aplicarDescuento(total, metodoPago) {
    if (metodoPago === 'efectivo') {
        return total * 0.9; // Descuento del 10% para pago en efectivo
    } else {
        return total; // Sin descuento para tarjeta de débito
    }
}

function simuladorCompras() {
    let salir = false;

    while (!salir) {
        const accion = prompt('¿Qué deseas hacer? (agregar / ver / eliminar / pagar / listar / salir)');

        switch (accion) {
            case 'agregar':
                const idProductoAgregar = Number(prompt('Ingresa el ID del producto a agregar:'));
                const cantidadAgregar = Number(prompt('Ingresa la cantidad a agregar:'));
                agregarAlCarrito(idProductoAgregar, cantidadAgregar);
                break;

            case 'ver':
                mostrarCarrito();
                break;

            case 'eliminar':
                const idEliminar = Number(prompt('Ingresa el ID del producto a eliminar:'));
                const cantidadEliminar = Number(prompt('Ingresa la cantidad a eliminar:'));
                eliminarDelCarrito(idEliminar, cantidadEliminar);
                break;

            case 'pagar':
                const metodoPago = prompt('¿Cómo desea pagar? (efectivo / tarjeta)');
                const totalCompra = sumarPrecios(carrito);
                const totalConDescuento = aplicarDescuento(totalCompra, metodoPago);

                alert(`Total de la compra: $${totalCompra}`);
                alert(`Total con descuento: $${totalConDescuento}`);

                carrito = [];
                break;

            case 'listar':
                mostrarProductos();
                break;

            case 'salir':
                salir = true;
                break;

            default:
                alert('Acción no válida.');
                break;
        }
    }
}

simuladorCompras();
