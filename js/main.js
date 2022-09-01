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

//Coins V2
const spanCoin = document.getElementById('filterInputCoin')
const coins = ['ARS','USD'];
coins.sort();
let coinState = JSON.parse(localStorage.getItem('coinState')) ?? 'USD';

const coinSelect = document.getElementById('coins');


// function NewAlbum(id,album,artist,year,price,img,gender){
//     this.id = id;
//     this.album = album;
//     this.year = year;
//     this.artist = artist;
//     this.price = price;
//     this.img = img;
//     this.gender = gender;
// }

//Agregar un album mediante la constructora
// function addAlbum(id,album,artist,year,price,img,gender){
//     let addNewAlbum = new NewAlbum(id,album,artist,year,price,img,gender);
//     addNewAlbum.cantidad = 1;
//     addNewAlbum.gender = addNewAlbum.gender[0].toUpperCase() + addNewAlbum.gender.substring(1);
//     albumList.push(addNewAlbum)
// } 
// function cart(idProduct){    
//     let objeto = albumList.find(({id}) => id === idProduct); //Busca el elemento con esa id y lo agrega al carrito
//     let objetoCarrito = carrito.find(({id}) => id === idProduct);
//     if(objetoCarrito == undefined){
//         carrito.push(objeto);
//         // objetoCarrito = carrito.find(({id}) => id === idProduct);
//         // objetoCarrito.cantidad = 1;
//     }else{
//         objetoCarrito.cantidad++;
//     }
    
//     //Actualizar precio y numero del carrito
//     refreshCart();
//     Toastify({
//         text: `Added "${objeto.album}"`,
//         className: "toastAlert",
//         duration: 1500,
//         newWindow: true,
//         close: false,
//         avatar: `${objeto.img}`,
//         gravity: "bottom", // `top` or `bottom`
//         position: "right", // `left`, `center` or `right`
//         stopOnFocus: false, // Prevents dismissing of toast on hover
//         onClick: function(){} // Callback after click
//     }).showToast();
// }
//Remover producto del carrito
// function removeOneItemCart(idProducto){
//     let indexCart = carrito.findIndex(({id}) => id === idProducto); //Busca el index del id indicado
//     if (indexCart !== -1 && carrito[indexCart].cantidad == 1){ 
//         carrito.splice([indexCart],1);
//         refreshCart();
//     }else{ 
//         carrito[indexCart].cantidad--;
//         refreshCart();
//     }
// }
// function removeAllItemCart(idProducto){
//     let indexCart = carrito.findIndex(({id}) => id === idProducto); //Busca el index del id indicado
//     carrito.splice([indexCart],1);
//     refreshCart();
// }
//----------------------------------

//----------------------------------
//Vaciar el carrito ✓
// const btnVaciarCarrito = document.getElementById('borrarCarrito');
// btnVaciarCarrito.addEventListener('click', () => {
//     //Sweet alert
//     Swal.fire({
//         title: 'Are you sure?',
//         text: "Cart will be emptied",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#2ebd6e',
//         cancelButtonColor: '#dc3b3b',
//         confirmButtonText: 'Yes, empty it!',
//     }).then((result) => {
//         if (result.isConfirmed) {
//             Swal.fire(
//                 'Deleted!',
//                 'Cart is now empty!',)
//             carrito.splice(0,carrito.length); //Vacia el carrito
//             refreshCart();
//         }
//         })
//     })

//Create Album
// fetch(`../albums.json`)
//     .then(res => res.json())
//     .then(data => {
//         data.forEach(album => {
//             addAlbum(album.id, album.album, album.artist, album.year, album.price, album.img, album.gender)
//         })
//         generateFilters()

//     })

