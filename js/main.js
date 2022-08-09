const cartInfo = document.getElementById('cart'); //Número de elementos en el carrito mostrado en la página
const cartInfoModal = document.getElementById('totalPrice');
const cartDisplay = document.getElementById('guti');
let albumList = []; //Array con los productos de mi tienda
const carrito = JSON.parse(localStorage.getItem('carrito')) ?? [];
let carritoPrice = carrito.reduce((acumulador, producto) => acumulador + producto.price, 0);
const totalCarrito = localStorage.getItem('CantidadDeProductos');

cartInfo.innerHTML = `${totalCarrito} - $${carritoPrice}`;
cartInfoModal.innerHTML = `Total: $${carritoPrice}`

localStorage.setItem('CantidadDeProductos',carrito.length);
refreshCart()

function NewAlbum(id,album,artist,year,price,img,gender){
    this.id = id;
    this.album = album;
    this.year = year;
    this.artist = artist;
    this.price = price;
    this.img = img;
    this.gender = gender;
}

//Agregar un album mediante la constructora
function addAlbum(id,album,artist,year,price,img,gender){
    albumList.push(new NewAlbum(id,album,artist,year,price,img,gender));
} 

function cart(id){
    let objeto = albumList.find((el) => el.id === id); //Busca el elemento con esa id y lo agrega al carrito
    carrito.push(objeto);
    //Actualizar precio y numero del carrito
    localStorage.setItem('CantidadDeProductos',carrito.length)
    refreshCart();
}

//Remover producto del carrito
function removerProductoCart(id){
    let indexCart = carrito.findIndex((producto) => producto.id === id); //Busca el index del id indicado
    if (indexCart !== -1){
        carrito.splice(indexCart,1); //Borra el elemento con la id indicada
        refreshCart()
    }
    localStorage.setItem('CantidadDeProductos',carrito.length)
}
//----------------------------------

//Vaciar el carrito ✓
const btnVaciarCarrito = document.getElementById('borrarCarrito');
btnVaciarCarrito.addEventListener('click', () => {
    carrito.splice(0,carrito.length); //Vacia el carrito
    console.log('Se vació el carrito!')
    localStorage.setItem('CantidadDeProductos',carrito.length);
    // cartInfo.innerHTML = `${carrito.length} - $${carritoPrice}`;
    // cartInfoModal.innerHTML = `Total: $${carritoPrice}`
    refreshCart();
});
//----------------------------------

//The Weeknd
addAlbum(1,'Starboy', 'The Weeknd',2016,35,'img/starboy-theweeknd.jfif','pop');
addAlbum(2,'After Hours', 'The Weeknd',2020,35,'img/afterhours-theweeknd.jfif','pop');
addAlbum(3,'After Hours (Deluxe)', 'The Weeknd',2020,40,'img/afterhoursdeluxe-theweeknd.jfif','pop');
addAlbum(4,'Dawn FM', 'The Weeknd',2022,38,'img/dawnFM-theweeknd.jfif','pop');
addAlbum(5,'My Dear Melancholy,', 'The Weeknd',2018,26,'img/mdm-theweeknd.jfif','pop');
//Harry Styles
addAlbum(6,'Fine Line', 'Harry Styles',2019,32,'img/fineline-harrystyles.jfif','pop');
addAlbum(7,`Harry's House`, 'Harry Styles',2022,32,'img/harryshouse-harrystyles.jfif','pop');
addAlbum(8,'Harry Styles', 'Harry Styles',2017,28,'img/harrystyles.jfif','pop');


// albumList.sort((a,b) => b.year - a.year);

// Template Albums
const albumsInStore = document.querySelector('#albums');
const templateProduct = document.querySelector('#templateAlbum').content;
const fragment = document.createDocumentFragment();

albumList.forEach(item => {
    templateProduct.querySelector('h2').textContent = item.album;
    templateProduct.querySelector('img').src = item.img;
    templateProduct.querySelector('.albumArtist').textContent = item.artist;
    templateProduct.querySelector('.albumYear').textContent = item.year;
    templateProduct.querySelector('.albumPrice').textContent = `$${item.price}.00`;
    templateProduct.querySelector('.add').setAttribute('onclick', `cart(${item.id})`);
    const clone = templateProduct.cloneNode(true);
    fragment.appendChild(clone);
});
albumsInStore.appendChild(fragment);
//----------------------------------
// Template Cart
// function refreshCart(){
//     const albumsInCart = document.querySelector('.modal-body');
//     const templateCart = document.querySelector('#templateCart').content;
//     const fragmentCart = document.createDocumentFragment();
//     carrito.forEach(item => {
//         templateCart.querySelector('h2').textContent = item.album;
//         templateCart.querySelector('img').src = item.img;
//         templateCart.querySelector('.albumArtist').textContent = item.artist;
//         templateCart.querySelector('.albumPrice').textContent = `$${item.price}.00`;
//         templateCart.querySelector('button').setAttribute('onclick', `removerProductoCart(${item.id})`);

//         const clone = templateCart.cloneNode(true);
//         fragmentCart.appendChild(clone);
//         });
//     albumsInCart.appendChild(fragmentCart);
// }
function refreshCart(){
    localStorage.setItem('carrito', JSON.stringify(carrito));
    let carritoPrice = carrito.reduce((acumulador, producto) => acumulador + producto.price, 0);
    cartInfo.innerHTML = `${carrito.length} - $${carritoPrice}`;
    cartInfoModal.innerHTML = `Total: $${carritoPrice}`
    cartDisplay.innerHTML = '';
    carrito.forEach(element => {
    cartDisplay.innerHTML +=
    `<div class="cartDiv">
        <img class="img-fluid" src="${element.img}">
        <div class="cartAlbumInfo">
            <h2 class="album">${element.album}</h2>
            <p class="albumArtist">${element.artist}</p>
            <p class="albumPrice">$${element.price}.00</p>
        </div>
        <button onclick="removerProductoCart(${element.id})"><i class="fa-solid fa-xmark"></i></button>
    </div>`
});
}
//----------------------------------

