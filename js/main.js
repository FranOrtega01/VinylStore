const cartInfo = document.getElementById('cart'); //Número de elementos en el carrito mostrado en la página
const cartInfoPriceModal = document.getElementById('totalPrice');
const cartInfoQtyModal = document.getElementById('totalQty');
import {rangeInputs} from './rangeFilterConfig.js'
import {rangeNumber} from './rangeFilterConfig.js'

let albumList = []; //Array con los productos de mi tienda
const carrito = JSON.parse(localStorage.getItem('carrito')) ?? [];
let carritoPrice = JSON.parse(localStorage.getItem('carritoPrice')) ?? carrito.reduce((acumulador, {price}) => acumulador + price, 0);
let carritoNumber = carrito.reduce((acumulador, {cantidad}) => acumulador + cantidad, 0);

const albumsInCart = document.querySelector('.modal-body');
const coinSelect = document.getElementById('coins');

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
    let addNewAlbum = new NewAlbum(id,album,artist,year,price,img,gender);
    addNewAlbum.cantidad = 1;
    addNewAlbum.gender = addNewAlbum.gender[0].toUpperCase() + addNewAlbum.gender.substring(1);
    albumList.push(addNewAlbum)
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
        confirmButtonColor: 'rgb(45, 164, )',
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
//----------------------------------