// const albums = [
//     {
//         id: 1,
//         album: "hopeless fountain kingdom",
//         artist:"Halsey",
//         year:2022,
//         price:42,
//         img:"https://i.scdn.co/image/ab67616d00001e0288f2c5e4cd3649847e5139fa",
//         gender:"pop"
//     },
//     {
//         id: 2,
//         album: "Manic",
//         artist:"Halsey",
//         year:2020,
//         price:40,
//         img:"https://i.scdn.co/image/ab67616d00001e027636e1c9e67eaafc9f49aefd",
//         gender:"pop"
//     },
//     {
//         id: 3,
//         album: "BADLANDS",
//         artist:"Halsey",
//         year:2022,
//         price:27,
//         img:"https://i.scdn.co/image/ab67616d00001e02bd02d63417be256b22bffc28",
//         gender:"pop"
//     },
//     {
//         id: 4,
//         album: "Fine Line",
//         artist:"Harry Styles",
//         year:2019,
//         price:32,
//         img:"https://i.scdn.co/image/ab67616d00001e0277fdcfda6535601aff081b6a",
//         gender:"pop"
//     }
//     ,
//     {
//         id: 5,
//         album: "Harry's House",
//         artist:"Harry Styles",
//         year:2022,
//         price:32,
//         img:"https://i.scdn.co/image/ab67616d00001e022e8ed79e177ff6011076f5f0",
//         gender:"pop"
//     },
//     {
//         id: 6,
//         album: "Harry Styles",
//         artist:"Harry Styles",
//         year:2017,
//         price:28,
//         img:"https://i.scdn.co/image/ab67616d00001e026c619c39c853f8b1d67b7859",
//         gender:"pop"
//     },
//     {
//         id: 7,
//         album: "Starboy",
//         artist:"The Weeknd",
//         year:2016,
//         price:35,
//         img:"https://i.scdn.co/image/ab67616d00001e024718e2b124f79258be7bc452",
//         gender:"pop"
//     },
//     {
//         id: 8,
//         album: "After Hours",
//         artist:"The Weeknd",
//         year:2020,
//         price:35,
//         img:"https://i.scdn.co/image/ab67616d00001e028863bc11d2aa12b54f5aeb36",
//         gender:"pop"
//     },
//     {
//         id: 9,
//         album: "After Hours (Deluxe)",
//         artist:"The Weeknd",
//         year:2020,
//         price:40,
//         img:"https://i.scdn.co/image/ab67616d00001e028863bc11d2aa12b54f5aeb36",
//         gender:"pop"
//     },
//     {
//         id: 10,
//         album: "Dawn FM",
//         artist:"The Weeknd",
//         year:2022,
//         price:38,
//         img:"https://i.scdn.co/image/ab67616d00001e024ab2520c2c77a1d66b9ee21d",
//         gender:"pop"
//     },
//     {
//         id: 11,
//         album: "My Dear Melancholy",
//         artist:"The Weeknd",
//         year:2018,
//         price:26,
//         img:"https://i.scdn.co/image/ab67616d00001e021f6a2a40bb692936879db730",
//         gender:"pop"
//     },
//     {
//         id: 12,
//         album: "Vessel",
//         artist:"Twenty One Pilots",
//         year:2013,
//         price:30,
//         img:"https://i.scdn.co/image/ab67616d00001e02d263500f1f97e978daa5ceb1",
//         gender:"alternative"
//     },
//     {
//         id: 13,
//         album: "Blurryface",
//         artist:"Twenty One Pilots",
//         year:2015,
//         price:33,
//         img:"https://i.scdn.co/image/ab67616d00001e02de03bfc2991fd5bcfde65ba3",
//         gender:"alternative"
//     },
//     {
//         id: 14,
//         album: "Trench",
//         artist:"Twenty One Pilots",
//         year:2018,
//         price:42,
//         img:"https://i.scdn.co/image/ab67616d00001e02768828c6867cd0472fc84e4d",
//         gender:"alternative"
//     },
//     {
//         id: 15,
//         album: "Scaled And Icy",
//         artist:"Twenty One Pilots",
//         year:2021,
//         price:45,
//         img:"https://i.scdn.co/image/ab67616d00001e0220b467550945fd123e00f0a5",
//         gender:"alternative"
//     },
//     {
//         id: 16,
//         album: "Abbey Road",
//         artist:"The Beatles",
//         year:1969,
//         price:27,
//         img:"https://i.scdn.co/image/ab67616d00001e02dc30583ba717007b00cceb25",
//         gender:"rock"
//     },
//     {
//         id: 17,
//         album: "Help!",
//         artist:"The Beatles",
//         year:1965,
//         price:50,
//         img:"https://i.scdn.co/image/ab67616d00001e02e3e3b64cea45265469d4cafa",
//         gender:"rock"
//     },
//     {
//         id: 18,
//         album: "Revolver",
//         artist:"The Beatles",
//         year:1966,
//         price:48,
//         img:"https://i.scdn.co/image/ab67616d00001e0228b8b9b46428896e6491e97a",
//         gender:"rock"
//     },
//     {
//         id: 19,
//         album: "1 (Remastered)",
//         artist:"The Beatles",
//         year:2000,
//         price:52,
//         img:"https://i.scdn.co/image/ab67616d00001e02582d56ce20fe0146ffa0e5cf",
//         gender:"rock"
//     },
//     {
//         id: 20,
//         album: "The Beatles 1962 - 1966",
//         artist:"The Beatles",
//         year:1973,
//         price:55,
//         img:"https://i.scdn.co/image/ab67616d00001e025ef4660298ae29ee18799fc2",
//         gender:"rock"
//     },
//     {
//         id: 21,
//         album: "Let It Be",
//         artist:"The Beatles",
//         year:1970,
//         price:55,
//         img:"https://i.scdn.co/image/ab67616d00001e0284243a01af3c77b56fe01ab1",
//         gender:"rock"
//     },
//     {
//         id: 22,
//         album: "Rubber Soul",
//         artist:"The Beatles",
//         year:1965,
//         price:50,
//         img:"https://i.scdn.co/image/ab67616d00001e02ed801e58a9ababdea6ac7ce4",
//         gender:"rock"
//     },
//     {
//         id: 23,
//         album: "Please Please Me",
//         artist:"The Beatles",
//         year:1963,
//         price:50,
//         img:"https://i.scdn.co/image/ab67616d00001e02dbeec63ad914c973e75c24df",
//         gender:"rock"
//     },
//     {
//         id: 24,
//         album: "Get Back (Rooftop)",
//         artist:"The Beatles",
//         year:2022,
//         price:52,
//         img:"https://i.scdn.co/image/ab67616d00001e0204167cd5b7ddbf5c4a563456",
//         gender:"rock"
//     },
//     {
//         id: 25,
//         album: "Y Amigos",
//         artist:"Los Abuelos De La Nada",
//         year:2021,
//         price:30,
//         img:"https://i.scdn.co/image/ab67616d00001e02e24ea1fbef45aa66e2c8e73d",
//         gender:"Nacional"
//     },
//     {
//         id: 26,
//         album: "Himnos Del Corazón",
//         artist:"Los Abuelos De La Nada",
//         year:2006,
//         price:30,
//         img:"https://i.scdn.co/image/ab67616d00001e0237d87946cc6a3ed79d72474c",
//         gender:"Nacional"
//     },
//     {
//         id: 27,
//         album: "En El Opera",
//         artist:"Los Abuelos De La Nada",
//         year:2022,
//         price:30,
//         img:"https://i.scdn.co/image/ab67616d00001e02c2d670098e559803460ad345",
//         gender:"Nacional"
//     },
//     {
//         id: 28,
//         album: "Los Abuelos De La Nada 2",
//         artist:"Los Abuelos De La Nada",
//         year:2022,
//         price:30,
//         img:"https://i.scdn.co/image/ab67616d00001e02377cdedc05284d379cbfcee1",
//         gender:"Nacional"
//     },
//     {
//         id: 29,
//         album: "Los Abuelos De La Nada 1",
//         artist:"Los Abuelos De La Nada",
//         year:1995,
//         price:30,
//         img:"https://i.scdn.co/image/ab67616d00001e02ac8e4606429b148f6d2ba11d",
//         gender:"Nacional"
//     }
// ]
// albums.forEach(album => 
//     addAlbum(album.id, album.album, album.artist, album.year, album.price, album.img, album.gender))
// generateFilters()

