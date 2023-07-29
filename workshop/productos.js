const productos = [
    {id: 1, nombre: "Box Engasse", imagen: "img/boxengasse.png", precio:"$15.000"},
    {id: 2, nombre: "English Horse", imagen: "img/knocknap.png", precio:"$25.000"},
    {id: 3, nombre: "Knock Nap", imagen: "img/englishrose.png", precio:"$35.000"},
    {id: 4, nombre: "La Night", imagen: "img/lanight.png", precio:"$18.000"},
    {id: 5, nombre: "Silver All", imagen: "img/silverall.png", precio:"$32.000"},
    {id: 6, nombre: "Skin Glam", imagen: "img/skinglam.png", precio:"$18.000"},
    {id: 7, nombre: "Midimix", imagen: "img/midimix.png", precio:"$54.000"},
    {id: 8, nombre: "Sir Blue", imagen: "img/sirblue.png", precio:"$32.000"},
    {id: 9, nombre: "Middlesteel", imagen: "img/middlesteel.png", precio:"$42.800"},
  ];
  
  function construirCajasProductos() {
    var contenedorItems = document.querySelector('.contenedor-items');
  
    productos.forEach(function(producto) {
      var item = document.createElement('div');
      item.classList.add('item');
  
      var itemContenido = `
        <span class="titulo-item">${producto.nombre}</span>
        <img src="${producto.imagen}" alt="" class="img-item">
        <span class="precio-item">${producto.precio}</span>
        <button class="boton-item">Agregar al Carrito</button>
      `;
  
      item.innerHTML = itemContenido;
      contenedorItems.appendChild(item);
    });
  }
  

  construirCajasProductos();