//Halsey
addAlbum(1,'hopeless fountain kingdom', 'Halsey',2022,42,'https://i.scdn.co/image/ab67616d00001e0288f2c5e4cd3649847e5139fa','pop');
addAlbum(2,'Manic', 'Halsey',2020,40,'https://i.scdn.co/image/ab67616d00001e027636e1c9e67eaafc9f49aefd','pop');
addAlbum(3,'BADLANDS', 'Halsey',2022,27,'https://i.scdn.co/image/ab67616d00001e02bd02d63417be256b22bffc28','pop');
//Harry Styles
addAlbum(4,'Fine Line', 'Harry Styles',2019,32,'img/fineline-harrystyles.jfif','pop');
addAlbum(5,`Harry's House`, 'Harry Styles',2022,32,'img/harryshouse-harrystyles.jfif','pop');
addAlbum(6,'Harry Styles', 'Harry Styles',2017,28,'img/harrystyles.jfif','pop');
//The Weeknd
addAlbum(7,'Starboy', 'The Weeknd',2016,35,'img/starboy-theweeknd.jfif','pop');
addAlbum(8,'After Hours', 'The Weeknd',2020,35,'img/afterhours-theweeknd.jfif','pop');
addAlbum(9,'After Hours (Deluxe)', 'The Weeknd',2020,40,'img/afterhoursdeluxe-theweeknd.jfif','pop');
addAlbum(10,'Dawn FM', 'The Weeknd',2022,38,'img/dawnFM-theweeknd.jfif','pop');
addAlbum(11,'My Dear Melancholy,', 'The Weeknd',2018,26,'img/mdm-theweeknd.jfif','pop');
//Twenty One Pilots
addAlbum(12,'Vessel', 'Twenty One Pilots',2013,30,'https://i.scdn.co/image/ab67616d00001e02d263500f1f97e978daa5ceb1','alternative');
addAlbum(13,'Blurryface','Twenty One Pilots',2015,33,'	https://i.scdn.co/image/ab67616d00001e02de03bfc2991fd5bcfde65ba3','alternative');
addAlbum(14,'Trench', 'Twenty One Pilots',2018,42,'https://i.scdn.co/image/ab67616d00001e02768828c6867cd0472fc84e4d','alternative');
addAlbum(15,'Scaled And Icy', 'Twenty One Pilots',2021,45,'https://i.scdn.co/image/ab67616d00001e0220b467550945fd123e00f0a5','alternative');
//The Beatles
addAlbum(16,`Abbey Road`, 'The Beatles',1969,27,'https://i.scdn.co/image/ab67616d00001e02dc30583ba717007b00cceb25','rock');
addAlbum(17,`Help!`, 'The Beatles',1965,50,'https://i.scdn.co/image/ab67616d00001e02e3e3b64cea45265469d4cafa','rock');
addAlbum(18,`Revolver`, 'The Beatles',1966,48,'https://i.scdn.co/image/ab67616d00001e0228b8b9b46428896e6491e97a','rock');
addAlbum(19,`1 (Remastered)`, 'The Beatles',2000,52,'https://i.scdn.co/image/ab67616d00001e02582d56ce20fe0146ffa0e5cf','rock');
addAlbum(20,`The Beatles 1962 - 1966`, 'The Beatles',1973,55,'https://i.scdn.co/image/ab67616d00001e025ef4660298ae29ee18799fc2','rock');
addAlbum(21,`Let It Be`, 'The Beatles',1970,55,'https://i.scdn.co/image/ab67616d00001e0284243a01af3c77b56fe01ab1','rock');
addAlbum(22,`Rubber Soul`, 'The Beatles',1965,50,'https://i.scdn.co/image/ab67616d00001e02ed801e58a9ababdea6ac7ce4','rock');
addAlbum(23,`Please Please Me`, 'The Beatles',1963,50,'https://i.scdn.co/image/ab67616d00001e02dbeec63ad914c973e75c24df','rock');
addAlbum(24,`Get Back`, 'The Beatles',2022,52,'https://i.scdn.co/image/ab67616d00001e0204167cd5b7ddbf5c4a563456','rock');
//Los Abuelos De La Nada
addAlbum(25,`Y Amigos`, 'Los Abuelos De La Nada',2021,30,'https://i.scdn.co/image/ab67616d00001e02e24ea1fbef45aa66e2c8e73d','Rock Nacional');
addAlbum(26,`Himnos Del Corazón`, 'Los Abuelos De La Nada',2006,30,'https://i.scdn.co/image/ab67616d00001e0237d87946cc6a3ed79d72474c','Rock Nacional');
addAlbum(27,`En El Opera`, 'Los Abuelos De La Nada',2022,30,'https://i.scdn.co/image/ab67616d00001e02c2d670098e559803460ad345','Rock Nacional');
addAlbum(28,`Los Abuelos De La Nada 2`, 'Los Abuelos De La Nada',2022,30,'https://i.scdn.co/image/ab67616d00001e02377cdedc05284d379cbfcee1','Rock Nacional');
addAlbum(29,`Los Abuelos De La Nada 1`, 'Los Abuelos De La Nada',1995,30,'https://i.scdn.co/image/ab67616d00001e02ac8e4606429b148f6d2ba11d','Rock Nacional');


function refreshCart(){
    //Refresh info
    localStorage.setItem('carrito', JSON.stringify(carrito));
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
        templateCart.querySelector('.albumArtist').textContent = item.artist;
        templateCart.querySelector('.albumPrice').textContent = `$${item.price}.00 ${coinSelect.value}`;
        templateCart.querySelector('.albumCantidad').textContent = `Quantity: ${item.cantidad}`;
        templateCart.querySelector('button i').dataset.id = item.id;
        const clone = templateCart.cloneNode(true);
        fragmentCart.appendChild(clone);
        });
    albumsInCart.appendChild(fragmentCart);

    const removeBtn = document.querySelectorAll('.cartDiv button');
    removeBtn.forEach(btn => {
        btn.addEventListener('click', (e) => {
            removerProductoCart(Number(e.target.getAttribute("data-id")));
        })
    });
}
//----------------------------------
generateFilters()

//Filters
const checkboxInputs = document.querySelectorAll('.offcanvas-body input[type="checkbox"]');
const radioInputAscending = document.querySelector('#ascending')
const radioInputDescending = document.querySelector('#descending')

