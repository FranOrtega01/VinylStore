import {rangeInputs} from './rangeFilterConfig.js'
import {rangeNumber} from './rangeFilterConfig.js'

//Cart Info
const cartInfo = document.getElementById('cart'); //Número de elementos en el carrito mostrado en la página
const cartInfoPriceModal = document.getElementById('totalPrice');
const cartInfoQtyModal = document.getElementById('totalQty');
const albumsInCart = document.querySelector('.modal-body');

const carrito = JSON.parse(localStorage.getItem('carrito')) ?? [];

let carritoPrice = JSON.parse(localStorage.getItem('carritoPrice')) ?? carrito.reduce((acumulador, {price}) => acumulador + price, 0);

let carritoNumber = carrito.reduce((acumulador, {cantidad}) => acumulador + cantidad, 0);


//Coins
const coinSelect = document.getElementById('coins');
const filterSpanCoin = document.getElementById('filterInputCoin')
const coins = ['ARS','USD'];
coins.sort();
let coinState = JSON.parse(localStorage.getItem('coinState')) ?? 'USD';


//Funciones
function NewAlbum(id,album,artist,year,price,img,gender){//Crear objeto de album
    this.id = id;
    this.album = album;
    this.year = year;
    this.artist = artist;
    this.price = price;
    this.img = img;
    this.gender = gender;
}
function addAlbum(id,album,artist,year,price,img,gender){//Añadir album a albumList
    const addNewAlbum = new NewAlbum(id,album,artist,year,price,img,gender);
    addNewAlbum.cantidad = 1;
    addNewAlbum.gender = addNewAlbum.gender[0].toUpperCase() + addNewAlbum.gender.substring(1);
    albumList.push(addNewAlbum)
} 
function cart(idProduct){//Agregar item al carrito
    let objeto = albumList.find(({id}) => id === idProduct); //Busca el elemento con esa id y lo agrega al carrito
    let objetoCarrito = carrito.find(({id}) => id === idProduct);
    if(objetoCarrito == undefined){//Si no esta en carrito (undefined) lo pushea
        carrito.push(objeto);
    }else{// Si ya esta le suma canitdad
        objetoCarrito.cantidad++;
    }
    refreshCart();
    Toastify({
        text: `Added "${objeto.album}"`,
        className: "toastAlert",
        duration: 1500,
        newWindow: true,
        close: false,
        avatar: `${objeto.img}`,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: false, // Prevents dismissing of toast on hover
        onClick: function(){} // Callback after click
    }).showToast();
}

function removeOneItemCart(idProducto){//Remover una cantidad del carrito
    let indexCart = carrito.findIndex(({id}) => id === idProducto); //Busca el index del id indicado
    if (indexCart !== -1 && carrito[indexCart].cantidad == 1){ 
        carrito.splice([indexCart],1);
        refreshCart();
    }else{ 
        carrito[indexCart].cantidad--;
        refreshCart();
    }
}

function removeAllItemCart(idProducto){//Remover todo el item del carrito
    let indexCart = carrito.findIndex(({id}) => id === idProducto); //Busca el index del id indicado
    carrito.splice([indexCart],1);
    refreshCart();
}
const btnVaciarCarrito = document.getElementById('borrarCarrito');
btnVaciarCarrito.addEventListener('click', () => {//Vacia el carrito entero
    //Sweet alert
    Swal.fire({
        title: 'Are you sure?',
        text: "Cart will be emptied",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#2ebd6e',
        cancelButtonColor: '#dc3b3b',
        confirmButtonText: 'Yes, empty it!',
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Deleted!',
                'Cart is now empty!',)
            carrito.splice(0,carrito.length); //Vacia el carrito
            refreshCart();
        }
        })
    })

function refreshCart(){
    //Refresh info
    localStorage.setItem('carrito', JSON.stringify(carrito)); //Actualizar el storage (carrito)
    //Actualizar todos los inner 
    carritoPrice = carrito.reduce((acumulador, {price, cantidad}) => acumulador + price*cantidad, 0); 
    carritoNumber = carrito.reduce((acumulador, {cantidad}) => acumulador + cantidad, 0); 
    cartInfo.innerHTML = `${carritoNumber} - $${carritoPrice} ${coinSelect.value}`;
    cartInfoPriceModal.innerHTML = `Total: $${carritoPrice} ${coinSelect.value}`;
    cartInfoQtyModal.innerHTML = `Qty: ${carritoNumber}`;
    localStorage.setItem('carritoPrice',JSON.stringify(carritoPrice))

    //Refresh cart
    albumsInCart.innerHTML = ''; 
    const templateCart = document.querySelector('#templateCart').content;
    const fragmentCart = document.createDocumentFragment();
    carrito.forEach(item => {
        templateCart.querySelector('h2').textContent = item.album;
        templateCart.querySelector('img').src = item.img;
        templateCart.querySelector('img').alt = `${item.album} by ${item.artist}`;
        templateCart.querySelector('.albumArtist').textContent = item.artist;
        templateCart.querySelector('.albumPrice').textContent = `$${item.price}.00 ${coinSelect.value}`;
        templateCart.querySelector('.albumCantidad').textContent = `Quantity: ${item.cantidad}`;
        templateCart.querySelectorAll('.cartActions button i').forEach(button => {
            button.dataset.id = item.id;
        })

        const clone = templateCart.cloneNode(true);
        fragmentCart.appendChild(clone);
        });
    albumsInCart.appendChild(fragmentCart);

    const removeBtn = document.querySelectorAll('.cartDiv button i');
    removeBtn.forEach(btn => {
        btn.addEventListener('click', (e) => {//Asignar funcion a cada boton
            switch(e.target.id){
            case 'cartItemRemove':
                removeOneItemCart(Number(e.target.getAttribute("data-id")))
                break;
            case 'cartItemAdd':
                cart(Number(e.target.getAttribute("data-id")))
                break;
            case 'cartItemRemoveAll':
                removeAllItemCart(Number(e.target.getAttribute("data-id")))
                break;
            }
            // removeOneItemCart(Number(e.target.getAttribute("data-id")));
        })
    });
}
