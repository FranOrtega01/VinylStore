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

//Album
const albumList = [];

//Coins
const coinInput = document.getElementById('coins');
const filterSpanCoin = document.getElementById('filterInputCoin');
const coins = ['ARS','USD'];
let coinState = JSON.parse(localStorage.getItem('coinState')) ?? 'USD';


//Filter
const albumFiltered = []
const radioInputAscending = document.querySelector('#ascending');
const radioInputDescending = document.querySelector('#descending');
const radioInputs = document.querySelectorAll('.filterSection-radio input') //Ambos radio inputs
let radioInputState //Estado de los radioInputs para poder Uncheck
let checkboxInputsChecked = 0; //Setear contador de Checked Checkbox. Si esta en 0 no hay seleccionados, >0 al menos una categoria seleccionada.


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
    refreshAll()
    Toastify({
        text: `Added "${objeto.album}"`,
        className: "toastAlert",
        duration: 1000,
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
    }else{ 
        carrito[indexCart].cantidad--;
    }
    refreshCart();

}
function removeAllItemCart(idProducto){//Remover todo el item del carrito
    let indexCart = carrito.findIndex(({id}) => id === idProducto); //Busca el index del id indicado
    carrito.splice([indexCart],1);
    refreshCart();
}
const btnVaciarCarrito = document.getElementById('borrarCarrito');
btnVaciarCarrito.addEventListener('click', () => {//Vacia el carrito entero
    if(carrito.length === 0){
        btnVaciarCarrito.classList.add('emptyCart')
        
        setTimeout(() => {
            btnVaciarCarrito.classList.remove('emptyCart')
        }, 1300);
        Toastify({
            text: `Cart is already empty!`,
            className: "toastAlert",
            duration: 900,
            newWindow: true,
            close: false,
            gravity: "center", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: false, // Prevents dismissing of toast on hover
            onClick: function(){} // Callback after click
        }).showToast();
    }else{

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
                    refreshAll();
                }
            })
        }
    })
        function refreshPrice(){
    //Refresh info
    //Actualizar todos los inner 
    carritoPrice = carrito.reduce((acumulador, {price, cantidad}) => acumulador + price*cantidad, 0); 
    carritoNumber = carrito.reduce((acumulador, {cantidad}) => acumulador + cantidad, 0); 
    cartInfo.innerHTML = `${carritoNumber} - $${carritoPrice} ${coinInput.value}`;
    cartInfoPriceModal.innerHTML = `Total: $${carritoPrice} ${coinInput.value}`;
    cartInfoQtyModal.innerHTML = `Qty: ${carritoNumber}`;
    localStorage.setItem('carritoPrice',JSON.stringify(carritoPrice))

}
function refreshCart(){
    localStorage.setItem('carrito', JSON.stringify(carrito)); //Actualizar el storage (carrito)
    
    //Refresh cart
    albumsInCart.innerHTML = ''; 
    const templateCart = document.querySelector('#templateCart').content;
    const fragmentCart = document.createDocumentFragment();
    carrito.forEach(item => {
        templateCart.querySelector('h2').textContent = item.album;
        templateCart.querySelector('img').src = item.img;
        templateCart.querySelector('img').alt = `${item.album} by ${item.artist}`;
        templateCart.querySelector('.albumArtist').textContent = item.artist;
        templateCart.querySelector('.albumPrice').textContent = `$${item.price}.00 ${coinInput.value}`;
        templateCart.querySelector('.albumCantidad').textContent = `Quantity: ${item.cantidad}`;
        templateCart.querySelectorAll('.cartActions button i').forEach(button => {
            button.dataset.id = item.id;
        })

        const clone = templateCart.cloneNode(true);
        fragmentCart.appendChild(clone);
        });
    albumsInCart.appendChild(fragmentCart);

    const btnActions = document.querySelectorAll('.cartDiv button i');
    btnActions.forEach(btn => {
        btn.addEventListener('click', (e) => {//Asignar funcion a cada boton
            switch(e.target.id){
            case 'cartItemRemove':
                removeOneItemCart(Number(e.target.getAttribute("data-id")))
                refreshAll()
                break;
            case 'cartItemAdd':
                cart(Number(e.target.getAttribute("data-id")))
                refreshAll()
                break;
            case 'cartItemRemoveAll':
                removeAllItemCart(Number(e.target.getAttribute("data-id")))
                refreshAll()
                break;
            }
        })
    });
}
function refreshIndex(array){//Actualiza los albumes en pantalla segun filtros o moneda
    const albumsInStore = document.querySelector('#albums');
    const templateProduct = document.querySelector('#templateAlbum').content;
    const fragment = document.createDocumentFragment();
    if(array.length === 0 && checkboxInputsChecked != 0) {albumsInStore.innerHTML = `<h2 class='noneAlbums'>No album matches these filters!</h2>`;
    }else{
        albumsInStore.innerHTML = '';
        array.forEach(item => {
            templateProduct.querySelector('h2').textContent = item.album;
            templateProduct.querySelector('img').src = item.img;
            templateProduct.querySelector('.albumArtist').textContent = `${item.artist}`;
            templateProduct.querySelector('.albumGender').textContent =item.gender;
            templateProduct.querySelector('.albumYear').textContent = item.year;
            templateProduct.querySelector('.albumPrice').textContent = `$${item.price}.00 ${coinInput.value}`;
            templateProduct.querySelector('button').dataset.id = item.id;
            const clone = templateProduct.cloneNode(true);
            fragment.appendChild(clone);
        });
        albumsInStore.appendChild(fragment);

        //Add to cart
        const addBtn = document.querySelectorAll('.albumDiv button');
        addBtn.forEach(btn => {
            btn.addEventListener('click', () => {
                const id = Number(btn.getAttribute('data-id'));
                cart(id)
            })
        });
    }
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
function refreshAll(){
    refreshCart();
    refreshPrice();
}
let priceFilteredAlbumList = []

function filter(e){
    if(e.target.type == 'checkbox'){
        if(e.target.checked){
            checkboxInputsChecked++
            let filtro = albumList.filter(({gender}) => gender.includes(`${e.target.value}`))
            filtro.forEach(album => albumFiltered.push(album))
        }else{
            let indexAlbum = albumFiltered.findIndex(({gender}) => gender === e.target.value);
            let splicingLength = albumFiltered.filter(({gender}) => gender.includes(`${e.target.value}`))
            albumFiltered.splice([indexAlbum], splicingLength.length);
            checkboxInputsChecked--;
        }
    }
    
    if(albumFiltered.length === 0){ 
        priceFilteredAlbumList = albumList.filter(({price}) => price <= rangeInputs.value);
    }else{
        priceFilteredAlbumList = albumFiltered.filter(({price}) => price <= rangeInputs.value);
    }
    //Cheque el estado de radioInputs y los ordena dependiendo su valor (Ascendente/Descentende)
    if(radioInputAscending.checked){
        priceFilteredAlbumList.sort((a,b) => a.price - b.price)
    }else if(radioInputDescending.checked){
        priceFilteredAlbumList.sort((a,b) => b.price - a.price)
    }
    refreshIndex(priceFilteredAlbumList)
}
function uncheckRadioInput(e){
    if(e.target.checked && radioInputState == e.target.id){
        e.target.checked = false;
        radioInputState = ``
        filter(e)
    }else{
        radioInputState = e.target.id
    }
}
let albumListCopy
function exchangePrices(){
    fetch(`https://api.exchangerate-api.com/v4/latest/${tempCoinValue}`) 
    .then(res => res.json())
    .then(data => { 
        console.log(data.rates[coinInput.value])
            carrito.forEach((fede) => {
                fede.price *= data.rates[coinInput.value]
                fede.price = fede.price.toFixed(0)
                console.log(carrito)
            })
        tempCoinValue = coinInput.value
        refreshAll()

        localStorage.setItem('coinState', JSON.stringify(coinInput.value))
        // setTimeout(() => {
            location.reload()
        // }, 3000);
        // refreshIndex(albumList)
        // refreshCart()
    })
}

function exchangeInputs(){
    
    fetch(`https://api.exchangerate-api.com/v4/latest/${tempCoinValue}`) 
        .then(res => res.json())
        .then(data => {
            //Update filter inputs values
            rangeNumber.min *= data.rates[coinInput.value]
            rangeNumber.min = `${(Number(rangeNumber.min)).toFixed(0)}`

            rangeNumber.max *= data.rates[coinInput.value]
            rangeNumber.max = `${(Number(rangeNumber.max)).toFixed(0)}`

            rangeNumber.value *= data.rates[coinInput.value]
            rangeNumber.value = `${(Number(rangeNumber.value)).toFixed(0)}`

        
            rangeInputs.min = rangeNumber.min
            rangeInputs.max = rangeNumber.max
            rangeInputs.value = rangeNumber.value
        
            filterSpanCoin.innerHTML = `$${coinInput.value}`
        })
}

//Generar albumes
const albums = [
    {
        id: 1,
        album: "hopeless fountain kingdom",
        artist:"Halsey",
        year:2022,
        price:42,
        img:"https://i.scdn.co/image/ab67616d00001e0288f2c5e4cd3649847e5139fa",
        gender:"pop"
    },
    {
        id: 2,
        album: "Manic",
        artist:"Halsey",
        year:2020,
        price:40,
        img:"https://i.scdn.co/image/ab67616d00001e027636e1c9e67eaafc9f49aefd",
        gender:"pop"
    },
    {
        id: 3,
        album: "BADLANDS",
        artist:"Halsey",
        year:2022,
        price:27,
        img:"https://i.scdn.co/image/ab67616d00001e02bd02d63417be256b22bffc28",
        gender:"pop"
    },
    {
        id: 4,
        album: "Fine Line",
        artist:"Harry Styles",
        year:2019,
        price:32,
        img:"https://i.scdn.co/image/ab67616d00001e0277fdcfda6535601aff081b6a",
        gender:"pop"
    }
    ,
    {
        id: 5,
        album: "Harry's House",
        artist:"Harry Styles",
        year:2022,
        price:32,
        img:"https://i.scdn.co/image/ab67616d00001e022e8ed79e177ff6011076f5f0",
        gender:"pop"
    },
    {
        id: 6,
        album: "Harry Styles",
        artist:"Harry Styles",
        year:2017,
        price:28,
        img:"https://i.scdn.co/image/ab67616d00001e026c619c39c853f8b1d67b7859",
        gender:"pop"
    },
    {
        id: 7,
        album: "Starboy",
        artist:"The Weeknd",
        year:2016,
        price:35,
        img:"https://i.scdn.co/image/ab67616d00001e024718e2b124f79258be7bc452",
        gender:"pop"
    },
    {
        id: 8,
        album: "After Hours",
        artist:"The Weeknd",
        year:2020,
        price:35,
        img:"https://i.scdn.co/image/ab67616d00001e028863bc11d2aa12b54f5aeb36",
        gender:"pop"
    },
    {
        id: 9,
        album: "After Hours (Deluxe)",
        artist:"The Weeknd",
        year:2020,
        price:40,
        img:"https://i.scdn.co/image/ab67616d00001e028863bc11d2aa12b54f5aeb36",
        gender:"pop"
    },
    {
        id: 10,
        album: "Dawn FM",
        artist:"The Weeknd",
        year:2022,
        price:38,
        img:"https://i.scdn.co/image/ab67616d00001e024ab2520c2c77a1d66b9ee21d",
        gender:"pop"
    },
    {
        id: 11,
        album: "My Dear Melancholy",
        artist:"The Weeknd",
        year:2018,
        price:25,
        img:"https://i.scdn.co/image/ab67616d00001e021f6a2a40bb692936879db730",
        gender:"pop"
    },
    {
        id: 12,
        album: "Vessel",
        artist:"Twenty One Pilots",
        year:2013,
        price:30,
        img:"https://i.scdn.co/image/ab67616d00001e02d263500f1f97e978daa5ceb1",
        gender:"alternative"
    },
    {
        id: 13,
        album: "Blurryface",
        artist:"Twenty One Pilots",
        year:2015,
        price:33,
        img:"https://i.scdn.co/image/ab67616d00001e02de03bfc2991fd5bcfde65ba3",
        gender:"alternative"
    },
    {
        id: 14,
        album: "Trench",
        artist:"Twenty One Pilots",
        year:2018,
        price:42,
        img:"https://i.scdn.co/image/ab67616d00001e02768828c6867cd0472fc84e4d",
        gender:"alternative"
    },
    {
        id: 15,
        album: "Scaled And Icy",
        artist:"Twenty One Pilots",
        year:2021,
        price:45,
        img:"https://i.scdn.co/image/ab67616d00001e0220b467550945fd123e00f0a5",
        gender:"alternative"
    },
    {
        id: 16,
        album: "Abbey Road",
        artist:"The Beatles",
        year:1969,
        price:27,
        img:"https://i.scdn.co/image/ab67616d00001e02dc30583ba717007b00cceb25",
        gender:"rock"
    },
    {
        id: 17,
        album: "Help!",
        artist:"The Beatles",
        year:1965,
        price:50,
        img:"https://i.scdn.co/image/ab67616d00001e02e3e3b64cea45265469d4cafa",
        gender:"rock"
    },
    {
        id: 18,
        album: "Revolver",
        artist:"The Beatles",
        year:1966,
        price:48,
        img:"https://i.scdn.co/image/ab67616d00001e0228b8b9b46428896e6491e97a",
        gender:"rock"
    },
    {
        id: 19,
        album: "1 (Remastered)",
        artist:"The Beatles",
        year:2000,
        price:52,
        img:"https://i.scdn.co/image/ab67616d00001e02582d56ce20fe0146ffa0e5cf",
        gender:"rock"
    },
    {
        id: 20,
        album: "The Beatles 1962 - 1966",
        artist:"The Beatles",
        year:1973,
        price:55,
        img:"https://i.scdn.co/image/ab67616d00001e025ef4660298ae29ee18799fc2",
        gender:"rock"
    },
    {
        id: 21,
        album: "Let It Be",
        artist:"The Beatles",
        year:1970,
        price:55,
        img:"https://i.scdn.co/image/ab67616d00001e0284243a01af3c77b56fe01ab1",
        gender:"rock"
    },
    {
        id: 22,
        album: "Rubber Soul",
        artist:"The Beatles",
        year:1965,
        price:50,
        img:"https://i.scdn.co/image/ab67616d00001e02ed801e58a9ababdea6ac7ce4",
        gender:"rock"
    },
    {
        id: 23,
        album: "Please Please Me",
        artist:"The Beatles",
        year:1963,
        price:50,
        img:"https://i.scdn.co/image/ab67616d00001e02dbeec63ad914c973e75c24df",
        gender:"rock"
    },
    {
        id: 24,
        album: "Get Back (Rooftop)",
        artist:"The Beatles",
        year:2022,
        price:52,
        img:"https://i.scdn.co/image/ab67616d00001e0204167cd5b7ddbf5c4a563456",
        gender:"rock"
    },
    {
        id: 25,
        album: "Y Amigos",
        artist:"Los Abuelos De La Nada",
        year:2021,
        price:30,
        img:"https://i.scdn.co/image/ab67616d00001e02e24ea1fbef45aa66e2c8e73d",
        gender:"Nacional"
    },
    {
        id: 26,
        album: "Himnos Del Corazón",
        artist:"Los Abuelos De La Nada",
        year:2006,
        price:30,
        img:"https://i.scdn.co/image/ab67616d00001e0237d87946cc6a3ed79d72474c",
        gender:"Nacional"
    },
    {
        id: 27,
        album: "En El Opera",
        artist:"Los Abuelos De La Nada",
        year:2022,
        price:30,
        img:"https://i.scdn.co/image/ab67616d00001e02c2d670098e559803460ad345",
        gender:"Nacional"
    },
    {
        id: 28,
        album: "Los Abuelos De La Nada 2",
        artist:"Los Abuelos De La Nada",
        year:2022,
        price:30,
        img:"https://i.scdn.co/image/ab67616d00001e02377cdedc05284d379cbfcee1",
        gender:"Nacional"
    },
    {
        id: 29,
        album: "Los Abuelos De La Nada 1",
        artist:"Los Abuelos De La Nada",
        year:1995,
        price:30,
        img:"https://i.scdn.co/image/ab67616d00001e02ac8e4606429b148f6d2ba11d",
        gender:"Nacional"
    }
]
albums.forEach(album => 
    addAlbum(album.id, album.album, album.artist, album.year, album.price, album.img, album.gender));

//Generar monedas
let acumuladorCoin = ``;
coins.forEach(el => {
    if (el == coinState){
        acumuladorCoin += `<option value='${el}' selected>${el}</option>`
    }else{
        acumuladorCoin += `<option value='${el}'>${el}</option>`;
    }
});
coinInput.innerHTML = acumuladorCoin;

//Generar Cosas
refreshIndex(albumList)
generateFilters()
refreshAll()


//Events Listeners
const checkboxInputs = document.querySelectorAll('.offcanvas-body input[type="checkbox"]');
checkboxInputs.forEach(input => input.addEventListener('change', filter));
radioInputAscending.addEventListener('change', filter)
radioInputDescending.addEventListener('change', filter)
rangeInputs.addEventListener('input', filter)
rangeNumber.addEventListener('input', filter)

radioInputs.forEach(input => {
    input.addEventListener('click', uncheckRadioInput)
})

let tempCoinValue = 'USD'
coinInput.addEventListener('change', exchangePrices)
coinInput.addEventListener('change', exchangeInputs)

fetch(`https://api.exchangerate-api.com/v4/latest/${tempCoinValue}`) 
    .then(res => res.json())
    .then(data => { 
        console.log(data.rates[coinState]);
        albumList.forEach((album) => {
            album.price *= data.rates[coinState]
            album.price = album.price.toFixed(0)
        })

        rangeNumber.min = 26*data.rates[coinState]
        rangeNumber.min = `${(Number(rangeNumber.min)).toFixed(0)}`

        rangeNumber.max = 70*data.rates[coinState]
        rangeNumber.max = `${(Number(rangeNumber.max)).toFixed(0)}`

        rangeNumber.value = 60*data.rates[coinState]
        rangeNumber.value = `${(Number(rangeNumber.value)).toFixed(0)}`

        rangeInputs.min = rangeNumber.min
        rangeInputs.max = rangeNumber.max
        rangeInputs.value = rangeNumber.value

        filterSpanCoin.innerHTML = `$${coinInput.value}`

        tempCoinValue = coinInput.value
        localStorage.setItem('coinState', JSON.stringify(coinState))
        refreshIndex(albumList)
        refreshAll()
    })

