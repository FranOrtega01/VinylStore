const cartInfo = document.getElementById('cart'); //Número de elementos en el carrito mostrado en la página
const cartInfoPriceModal = document.getElementById('totalPrice');
const cartInfoQtyModal = document.getElementById('totalQty');
const cartModal = document.getElementById('CartModal')
const cartDisplay = document.getElementById('guti');
let albumList = []; //Array con los productos de mi tienda
const carrito = JSON.parse(localStorage.getItem('carrito')) ?? [];
let carritoPrice = carrito.reduce((acumulador, {price}) => acumulador + price, 0);

const albumsInCart = document.querySelector('.modal-body');

refreshCart();

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
    let guti = new NewAlbum(id,album,artist,year,price,img,gender);
    guti.cantidad = 1;
    albumList.push(guti)
} 

function cart(idProduct){    
    let objeto = albumList.find(({id}) => id === idProduct); //Busca el elemento con esa id y lo agrega al carrito
    let objetoCarrito = carrito.find(({id}) => id === idProduct);
    if(objetoCarrito == undefined){
        carrito.push(objeto);
        objetoCarrito = carrito.find(({id}) => id === idProduct);
        objetoCarrito.cantidad = 1;
    }else{
        objetoCarrito.cantidad++;
    }
    //Actualizar precio y numero del carrito
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

//Remover producto del carrito
function removerProductoCart(idProducto){
    let indexCart = carrito.findIndex(({id}) => id === idProducto); //Busca el index del id indicado
    if (indexCart !== -1 && carrito[indexCart].cantidad == 1){ 
        carrito.splice([indexCart],1);
        refreshCart();
    }else{ 
        carrito[indexCart].cantidad--;
        refreshCart();
    }
}
//----------------------------------

//Vaciar el carrito ✓
const btnVaciarCarrito = document.getElementById('borrarCarrito');
btnVaciarCarrito.addEventListener('click', () => {
    //Sweet alert
    Swal.fire({
        title: 'Are you sure?',
        text: "Cart will be emptied",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, empty it!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Deleted!',
                'Cart is now empty!',
                'success',)
            carrito.splice(0,carrito.length); //Vacia el carrito
            console.log('Se vació el carrito!')
            refreshCart(); 
            $('#CartModal').modal('hide'); //Cerrar modal, lamentablemente me funciona raro sin jquery
        }
        })
    })
    

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
//Halsey
addAlbum(9,'hopeless fountain kingdom', 'Halsey',2022,42,'https://i.scdn.co/image/ab67616d00001e0288f2c5e4cd3649847e5139fa','pop');
addAlbum(10,'Manic', 'Halsey',2020,40,'https://i.scdn.co/image/ab67616d00001e027636e1c9e67eaafc9f49aefd','pop');
addAlbum(11,'BADLANDS', 'Halsey',2022,27,'https://i.scdn.co/image/ab67616d00001e02bd02d63417be256b22bffc28','pop');
//The Beatles
addAlbum(12,`Abbey Road`, 'The Beatles',1969,27,'https://i.scdn.co/image/ab67616d00001e02dc30583ba717007b00cceb25','rock');
addAlbum(13,`Help!`, 'The Beatles',1965,50,'https://i.scdn.co/image/ab67616d00001e02e3e3b64cea45265469d4cafa','rock');
addAlbum(14,`Revolver`, 'The Beatles',1966,48,'https://i.scdn.co/image/ab67616d00001e0228b8b9b46428896e6491e97a','rock');
addAlbum(15,`1 (Remastered)`, 'The Beatles',2000,52,'https://i.scdn.co/image/ab67616d00001e02582d56ce20fe0146ffa0e5cf','rock');
addAlbum(16,`The Beatles 1962 - 1966`, 'The Beatles',1973,55,'https://i.scdn.co/image/ab67616d00001e025ef4660298ae29ee18799fc2','rock');
addAlbum(17,`Let It Be`, 'The Beatles',1970,55,'https://i.scdn.co/image/ab67616d00001e0284243a01af3c77b56fe01ab1','rock');
addAlbum(18,`Rubber Soul`, 'The Beatles',1965,50,'https://i.scdn.co/image/ab67616d00001e02ed801e58a9ababdea6ac7ce4','rock');
addAlbum(19,`Please Please Me`, 'The Beatles',1963,50,'https://i.scdn.co/image/ab67616d00001e02dbeec63ad914c973e75c24df','rock');
addAlbum(20,`Get Back (Rooftop Performance)`, 'The Beatles',2022,52,'https://i.scdn.co/image/ab67616d00001e0204167cd5b7ddbf5c4a563456','rock');





// albumList.sort((a,b) => b.year - a.year);

// Template Albums
const albumsInStore = document.querySelector('#albums');
const templateProduct = document.querySelector('#templateAlbum').content;
const fragment = document.createDocumentFragment();

albumList.forEach(item => {
    templateProduct.querySelector('h2').textContent = item.album;
    templateProduct.querySelector('img').src = item.img;
    templateProduct.querySelector('.albumArtist').textContent = `${item.artist} - ${item.gender}`;
    templateProduct.querySelector('.albumYear').textContent = item.year;
    templateProduct.querySelector('.albumPrice').textContent = `$${item.price}.00`;
    templateProduct.querySelector('button').dataset.id = item.id;
    const clone = templateProduct.cloneNode(true);
    fragment.appendChild(clone);
});
albumsInStore.appendChild(fragment);
//----------------------------------

function refreshCart(){
    //Refresh info
    localStorage.setItem('carrito', JSON.stringify(carrito));
    let carritoPrice = carrito.reduce((acumulador, {price, cantidad}) => acumulador + price*cantidad, 0);
    let carritoNumber = carrito.reduce((acumulador, {cantidad}) => acumulador + cantidad, 0);
    cartInfo.innerHTML = `${carritoNumber} - $${carritoPrice}`;
    cartInfoPriceModal.innerHTML = `Total: $${carritoPrice}`;
    cartInfoQtyModal.innerHTML = `Qty: ${carritoNumber}`;

    //Refresh cart
    albumsInCart.innerHTML = '';
    const templateCart = document.querySelector('#templateCart').content;
    const fragmentCart = document.createDocumentFragment();
    carrito.forEach(item => {
        templateCart.querySelector('h2').textContent = item.album;
        templateCart.querySelector('img').src = item.img;
        templateCart.querySelector('.albumArtist').textContent = item.artist;
        templateCart.querySelector('.albumPrice').textContent = `$${item.price}.00`;
        templateCart.querySelector('.albumCantidad').textContent = `Quantity: ${item.cantidad}`;
        templateCart.querySelector('button').setAttribute('onclick', `removerProductoCart(${item.id})`);
        const clone = templateCart.cloneNode(true);
        fragmentCart.appendChild(clone);
        });
    albumsInCart.appendChild(fragmentCart);

}

//----------------------------------

const addBtn = document.querySelectorAll('.albumDiv button');
addBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        id = Number(btn.getAttribute('data-id'));
        cart(id)
    })
});