//----------------------------------

// function refreshCart(){
//     //Refresh info
//     localStorage.setItem('carrito', JSON.stringify(carrito));
//     carritoPrice = carrito.reduce((acumulador, {price, cantidad}) => acumulador + price*cantidad, 0);
//     carritoNumber = carrito.reduce((acumulador, {cantidad}) => acumulador + cantidad, 0);
//     cartInfo.innerHTML = `${carritoNumber} - $${carritoPrice} ${coinSelect.value}`;
//     cartInfoPriceModal.innerHTML = `Total: $${carritoPrice} ${coinSelect.value}`;
//     cartInfoQtyModal.innerHTML = `Qty: ${carritoNumber}`;
//     localStorage.setItem('carritoPrice',JSON.stringify(carritoPrice))

//     //Refresh cart
//     albumsInCart.innerHTML = '';
//     const templateCart = document.querySelector('#templateCart').content;
//     const fragmentCart = document.createDocumentFragment();
//     carrito.forEach(item => {
//         templateCart.querySelector('h2').textContent = item.album;
//         templateCart.querySelector('img').src = item.img;
//         templateCart.querySelector('img').alt = `${item.album} by ${item.artist}`;
//         templateCart.querySelector('.albumArtist').textContent = item.artist;
//         templateCart.querySelector('.albumPrice').textContent = `$${item.price}.00 ${coinSelect.value}`;
//         templateCart.querySelector('.albumCantidad').textContent = `Quantity: ${item.cantidad}`;
//         templateCart.querySelector('#cartItemRemoveAll').dataset.id = item.id;
//         templateCart.querySelector('#cartItemRemove').dataset.id = item.id;
//         templateCart.querySelector('#cartItemAdd').dataset.id = item.id;