let checkboxInputsChecked = 0; //Setear contador de Checked Checkbox. Si esta en 0 no hay seleccionados, >0 al menos una categoria seleccionada.
let albumFilter = []; //Acumulador para las categorias

checkboxInputs.forEach(input => {
    input.addEventListener('change', filter)
});
radioInputAscending.addEventListener('change', filter)
radioInputDescending.addEventListener('change', filter)
rangeInputs.addEventListener('input', filter)
rangeNumber.addEventListener('input', filter)


function filter(e){
    let priceFilteredAlbumList
    if(e.target.type == 'checkbox'){//Filtra por categorias, para filtrarlas por precio y enviarlo a refreshIndex
        if(e.target.checked){
            checkboxInputsChecked++
            let filtro = albumList.filter((album) => album.gender.includes(`${e.target.value}`))
            filtro.forEach(el => {
                albumFilter.push(el)
            })
        }else{
            let indexAlbum = albumFilter.findIndex(({gender}) => gender === e.target.value);
            let splicingLength = albumFilter.filter(album=> album.gender.includes(`${e.target.value}`))
            albumFilter.splice([indexAlbum], splicingLength.length);
            checkboxInputsChecked--;
        }
    }
    //Filtra por precios, teniendo en cuenta si hay categorias seleccionadas
    if(checkboxInputsChecked == 0){ 
        priceFilteredAlbumList = albumList.filter(({price}) => price < rangeInputs.value);
    }else{
        priceFilteredAlbumList = albumFilter.filter(({price}) => price < rangeInputs.value);
    }
    //Cheque el estado de radioInputs y los ordena dependiendo su valor
    if(radioInputAscending.checked){
        priceFilteredAlbumList.sort((a,b) => a.price - b.price)
    }else if(radioInputDescending.checked){
        priceFilteredAlbumList.sort((a,b) => b.price - a.price)
    }
    refreshIndex(priceFilteredAlbumList)
}

function refreshIndex(array){//Actualiza los albumes en pantalla segun filtros o moneda
    const albumsInStore = document.querySelector('#albums');
    const templateProduct = document.querySelector('#templateAlbum').content;
    const fragment = document.createDocumentFragment();
    
    albumsInStore.innerHTML = '';
    if(checkboxInputsChecked === 0 && array.length == 0){
        albumList.forEach(item => {
            templateProduct.querySelector('h2').textContent = item.album;
            templateProduct.querySelector('img').src = item.img;
            templateProduct.querySelector('.albumArtist').textContent = `${item.artist}`;
            templateProduct.querySelector('.albumGender').textContent =item.gender;
            templateProduct.querySelector('.albumYear').textContent = item.year;
            templateProduct.querySelector('.albumPrice').textContent = `$${item.price}.00 ${coinSelect.value}`;
            templateProduct.querySelector('button').dataset.id = item.id;
            const clone = templateProduct.cloneNode(true);
            fragment.appendChild(clone);
        });
        albumsInStore.appendChild(fragment);
    }else if (checkboxInputsChecked === 0 ){
        array.forEach(item => {
            templateProduct.querySelector('h2').textContent = item.album;
            templateProduct.querySelector('img').src = item.img;
            templateProduct.querySelector('.albumArtist').textContent = `${item.artist}`;
            templateProduct.querySelector('.albumGender').textContent =item.gender;
            templateProduct.querySelector('.albumYear').textContent = item.year;
            templateProduct.querySelector('.albumPrice').textContent = `$${item.price}.00 ${coinSelect.value}`;
            templateProduct.querySelector('button').dataset.id = item.id;
            const clone = templateProduct.cloneNode(true);
            fragment.appendChild(clone);
        });
        albumsInStore.appendChild(fragment);
    }else{
        array.forEach(item => {
            templateProduct.querySelector('h2').textContent = item.album;
            templateProduct.querySelector('img').src = item.img;
            templateProduct.querySelector('.albumArtist').textContent = `${item.artist}`;
            templateProduct.querySelector('.albumGender').textContent =item.gender;
            templateProduct.querySelector('.albumYear').textContent = item.year;
            templateProduct.querySelector('.albumPrice').textContent = `$${item.price}.00 ${coinSelect.value}`;
            templateProduct.querySelector('button').dataset.id = item.id;
            const clone = templateProduct.cloneNode(true);
            fragment.appendChild(clone);
        });
        albumsInStore.appendChild(fragment);
    }
    //Add to cart
    const addBtn = document.querySelectorAll('.albumDiv button');
    addBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = Number(btn.getAttribute('data-id'));
            cart(id)
        })
    });
}
function generateFilters(){
    const genders = []
    albumList.forEach(album => {
        let a = genders.some(el => el == album.gender)
        if(!a){
            genders.push(album.gender)
        }
    })
    const filtersInCanvas = document.querySelector('.checkbox');
    let acumulador = ''
    genders.forEach(item => {
        acumulador += `<label class="container">${item}
                            <input type="checkbox" value='${item}'>
                            <span class="mark"></span>
                        </label>`
    })
    filtersInCanvas.innerHTML = acumulador;
}

