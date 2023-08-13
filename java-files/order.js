function order() {
    let menu = document.getElementById('order');
    menu.innerHTML = ``;

    for (let d = 0; d < dishes.length; d++) {
        const dish = dishes[d];
        menu.innerHTML += htmlTempMenu(dish, d);

        let dishOrder = document.getElementById(`dish-order-contain${d}`);

        for (let dm = 0; dm < dish['dish'].length; dm++) {
            const dishMenu = dish['dish'][dm];
            dishOrder.innerHTML += htmlTempDishMenu(dishMenu, dm, d);
        }
    }
}

function htmlTempMenu(dish, d) {
    return /*html */ `
        <div class="menu-container" id="${dish['category-id']}">
            <div class="dish-image-container">
                <img src="${dish['image']}" alt="" class="dish-menu-image">
            </div>
            <div class="dish-category-contain">
                <h2 class="dish-category"><b>${dish['category']}</b></h2>
                <img src="${dish['category-image']}" alt="" class="dish-category-image">
            </div>
            <div class="dish-order-contain" id="dish-order-contain${d}">

            </div>
        </div>
    `;
}

function htmlTempDishMenu(dishMenu, dm, d) {
    return /*html */ `
        <div class="dish-menu-contain" onclick="orderDish(${dm}, ${d})">
            <div class="dish-menu-contain-e2">
                <div class="dish-order">
                    <span class="dish-name"><b>${dishMenu['name']}</b><img src="img/icon/info-2-64.png" class="dish-info-icon"></span>
                    <img src="img/icon/plus.png" class="order-icon">
                </div>
                <span class="dish-explanation">${dishMenu['explanation']}</span>
            </div>
            <span class="dish-price"><b>${Number(dishMenu['price']).toFixed(2)} €</b></span>
        </div>
    `;
}

function orderDish(dm, d) {
    document.getElementById('sc-empty').classList.add('d-none');
    document.getElementById('totalprice').classList.remove('d-none');
    let dishMenu = dishes[d]['dish'][dm];
    let dishName = dishMenu['name'];
    let dishPrice = dishMenu['price'];
    let position = getMenuIndex(dishName);

    if (getMenuIndex(dishName) == -1) {
        menus.push(dishName);
        prices.push(dishPrice);
        amounts.push(1);
    } else {
        amounts[position]++;
    }
    putToSC();
}

function putToSC() {
    let shoppingCart = document.getElementById('sc-filled');
    shoppingCart.innerHTML = ``;

    for (let o = 0; o < menus.length; o++) {
        const menu = menus[o];
        const price = prices[o];
        const amount = amounts[o];
        shoppingCart.innerHTML += htmlTempSC(menu, price, amount, o);
        calculate();
    }
}

function htmlTempSC(menu, price, amount, o) {
    return /*html */ `
        <div class="your-order-contain">
            <div class="stage1">
                <span class="ordered-dish-amount">${amount}</span>
                <span class="ordered-dish-name" id="dish-name"><b>${menu}</b></span>
            </div>
            <div class="stage2">
                <span class="ordered-dish-price"><b>${price.toFixed(2)} €</b></span>
                <div class="button-stage">
                    <img src="img/icon/minus.png" class="ordered-dish-button" onclick="minus(${o})">
                    <img src="img/icon/plus.png" class="ordered-dish-button" onclick="plus(${o})">
                </div>
            </div>
        </div>
    `;
}

function plus(o) {
    amounts[o]++;
    putToSC();
}

function minus(o) {
    if (amounts[o] > 1) {
        amounts[o]--;
        putToSC();
    } else {
        amounts.splice(o, 1);
        prices.splice(o, 1);
        menus.splice(o, 1);
        putToSC();
    } if (amounts.length == 0) {
        document.getElementById('sc-empty').classList.remove('d-none');
        document.getElementById('totalprice').classList.add('d-none');
        document.getElementById('respon-orderbutton-c').classList.remove('d-show');
    }
}