//         const clone = templateCart.cloneNode(true);
//         fragmentCart.appendChild(clone);
//         });
//     albumsInCart.appendChild(fragmentCart);

//     const removeBtn = document.querySelectorAll('.cartDiv button i');
//     removeBtn.forEach(btn => {
//         btn.addEventListener('click', (e) => {
//             switch(e.target.id){
//             case 'cartItemRemove':
//                 removeOneItemCart(Number(e.target.getAttribute("data-id")))
//                 break;
//             case 'cartItemAdd':
//                 cart(Number(e.target.getAttribute("data-id")))
//                 break;
//             case 'cartItemRemoveAll':
//                 removeAllItemCart(Number(e.target.getAttribute("data-id")))
//                 break;
//             }
//             // removeOneItemCart(Number(e.target.getAttribute("data-id")));
//         })
//     });
// }
//----------------------------------

//Filters
// const checkboxInputs = document.querySelectorAll('.offcanvas-body input[type="checkbox"]');
// const radioInputAscending = document.querySelector('#ascending')
// const radioInputDescending = document.querySelector('#descending')

// let checkboxInputsChecked = 0; //Setear contador de Checked Checkbox. Si esta en 0 no hay seleccionados, >0 al menos una categoria seleccionada.
// let albumFilter = []; //Acumulador para las categorias

// checkboxInputs.forEach(input => {
//     input.addEventListener('change', filter)
// });
// radioInputAscending.addEventListener('change', filter)
// radioInputDescending.addEventListener('change', filter)

// rangeInputs.addEventListener('input', filter)

