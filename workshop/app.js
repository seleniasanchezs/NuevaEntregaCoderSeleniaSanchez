let carritoVisible = false;

    document.addEventListener('DOMContentLoaded', ready);

    function ready() {
      const carritoItems = document.querySelector('.carrito-items');
      const btnPagar = document.querySelector('.btn-pagar');
      const searchForm = document.getElementById('search-form');
      const searchInput = document.getElementById('search-input');

      document.querySelectorAll('.btn-eliminar').forEach(button => button.addEventListener('click', eliminarItemCarrito));
      document.querySelectorAll('.sumar-cantidad, .restar-cantidad').forEach(button => button.addEventListener('click', sumarRestarCantidad));
      document.querySelectorAll('.boton-item').forEach(button => button.addEventListener('click', agregarAlCarritoClicked));

      btnPagar.addEventListener('click', pagarClicked);

      searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const searchTerm = searchInput.value.toLowerCase();
        const productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(searchTerm));
        renderizarProductos(productosFiltrados);
      });

      obtenerProductos(); // Llama a la función para obtener los productos desde productos.js
    }


function pagarClicked() {
  const carritoItems = document.querySelector('.carrito-items');
  while (carritoItems.firstChild) {
    carritoItems.removeChild(carritoItems.firstChild);
  }
  actualizarTotalCarrito();
  ocultarCarrito();
}

function agregarAlCarritoClicked(event) {
  const button = event.target;
  const item = button.parentElement;
  const titulo = item.querySelector('.titulo-item').innerText;
  const precio = item.querySelector('.precio-item').innerText;
  const imagenSrc = item.querySelector('.img-item').src;
  agregarItemAlCarrito(titulo, precio, imagenSrc);
  hacerVisibleCarrito();
}

function hacerVisibleCarrito() {
  carritoVisible = true;
  const carrito = document.querySelector('.carrito');
  carrito.style.marginRight = '0';
  carrito.style.opacity = '1';
  const items = document.querySelector('.contenedor-items');
  items.style.width = '60%';
}
function agregarItemAlCarrito(titulo, precio, imagenSrc) {
  const carritoItems = document.getElementsByClassName('carrito-item');
  let encontrado = false;

  for (const item of carritoItems) {
    const tituloCarrito = item.querySelector('.carrito-item-titulo').innerText;
    if (tituloCarrito === titulo) {
      encontrado = true;
      const cantidadItem = item.querySelector('.carrito-item-cantidad');
      let cantidadActual = parseInt(cantidadItem.value);
      cantidadActual++;
      cantidadItem.value = cantidadActual;
      break;
    }
  }

  if (!encontrado) {
    const itemCarritoContenido = `
      <div class="carrito-item">
        <img src="${imagenSrc}" width="80px" alt="">
        <div class="carrito-item-detalles">
          <span class="carrito-item-titulo">${titulo}</span>
          <div class="selector-cantidad">
            <i class="fa-solid fa-minus restar-cantidad"></i>
            <input type="text" value="1" class="carrito-item-cantidad" disabled>
            <i class="fa-solid fa-plus sumar-cantidad"></i>
          </div>
          <span class="carrito-item-precio">${precio}</span>
        </div>
        <button class="btn-eliminar">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;

    const item = document.createElement('div');
    item.classList.add('carrito-item');
    item.innerHTML = itemCarritoContenido;

    item.querySelector('.btn-eliminar').addEventListener('click', eliminarItemCarrito);
    item.querySelector('.sumar-cantidad').addEventListener('click', sumarRestarCantidad);
    item.querySelector('.restar-cantidad').addEventListener('click', sumarRestarCantidad);

    document.querySelector('.carrito-items').appendChild(item);
  }

  actualizarTotalCarrito();
}
function sumarRestarCantidad(event) {
  const buttonClicked = event.target;
  const selector = buttonClicked.parentElement;
  const cantidadInput = selector.querySelector('.carrito-item-cantidad');
  let cantidadActual = parseInt(cantidadInput.value);
  cantidadActual += buttonClicked.classList.contains('sumar-cantidad') ? 1 : -1;
  cantidadInput.value = Math.max(1, cantidadActual);
  actualizarTotalCarrito();
}

function eliminarItemCarrito(event) {
  const buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  actualizarTotalCarrito(); // Llama a la función aquí después de eliminar el elemento del carrito
  ocultarCarrito();
}

function ocultarCarrito() {
  const carritoItems = document.querySelector('.carrito-items');
  const carrito = document.querySelector('.carrito');
  if (carritoItems.childElementCount === 0) {
    carrito.style.marginRight = '-100%';
    carrito.style.opacity = '0';
    carritoVisible = false;
    const items = document.querySelector('.contenedor-items');
    items.style.width = '100%';
  }
}

function actualizarTotalCarrito() {
  const carritoItems = document.getElementsByClassName('carrito-item');
  let total = 0;
  for (const item of carritoItems) {
    const precioElemento = item.querySelector('.carrito-item-precio');
    const precio = parseFloat(precioElemento.innerText.replace('$', '').replace(',', ''));
    const cantidadItem = item.querySelector('.carrito-item-cantidad');
    const cantidad = parseInt(cantidadItem.value);
    total += precio * cantidad;
    console.log(total, 'total')
  }
  total = Math.round(total * 100) / 100;
  document.querySelector('.carrito-precio-total').innerText = `$${total.toLocaleString("es")},00`;
}
function construirCajasProductos(productos) {
  const contenedorItems = document.querySelector('.contenedor-items');
  contenedorItems.innerHTML = '';
  productos.forEach(function(producto) {
    const item = document.createElement('div');
    item.classList.add('item');

    const itemContenido = `
      <span class="titulo-item">${producto.nombre}</span>
      <img src="${producto.imagen}" alt="" class="img-item">
      <span class="precio-item">${producto.precio}</span>
      <button class="boton-item">Agregar al Carrito</button>
    `;

    item.innerHTML = itemContenido;
    contenedorItems.appendChild(item);

    item.querySelector('.boton-item').addEventListener('click', agregarAlCarritoClicked);
  });
}

async function obtenerProductos() {
  try {
    const response = await fetch('productos.js'); // Cambia la ruta si es necesario
    if (!response.ok) {
      throw new Error('Error al obtener los datos de productos.');
    }
    const productos = await response.json();
    construirCajasProductos(productos);
  } catch (error) {
    console.error(error);
  }
}