//Coins V2
const spanCoin = document.getElementById('filterInputCoin')
const coins = ['ARS','USD'];
coins.sort();

//Generar optionInput
let acumuladorCoin = ``;
coins.forEach(el => {
    if (el === 'USD'){
        acumuladorCoin += `<option value='${el}' selected>${el}</option>`
    }else{
        acumuladorCoin += `<option value='${el}'>${el}</option>`;
    }
});
coinSelect.innerHTML = acumuladorCoin;
coinSelect.addEventListener('change', exchange);
refreshCart()
refreshIndex(albumList)
let temp = 'USD'
let coinState = JSON.parse(localStorage.getItem('coinState')) ?? 'USD';

//Reset (temporal) - Vuelve todo a Dolar
fetch(`https://api.exchangerate-api.com/v4/latest/${temp}`)
    .then(res => res.json())
    .then(data => {
        carritoPrice *= data.rates[coinState]
        carrito.forEach(album => {
            album.price /= data.rates[coinState]
            album.price = Number((album.price).toFixed(0))
        })
        coinState = 'USD'
        localStorage.setItem('coinState', JSON.stringify(coinState))
        refreshCart()
        refreshIndex(albumList)

        //Actualizar album con los precios de la moneda
        rangeNumber.min = 25
        rangeNumber.max = 80
        rangeNumber.value = 70

        rangeInputs.min = 25
        rangeInputs.max = 80
        rangeInputs.value = 70

        spanCoin.innerHTML = `$${coinState}`
    });

function exchange(){
    coinState = coinSelect.value
    fetch(`https://api.exchangerate-api.com/v4/latest/${temp}`) 
        .then(res => res.json())
        .then(data => {
            carrito.forEach(album => {
                album.price *= data.rates[coinState]
                album.price = Number((album.price).toFixed(0))
            })
            refreshCart()
            //Actualizar album con los precios de la moneda
            let exchangedAlbum = albumList;
            exchangedAlbum.forEach(album => {
                album.price *= data.rates[coinState]
                album.price = Number((album.price).toFixed(0))
            })
            //Update filter inputs values
            rangeNumber.min = 3500
            rangeNumber.max = 11000
            rangeNumber.value = 9000

            rangeInputs.min = rangeNumber.min
            rangeInputs.max = rangeNumber.max
            rangeInputs.value = rangeNumber.value

            spanCoin.innerHTML = `$${coinState}`

            refreshIndex(exchangedAlbum)
        })
    temp = coinSelect.value
    localStorage.setItem('coinState', JSON.stringify(coinState))
}

//Animacion tuerca
const gear = document.querySelector('.btn-group i')
gear.addEventListener('click', () => {
    gear.classList.toggle('rotate');
})