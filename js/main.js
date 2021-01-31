const addToShoppingCartButtons = document.querySelectorAll('.addToCart');
addToShoppingCartButtons.forEach(addToCartButton => {
    addToCartButton.addEventListener('click', addToCartClicked);
});

const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked)

const shoppingCartItemsContainer = document.querySelector(
    '.shoppingCartItemsContainer'
);

function addToCartClicked(event) {
    const button = event.target;
    const item = button.closest('.item');

    const itemTitle = item.querySelector('.item-title').textContent;
    const itemPrice = item.querySelector('.item-price').textContent;
    const itemImage = item.querySelector('.item-image').src;

    addItemToShoppingCart(itemTitle, itemPrice, itemImage);
}

//Boton Para Agregar Productos
function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {

    const elementsTitle = shoppingCartItemsContainer.getElementsByClassName('shoppingCartItemTitle');

    for (let i = 0; i < elementsTitle.length; i++) {
        if (elementsTitle[i].innerText === itemTitle) {
            let elementQuantity = elementsTitle[
                i
            ].parentElement.parentElement.parentElement.querySelector(
                '.shoppingCartItemQuantity'
            );
            elementQuantity.value++;
            $('.toast').toast('show');
            updateShoppingCartTotal();
            return;
        }
    }

    const shoppingCartRow = document.createElement('div');
    const shoppingCartContent = `
    <div class="row shoppingCartItem">
        <div class="col-4">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImage}  class="shopping-cart-image">
                <h6 id="tituloEnsalada" class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
            </div>
        </div>
        <div class="col-4">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number" value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;

    shoppingCartRow.innerHTML = shoppingCartContent;
    shoppingCartItemsContainer.append(shoppingCartRow);
    //boton eliminar productos
    shoppingCartRow.querySelector('.buttonDelete').addEventListener('click', removeShoppingCartItem);
    //boton cantidad de productos
    shoppingCartRow.querySelector('.shoppingCartItemQuantity').addEventListener('change', quantityChanged);

    updateShoppingCartTotal();
}

//Funcion Que Calcula El Total
function updateShoppingCartTotal() {
    let total = 0;
    const shoppingCartTotal = document.querySelector('.shoppingCartTotal');
    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

    shoppingCartItems.forEach((shoppingCartItem) => {
        const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
            '.shoppingCartItemPrice'
        );
        const shoppingCartItemPrice = Number(
            shoppingCartItemPriceElement.textContent.replace('$', '')
        );
        const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
            '.shoppingCartItemQuantity'
        );
        const shoppingCartItemQuantity = Number(
            shoppingCartItemQuantityElement.value
        );
        total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
    });
    shoppingCartTotal.innerHTML = `$ ${total}`;
}

//funcion para eliminar items agregados
function removeShoppingCartItem(event) {
    const buttonClicked = event.target;
    buttonClicked.closest('.shoppingCartItem').remove();

    updateShoppingCartTotal();
}

function quantityChanged(event) {
    //Declaracion
    const input = event.target;
    //No Se Puede Poner Cero o Numeros Negativos
    if (input.value <= 0) {
        input.value = 1
    }
    //Se Actualiza El Precio
    updateShoppingCartTotal();
}

//Boton Comprar
function comprarButtonClicked() {
    shoppingCartItemsContainer.innerHTML = '';
    updateShoppingCartTotal();
}

//Filtro
filterSelection("all")

function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("filterDiv");
    if (c == "all") c = "";
    // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
    for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
    }
}

// Mostrar Elementos Filtrados 
function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
    }
}

// Esconder Elementos Que No Fueron Seleccionados
function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}