function calculate() {
    let subtotal = 0;
    let minsubtotal = 15;
    let deliveryCosts = 2;
    let totalButton = document.getElementById('totalprice');
    let responButton = document.getElementById('respon-orderbutton');
    
    for (let t = 0; t < prices.length; t++) {
        subtotal += prices[t] * amounts[t];
        let total = subtotal + deliveryCosts;

        totalButton.innerHTML = htmlTempTotalPrice(subtotal, minsubtotal, deliveryCosts, total);
        
        let orderButton = document.getElementById('order-button');
        

        if ( subtotal > 0 && window.innerWidth < 1001 ) {
            document.getElementById('respon-orderbutton-c').classList.add('d-show');
            responButton.innerHTML = /*html */ `<span><b>Bestellen</b></span><span><b>${total.toFixed(2)} €</b></span>`;
        }

        if (subtotal < minsubtotal) {
            orderButton.classList.add('bg-gray');
            responButton.classList.add('bg-gray');
        } else {
            orderButton.classList.remove('bg-gray');
            responButton.classList.remove('bg-gray');
        }
    }
}

function htmlTempTotalPrice(subtotal, minsubtotal, deliveryCosts, total) {
    return /*html */ `
        <span class="total-text"><b>Dein aktueller Bestellwert</b></span>
        <div class="border-bottom-line"></div>
        <div class="subtotal-contain">
            <span class="subtotal"><b>Bestellwert</b></span>
            <span class="subtotal-price"><b>${subtotal.toFixed(2)} €</b></span>
        </div>
        <div class="minsubtotal-contain">
            <span class="minsubtotal"><b>min. Bestellwert</b></span>
            <span class="minsubtotal-price"><b>${minsubtotal.toFixed(2)} €</b></span>
        </div>
        <div class="deliverycosts-contain">
            <span class="deliverycosts"><b>Lieferkosten</b></span>
            <span class="deliverycosts-price"><b>${deliveryCosts.toFixed(2)} €</b></span>
        </div>
        <div class="total-subcontain">
            <span class="total"><b>Gesamtsumme</b></span>
            <span class="total-price"><b>${total.toFixed(2)} €</b></span>
        </div>
        <button class="sc-order-button font-grace" id="order-button" onclick="makeYourOrder(${subtotal}, ${minsubtotal})">
            <span><b>Bestellen</b></span>
            <span><b>${total.toFixed(2)} €</b></span>
        </button>
    `;
}

function makeYourOrder(subtotal, minsubtotal) {
    let confirmOrder = document.getElementById('thx');
    confirmOrder.classList.add('d-show');

    if (subtotal < minsubtotal) {
        confirmOrder.innerHTML = htmlTempConfirmNotEnough(subtotal, minsubtotal);
    } else {
        confirmOrder.innerHTML = htmlTempConfirmEnough(subtotal, minsubtotal);
    }
}

function htmlTempConfirmNotEnough(subtotal, minsubtotal) {
    let difference = minsubtotal - subtotal;
    return /*html */ `
        <div class="order-confirm">
            <div class="order-not-enough">
                <span class="sorry">Tut uns leid.</span>
                <span class="sorry">Dir fehlen noch</span>
                <span class="sorry"><b>${difference.toFixed(2)} €</b></span>
                <span class="sorry">um deine Bestellung abzugeben.</span>
                <button class="submit-order font-grace" onclick="submitOrder()">Bestellung vordsetzen</button>
            </div>
        </div>
    `;
}

function submitOrder() {
    document.getElementById('thx').classList.remove('d-show');
}

function htmlTempConfirmEnough(subtotal, minsubtotal) {
    return /*html */ `
        <div class="order-confirm">
            <div class="order-enough">
                <span class="thanks-for-order">Danke!</span>
                <span class="thanks-for-order">Deine Bestellung</span>
                <span class="thanks-for-order">wird von uns bearbeitet.</span>
                <span class="thanks-for-order">Wir melden uns</span>
                <span class="thanks-for-order">sobald deine Bestellung auf dem Weg ist.</span>
                <button class="submit-order font-grace" onclick="back()">Zu den Speißen</button>
            </div>
        </div>
    `;
}

function back() {
    document.getElementById('thx').classList.remove('d-show');
    document.getElementById('sc-empty').classList.remove('d-none');
    document.getElementById('totalprice').classList.add('d-none');
    document.getElementById('respon-orderbutton-c').classList.remove('d-show');
    menus.length = 0;
    prices.length = 0;
    amounts.length = 0;
    putToSC();
}

function responOrder() {
    document.getElementById('cart').classList.add('d-show');
}

function closeSC() {
    document.getElementById('cart').classList.remove('d-show');
}

function getMenuIndex(dishName) {
    return menus.indexOf(dishName);
}