function filter(e){
    console.log('Entra a filter');
    let priceFilteredAlbumList = []

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
    console.log('albumList:');
    console.log(albumList);
    console.log('mapea albumList:')
    console.log(priceFilteredAlbumList)
    if(checkboxInputsChecked == 0){ 
        priceFilteredAlbumList = albumList.filter(({price}) => price <= rangeInputs.value);
    }else{
        priceFilteredAlbumList = albumFilter.filter(({price}) => price <= rangeInputs.value);
    }
    //Cheque el estado de radioInputs y los ordena dependiendo su valor (Ascendente/Descentende)
    if(radioInputAscending.checked){
        priceFilteredAlbumList.sort((a,b) => a.price - b.price)
    }else if(radioInputDescending.checked){
        priceFilteredAlbumList.sort((a,b) => b.price - a.price)
    }
    console.log('Termino filter');
    exchangePrices(priceFilteredAlbumList)
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
    // }else{
    //     array.forEach(item => {
    //         templateProduct.querySelector('h2').textContent = item.album;
    //         templateProduct.querySelector('img').src = item.img;
    //         templateProduct.querySelector('.albumArtist').textContent = `${item.artist}`;
    //         templateProduct.querySelector('.albumGender').textContent =item.gender;
    //         templateProduct.querySelector('.albumYear').textContent = item.year;
    //         templateProduct.querySelector('.albumPrice').textContent = `$${item.price}.00 ${coinSelect.value}`;
    //         templateProduct.querySelector('button').dataset.id = item.id;
    //         const clone = templateProduct.cloneNode(true);
    //         fragment.appendChild(clone);
    //     });
    //     albumsInStore.appendChild(fragment);
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

//Generar optionInput
let acumuladorCoin = ``;
coins.forEach(el => {
    if (el == coinState){
        acumuladorCoin += `<option value='${el}' selected>${el}</option>`
    }else{
        acumuladorCoin += `<option value='${el}'>${el}</option>`;
    }
});
coinSelect.innerHTML = acumuladorCoin;
coinSelect.addEventListener('change', exchangeInputs);
coinSelect.addEventListener('change', filter);

let tempCoinValue = coinSelect.value


function exchangeInputs(){
    
    fetch(`https://api.exchangerate-api.com/v4/latest/${tempCoinValue}`) 
        .then(res => res.json())
        .then(data => {
            //Update filter inputs values
            rangeNumber.min *= data.rates[coinState]
            rangeNumber.min = `${(Number(rangeNumber.min)).toFixed(0)}`

            rangeNumber.max *= data.rates[coinState]
            rangeNumber.max = `${(Number(rangeNumber.max)).toFixed(0)}`

            rangeNumber.value *= data.rates[coinState]
            rangeNumber.value = `${(Number(rangeNumber.value)).toFixed(0)}`

        
            rangeInputs.min = rangeNumber.min
            rangeInputs.max = rangeNumber.max
            rangeInputs.value = rangeNumber.value
        
            spanCoin.innerHTML = `$${coinState}`
        })
}


//Reset (temporal) - Vuelve todo a Dolar
fetch(`https://api.exchangerate-api.com/v4/latest/${tempCoinValue}`)
    .then(res => res.json())
    .then(data => {
        carrito.forEach(({price}) => {
            price /= data.rates[coinState]
            price = Number((price).toFixed(0))
        })
        refreshCart()
        albumList.forEach((album) => {
            album.price /= data.rates['USD']
            album.price = Number((album.price).toFixed(0))
        })
        refreshIndex(albumList)
        //Actualizar album con los precios de la moneda
        rangeNumber.min = 26/data.rates['USD']
        rangeNumber.min = `${(Number(rangeNumber.min)).toFixed(0)}`

        rangeNumber.max = 70/data.rates['USD']
        rangeNumber.max = `${(Number(rangeNumber.max)).toFixed(0)}`

        rangeNumber.value = 60/data.rates['USD']
        rangeNumber.value = `${(Number(rangeNumber.value)).toFixed(0)}`


        rangeInputs.min = rangeNumber.min
        rangeInputs.max = rangeNumber.max
        rangeInputs.value = rangeNumber.value

        spanCoin.innerHTML = `$${coinState}`
        localStorage.setItem('coinState', JSON.stringify(coinState))

        console.log(albumList)
        console.log(`-----------------`);
    });



    // function filter(e){
    //     console.log('Entra a filter');
    //     let priceFilteredAlbumList
    //     if(e.target.type == 'checkbox'){//Filtra por categorias, para filtrarlas por precio y enviarlo a refreshIndex
    //         if(e.target.checked){
    //             checkboxInputsChecked++
    //             let filtro = albumList.filter((album) => album.gender.includes(`${e.target.value}`))
    //             filtro.forEach(el => {
    //                 albumFilter.push(el)
    //             })
    //         }else{
    //             let indexAlbum = albumFilter.findIndex(({gender}) => gender === e.target.value);
    //             let splicingLength = albumFilter.filter(album=> album.gender.includes(`${e.target.value}`))
    //             albumFilter.splice([indexAlbum], splicingLength.length);
    //             checkboxInputsChecked--;
    //         }
    //     }
    //     //Filtra por precios, teniendo en cuenta si hay categorias seleccionadas
    //     console.log('albumList:');
    //     console.log(albumList);
    //     priceFilteredAlbumList = albumList.map(x => x)
    //     console.log('mapea albumList:')
    //     console.log(priceFilteredAlbumList)
    //     if(checkboxInputsChecked == 0){ 
    //         // priceFilteredAlbumList = albumList.filter(({price}) => price <= rangeInputs.value);
    //     }else{
    //         // priceFilteredAlbumList = albumFilter.filter(({price}) => price <= rangeInputs.value);
    //     }
    //     //Cheque el estado de radioInputs y los ordena dependiendo su valor (Ascendente/Descentende)
    //     if(radioInputAscending.checked){
    //         priceFilteredAlbumList.sort((a,b) => a.price - b.price)
    //     }else if(radioInputDescending.checked){
    //         priceFilteredAlbumList.sort((a,b) => b.price - a.price)
    //     }
    //     console.log('Termino filter');
    //     exchangePrices(priceFilteredAlbumList)
    // }
    
    function exchangePrices(priceFilteredAlbumList){
        console.log('Entra el array a exchange')
        coinState = coinSelect.value
        fetch(`https://api.exchangerate-api.com/v4/latest/${tempCoinValue}`) 
            .then(res => res.json())
            .then(data => {
                carrito.forEach(album => {
                    album.price *= data.rates[coinState]
                    album.price = Number((album.price).toFixed(0))
                })
                refreshCart()
                //Actualizar album con los precios de la moneda
                if(priceFilteredAlbumList.length == 0){
                    albumList.forEach(album => {
                        album.price *= data.rates[coinState]
                        album.price = Number((album.price).toFixed(0))
                    })
                    // console.log(albumList)
                    // refreshIndex(albumList)
                }else{
                    priceFilteredAlbumList.forEach(album => {
                        album.price *= data.rates[coinState]
                        album.price = Number((album.price).toFixed(0))
                    })
                    refreshIndex(priceFilteredAlbumList)
                    // console.log('guti')
                    // console.log(priceFilteredAlbumList)
                }
                // priceFilteredAlbumList.forEach(album => {
                //     album.price *= data.rates[coinState]
                //     album.price = Number((album.price).toFixed(0))
                // })
                // refreshIndex(priceFilteredAlbumList)
                // console.log('guti')
                // console.log(priceFilteredAlbumList)
                console.log('Termino exchange v1');
                tempCoinValue = coinSelect.value
                localStorage.setItem('coinState', JSON.stringify(coinState))
                console.log('Termino exchange v2');
            })
    }
// function filter(e){
//         console.log('Entra a filter');
//         // let priceFilteredAlbumList = albumList.map(x => x)

//         if(e.target.type == 'checkbox'){//Filtra por categorias, para filtrarlas por precio y enviarlo a refreshIndex
//             if(e.target.checked){
//                 checkboxInputsChecked++
//                 let filtro = albumList.filter((album) => album.gender.includes(`${e.target.value}`))
//                 filtro.forEach(el => {
//                     albumFilter.push(el)
//                 })
//             }else{
//                 let indexAlbum = albumFilter.findIndex(({gender}) => gender === e.target.value);
//                 let splicingLength = albumFilter.filter(album=> album.gender.includes(`${e.target.value}`))
//                 albumFilter.splice([indexAlbum], splicingLength.length);
//                 checkboxInputsChecked--;
//             }
//         }
//         //Filtra por precios, teniendo en cuenta si hay categorias seleccionadas
//         console.log('albumList:');
//         console.log(albumList);
//         console.log('mapea albumList:')
//         console.log(priceFilteredAlbumList)
//         if(checkboxInputsChecked == 0){ 
//             // priceFilteredAlbumList = albumList.filter(({price}) => price <= rangeInputs.value);
//         }else{
//             // priceFilteredAlbumList = albumFilter.filter(({price}) => price <= rangeInputs.value);
//         }
//         //Cheque el estado de radioInputs y los ordena dependiendo su valor (Ascendente/Descentende)
//         if(radioInputAscending.checked){
//             priceFilteredAlbumList.sort((a,b) => a.price - b.price)
//         }else if(radioInputDescending.checked){
//             priceFilteredAlbumList.sort((a,b) => b.price - a.price)
//         }
//         console.log('Termino filter');
//         exchangePrices(priceFilteredAlbumList)
//     }