var videoSlides = document.querySelectorAll('.video-slide');
var navBtns = document.querySelectorAll('.slider-btn')
var contents = document.querySelectorAll('.slider-content')
var navBar = document.querySelector('.nav');
var burger = document.querySelector('.hamburger')
var navLinks = document.querySelectorAll('.nav li')
var ticketBtn = document.querySelectorAll('.ticket-btn')


function start() {
    handleClickBtn();
    handleNavBar();
}


var handleClickBtn = function() {
    renderVideoSlides();
    repeat();
}
function renderVideoSlides() {
    navBtns.forEach((btn,i)=>{
        btn.onclick = function() {
            navBtns.forEach((btn)=>{
                btn.classList.remove('active');
            })
            btn.classList.add('active');
            videoSlides.forEach((videoSlide)=>{
                videoSlide.classList.remove('active');
            })
            videoSlides[i].classList.add('active');
            contents.forEach((content)=>{
                content.classList.remove('active');
            })
            contents[i].classList.add('active');
        }
    })
}
function repeat() {
    let activeElements = document.querySelectorAll('.active');
    let i=0;
    function repeater() {
        setTimeout(()=>{
            videoSlides.forEach((videoSlide) =>{
                videoSlide.classList.remove('active');
            })
            navBtns.forEach((btn)=>{
                btn.classList.remove('active');
            })
            contents.forEach((content)=>{
                content.classList.remove('active');
            })
            videoSlides[i].classList.add('active');
            navBtns[i].classList.add('active');
            contents[i].classList.add('active');
            i++;
            if (videoSlides.length == i) {
                i = 0;
            }
            repeater()
        },1000000)
    }
    repeater()
}

start();
function handleNavBar() {
    burger.onclick = function(e) {
        navBar.classList.toggle('nav-active');

        navLinks.forEach((link,index) => {
            if(link.style.animation) {
                link.style.animation = ''
            }
            else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index/7 +0.2}s`
            }
         })

        burger.classList.toggle('burger-change')
    }

    
}
//On-off shopping-cart








function ready() {
    var shoppingBtn = document.querySelector('.shopping-btn')
    shoppingBtn.addEventListener('click',handleShoppingBtn)
    var quantityInputs=document.querySelectorAll('.ticket-quantity');
    var addToCartBtns = document.querySelectorAll('.ticket-btn');
    var removeBtns = document.querySelectorAll('.remove-btn')
        quantityInputs.forEach((quantityInput)=>{
            quantityInput.addEventListener('change',quantityChange)
        })        
        addToCartBtns.forEach((btn)=>{
            btn.addEventListener('click',handleAddToCart)
        })
        removeBtns.forEach((btn)=>{
            btn.addEventListener('click',handleRemoveBtn)
        })
        var purchaseBtn = document.querySelector('.purchase-btn')
        purchaseBtn.addEventListener('click',handlePurchaseBtn)
        window.addEventListener('mouseup',handleWindowClick)
        
        
    }
ready();
//handle window click
function handleWindowClick (e) {
    var shoppingCart = document.querySelector('.shopping-cart')
    if(e.target != shoppingCart && e.target.closest('.shopping-cart') != shoppingCart) {
        shoppingCart.classList.remove('shopping-cart-active')
    }
    else {
        return;
    }
}
//handle shoppingbtn click
function handleShoppingBtn (e) {
    var shoppingCart = e.target.querySelector('.shopping-cart')
    if(shoppingCart) {
    shoppingCart.classList.toggle('shopping-cart-active')
    }
}
//handle purchase btn 
function handlePurchaseBtn(e) {
    alert('Thanks for purchasing our products')
    var cartRows = e.target.closest('.shopping-cart').querySelectorAll('.item')
    cartRows.forEach((cartRow)=>{
        cartRow.remove();
    })
    updateCartTotal()
    var purchaseBtn = document.querySelector('.purchase-btn');
    purchaseBtn.classList.remove('purchase-btn-active')
}

//handle add to cart button
function handleAddToCart(e) {
    var shoppingCart = document.querySelector('.shopping-cart');
    shoppingCart.classList.add('shopping-cart-active')
    var purchaseBtn = document.querySelector('.purchase-btn');
    purchaseBtn.classList.add('purchase-btn-active')
    btn = e.target;
    var title = btn.parentElement.querySelector('.plan-date')
    var price = btn.parentElement.querySelector('.price')
    updateCartTotal();
    addToCart(title,price);
}
//add to cart 
function addToCart(title,price) {
    var tableCart = document.querySelector('.table-cart')
    var removeBtns = document.querySelectorAll('.remove-btn')
    var placeTitles = document.querySelectorAll('.place-title');
    if(placeTitles) {
        for (let i =0;i<placeTitles.length;i++) {
            if (placeTitles[i].innerText == title.innerText){
                var quantity = placeTitles[i].closest('.item').querySelector('.ticket-quantity');
                quantity.value++;
                updateCartTotal();
                return;
            }
        }
    }
    var htmls = `
        <tr class="item">
        <th class="place-title" style="font-family:'Poppins';"> ${title.innerText}</th>
        <th><input class="ticket-quantity" type="text" value="1"></th>
        <th class="ticket-price">${price.innerText.slice(6,12)}</th>
        <th><button type="button" class="remove-btn">Remove</button> <th>
        </tr>
    `
    tableCart.innerHTML += htmls;
    
    updateCartTotal()
    var removeBtns = document.querySelectorAll('.remove-btn')
    removeBtns.forEach((btn)=>{
        btn.addEventListener('click',handleRemoveBtn)
    })
    var quantityInputs = document.querySelectorAll('.ticket-quantity')
    quantityInputs.forEach((quantity)=>{
        quantity.addEventListener('change',quantityChange)
    })
}

//quantityChange

function quantityChange(e) {
    var input = e.target;
    if(input.value == NaN || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal()
}

//handle remove btn//


function handleRemoveBtn(e,btn) {
    e.target.closest('.item').remove();
    var removeBtns = document.querySelectorAll('.remove-btn')
    if(removeBtns.length == 0 ){
        var purchaseBtn = document.querySelector('.purchase-btn');
         purchaseBtn.classList.remove('purchase-btn-active')
    }
     updateCartTotal()
}



function updateCartTotal(btn) {
        var subTotal = document.querySelector('.sub-total')
            var cartRows = document.querySelectorAll('.item')
            var subtotal = 0;
            var quantityTotal = 0;
            cartRows.forEach((cartRow)=>{
                var priceElement = cartRow.querySelector('.ticket-price')
                var quantityElement = cartRow.querySelector('.ticket-quantity')
                var eachPrice = parseFloat(priceElement.innerText.replace('$','')) *Number(quantityElement.value)
                subtotal = subtotal + eachPrice;
                quantityTotal = quantityTotal + Number(quantityElement.value)
            })
            subtotal = Math.round(subtotal*100)/100
            quantityTotal = Math.round(quantityTotal*10000)/10000
            subTotal.innerText = '$' + subtotal;
            var total = document.querySelector('.total')
            total.innerText = quantityTotal
            
}


//contact form
 var inputs =document.querySelectorAll('.input')

 inputs.forEach((input)=>{
     input.addEventListener('focus',handleFocus)
     input.addEventListener('blur',handleBlur)
 })


function handleFocus(e) {
    e.target.parentElement.classList.add('focus')
}

function handleBlur(e) {
    if(e.target.value == "") {
        e.target.parentElement.classList.remove('focus')
    }
    else {
        return;
    }
}